const pulsanteApriMaterie = document.querySelector('.apri-materie');
const pulsanteChiudiMaterie = document.querySelector('.chiudi-materie');
const overlayMaterie = document.querySelector('.overlay-materie');

function apriMaterie() {
    overlayMaterie.hidden = false;
    pulsanteApriMaterie.setAttribute('aria-expanded', 'true');
    pulsanteChiudiMaterie.focus();
}

function chiudiMaterie() {
    overlayMaterie.hidden = true;
    pulsanteApriMaterie.setAttribute('aria-expanded', 'false');
    pulsanteApriMaterie.focus();
}

pulsanteApriMaterie.addEventListener('click', apriMaterie);
pulsanteChiudiMaterie.addEventListener('click', chiudiMaterie);

overlayMaterie.addEventListener('click', function (evento) {
    if (evento.target === overlayMaterie) {
        chiudiMaterie();
    }
});

document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && !overlayMaterie.hidden) {
        chiudiMaterie();
    }
});
