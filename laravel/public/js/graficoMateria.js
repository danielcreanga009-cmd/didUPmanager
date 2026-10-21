function creaGraficoMateria(voti) {
    const ctx = document.getElementById('votiMateriaChart');

    if (!ctx) {
        return;
    }

    const votiOrdinati = [...voti].sort((primoVoto, secondoVoto) => {
        return new Date(primoVoto.data) - new Date(secondoVoto.data);
    });
    const formatoData = new Intl.DateTimeFormat('it-IT', {
        day: '2-digit',
        month: 'short'
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: votiOrdinati.map((voto) => formatoData.format(new Date(voto.data))),
            datasets: [{
                label: 'Voti',
                data: votiOrdinati.map((voto) => Number(voto.valore)),
                borderColor: '#2563eb',
                backgroundColor: 'rgb(37 99 235 / 15%)',
                fill: true,
                tension: 0.3,
                pointRadius: 4
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
