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

    public function login(Request $request)
    {
        $username = $request->json()->get('user_username');
        $password = $request->json()->get('user_password');
        // return $username;
        $user = User::where('user_username', $username)->first();
        $passwordFromDb = $user([user_password]);

        
        //todo: password en/decoding.
        //todo: return JWT instead of model
        if($password == $passwordFromDb){
        return json_decode($user, true);
        }
        else return 'xd';
    }
}