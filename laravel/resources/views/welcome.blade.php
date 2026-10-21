<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>didUPmanager</title>
    <link rel="stylesheet" href="{{ asset('css/welcome.css') }}">
</head>
<body>
    <main class="pagina-home">
        <section class="presentazione">
            <h1>didUPmanager</h1>
        </section>

        <nav class="sezioni-principali" aria-label="Sezioni principali">
            <a class="scheda-link" href="{{ route('voti') }}">
                <span class="icona-link" aria-hidden="true">↗</span>
                <strong>Voti</strong>
            </a>

            <a class="scheda-link" href="{{ url('/compiti') }}">
                <span class="icona-link" aria-hidden="true">↗</span>
                <strong>Compiti</strong>
            </a>
        </nav>
    </main>
</body>
</html>
