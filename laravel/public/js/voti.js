const valutazioni_salvate = document.querySelector(".valutazioni_salvate");
const lista = document.querySelector(".lista");

async function getData(){

    try {

        const response = await fetch("/api/voti");


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
    valutazioni_salvate.textContent = "Valutazioni salvate: " + data.length;
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

    let somma = 0;
    let i=0;
    for(i; i<voti.length; i++){
        somma += Number(voti[i].valore);
    }
    let media = somma/i;
    
    mediaHtml.textContent = "la media è: " + media;
}