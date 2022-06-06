<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @inertiaHead
    
    <link rel="icon" href="/images/favicon.png" type="image/png" />

    <!-- Font -->
    <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet" type="text/css">

    <!-- Push Js -->
    <script src="https://js.pusher.com/7.0/pusher.min.js" defer></script>

    {{ InvictaAdmin::scripts() }}

</head>
<body>
    <noscript>
      <strong>We're sorry but this page doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>

    <style>
        body:not(.app-ready) {
            height: 100vh;
            width: 100%;
            background-color: #f4f3ef;
            color: #333;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            margin: 0;
        }
        #app { display: none; }
        .app-ready .loading { display: none; }
        .app-ready #app { display: flex; }
    </style>

    <div class="loading">
        <span>Loading Admin...</span>
    </div>

    <div id="app" class="app" data-page="{{ json_encode($page) }}"></div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            window.Invicta = new InvictaApp(@json(InvictaAdmin::jsonVariables()))
            Invicta.initInertia()
            Invicta.start()
        })
    </script>
</body>
</html>