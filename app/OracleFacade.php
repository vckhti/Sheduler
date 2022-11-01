<?php

namespace App;

use App\Models\ConstClass;
use Exception;
use Illuminate\Support\Facades\Config;
use PDO;
use Yajra\Pdo\Oci8;

/**
 * Class Orcle
 * @package App
 */
class OracleFacade
{

    /**
     * @var Oci8[] $pdo
     * @var Oci8 $commonDbPdo
     */
    public static $pdo = [];

    public static function getPdo(): Oci8
    {
        $instance = strtolower(trim(Config::get('app.instance_id')));

        if (empty($instance)) {
            throw new Exception('Invalid instance id');
        }
        if ($instance == 'vtc') {
            $database_id = ConstClass::VTC;
        } elseif ($instance == 'rtc') {
            $database_id = ConstClass::RTC;
        }

        if ($database_id == ConstClass::VTC && !isset(ConstClass::$responseNotValidOn)) {
            $tns = Config::get('app.vtc_tns');
            $login = Config::get('app.vtc_login');
            $password = Config::get('app.vtc_password');

        } elseif ($database_id == ConstClass::RTC && !isset(ConstClass::$responseNotValidOn)) {
            $tns = Config::get('app.rtc_tns');
            $login = Config::get('app.rtc_login');
            $password = Config::get('app.rtc_password');
        } else {
            $database_id = ConstClass::$currentDB;
            if ($database_id == ConstClass::VTC) {
                $tns = Config::get('app.vtc_tns');
                $login = Config::get('app.vtc_login');
                $password = Config::get('app.vtc_password');
            } elseif ($database_id == ConstClass::RTC) {
                $tns = Config::get('app.rtc_tns');
                $login = Config::get('app.rtc_login');
                $password = Config::get('app.rtc_password');
            }
            ConstClass::$responseNotValidOn = null;
        }
        ConstClass::$currentDB = $database_id;

        return new Oci8($tns, $login, $password);
    }


    public static function procedure(string $query, array $params = [])
    {
        $pdo = self::getPdo();
        $pdo->query("alter session set NLS_DATE_FORMAT = 'YYYY-MM-DD HH24:MI:SS'");

        $smtp = $pdo->prepare($query);

        foreach ($params as $param_key => $param) {
            if (isset($param['type'])) {
                $smtp->bindParam($param_key, $param['value'], $param['type'], 100000000);
            } else {
                $smtp->bindParam($param_key, $param['value'], null, 100000000);
            }
        }

        $cursor = null;

        // Binding cursor param
        if (strpos($query, ':cursor') !== false) {
            $smtp->bindParam(':cursor', $cursor, PDO::PARAM_STMT);
        }

        // Binding clob param
        if (strpos($query, ':clob') !== false) {
            $clob = null;
            $smtp->bindParam(':clob', $clob, OCI_TEMP_CLOB, 100000000000);
        }

        // Executing request
        $smtp->execute();

        // Handling cursor param
        if (!empty($cursor)) {
            $result = null;
            oci_execute($cursor, OCI_DEFAULT);
            oci_fetch_all($cursor, $result, 0, -1, OCI_FETCHSTATEMENT_BY_ROW + OCI_ASSOC);
            oci_free_cursor($cursor);
            return collect($result);
        }

        // Handling clob param
        if (!empty($clob)) {
            return $clob;
        }

        return null;
    }

}
