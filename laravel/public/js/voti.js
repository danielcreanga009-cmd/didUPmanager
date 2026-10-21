const valutazioni_salvate = document.querySelector(".valutazioni_salvate");
const lista = document.querySelector(".lista");
const dialogoVoto = document.querySelector("#dialogo-voto");
const chiudiDialogoVoto = document.querySelector(".chiudi-dialogo-voto");

chiudiDialogoVoto?.addEventListener("click", () => {
    dialogoVoto.close();
});

dialogoVoto?.addEventListener("click", (event) => {
    if (event.target === dialogoVoto) {
        dialogoVoto.close();
    }
});

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
    const pulsante = document.createElement("button");
    const valore = document.createElement("span");
    const dettagli = document.createElement("div");
    const titolo = document.createElement("strong");
    const data = document.createElement("span");

    pulsante.className = "voto-apri-dialogo";
    pulsante.type = "button";
    pulsante.setAttribute("aria-haspopup", "dialog");
    valore.className = "voto-valore";
    dettagli.className = "voto-dettagli";

    const votoNumerico = Number(voto.valore);
    valore.classList.add(getClasseColoreVoto(votoNumerico));

    valore.textContent = voto.valore;
    titolo.textContent = voto.materia.nome;
    data.textContent = voto.data;

    dettagli.append(titolo, data);
    pulsante.append(valore, dettagli);
    pulsante.addEventListener("click", () => apriDialogoVoto(voto));
    elemento.append(pulsante);

    lista.append(elemento);
}

function getClasseColoreVoto(voto) {
    if (voto >= 6) {
        return "voto-sufficiente";
    }

    if (voto >= 5) {
        return "voto-quasi-sufficiente";
    }

    return "voto-insufficiente";
}

function apriDialogoVoto(voto) {
    const valore = dialogoVoto.querySelector(".dialogo-voto-valore");
    const materia = dialogoVoto.querySelector("#dialogo-voto-materia");
    const data = dialogoVoto.querySelector(".dialogo-voto-data");
    const commento = dialogoVoto.querySelector(".dialogo-voto-commento");

    valore.className = "dialogo-voto-valore";
    valore.classList.add(getClasseColoreVoto(Number(voto.valore)));
    valore.textContent = voto.valore;
    materia.textContent = voto.materia?.nome ?? "Materia non disponibile";
    data.textContent = voto.data;
    commento.textContent = voto.commento || "Nessun commento disponibile.";

    dialogoVoto.showModal();
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
    
    mediaHtml.textContent = valoreMedia.toFixed(2);
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
