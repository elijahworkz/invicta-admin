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
        'enable_two_factor' => true,
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
    | Set array of locales that are supported by the Admin. This array should
    | always have a default locale which will be served from root
    |
    */

    'locales' => [
        'en' => [
            'name' => 'English',
            'locale' => 'en_US',
            'iso' => 'en',
            'url' => '/',
            'flag' => 'uk',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application. Just store away!
    |
    */

    'disk' => env('FILESYSTEM_DRIVER', 'public'),

    /*
    |--------------------------------------------------------------------------
    | Default Path for uploaded assest
    |--------------------------------------------------------------------------
    |
    | Set relative path to the folder where all uploaded assets are going
    | to be saved to.
    |
    */

    'assets_path' => env('INVICTA_ASSETS_PATH', '/'),

    /*
    |--------------------------------------------------------------------------
    | Enable mutli upload of assets
    |--------------------------------------------------------------------------
    |
    | Sets if Assets uploader can upload multiple files.\
    |
    */

    'assets_multi_upload' => env('INVICTA_ASSETS_MULTI_UPLOAD', true),

    /*
    |--------------------------------------------------------------------------
    | List of allowed document extentions
    |--------------------------------------------------------------------------
    |
    | What type of documents should be allowed to be uploaded besides images
    | and audio files
    |
    */

    'assets_documents' => ['.pdf', '.txt'],

    /*
    |--------------------------------------------------------------------------
    | Enable conversion to webp for image assets
    |--------------------------------------------------------------------------
    |
    | If enabled - it will save all uploaded image assets with webp extension.
    | It needs a working lambda function to actually convert the images. In
    | order to setup the function (if not already installed) - you need to run
    | `php artisan invicta:imagetowebp` command which will install the function
    | in your aws account. Function will need some variables which you need to
    | provide here or in the .env file
    |
    */

    'image_to_webp' => false,

    /*
    |--------------------------------------------------------------------------
    | Enable caching for blueprints
    |--------------------------------------------------------------------------
    |
    | This setting will determine if parsed blueprints will be cached. Set to
    | 'true' only for staging or production environments where blueprints are
    | not going to change often.
    |
    */

    'cache_blueprints' => env('INVICTA_CACHE_BLUEPRINTS', false),

    /*
    |--------------------------------------------------------------------------
    | Enable caching for navigation menues
    |--------------------------------------------------------------------------
    |
    | This setting will determine if navigation menues will be cached. Set to
    | 'false' only for local testing.
    |
    */

    'cache_navigation' => env('INVICTA_CACHE_NAVIGATION', false),

    /*
    |--------------------------------------------------------------------------
    | Enable SEO
    |--------------------------------------------------------------------------
    |
    | This option determines is resource include seo section
    |
     */
    'seo' => false,

    /* DEVELOPMENT SETTINGS */

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
