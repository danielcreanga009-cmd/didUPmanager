let graficoAndamento;

async function getDatiGrafico() {
    try {
        const parametri = new URLSearchParams(window.location.search);
        const response = await fetch(`/api/voti?${parametri.toString()}`);

        if (!response.ok) {
            throw new Error('Errore nella richiesta dei voti');
        }

        const voti = await response.json();
        const mediePerMateria = {};
        const votiValidi = [];

        voti.forEach((voto) => {
            const nomeMateria = voto.materia?.nome;
            const valore = Number(voto.valore);

            if (!nomeMateria || Number.isNaN(valore)) {
                return;
            }

            if (!mediePerMateria[nomeMateria]) {
                mediePerMateria[nomeMateria] = {
                    totale: 0,
                    numeroVoti: 0
                };
            }

            mediePerMateria[nomeMateria].totale += valore;
            mediePerMateria[nomeMateria].numeroVoti += 1;
            votiValidi.push(voto);
        });

        const labels = Object.keys(mediePerMateria);
        const dati = labels.map((nomeMateria) => {
            const materia = mediePerMateria[nomeMateria];

            return materia.totale / materia.numeroVoti;
        });

        creaGraficoMedie(labels, dati);
        inizializzaSelettoreAndamento(votiValidi);
        creaGraficoDistribuzione(votiValidi);
    } catch (error) {
        console.error(error);
    }
}

function creaGraficoMedie(labels, dati) {
    const ctx = document.getElementById('medieMaterieChart');

    if (!ctx) {
        return;
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Media voti',
                data: dati,
                backgroundColor: '#6366f1',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 10,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function inizializzaSelettoreAndamento(voti) {
    const selettore = document.querySelector('#tipo-andamento');

    if (!selettore) {
        return;
    }

    creaGraficoAndamentoMedia(voti, selettore.value);

    selettore.addEventListener('change', () => {
        creaGraficoAndamentoMedia(voti, selettore.value);
    });
}

function creaGraficoAndamentoMedia(voti, tipoAndamento) {
    const ctx = document.getElementById('andamentoVotiChart');

    if (!ctx) {
        return;
    }

    const votiOrdinati = [...voti].sort((primoVoto, secondoVoto) => {
        return new Date(primoVoto.data) - new Date(secondoVoto.data);
    });
    const mediePerPeriodo = {};

    votiOrdinati.forEach((voto) => {
        const periodo = ottieniPeriodo(voto.data, tipoAndamento);

        if (!mediePerPeriodo[periodo]) {
            mediePerPeriodo[periodo] = {
                totale: 0,
                numeroVoti: 0
            };
        }

        mediePerPeriodo[periodo].totale += Number(voto.valore);
        mediePerPeriodo[periodo].numeroVoti += 1;
    });
    const periodi = Object.keys(mediePerPeriodo);
    const medie = periodi.map((periodo) => {
        const datiPeriodo = mediePerPeriodo[periodo];

        return datiPeriodo.totale / datiPeriodo.numeroVoti;
    });

    graficoAndamento?.destroy();

    graficoAndamento = new Chart(ctx, {
        type: 'line',
        data: {
            labels: periodi.map((periodo) => formattaPeriodo(periodo, tipoAndamento)),
            datasets: [{
                label: `Media ${selettoreTipoAndamento[tipoAndamento]}`,
                data: medie,
                borderColor: '#2563eb',
                backgroundColor: 'rgb(37 99 235 / 15%)',
                fill: true,
                tension: 0.3,
                pointRadius: 3
            }]
        },
        options: opzioniScalaVoti(2)
    });
}

const selettoreTipoAndamento = {
    settimanale: 'settimanale',
    bisettimanale: 'ogni due settimane',
    mensile: 'mensile'
};

function ottieniPeriodo(data, tipoAndamento) {
    if (tipoAndamento === 'settimanale') {
        return ottieniInizioSettimana(data);
    }

    if (tipoAndamento === 'mensile') {
        return data.slice(0, 7);
    }

    return ottieniInizioPeriodoBisettimanale(data);
}

function ottieniInizioSettimana(data) {
    const dataVoto = new Date(`${data}T00:00:00`);
    const giorniDaLunedi = (dataVoto.getDay() + 6) % 7;

    dataVoto.setDate(dataVoto.getDate() - giorniDaLunedi);

    return formattaDataIso(dataVoto);
}

function ottieniInizioPeriodoBisettimanale(data) {
    const dataVoto = new Date(`${data}T00:00:00`);
    const riferimento = new Date(2026, 8, 1);
    const giorniDalRiferimento = Math.floor((dataVoto - riferimento) / 86400000);
    const giorniNelPeriodo = Math.floor(giorniDalRiferimento / 14) * 14;
    const inizioPeriodo = new Date(riferimento);

    inizioPeriodo.setDate(riferimento.getDate() + giorniNelPeriodo);

    return formattaDataIso(inizioPeriodo);
}

function formattaPeriodo(inizioPeriodo, tipoAndamento) {
    if (tipoAndamento === 'mensile') {
        const formatoMese = new Intl.DateTimeFormat('it-IT', {
            month: 'long',
            year: 'numeric'
        });

        return formatoMese.format(new Date(`${inizioPeriodo}-01T00:00:00`));
    }

    const inizio = new Date(`${inizioPeriodo}T00:00:00`);
    const fine = new Date(inizio);
    const formatoData = new Intl.DateTimeFormat('it-IT', {
        day: 'numeric',
        month: 'short'
    });

    fine.setDate(fine.getDate() + (tipoAndamento === 'settimanale' ? 6 : 13));

    return `${formatoData.format(inizio)} - ${formatoData.format(fine)}`;
}

function formattaDataIso(data) {
    const anno = data.getFullYear();
    const mese = String(data.getMonth() + 1).padStart(2, '0');
    const giorno = String(data.getDate()).padStart(2, '0');

    return `${anno}-${mese}-${giorno}`;
}

function creaGraficoDistribuzione(voti) {
    const ctx = document.getElementById('distribuzioneVotiChart');

    if (!ctx) {
        return;
    }

    const fasce = [0, 0, 0, 0];

    voti.forEach((voto) => {
        const valore = Number(voto.valore);

        if (valore < 6) {
            fasce[0] += 1;
        } else if (valore < 7) {
            fasce[1] += 1;
        } else if (valore < 8) {
            fasce[2] += 1;
        } else {
            fasce[3] += 1;
        }
    });

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Insufficiente', 'Sufficiente', 'Buono', 'Ottimo'],
            datasets: [{
                data: fasce,
                backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#22c55e'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function opzioniScalaVoti(valoreMinimo = 0) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                    beginAtZero: valoreMinimo === 0,
                    min: valoreMinimo,
                max: 10,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };
}

getDatiGrafico();
