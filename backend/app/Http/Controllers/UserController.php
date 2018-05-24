<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Illuminate\Http\Response;

class UserController extends Controller
{

    /**
     * Retrieve the user for the given ID.
     *
     * @param  int $id
     * @return Response
     */
    public function getAll(Request $request)
    {
        return User::all();
    }


    public function login(Request $request)
    {
        $user_username = $request->json('user_username');
        $user_password = $request->json('user_password');

        $user = User::where('user_username', $user_username)->first();

        if (is_null($user)) {
            return response()->json(
                array(
                    'status' => 'error',
                    'message' => 'Unauthorized, User doesnt exist'
                ),
                401
            );
        }

        if ($user_password == $user->user_password) {
            $key = "JWT";
            $token = array(
                "iss" => "compufifi.test",
                "aud" => "angularClient",
                "isadmin" => $user->user_isadmin,
                "user_username" => $user->user_username
            );
            $jwt = JWT::encode($token, $key, 'HS256');
            //TO DO: FIX BEARER SYSTEM
            $jwtstring = array(
                "bearer" => $jwt,
                "activeUserId" => $user->user_id
            );
            return json_encode($jwtstring);
            // return json_encode(JWT::decode($jwt, $key, array('HS256')));
        } else {
            abort(401);
        }
    }

    public function get(int $id)
    {
        return User::where('user_id', $id)->first();
    }

    public function register(Request $request){
        return 'Ontvangen';
    }
}