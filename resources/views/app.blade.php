<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="icon" href="{{ config('invicta.favicon') }}" type="image/png" />

    <!-- Font -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,400i,500,500i,600,600i,700,700i&display=swap"
        rel="stylesheet" type="text/css">

    {{-- @vite(['resources/js/main.js']) --}}
    @invictaScripts

</head>

<body class="invicta">
    <noscript>
        <strong>We're sorry but this page doesn't work properly without JavaScript enabled. Please enable it to
            continue.</strong>
    </noscript>

    <style>
        body {
            background: #f5f5f5;
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

        #app {
            display: none;
        }

        .app-ready .loading {
            display: none;
        }

        .app-ready #app {
            display: flex;
        }

        .pulse {
            -webkit-animation: pulsate 2s ease-out;
            -webkit-animation-iteration-count: infinite;
            opacity: 0.5;
        }

        @-webkit-keyframes pulsate {
            0% {
                opacity: 0.5;
            }

            50% {
                opacity: 1.0;
            }

            100% {
                opacity: 0.5;
            }
        }
    </style>

    <div class="loading pulse">
        Loading Admin...
    </div>

    <div id="app" class="app"></div>

    <div id="drawer"></div>

    <div id="poppers"></div>

    @auth
        @invictaAssets
    @endauth

    <script type="module">
        Invicta.init(@json(InvictaAdmin::appVariables()))
        document.addEventListener('InvictaReady', () => {
            Invicta.start()
        })
    </script>
</body>

</html>
