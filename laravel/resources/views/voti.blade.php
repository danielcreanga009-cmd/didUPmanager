<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Voti</title>
    <link rel="stylesheet" href="{{ asset('css/voti.css') }}">
    <script src="{{ asset('js/periodo.js') }}" defer></script>
    <script src="{{ asset('js/voti.js') }}" defer></script>
    <script src="{{ asset('js/votiStile.js') }}" defer></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js" defer></script>
    <script src="{{ asset('js/grafici.js') }}" defer></script>
</head>
<body>
    <main class="pagina-voti">
        <header class="intestazione-voti">
            <div class="titolo-pagina-voti">
                <p class="etichetta-sezione">Dashboard scolastica</p>
                <h1>Voti</h1>
            </div>

            <div class="area-accesso">
                <p class="accesso-effettuato">Accesso effettuato come: Daniel</p>

                <div class="selettore-periodo">
                    @include('partials.periodo')
                </div>
            </div>

            <button class="apri-materie" type="button" aria-expanded="false" aria-controls="overlay-materie">
                <span aria-hidden="true">☰</span>
                <span class="testo-accessibile">Apri elenco materie</span>
            </button>

        </header>

        <div class="contenuto-voti">
            <section class="area-principale" aria-labelledby="titolo-valutazioni">
                <section class="valutazioni">
                    <div class="titolo-sezione">
                        <div>
                            <h2 id="titolo-valutazioni">Ultime valutazioni</h2>
                            <p class="valutazioni_salvate">Caricamento valutazioni...</p>
                        </div>

                        <div class="controlli-carosello" aria-hidden="true">
                            <span>←</span>
                            <span>→</span>
                        </div>
                    </div>

                    <div class="riepilogo-e-voti">
                        <div class="riepilogo-media">
                            <h2>Media generale</h2>
                            <div class="cerchio-media">
                                <p class="media"></p>
                            </div>
                            <p class="mediaMedie"></p>
                        </div>

                        <div class="carosello-voti">
                            <ul class="lista"></ul>
                        </div>
                    </div>
                </section>

                <section class="statistiche" aria-label="Riepilogo delle valutazioni">
                    <div class="grafici">
                        <div class="grafico-card">
                            <h3>Media per materia</h3>
                            <div class="grafico-container">
                                <canvas id="medieMaterieChart" role="img" aria-label="Grafico delle medie per materia"></canvas>
                            </div>
                        </div>

                        <div class="grafico-card">
                            <h3>Andamento della media mensile</h3>
                            <div class="grafico-container">
                                <canvas id="andamentoVotiChart" role="img" aria-label="Grafico dell'andamento della media mensile"></canvas>
                            </div>
                        </div>

                        <div class="grafico-card grafico-distribuzione">
                            <h3>Distribuzione dei voti</h3>
                            <div class="grafico-container">
                                <canvas id="distribuzioneVotiChart" role="img" aria-label="Grafico della distribuzione dei voti"></canvas>
                            </div>

                            <table class="tabella-fasce">
                                <thead>
                                    <tr>
                                        <th>Giudizio</th>
                                        <th>Range voto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Insufficiente</td>
                                        <td>&lt; 6</td>
                                    </tr>
                                    <tr>
                                        <td>Sufficiente</td>
                                        <td>6  &lt; 7</td>
                                    </tr>
                                    <tr>
                                        <td>Buono</td>
                                        <td>7  &lt; 8</td>
                                    </tr>
                                    <tr>
                                        <td>Ottimo</td>
                                        <td>&ge; 8</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </section>

            <aside class="pannello-materie">
                <h2>Materie</h2>
                <ul class="materie">
                    @foreach($materie as $materia)
                    <li class="materia"><a href="/voti/{{$materia->id}}{{ request()->has('periodo') ? '?periodo='.request()->query('periodo') : '' }}">{{$materia->nome}}</a><p data-id="{{$materia->id}}"></p></li>
                    @endforeach
                </ul>
            </aside>
        </div>
    </main>

    <dialog class="dialogo-voto" id="dialogo-voto" aria-labelledby="dialogo-voto-materia">
        <button class="chiudi-dialogo-voto" type="button" aria-label="Chiudi dettagli voto">&times;</button>

        <div class="intestazione-dialogo-voto">
            <span class="dialogo-voto-valore"></span>

            <div>
                <p class="etichetta-sezione">Dettagli valutazione</p>
                <h2 id="dialogo-voto-materia"></h2>
                <p class="dialogo-voto-data"></p>
            </div>
        </div>

        <div class="commento-dialogo-voto">
            <h3>Commento</h3>
            <p class="dialogo-voto-commento"></p>
        </div>
    </dialog>

    <div class="overlay-materie" id="overlay-materie" hidden>
        <aside class="pannello-materie pannello-materie-overlay" aria-label="Elenco materie">
            <div class="intestazione-overlay">
                <h2>Materie</h2>
                <button class="chiudi-materie" type="button" aria-label="Chiudi elenco materie">×</button>
            </div>

            <ul class="materie">
                @foreach($materie as $materia)
                <li class="materia"><a href="/voti/{{$materia->id}}{{ request()->has('periodo') ? '?periodo='.request()->query('periodo') : '' }}">{{$materia->nome}}</a><p data-id="{{$materia->id}}"></p></li>
                @endforeach
            </ul>
        </aside>
    </div>
</body>
</html>
