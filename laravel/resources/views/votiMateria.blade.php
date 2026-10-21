<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{$materia->nome}} - Voti</title>
    <link rel="stylesheet" href="{{ asset('css/voti.css') }}">
    <script src="{{ asset('js/periodo.js') }}" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
    <script src="{{ asset('js/graficoMateria.js') }}" defer></script>
    <script src="{{ asset('js/votiMateria.js') }}" defer></script>

</head>
<body>
    <main class="pagina-voti pagina-materia">


        <input class="dataMateria" type="hidden" data-id="{{$materia->id}}">

        <header class="intestazione-materia">
            <a class="torna-ai-voti" href="{{ route('voti') }}{{ request()->has('periodo') ? '?periodo='.request()->query('periodo') : '' }}">← Tutti i voti</a>

            <div>
                <p class="etichetta-sezione">Materia</p>
                <h1>{{$materia->nome}}</h1>
            </div>

            <div class="selettore-periodo">
                @include('partials.periodo')
            </div>
        </header>

        <section class="grafici grafici-materia" aria-label="Grafico della materia">
            <div class="grafico-card">
                <h2>Andamento dei voti</h2>
                <div class="grafico-container">
                    <canvas id="votiMateriaChart" role="img" aria-label="Grafico dei voti della materia nel tempo"></canvas>
                </div>
            </div>
        </section>

        <section class="scheda-materia" aria-labelledby="titolo-valutazioni-materia">
            <div class="titolo-sezione">
                <div>
                    <h2 id="titolo-valutazioni-materia">Valutazioni</h2>
                    <p class="valutazioni_salvate">Caricamento valutazioni...</p>
                </div>

                <p class="media"></p>
            </div>

            <ul class="lista"></ul>
        </section>

        
    </main>
</body>
</html>
