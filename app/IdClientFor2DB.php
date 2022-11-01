<?php

namespace App;

use App\Models\ConstClass;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use PDO;

class IdClientFor2DB
{
    private const LOG_CHANNEL = 'id_client';

    public static function handleNewIdentifications(?string $date_start = null, ?string $date_end = null)
    {

        // Getting companies
        $companies = self::getCompaniesIds();

        if (empty($date_start) || empty($date_start)) {
            $today = Carbon::now();
            $date_end = $today->format('Y-m-d');
            $date_start = $today->addDays(-1)->format('Y-m-d');
        }
        self::getInstanceIdAndMergeDataToDBs($companies, $date_end, $date_start);
    }

    public static function handleConfirmedIdentifications(?string $date_start = null, ?string $date_end = null)
    {
        // Getting companies
        $companies = self::getCompaniesIds();

        if (empty($date_start) || empty($date_start)) {
            $today = Carbon::now();
            $date_end = $today->format('Y-m-d');
            $date_start = $today->addDays(-1)->format('Y-m-d');
        }

        self::getInstanceIdAndMergeDataToDBs($companies, $date_end, $date_start);
    }

    public static function getInstanceIdAndMergeDataToDBs(array $companies, string $date_end, string $date_start)
    {
        // Make identifications
        $identifications = [
            'status' => 'success',
            'data' => [],
        ];
        ConstClass::setCurrentInstanceId(ConstClass::RTC);
        $instance_id = Session::get('instance_id');

        if ($instance_id == ConstClass::RTC) {
            foreach ($companies as $company_id) {
                try {
                    $company_identifications = self::getCompanyIdentifications(
                        $company_id,
                        $date_start,
                        $date_end,
                        'confirm'
                    );
                    $identifications['data'] = array_merge($identifications['data'], $company_identifications);
                } catch (Exception $e) {
                    Log::error($e);
                }
            }
            // Sending data to firstDB
            self::mergeIds($identifications);
            // Uploading files to first DB
            foreach ($identifications['data'] as $row) {
                self::uploadIdentificationFiles($row, ['contractFile']);
            }
            //connect to second DB
            ConstClass::setCurrentInstanceId(ConstClass::VTC);
        }
        $instance_id = Session::get('instance_id');
        if ($instance_id == ConstClass::VTC) {
            foreach ($companies as $company_id) {
                try {
                    $company_identifications = self::getCompanyIdentifications(
                        $company_id,
                        $date_start,
                        $date_end,
                        'confirm'
                    );
                    $identifications['data'] = array_merge($identifications['data'], $company_identifications);
                } catch (Exception $e) {
                    Log::error($e);
                }
            }
            // Sending data to SecondDB
            self::mergeIds($identifications);
            // Uploading files to second DB
            foreach ($identifications['data'] as $row) {
                self::uploadIdentificationFiles($row, ['contractFile']);
            }
        }
    }

