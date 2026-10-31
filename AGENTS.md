# didUPmanager — AGENTS.md

## Obiettivo
Web app che recupera i dati da Argo/didUP, li salva in MySQL e li visualizza tramite una dashboard Laravel.

## Architettura
- `api/` — Node.js: autenticazione Argo, API, recupero, normalizzazione e sincronizzazione dei dati.
- `laravel/` — Laravel: utenti, backend, database, dashboard e statistiche.
- MySQL è il database condiviso tra Node.js e Laravel.

## Struttura Node.js
- `login.js`: autenticazione e recupero token tramite Playwright.
- `argo.js`: comunicazione con le API Argo tramite fetch.
- `index.js`: coordinamento della sincronizzazione.

Mantenere separati autenticazione, recupero dati, normalizzazione e salvataggio.

## Supporto multiutente
Il progetto è attualmente personale, ma deve poter supportare più utenti senza riscritture importanti.

- Ogni utente Laravel deve poter collegare il proprio account Argo.
- Le credenziali devono essere associate all'utente e conservate in modo sicuro.
- Node.js deve poter sincronizzare uno specifico utente.
- I dati importati devono essere associati al proprietario corretto.
- Laravel deve impedire l'accesso ai dati di altri utenti.
- Non fidarsi di un `user_id` fornito liberamente dal browser.

## Sicurezza
- Non inserire segreti nel codice o nei log.
- Non committare `.env`.
- Cifrare le password Argo che devono essere recuperate per il login.
- Non passare password o token negli argomenti dei processi.
- Utilizzare query parametrizzate e verificare le autorizzazioni.

## Database
Prima di modificare tabelle o query, analizzare la struttura esistente. Preservare i dati, lo storico e le funzionalità già funzionanti. Evitare migrazioni distruttive.

## Regole di sviluppo
- Comprendere il codice esistente prima di modificarlo.
- Preferire soluzioni semplici, leggibili e modulari.
- Non riscrivere codice funzionante senza motivo.
- Non inventare endpoint, parametri o risposte delle API Argo.
- Non aggiungere dipendenze senza necessità.
- Verificare le modifiche prima di considerarle completate.

## Priorità
Introdurre gradualmente il supporto multiutente, mantenendo invariati il flusso di raccolta, normalizzazione e salvataggio dei dati. Successivamente automatizzare le sincronizzazioni tramite Laravel.

## Tecnologie
Node.js, JavaScript, Playwright, fetch, Laravel, PHP, MySQL, Blade e CSS. Evitare Vue, React e Tailwind salvo necessità reale.