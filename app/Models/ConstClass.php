<?php

namespace App\Models;

class ConstClass
{
    public static $currentDB;

    const RTC = 0;
    const VTC = 1;

    public static $responseNotValidOn;

    public static function setCurrentInstanceId(int $number) {
        self::$currentDB = $number;
    }

}
