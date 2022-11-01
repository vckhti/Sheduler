<?php

namespace App\Models;

use Illuminate\Support\Collection;

/**
 * Class DatabaseResponse
 * @package App\Models
 *
 * @property bool $success
 * @property Collection $data
 * @property string|null $error
 * @property string|null $clob
 */
class DatabaseResponse
{
    public $success;
    public $data;
    public $error = null;
    public $clob = null;

    public function toCommonResponse(): CommonResponse
    {
        return new CommonResponse($this->success, $this->error);
    }

}