    public static function changeStates()
    {
        $list = null;

        OracleFacade::procedure('begin issa.IDCLIENT.get_verified_list(
            :list
        ); end;', [
            ':list' => ['value' => &$list, 'type' => PDO::PARAM_INPUT_OUTPUT],
        ]);

        $list = json_decode($list, true);

        // Logging
        Log::channel(self::LOG_CHANNEL)
            ->info(
                'Procedure call: issa.IDCLIENT.get_verified_list.',
                $list
            );

        // Getting data from ID Client
        $url = 'https://api-abonent.id.world/company-identification-state-change';
        $id_client_response = [
            'response' => [],
        ];

        if (!empty($list['verified_list'])) {
            foreach ($list['verified_list'] as $row) {
                $post = $row['verify_json'];

                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
                $response = curl_exec($ch);
                $response = json_decode($response, true);

                $response['date'] = date('Y-m-d\TH:i:s');
                $response['company_id'] = $row['company_id'];

                $id_client_response['response'][] = $response;
            }
        }

        // Sending data to DB
        if (!empty($id_client_response['response'])) {
            try {
                $error = null;

                OracleFacade::procedure('begin issa.IDCLIENT.SET_VERIFIED_LIST_ANSWER(
                    :list,
                    :error
                ); end;', [
                    ':list' => ['value' => json_encode($id_client_response), 'type' => SQLT_CLOB],
                    ':error' => ['value' => &$error, 'type' => PDO::PARAM_INPUT_OUTPUT],
                ]);

                // Logging
                Log::channel(self::LOG_CHANNEL)
                    ->info(
                        'Procedure call: issa.idclient.set_verified_list_answer.',
                        [
                            'list' => $id_client_response,
                            'response' => $error,
                        ]
                    );

            } catch (Exception $e) {
                Log::error($e);
            }
        }
    }

    public static function handleFilledContracts()
    {
        $ids = null;

        // Getting filled contracts
        OracleFacade::procedure('begin issa.IDCLIENT.GET_IDS_FILLED_CONTRACT(
            :ids
        ); end;', [
            ':ids' => ['value' => &$ids, 'type' => PDO::PARAM_INPUT_OUTPUT],
        ]);

        $ids = json_decode($ids, true)['get_contracts_for'] ?? [];

        // Logging
        Log::channel(self::LOG_CHANNEL)
            ->info(
                'Procedure call: ISSA.IDCLIENT.GET_IDS_FILLED_CONTRACT. Response: ',
                $ids
            );

        // Companies array
        $companies = [];
        foreach ($ids as $id) {
            $company_id = $id['company_id'];

            if (!isset($companies[$company_id])) {
                $companies[$company_id] = [];
            }

            if (array_search($id['id'], $companies[$company_id]) === false) {
                $companies[$company_id][] = $id['id'];
            }
        }


        // Getting identifications
        $identifications = [];
        $today = Carbon::now();
        $date_end = $today->format('Y-m-d');
        $date_start = $today->addDays(-1)->format('Y-m-d');

        ConstClass::setCurrentInstanceId(ConstClass::RTC);
        $instance_id = Session::get('instance_id');

        if ($instance_id == ConstClass::RTC) {
            foreach ($companies as $company_id => $ids) {
                try {
                    $company_identifications = self::getCompanyIdentifications(
                        $company_id,
                        $date_start,
                        $date_end
                    );

                    foreach ($company_identifications as $identification) {
                        if (in_array($identification['id'], $ids)) {
                            $identifications[] = $identification;
                        }
                    }

                } catch (Exception $e) {
                    Log::error($e);
                }
            }

            // Uploading files
            foreach ($identifications as $row) {
                self::uploadIdentificationFiles($row);
            }
            //connect to second DB
            ConstClass::setCurrentInstanceId(ConstClass::VTC);
        }
        $instance_id = Session::get('instance_id');
        if ($instance_id == ConstClass::VTC) {
            foreach ($companies as $company_id => $ids) {
                try {
                    $company_identifications = self::getCompanyIdentifications(
                        $company_id,
                        $date_start,
                        $date_end
                    );

                    foreach ($company_identifications as $identification) {
                        if (in_array($identification['id'], $ids)) {
                            $identifications[] = $identification;
                        }
                    }

                } catch (Exception $e) {
                    Log::error($e);
                }
            }

            // Uploading files
            foreach ($identifications as $row) {
                self::uploadIdentificationFiles($row);
            }
        }

    }

    private static function uploadFile($params)
    {
        try {
            $file_content = Http::withOptions(['verify' => false])->get($params['file_url'])->body();

            $error_message = null;

            OracleFacade::procedure('begin ISSA.IDCLIENT.MERGE_SCAN(
                :a_id,
                :company_id,
                :id_date,
                :scan_type,
                :file_name,
                :file_content,
                :error_message
            ); end;', [
                ':a_id' => ['value' => $params['a_id']],
                ':company_id' => ['value' => $params['company_id']],
                ':id_date' => ['value' => $params['id_date']],
                ':scan_type' => ['value' => $params['scan_type']],
                ':file_name' => ['value' => $params['file_name']],
                ':file_content' => ['value' => $file_content, 'type' => PDO::PARAM_LOB],
                ':error_message' => ['value' => &$error_message, 'type' => PDO::PARAM_INPUT_OUTPUT],
            ]);

            if ($error_message != 'success') {
                Log::error($error_message);
            }
        } catch (Exception $e) {
            Log::error($e);
            $error_message = $e->getMessage();
        }

        // Logging
        Log::channel(self::LOG_CHANNEL)
            ->info(
                'Procedure call: ISSA.IDCLIENT.MERGE_SCAN.',
                [
                    'params' => [
                        'a_id' => $params['a_id'],
                        'company_id' => $params['company_id'],
                        'id_date' => $params['id_date'],
                        'scan_type' => $params['scan_type'],
                        'file_name' => $params['file_name'],
                    ],
                    'response' => $error_message,
                ]
            );
    }

    private static function uploadIdentificationFiles(
        $identification,
        $file_types = ['contractFile', 'documentFile', 'documentFileAddress', 'signatureFile']
    )
    {
        foreach ($file_types as $file_type) {
            if (!empty($identification[$file_type])) {
                self::uploadFile([
                    'file_url' => $identification[$file_type],
                    'scan_type' => $file_type,
                    'a_id' => $identification['id'],
                    'company_id' => $identification['companyId'],
                    'file_name' => $file_type,
                    'id_date' => $identification['date'],
                ]);
            }
        }
    }

    /**
     * @return int[]
     */
    private static function getCompaniesIds(): array
    {
        try {
            $companies = null;

            OracleFacade::procedure(
                'begin issa.IDCLIENT.GET_COMPANY_IDS(:companies); end;',
                [
                    ':companies' => ['value' => &$companies, 'type' => PDO::PARAM_INPUT_OUTPUT],
                ]
            );

            $response = json_decode($companies, true)['company_ids'] ?? [];
        } catch (Exception $e) {
            Log::error($e);

            $response = [];
        }

        // Logging
        Log::channel(self::LOG_CHANNEL)
            ->info(
                'Procedure call: ISSA.IDCLIENT.GET_COMPANY_IDS. Response: ',
                $response
            );

        return $response;
    }

    private static function getCompanyIdentifications(
        int    $company_id,
        string $date_start,
        string $date_end,
               $state = 'all'
    ): array
    {
        $url = 'https://api-abonent.id.world/company-identifications';
        $api_key = Config::get('app.id_client_api_key');

        $params = [
            'api_key' => $api_key,
            'company_id' => $company_id,
            'date_start' => $date_start,
            'date_end' => $date_end,
            'state' => $state,
        ];

        if ($company_id == 71) {
            $params['customFields'] = ['database' => self::getDatabase()];
        }

        $response = Http::get($url, $params)->json();

        $identifications = [];

        foreach ($response['data'] ?? [] as $identification) {
            $identification['companyId'] = $company_id;
            $identifications[] = $identification;
        }

        // Logging
        Log::channel(self::LOG_CHANNEL)
            ->info(
                'API method call: company-identifications.',
                [
                    'params' => [
                        'company_id' => $company_id,
                        'date_start' => $date_start,
                        'date_end' => $date_end,
                        'state' => $state,
                    ],
                    'response' => $response,
                ]
            );

        return $identifications;
    }

    private static function mergeIds($identifications)
    {
        $query_response = null;

        OracleFacade::procedure('begin ISSA.IDCLIENT.MERGE_IDS(
            :json,
            :query_response
        ); end;', [
            ':json' => ['value' => json_encode($identifications), 'type' => SQLT_CLOB],
            ':query_response' => ['value' => &$query_response, 'type' => PDO::PARAM_INPUT_OUTPUT],
        ]);

        if ($query_response != 'success') {
            Log::error($query_response);
        }

        // Logging
        Log::channel(self::LOG_CHANNEL)
            ->info(
                'Procedure call: ISSA.IDCLIENT.MERGE_IDS.',
                [
                    'params' => $identifications,
                    'response' => $query_response,
                ]
            );
    }

    /**
     * @return string
     * @throws Exception
     */
    private static function getDatabase(): string
    {
        $instance_id = ConstClass::$currentDB;

        if (empty($instance_id)) {
            throw new Exception('Invalid instance id');
        }

        if ($instance_id == ConstClass::VTC) {
            ConstClass::$responseNotValidOn = 1;
            ConstClass::setCurrentInstanceId(ConstClass::VTC);
            return 'ASRVTC';
        } elseif ($instance_id == ConstClass::RTC) {
            ConstClass::$responseNotValidOn = 1;
            ConstClass::setCurrentInstanceId(ConstClass::RTC);
            return 'ASRRTC';
        } else {
            throw new Exception('Invalid instance id');
        }
    }


}
