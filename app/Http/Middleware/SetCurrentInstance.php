<?php

namespace App\Http\Middleware;

use App\Models\Instance;
use Closure;

class SetCurrentInstance
{

    public function handle($request, Closure $next)
    {
        $request_headers = getallheaders();
        $instance_id = $request_headers['Instance-Id'] ?? null;

        if ( $instance_id !== null && is_numeric($instance_id) ) {
            Instance::setCurrentInstanceId($instance_id);
        }

        return $next($request);
    }

}
