<?php

namespace App\Providers;

use Firebase\JWT\JWT;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->app['auth']->viaRequest('api', function ($request) {
            if ($request->header('Authorization')) {
                $token = str_replace('Bearer ','', $request->header('Authorization'));
                $jwt = JWT::decode($token, env('JSON_WEBTOKEN_KEY'), array('HS256'));

                $user =  User::whereUsername($jwt->username)->first();

                $request->merge(['user' => $user ]);
                $request->setUserResolver(function () use ($user) {
                    return $user;
                });

                return $user;
            }

            return null;
        });
    }
}
