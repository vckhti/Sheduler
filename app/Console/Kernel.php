<?php

namespace App\Console;

use App\IdClient;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Config;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Id client integration
        if (Config::get('app.id_client_integration')) {
            $schedule->call(function () {
                IdClient::handleNewIdentifications();
            })->cron('*/10 * * * *');

            $schedule->call(function () {
                IdClient::handleConfirmedIdentifications();
            })->cron('*/20 * * * *');

            $schedule->call(function () {
                IdClient::changeStates();
            })->cron('1,11,21,31,41,51 * * * *');

            $schedule->call(function () {
                IdClient::handleFilledContracts();
            })->cron('2,12,22,32,42,52 * * * *');
        }

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
