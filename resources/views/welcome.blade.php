<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Pinwheel</title>
        <meta data-n-head="ssr" data-hid="og:image" property="og:image" content="https://daisyui.com/card.png">
        <meta data-n-head="ssr" data-hid="og:title" property="og:title" content="Tailwind CSS Components">
        <meta data-n-head="ssr" data-hid="og:url" property="og:url" content="https://daisyui.com">
        <meta data-n-head="ssr" data-hid="og:description" property="og:description" content="Tailwind CSS Components plugin — daisyUI tailwind component library">
        <link rel="icon" href="../images/logo.svg">
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:wght@400;600;700&display=swap&effect=shadow-multiple|emboss|fire|neon|outline|3d|3d-float|anaglyph" rel="stylesheet">

        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js" integrity="sha512-N4kV7GkNv7QR7RX9YF/olywyIgIwNvfEe2nZtfyj73HdjCUkAfOBDbcuJ/cTaN04JKRnw1YG1wnUyNKMsNgg3g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/addons/p5.sound.min.js" integrity="sha512-WzkwpdWEMAY/W8WvP9KS2/VI6zkgejR4/KTxTl4qHx0utqeyVE0JY+S1DlMuxDChC7x0oXtk/ESji6a0lP/Tdg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->
    </head>
    <body class="flex h-screen w-screen overflow-hidden">
        <div id="app" class="flex h-screen w-screen overflow-hidden"></div>
        <script src="{{ asset('js/app.js')}}"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <!-- <script>
            $('a[data-set-theme]').click(function(){
                var storageKey = 'theme';
                if(localStorage.getItem(storageKey)===null)
                {
                    localStorage.setItem(storageKey, 'light');
                }
                else
                {
                    localStorage.setItem(storageKey, $(this).data('set-theme'));
                }
            })
        </script> -->
    </body>
</html>
