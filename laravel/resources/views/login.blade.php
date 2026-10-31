
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accedi | didUPmanager</title>
    <link rel="stylesheet" href="{{ asset('css/authForm.css') }}">
</head>
<body>

    <main class="pagina-login">
    <form class="form-login" action="{{ route('checkAccount') }}" method="post">
        @csrf
        <div class="intestazione-login">
            <p class="eyebrow">didUPmanager</p>
            <h1>Accedi</h1>
            <p>Inserisci le credenziali del tuo account Argo.</p>
        </div>

        <div class="campo-form">
            <label for="name">Nome</label>
            <input type="text" id="name" name="name" value="{{ old('name') }}" required autocomplete="username">
        </div>
        
        <div class="campo-form">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required autocomplete="current-password">
        </div>

        <div class="campo-form">
            <label for="codScuola">Codice scuola</label>
            <input type="text" id="codScuola" name="codScuola" value="{{ old('codScuola') }}" required>
        </div>

        <button type="submit">Accedi</button>

        @if (session('error'))
            <div class="messaggio-errore" role="alert">
                {{ session('error') }}
            </div>
        @endif

    </form>
    </main>

</body>
</html>
