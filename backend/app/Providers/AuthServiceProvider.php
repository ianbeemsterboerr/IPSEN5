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

<<<<<<< HEAD
        $this->app['auth']->viaRequest('api', function ($request) {
            if ($request->header('Authorization')) {
                $user;
                $token = str_replace('Bearer ','', $request->header('Authorization'));
                $jwt = JWT::decode($token, "JWT", array('HS256'));
=======
        $this->app['auth']->viaRequest('api', function (Request $request) {
            if ($request->header('bearer')) {
                $user = null;
                $jwt = JWT::decode($request->header('bearer'), "JWT", array('HS256'));
>>>>>>> 53be126fbb0011fe2bef635fe2cfd39562f31525
                if ($jwt->isadmin)
                {
                    $user =  User::whereUserUsername($jwt->user_username)->first();

                    $request->merge(['user' => $user ]);
                    $request->setUserResolver(function () use ($user) {
                        return $user;
                    });
                } 
                else
                {
                    $user = json_encode($jwt);
                }

                return $user;
            }
        });
    }
}
