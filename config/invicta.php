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
    | Admin Favicon
    |--------------------------------------------------------------------------
    |
    | Change to set different favicons for different applications or environments.
    |
    */

    'favicon' => env('INVICTA_FAVICON', '/images/favicon.svg'),

    /*
    |--------------------------------------------------------------------------
    | Admin Panel Authentication Settings
    |--------------------------------------------------------------------------
    |
    | This option defines guard that is used to protect all Admin panel
    | routes and determines if Invicta's login page should be used and
    | if password resetting is enabled
    |
    */

    'auth' => [
        'guard' => env('INVICTA_GUARD', 'web'),
        'enable_login_form' => true,
        'enable_password_reset' => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | Default authorization tables
    |--------------------------------------------------------------------------
    |
    | By default if you run 'php artisan invicta:auth' it will install migrations
    | for 'groups', 'group_user' and 'group_permissions' tables. If it conflicts
    | with your existing tables you can change it here before you run
    | 'invicta:auth' command.
    |
    */

    'auth_tables' => [
        'groups' => 'groups',
        'group_user' => 'group_user',
        'permissions' => 'permissions',
    ],

    /*
    |--------------------------------------------------------------------------
    | Multi Site (Localization)
    |--------------------------------------------------------------------------
    |
    | Set array of languages that are supported by the Admin. This array should
    | always have a default language which will be served from root
    |
    */

    'languages' => [
        'default' => [
            'name' => 'English',
            'locale' => 'en_US',
            'iso' => 'en',
            'url' => '/',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Assets build directory
    |--------------------------------------------------------------------------
    |
    | This option defines the directory where all build assets can be found.
    | Vite by default builds all assets into 'build' folder. If you change
    | default build folder in vite.config.js - you need to change it here as well.
    |
    */

    'assets_build_directory' => 'build',

    /*
    |--------------------------------------------------------------------------
    | Development build tool
    |--------------------------------------------------------------------------
    |
    | This option determines how we should load external scripts.
    | Older versions of Laravel are using laravel-mix, while newer are using vite
    | Possible values are 'mix' or 'vite'.
    |
    */

    'assets_build_tool' => env('INVICTA_ASSETS_BUILD_TOOL', 'vite'),

];
