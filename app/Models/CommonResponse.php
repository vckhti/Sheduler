<?php

namespace App\Models;

use Stringable;

/**
 * Class CommonResponse
 * @package App\Models
 *
 * @property bool $success
 * @property string|null $error
 */
class CommonResponse implements Stringable
{
    public $success;
    public $error;

    public function __construct(bool $success, ?string $error = null)
    {
        $this->success = $success;
        $this->error = $error;
    }

    public function __toString(): string
    {
        return json_encode($this);
    }
}
