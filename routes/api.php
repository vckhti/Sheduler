<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IdClientController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
# external API
Route::get('/v1/check_hotspot_ip/{ip}', [IdClientController::class, 'checkHotspotIp']);

# idClient registration handlers
Route::any('/idclient/handleNewIdentifications', [IdClientController::class, 'handleNewIdentifications']);
Route::any('/idclient/changeStates', [IdClientController::class, 'changeStates']);
Route::any('/idclient/handleFilledContracts', [IdClientController::class, 'handleFilledContracts']);
Route::any('/idclient/handleConfirmedIdentifications', [IdClientController::class, 'handleConfirmedIdentifications']);
