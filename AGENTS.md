# didUPmanager

## Obiettivo

didUPmanager è una web app personale che recupera automaticamente i dati dal proprio account Argo/didUP e li organizza in una dashboard più completa.

Dati principali:

* voti e medie
* compiti
* assenze
* orario
* materie e periodi
* storico dei dati
* statistiche e grafici

L'obiettivo è automatizzare il recupero dei dati da Argo e conservarli nel tempo, così da poterli analizzare e visualizzare meglio.

## Struttura del progetto


didUPmanager/
├── api/                    # Node.js
│   ├── login.js            # Autenticazione Argo
│   ├── argo.js             # Comunicazione con le API Argo
│   ├── index.js            # Entry point e orchestrazione
│   ├── package.json
│   └── .env
     ecc...
│
└── laravel/              # Laravel
    ├── app/
    ├── resources/
    ├── routes/
    ├── database/
    └── ...


## Architettura


Argo
  ↓
Node.js
  ↓
MySQL
  ↓
Laravel
  ↓
Dashboard
```

### `api/`

Node.js si occupa di:

* autenticazione automatica ad Argo
* gestione dei token di autenticazione
* chiamate alle API Argo
* recupero dei dati
* normalizzazione dei dati
* sincronizzazione con MySQL

`login.js` deve occuparsi principalmente dell'autenticazione.

`argo.js` deve contenere le funzioni per comunicare con le API Argo, ad esempio il recupero di voti, compiti, assenze e altri dati.

`index.js` deve coordinare le varie operazioni senza contenere troppa logica.

### `laravel/`

Laravel si occupa di:

* accesso al database
* backend dell'applicazione
* visualizzazione dei dati
* Blade
* statistiche e grafici
* interazione con l'utente

Node.js e Laravel devono rimanere separati nelle loro responsabilità.

## Tecnologie

* Node.js
* JavaScript
* Fetch / HTTP
* JSON
* Playwright per l'autenticazione quando necessario
* Laravel
* PHP
* MySQL
* Blade
* JavaScript
* CSS

Evitare Vue, React e Tailwind salvo necessità reale.

## API Argo

Non inventare endpoint, parametri, header o strutture JSON.

Quando si lavora con Argo:

1. verificare il comportamento reale delle richieste;
2. analizzare request e response;
3. usare API/JSON quando disponibili;
4. evitare scraping HTML se esiste un'API adatta;
5. mantenere separata la logica di autenticazione dalle chiamate API.

L'autenticazione attuale utilizza Playwright per ottenere automaticamente i token necessari, dopodiché le richieste ai dati vengono effettuate direttamente tramite `fetch()`.

## Sicurezza

* Non inserire password, token, cookie o altri segreti nel codice.
* Utilizzare `.env` per le credenziali.
* `.env` non deve essere committato nel repository.
* Non stampare token o credenziali nei log.
* Non inserire dati sensibili nei file di documentazione.
* Il progetto utilizza un account Argo autorizzato dal proprietario.

## Stile di sviluppo

* Preferire codice semplice e leggibile.
* Evitare overengineering.
* Non aggiungere dipendenze senza necessità.
* Non modificare codice funzionante senza motivo.
* Prima comprendere il funzionamento, poi automatizzarlo.
* Preferire funzioni con una responsabilità chiara.
* Riutilizzare il codice invece di duplicarlo.
* Gestire gli errori delle richieste HTTP in modo esplicito.
* Mantenere Node.js e Laravel indipendenti.

## Stato del progetto

Il progetto viene sviluppato per fasi:

1. collegamento Node.js → Argo
2. autenticazione automatica
3. organizzazione del client Node.js
4. esplorazione delle API Argo
5. estrazione e normalizzazione dei dati
6. database MySQL
7. sincronizzazione automatica Node.js → MySQL
8. backend Laravel
9. dashboard
10. statistiche e funzionalità avanzate
11. automazione delle sincronizzazioni

Il progetto è inizialmente personale. Non progettare prematuramente un sistema multiutente: l'architettura dovrà però rimanere sufficientemente ordinata da poterlo aggiungere in futuro.
