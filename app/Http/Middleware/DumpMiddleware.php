<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class DumpMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public $ipFromRequest;

    public function handle(Request $request, Closure $next)
    {
        //$this->ipFromRequest = $request->route('ip');
        return $next($request);
    }
}
