<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="icon" href="{{ config('invicta.favicon') }}" type="image/png" />

    <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />

    <!-- Font -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,400i,500,500i,600,600i,700,700i&display=swap" rel="stylesheet" type="text/css">

</head>
<body>
    <style>
        body {
            background: #f3f7fa;
            color: #3c4b5f;
            overflow: hidden;
        }
        body:not(.app-ready) {
            padding: 0;
            margin: 0;
            height: 100vh;
            font-family: Nunito;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        #app { display: none; }
        .app-ready .loading { display: none; }
        .app-ready #app { display: flex; }
        .pulse {
            -webkit-animation: pulsate 2s ease-out;
            -webkit-animation-iteration-count: infinite;
            opacity: 0.5;
        }

        .app-empty {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            flex: 1;
        }
        .auth-form {
            /*margin-top: 100px;*/
            min-width: 300px;
        }

        .auth-header {
             text-align: center;
             font-size: 32px;
             line-height: 1.5;
             margin: 0 auto 20px;
         }

        .auth-card {
             margin-bottom: 15px;
         }

        .text-center {
            text-align: center;
        }

        .btn-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        a {
            color: inherit;
        }
        @-webkit-keyframes pulsate {
            0% { opacity: 0.5; }
            50% { opacity: 1.0; }
            100% { opacity: 0.5; }
        }
    </style>

    <main class="app-empty">
        @yield('content')
    </main>

</body>
</html>