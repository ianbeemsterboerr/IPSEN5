<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'user_username' => $faker->userName,
        'user_first_name' => $faker->firstName,
        'user_last_name' => $faker->lastName,
        'user_email' => $faker->email,
        'user_description' => $faker->text($maxNbChars = 200),
        'user_salt' => str_random(126),
        'user_password' => password_hash('welkom123', PASSWORD_BCRYPT),
        'user_force_pw_change' => false,
        'user_force_name_change' => false,
        'user_guest' => false,
        'user_webtoken' => str_random(255),
        'user_isadmin' => 0
    ];
});

$factory->define(App\Tournament::class, function (Faker\Generator $faker) {
    return [
        'organizer_user_id' => App\User::inRandomOrder()->get()->first()->id,
        'gamename' => str_random(10),
        'tournament_typename' => str_random(10),
        'signup_typename' => str_random(10),
        'name' => $faker->company,
        'description' => $faker->text($maxNbChars = 50),
        'max_team_size' => rand(1, 3),
        'signup_start' => $faker->dateTimeBetween('+0 days', '+1 days'),
        'signup_end' => $faker->dateTimeBetween('+1 days', '+2 days'),
        'tournament_start' => $faker->dateTimeBetween('+2 days', '+3 days')
    ];
});

$factory->define(App\Team::class, function (Faker\Generator $faker) {
    return [
        'leader_user_id' => App\User::inRandomOrder()->get()->first()->id,
        'name' => $faker->company,
        'max_size' => rand(1, 10)
    ];
});

$factory->define(App\TeamMember::class, function (Faker\Generator $faker) {
    return [
        'team_id' => App\Team::inRandomOrder()->get()->first()->id,
        'user_id' => App\User::inRandomOrder()->get()->first()->id
    ];
});


