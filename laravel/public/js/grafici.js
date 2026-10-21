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
        creaGraficoAndamentoMedia(votiValidi);
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

function creaGraficoAndamentoMedia(voti) {
    const ctx = document.getElementById('andamentoVotiChart');

    if (!ctx) {
        return;
    }

    const votiOrdinati = [...voti].sort((primoVoto, secondoVoto) => {
        return new Date(primoVoto.data) - new Date(secondoVoto.data);
    });
    const medieMensili = {};

    votiOrdinati.forEach((voto) => {
        const mese = voto.data.slice(0, 7);

        if (!medieMensili[mese]) {
            medieMensili[mese] = {
                totale: 0,
                numeroVoti: 0
            };
        }

        medieMensili[mese].totale += Number(voto.valore);
        medieMensili[mese].numeroVoti += 1;
    });
    const mesi = Object.keys(medieMensili);
    const formatoMese = new Intl.DateTimeFormat('it-IT', {
        month: 'short',
        year: 'numeric'
    });
    const medie = mesi.map((mese) => {
        const datiMese = medieMensili[mese];

        return datiMese.totale / datiMese.numeroVoti;
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: mesi.map((mese) => formatoMese.format(new Date(`${mese}-01`))),
            datasets: [{
                label: 'Media mensile',
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
