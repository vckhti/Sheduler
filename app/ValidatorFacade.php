<?php

namespace App;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ValidatorFacade
{

    public static function validate(Request $request, array $rules, $messages = []): array
    {
        $validator = Validator::make($request->all(), $rules, $messages);

        if ( $validator->fails() ) {
            response()->json([
                'errors' => $validator->errors()->all(),
            ], 422)->send();

            exit();
        }

        return $request->all();
    }

}
