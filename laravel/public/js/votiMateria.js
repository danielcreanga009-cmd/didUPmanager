const valutazioni_salvate = document.querySelector(".valutazioni_salvate");
const lista = document.querySelector(".lista");
const materia = document.querySelector('.dataMateria').dataset.id;;

async function getData(){

    try {

        const response = await fetch(`/api/voti/${materia}?periodo=${encodeURIComponent(window.periodoSelezionato)}`);


        if(!response.ok){
            throw new Error("Errore richiesta");
        }


        const data = await response.json();

        voti_count(data);
        media(data);
        creaGraficoMateria(data);

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
    const valore = document.createElement("span");
    const dettagli = document.createElement("div");
    const data = document.createElement("span");
    const votoNumerico = Number(voto.valore);

    valore.className = "voto-valore";
    dettagli.className = "voto-dettagli";

    if (votoNumerico >= 6) {
        valore.classList.add("voto-sufficiente");
    } else if (votoNumerico >= 5) {
        valore.classList.add("voto-quasi-sufficiente");
    } else {
        valore.classList.add("voto-insufficiente");
    }

    valore.textContent = voto.valore;
    data.textContent = voto.data;

    dettagli.append(data);
    elemento.append(valore, dettagli);
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
    
    mediaHtml.textContent = `Media: ${valoreMedia.toFixed(2)}`;
}
