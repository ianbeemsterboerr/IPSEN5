<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

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
        return app('db')->select("SELECT * FROM user");
    }

    public function login(Request $request)
    {
        //$user = DB::table('user')->where('user_username', $request->header('user_username')->first());
        $username = $request->header('user_username');
        $password = $request->header('user_password');


        $user = User::where('user_username', $username)->first();
        
        
        $passwordFromDb = $user->user_password;

        
        //todo: password en/decoding.
        //todo: return JWT instead of model
        if($password == $passwordFromDb){
        return json_decode($user, true);
        }
        else return 'xd';
    }
}