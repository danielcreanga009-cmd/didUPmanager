<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compiti</title>
    <link rel="stylesheet" href="{{ asset('css/compiti.css') }}">
</head>
<body>
    <main class="pagina-compiti">
        <header class="intestazione-compiti">
            <div>
                <p class="etichetta-sezione">Organizzazione</p>
                <h1>Compiti</h1>
            </div>

            <p class="conteggio-compiti">{{ $compiti->count() }} compiti salvati</p>
        </header>

        <ul class="lista">
            @forelse ($compiti as $compito)
                <li class="compito">
                    <strong>{{ $compito->materia->nome }}</strong>
                    <span>Consegna: {{ \Carbon\Carbon::parse($compito->data_consegna)->format('d/m/Y') }}</span>
                    <p>{{ $compito->testo }}</p>
                </li>
            @empty
                <li class="lista-vuota">Non ci sono ancora compiti salvati.</li>
            @endforelse
        </ul>
    </main>
</body>
</html>
