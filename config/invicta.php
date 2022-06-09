<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Admin panel name
    |--------------------------------------------------------------------------
    |
    | This value is name used for your admin panel. If not set - your main
    | application is going to be used. This will show in your admin panel login
    | page and in main branding
    |
    */

    'name' => env('INVICTA_NAME', env('APP_NAME')),

    /*
    |--------------------------------------------------------------------------
    | Admin Panel
    |--------------------------------------------------------------------------
    |
    | Whether or not we should enable admin section. Useful when you want to
    | hide Admin Panel access in different environments
    |
    */

    'enabled' => env('INVICTA_ENABLED', true),

    /*
    |--------------------------------------------------------------------------
    | Admin Panel path
    |--------------------------------------------------------------------------
    |
    | This is the URI path where Admin panel is going to be served from.
    |
    */

    'path' => '/admin',

    /*
    |--------------------------------------------------------------------------
    | Admin Panel Authentication Guard
    |--------------------------------------------------------------------------
    |
    | This option defines guard that is used to protect all Admin panel
    | routes. ??? TBD... how about adding routes??
    |
    */

    'guard' => env('INVICTA_GUARD', null),

    /*
    |--------------------------------------------------------------------------
    | Development server url
    |--------------------------------------------------------------------------
    |
    | This option defines server url that is used for development.
    | For local development it's default vite server, for gitpod - it will be set by gitpod.yaml script
    |
    */

    'dev_server_url' => env('VITE_DEV_SERVER_URL', 'http://localhost:3000'),

];
