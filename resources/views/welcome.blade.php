<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Pinwheel</title>
        <link rel="icon" href="../images/logo.svg">
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:wght@400;600;700&display=swap&effect=shadow-multiple|emboss|fire|neon|outline|3d|3d-float|anaglyph" rel="stylesheet">

        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body class="flex h-screen w-screen overflow-hidden">
        <div id="app" class="flex h-screen w-screen overflow-hidden"></div>
        <script src="{{ asset('js/app.js')}}"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script>
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
        </script>
    </body>
</html>
