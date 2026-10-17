const inizioSecondoPeriodo = new Date(2027, 1, 1);
const periodoPredefinito = new Date() < inizioSecondoPeriodo ? 'primo' : 'secondo';
const parametriUrl = new URLSearchParams(window.location.search);

window.periodoSelezionato = parametriUrl.get('periodo') || periodoPredefinito;

const selectPeriodo = document.getElementById('periodo');
selectPeriodo.value = window.periodoSelezionato;

selectPeriodo.addEventListener('change', function () {
    const url = new URL(window.location.href);

    url.searchParams.set('periodo', this.value); /*.set('periodo', ...) aggiunge il parametro se non esiste, oppure ne aggiorna il valore se esiste già.
                                                this.value rappresenta il valore selezionato nel menu*/
    window.location.href = url;
});
