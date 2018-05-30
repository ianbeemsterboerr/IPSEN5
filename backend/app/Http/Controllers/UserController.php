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
     * @return User[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getAll(Request $request)
    {
        return User::all();
    }

    public function getUserNames() {
        return User::all(['user_username']);
    }

    public function login(Request $request)
    {
        $user_username = $request->json('user_username');
        $user_password = $request->json('user_password');

        $userFromDatabase = User::where('user_username', $user_username)->first();

        if (is_null($userFromDatabase)) {
            return response()->json(
                array(
                    'status' => 'error',
                    'message' => 'Unauthorized, User doesnt exist'
                ),
                401
            );
        }

        //$hashedPassword = app('hash')->make($plainPassword);
        if (password_verify($user_password, $userFromDatabase->user_password)) {
            $key = "JWT";
            $token = array(
                "iss" => "compufifi.test",
                "aud" => "angularClient",
                "isadmin" => $userFromDatabase->user_isadmin,
                "user_username" => $userFromDatabase->user_username
            );
            $jwt = JWT::encode($token, $key, 'HS256');
            //TO DO: FIX BEARER SYSTEM
            $jwtstring = array(
                "bearer" => $jwt,
                "activeUserId" => $userFromDatabase->user_id
            );
            return json_encode($jwtstring);
            // return json_encode(JWT::decode($jwt, $key, array('HS256')));
        } else {
            return response()->json(array(
                'status' => 'error',
                'message' => 'Unauthorized, Wrong password'
            ), 401);
        }
    }

    public function get(int $id)
    {
        return User::where('user_id', $id)->first();
    }

    public function register(Request $request){
        
        $newUser = new User;
        $newUser->user_username = $request->json('username');
        $newUser->user_first_name = $request->json('first_name');
        $newUser->user_last_name = $request->json('last_name');
        $newUser->user_password = password_hash($request->json('password'), PASSWORD_BCRYPT);
        $newUser->user_email = $request->json('email');
        $newUser->save();
        
        return $newUser;
    }
}