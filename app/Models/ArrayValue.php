<?php

namespace App\Models;

use JsonSerializable;

class ArrayValue implements JsonSerializable
{
    public function __construct(array $array) {
        $this->array = $array;
    }

    public function jsonSerialize() {
        return $this->array;
    }

}
