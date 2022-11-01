<?php

return [
    'users' => collect([
        [env('BASIC_AUTH_USERNAME'), env('BASIC_AUTH_PASSWORD')],
    ]),
];
