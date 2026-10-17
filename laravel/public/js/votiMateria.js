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

    titolo.textContent = voto.valore;
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
    
    mediaHtml.textContent = `Media: ${valoreMedia.toFixed(2)}`;
}
