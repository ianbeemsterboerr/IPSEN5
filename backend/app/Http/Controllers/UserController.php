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
            return response()->json(
                array(
                    'status' => 'error',
                    'message' => 'Unauthorized'
                ),
                401
            );
        }

        if (password_verify($password, $userFromDatabase->password)) {
            $key = "JWT";
            $token = array(
                "iss" => "compufifi.test",
                "aud" => "angularClient",
                "isadmin" => $userFromDatabase->isadmin,
                "username" => $userFromDatabase->username
            );
            $jwt = JWT::encode($token, $key, 'HS256');
            $jwtstring = array(
                "bearer" => $jwt,
                "userID" => $userFromDatabase->id,
                "user" => (string) $userFromDatabase
            );
            return json_encode($jwtstring);
        } else {
            return response()->json(array(
                'status' => 'error',
                'message' => 'Unauthorized'
            ), 401);
        }
    }

    public function get(int $id)
    {
        $user =  User::find($id);

        if($user !== null){
            return $user;
        }

        return response()->json(array(
            'status' => 'error',
            'message' => 'User not found'
        ), 404);
    }

    public function register(Request $request){
        $data = $request->json()->all();
            
        if (User::where('username', '=', $request->json('username'))->orWhere('email', '=', $request->json('email'))->count() > 0){
            return response()->json(array(
                'status' => 'error',
                'message' => 'User already exists'
            ), 409);
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