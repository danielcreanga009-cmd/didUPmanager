<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Voti</title>
    <link rel="stylesheet" href="{{ asset('css/voti.css') }}">
    <script src="{{ asset('js/periodo.js') }}" defer></script>
    <script src="{{ asset('js/voti.js') }}" defer></script>
</head>
<body>
    @include('partials.periodo')
    <main>
        <h1>Voti</h1>

        <p class="valutazioni_salvate">Caricamento valutazioni...</p>

        <ul class="lista"></ul>

        <p class="media"></p>
        <p class="mediaMedie"></p>

        <h2>Materie</h2>
        <ul class="materie">
            @foreach($materie as $materia)
            <li class="materia"><a href="/voti/{{$materia->id}}{{ request()->has('periodo') ? '?periodo='.request()->query('periodo') : '' }}">{{$materia->nome}}</a><p data-id="{{$materia->id}}"></p></li>
            @endforeach
        </ul>

    </main>
</body>
</html>
