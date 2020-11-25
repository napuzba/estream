<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return view('welcome');
});

Route::post('/endpoint', function (Request $request) {
    $data =  $request->json()->all(); //read json in request
    // Todo : Add persistence - store in MongoDB
    // TOdo : Send meggage to websockets server with the event
    return response('OK', 200)->header('Content-Type', 'text/plain');
});
