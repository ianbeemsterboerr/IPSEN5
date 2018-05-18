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
        if($request->has('user_username', 'user_password'))
        {
            $user = User::where('user_username', $request->input('user_username'))->first();
        }   
        
        else
        {
            return 'No password or username sent.';
        }

        if($user->user_password == $request->input('user_password'))
        {
            return $user;
        } 

        else
        {
            return 'Wrong password.';
        }
        return 'niks doet het.';
    }
}