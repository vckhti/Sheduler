<?php

namespace App\Http\Controllers;


use App\IdClient;
use App\ValidatorFacade;
use Illuminate\Http\Request;
use Psr\Http\Message\ResponseInterface as Response;

use App\Models\HotspotIpValidator;
use App\Models\ArrayValue;


class IdClientController extends Controller
{

    public function checkHotspotIp(Request $request, Response $response): Response
    {
        $ip = $request->route('ip');

        if (isset($ip) && filter_var($ip, FILTER_VALIDATE_IP)) {
            $validation_response = HotspotIpValidator::validateIp($ip);
            $body = (array)$validation_response;
            $responseArray = array();
            foreach ($body as $key => &$value) {
                if ($key == 'is_valid' || $key == 'database' || $key == 'contract_id' || $key == 'account_id')
                    $responseArray[$key] = $body[$key];
            }
            $filteredResponseArray = json_encode(new ArrayValue($responseArray), JSON_PRETTY_PRINT);
            $response->getBody()->write($filteredResponseArray);
        } else {
            $response = $response->withStatus(422);
            $response->getBody()->write(json_encode(['error' => 'Invalid ip']));
        }
        return $response;
    }

    public function handleNewIdentifications(Request $request)
    {
        $input = ValidatorFacade::validate($request, [
            'date_start' => 'nullable|date_format:Y-m-d',
            'date_end' => 'nullable|date_format:Y-m-d',
        ]);

        IdClient::handleNewIdentifications(
            $input['date_start'] ?? null,
            $input['date_end'] ?? null
        );
    }

    public function changeStates()
    {
        IdClient::changeStates();
    }

    public function handleFilledContracts()
    {
        IdClient::handleFilledContracts();
    }

    public function handleConfirmedIdentifications(Request $request)
    {
        $input = ValidatorFacade::validate($request, [
            'date_start' => 'nullable|date_format:Y-m-d',
            'date_end' => 'nullable|date_format:Y-m-d',
        ]);

        IdClient::handleConfirmedIdentifications(
            $input['date_start'] ?? null,
            $input['date_end'] ?? null
        );
    }
}
