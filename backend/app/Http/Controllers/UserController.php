<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;

class UserController extends Controller
{
    
    /**
     * Retrieve the user for the given ID.
     *
     * @param  int  $id
     * @return Response
     */
    public function getAll(Request $request)
    {
        return User::all();
    }



    public function login(Request $request){ 
        $user_username = $request->json('user_username');
        $user_password = $request->json('user_password');

        $user = User::where('user_username', $user_username)->first();


        if ($user === null)
        {
            abort(401);
        }

        if ($user_password == $user->user_password)
        {
            $key = "JWT";
            $token = array(
                "iss" => "compufifi.test",
                "aud" => "angularClient",
                "iat" => 1356999524,
                "nbf" => 1357000000,
                "isadmin" => $user->user_isadmin
            );
            $jwt = JWT::encode($token, $key, 'HS256');
            
            $jwtstring = array(
                "bearer" => $jwt
            );
            return json_encode($jwtstring);
        }
        else
        {
            abort(401);
        }

    }
}