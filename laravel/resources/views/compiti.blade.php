<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Compiti</title>
    <link rel="stylesheet" href="{{ asset('css/compiti.css') }}">
</head>
<body>
    <main>
        <h1>Compiti</h1>
        <p>Compiti salvati: {{ $compiti->count() }}</p>

        <ul class="lista">
            @forelse ($compiti as $compito)
                <li>
                    <strong>{{ $compito->materia->nome }}</strong>
                    <span>Consegna: {{ \Carbon\Carbon::parse($compito->data_consegna)->format('d/m/Y') }}</span>
                    <p>{{ $compito->testo }}</p>
                </li>
            @empty
                <li>Non ci sono ancora compiti salvati.</li>
            @endforelse
        </ul>
    </main>
</body>
</html>
