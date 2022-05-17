<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name') }}</title>
    <link rel="icon" href="/images/favicon.png" type="image/png" />

    <!-- Font -->
    <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet" type="text/css">

    <!-- Push Js -->
    <script src="https://js.pusher.com/7.0/pusher.min.js" defer></script>

    {{ InvictaAdmin::assets() }}

    @inertiaHead
</head>
<body>
    <noscript>
      <strong>We're sorry but this page doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>

    <style>
    body:not(.app-ready) {
        height: 100vh;
        width: 100%;
        background-color: #34444a;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        margin: 0;
    }
    #app {
        display: none;
    }
    .app-ready .loader-wrap {
        display: none;
    }
    .app-ready #app { display: flex; }

    .loader-wrap {
        position: relative;
    }
    .loader-wrap svg {
        position: absolute;
        top: calc(50% - 12px);
        left: calc(50% - 12px);
    }
    .load-spinner,
    .load-spinner::after {
        border-radius: 50%;
        width: 5em;
        height: 5em;
    }
    .load-spinner {
        margin: 0px auto;
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        border-top: 0.3em solid rgba(255, 255, 255, 0.2);
        border-right: 0.3em solid rgba(255, 255, 255, 0.2);
        border-bottom: 0.3em solid rgba(255, 255, 255, 0.2);
        border-left: 0.3em solid #ffffff;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation: load8 1.1s infinite linear;
        animation: load8 1.1s infinite linear;
    }
    @-webkit-keyframes load8 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @keyframes load8 {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }

    </style>

    <div class="loader-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="logo-icon"><path stroke="#20a8d8" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
        <div class="load-spinner"></div>
    </div>

    <div id="app" class="app" data-page="{{ json_encode($page) }}"></div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            Invicta.start(@json(InvictaAdmin::jsonVariables()))
        })
    </script>
</body>
</html>