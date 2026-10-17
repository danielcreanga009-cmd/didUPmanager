const valutazioni_salvate = document.querySelector(".valutazioni_salvate");
const lista = document.querySelector(".lista");

async function getData(){

    try {
        const response = await fetch(`/api/voti?periodo=${encodeURIComponent(window.periodoSelezionato)}`);


        if(!response.ok){
            throw new Error("Errore richiesta");
        }


        const data = await response.json();

        voti_count(data);

        media(data);

        mediaMaterie(data);

        mediaMedie(data);

        for (const voto of data) {
            show_voti(voto);
        }

        console.log(data);


    } catch(error){

        console.log(error);

    }
}
getData();

function voti_count(data){
    const testo = data.length === 1 ? "valutazione salvata" : "valutazioni salvate";

    valutazioni_salvate.textContent = `${data.length} ${testo}`;
}
function show_voti(voto) {
    const elemento = document.createElement("li");
    const titolo = document.createElement("strong");
    const data = document.createElement("span");

    titolo.textContent = voto.materia.nome + ": " + voto.valore;
    data.textContent = voto.data;


    elemento.append(titolo, data);
    lista.append(elemento);
}

function media(voti){
    const mediaHtml = document.querySelector(".media");

    if (voti.length === 0) {
        mediaHtml.textContent = "Nessun voto disponibile.";
        return;
    }

    let somma = 0;
    for (let i = 0; i < voti.length; i++) {
        somma += Number(voti[i].valore);
    }
    const valoreMedia = somma / voti.length;
    
    mediaHtml.textContent = `Media generale: ${valoreMedia.toFixed(2)}`;
}

function mediaMaterie(voti) {
    const datiMaterie = {};
    const medieMaterieDati = [];

    for (const voto of voti) {
        const id = voto.materia_id;

        if (!datiMaterie[id]) {
            datiMaterie[id] = [0, 0];
        }

        datiMaterie[id][0] += Number(voto.valore);
        datiMaterie[id][1]++;
    }

    const ids = Object.keys(datiMaterie);

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        const media = datiMaterie[id][0] / datiMaterie[id][1];

        medieMaterieDati.push([Number(id), media]);
    }

    const paragrafi = document.querySelectorAll('.materia p');

    paragrafi.forEach(p => {
        const id = Number(p.dataset.id);

        for (let i = 0; i < medieMaterieDati.length; i++) {
            if (medieMaterieDati[i][0] === id) {
                p.textContent = `Media: ${medieMaterieDati[i][1].toFixed(2)}`;
                break;
            }
        }
    });

    console.log(medieMaterieDati);

    return medieMaterieDati;
}


function mediaMedie(voti){
    const mediaMedieHtml = document.querySelector(".mediaMedie");
    const medie = mediaMaterie(voti);
    let sum = 0;
    let i=0;

    if (voti.length === 0) {
        return;
    }

    for(i = 0; i<medie.length; i++){
        sum += Number(medie[i][1]);
    }

    let media = sum/i;

    mediaMedieHtml.textContent = `Media delle medie: ${media.toFixed(2)}`;

}
