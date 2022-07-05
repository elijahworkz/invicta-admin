<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="icon" href="/images/favicon.png" type="image/png" />

    <!-- Font -->
    <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet" type="text/css">

    @inertiaHead

    <!-- Push Js -->
    <script src="https://js.pusher.com/7.0/pusher.min.js" defer></script>

    {{-- {{ InvictaAdmin::applicationScripts() }} --}}
    @invictaScripts

</head>
<body class="bg-gray-100 text-gray-700">
    <noscript>
      <strong>We're sorry but this page doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>

    <style>
        body:not(.app-ready) {
            display: flex;
            align-items: center;
            justify-content: center;
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
        })
    </script>

    @auth
        @foreach (InvictaAdmin::registeredScripts() as $folder => $scripts)
            @foreach ($scripts as $script)
                <script src="{{ InvictaAdmin::vendorAssetUrl("$folder/js/$script") }}"></script>
            @endforeach
        @endforeach
    @endauth

    <script defer>
        document.addEventListener('DOMContentLoaded', () => {
            Invicta.start()
        })
    </script>
</body>
</html>