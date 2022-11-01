<?php

namespace App\Http\Middleware;

use App\OracleFacade;

use Closure;
use Illuminate\Http\Request;

class ConfigDBConnection
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        OracleFacade::config();

        return $next($request);
    }
}
