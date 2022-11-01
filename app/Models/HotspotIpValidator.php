<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\OracleFacade;

class HotspotIpValidator extends Model
{
    public $is_valid;
    public $database;
    public $contract_id;
    public $account_id;

    public static function validateIp(string $ip): HotspotIpValidator
    {
        $connection = new OracleFacade();
        $response = self::validateByInstance($ip, $connection);

        if (!$response->is_valid) {
            $database_id = ConstClass::$currentDB;

            if ($database_id == ConstClass::VTC) {
                ConstClass::$responseNotValidOn = ConstClass::RTC;
                ConstClass::$currentDB = ConstClass::RTC;
            } elseif ($database_id == ConstClass::RTC) {
                ConstClass::$responseNotValidOn = ConstClass::RTC;
                ConstClass::$currentDB = ConstClass::VTC;
            }
            $response = self::validateByInstance($ip, $connection);
        }
        return $response;
    }

    public static function validateByInstance(string $ip, OracleFacade $connection): HotspotIpValidator
    {
        $connection->procedure(
            'begin llines.ui_hotspot_idc.get_hs_params(:ip, :hs, :db, :cont_id, :clg_id); end;',
            [
                ':ip' => ['value' => $ip],
                ':hs' => ['value' => &$is_valid],
                ':db' => ['value' => &$db],
                ':cont_id' => ['value' => &$cont_id],
                ':clg_id' => ['value' => &$clg_id],
            ]
        );

        $response = new HotspotIpValidator();
        $response->is_valid = $is_valid == 'Y';
        $response->database = $response->is_valid ? $db : null;
        $response->contract_id = $cont_id != null ? intval($cont_id) : null;
        $response->account_id = $clg_id != null ? intval($clg_id) : null;

        return $response;
    }
}
