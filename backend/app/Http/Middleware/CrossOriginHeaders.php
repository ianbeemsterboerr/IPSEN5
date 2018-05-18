<?php
    namespace App\Http\Middleware;
    use Closure;

    class CrossOriginHeaders
    {
        public function handle($request, Closure $next){
            $response = $next($request);
            $response->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Content-Range, Content-Disposition, Content-Description, X-Auth-Token, Accept, X-Requested-With');
            $response->header('Access-Control-Allow-Origin', '*');
            $response->header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
            return $response;
        }
    }

