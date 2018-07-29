<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use App\Task;
use Illuminate\Http\Request;
use Validator;


Route::get('/', function () {
    return view('tasks');
});

Route::group(['prefix' => 'api'], function () {

    Route::get('tasks', function ()    {
        $tasks = Task::orderBy('created_at', 'asc')->get();

        $response = [
            'status'=>1,
            'message'=>'',
            'data'=>[]
        ];

        foreach ($tasks AS $task) {
            $response['data'][] = [
                'id'=>$task->id,
                'type'=>'task',
                'attributes'=>[
                    'title'=>$task->title,
                    'done'=>$task->done,
                ]
            ];
        }

        return response()->json($response);
    });

    Route::get('tasks/{id}', function (Request $request, $id)    {
        $task = Task::find($id);
        if(!$task) {
            $response = [
                'status'=>0,
                'message'=>'Not found',
            ];

            return response()->json($response)->status(404);
        }

        $response = [
            'status'=>1,
            'message'=>'',
            'data'=>[
                'id'=>$task->id,
                'type'=>'task',
                'attributes'=>[
                    'title'=>$task->title,
                    'done'=>$task->done,
                ]
            ]
        ];

        return response()->json($response);
    });

    Route::post('tasks', function (Request $request) {

        $requestData = $request->all();
        $requestData = $requestData['data']['attributes'];

        $validator = Validator::make($requestData, [
            'title' => 'required',
        ]);

        if ($validator->fails()) {
            $response = [
                'status'=>0,
                'message'=>'Required fields are missing',
            ];

            return response()->json($response)->status(404);
        }

        $task = new Task;
        $task->title = $requestData['title'];
        $task->done = $requestData['done'];
        $task->save();

        $response = [
            'status'=>1,
            'message'=>'',
            'data'=>[
                'id'=>$task->id,
                'type'=>'task',
                'attributes'=>[
                    'title'=>$task->title,
                    'done'=>$task->done,
                ]
            ]
        ];

        return response()->json($response);
    });

    Route::patch('tasks/{id}', function (Request $request, $id) {
        $task = Task::find($id);

        if(!$task) {
            $response = [
                'status'=>0,
                'message'=>'Not found',
            ];

            return response()->json($response)->status(404);
        }

        $requestData = $request->all();
        $requestData = $requestData['data']['attributes'];

        $task->title = $requestData['title'];
        $task->done = $requestData['done'];
        $task->save();

        $response = [
            'status'=>1,
            'message'=>'',
            'data'=>[
                'id'=>$task->id,
                'type'=>'task',
                'attributes'=>[
                    'title'=>$task->title,
                    'done'=>$task->done,
                ]
            ]
        ];

        return response()->json($response);
    });

    Route::delete('/tasks/{id}', function (Request $request, $id) {
        $task = Task::find($id);

        if(!$task) {
            $response = [
                'status'=>0,
                'message'=>'Not found',
            ];

            return response()->json($response)->status(404);
        }

        $task->delete();

        $response = [
            'status'=>1,
            'message'=>'Delete successfully',
            'data'=>[
                'id'=>$task->id,
                'type'=>'task',
                'attributes'=>[]
            ]
        ];
        return response()->json($response);
    });
});
