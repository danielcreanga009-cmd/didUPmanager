<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Voti</title>
    <link rel="stylesheet" href="{{ asset('css/voti.css') }}">
    <script src="{{ asset('js/periodo.js') }}" defer></script>
    <script src="{{ asset('js/votiMateria.js') }}" defer></script>
</head>
<body>
    <a class="torna-ai-voti" href="{{ route('voti') }}{{ request()->has('periodo') ? '?periodo='.request()->query('periodo') : '' }}" aria-label="Torna ai voti">←</a>
    @include('partials.periodo')
    <input class="dataMateria" type="hidden" data-id="{{$materia->id}}">
    <main>
        <h1>{{$materia->nome}}</h1>

        <p class="valutazioni_salvate">Caricamento valutazioni...</p>

        <p class="media"></p>
        
        <ul class="lista"></ul>
        
        
    </main>
</body>
</html>
