<?php

namespace App\Http\Controllers;

use App\User;
use App\Team;
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
        return User::all(['username']);
    }

    public function login(Request $request)
    {
        $username = $request->json('username');
        $password = $request->json('password');

        $userFromDatabase = User::whereUsername($username)->first();

        if (is_null($userFromDatabase)) {
            return response('Wrong username or password!', 401);
        }

        if (password_verify($password, $userFromDatabase->password)) {
            $key = env('JSON_WEBTOKEN_KEY');
            $token = array(
                "iss" => "compufifi.test",
                "aud" => "angularClient",
                "isadmin" => $userFromDatabase->isadmin,
                "username" => $userFromDatabase->username
            );
            $jwt = JWT::encode($token, $key, 'HS256');
            //TO DO: FIX BEARER SYSTEM
            $jwtstring = array(
                "bearer" => $jwt,
                "activeUserId" => $userFromDatabase->id,
                "user" => (string) $userFromDatabase
            );
            return json_encode($jwtstring);
            // return json_encode(JWT::decode($jwt, $key, array('HS256')));
        } else {
            return response('Wrong username or password!', 401);
        }
    }

    public function get(int $id)
    {
        $user =  User::find($id);

        if($user !== null){
            return $user;
        }

        return response('User not found', 404);
    }

    public function register(Request $request){
        $data = $request->json()->all();

        if (User::whereUsername($request->json('username'))->orWhere('email', '=', $request->json('email'))->first() != null){
            return response('User already exists', 409);
        }

        $newUser = User::create($data);
        $newUser->password = password_hash($data['password'], PASSWORD_BCRYPT);
        $newUser->save();

        $newUser->teams()->create(
            ['name' => $newUser->username,
            'size' => 1,
            'max_size' => 1
        ]);
        return $newUser;
    }
}