export function normalizzaDashboard(responseDashboard) {
    const dati = responseDashboard?.data?.dati?.[0];
    const oggi = new Date();

    oggi.setHours(0, 0, 0, 0);

    if (!dati) {
        throw new Error("La risposta dashboard non contiene data.dati[0]");
    }

    const lezioni = dati.registro.map((lezione) => ({
        id: lezione.pk,
        materiaId: lezione.pkMateria,
        data: lezione.datGiorno,
        docenteId: lezione.pkDocente,
        ora: lezione.ora,
        attivita: lezione.attivita
    }));

    const compiti = dati.registro.flatMap((lezione) =>
        lezione.compiti.flatMap((compito) => {
            const dataConsegna = new Date(`${compito.dataConsegna}T00:00:00`);

            if (dataConsegna < oggi) {
                return [];
            }

            return [{
                lezioneId: lezione.pk,
                materiaId: lezione.pkMateria,
                testo: compito.compito,
                dataConsegna: compito.dataConsegna
            }];
        })
    );

    return {
        materie: dati.listaMaterie.map((materia) => ({
            id: materia.pk,
            nome: materia.materia,
            faMedia: materia.faMedia
        })),
        lezioni,
        compiti,
        comunicazioni: dati.bacheca.map((comunicazione) => ({
            id: comunicazione.pk,
            categoria: comunicazione.categoria,
            messaggio: comunicazione.messaggio,
            data: comunicazione.data,
            dataScadenza: comunicazione.dataScadenza,
            presaVisione: comunicazione.isPresaVisione,
            allegati: comunicazione.listaAllegati.map((allegato) => ({
                id: allegato.pk,
                url: allegato.url,
                percorso: allegato.path,
                nomeFile: allegato.nomeFile
            }))
        })),
        periodi: dati.listaPeriodi.map((periodo) => ({
            id: periodo.pkPeriodo,
            codice: periodo.codPeriodo,
            descrizione: periodo.descrizione,
            dataInizio: periodo.datInizio,
            dataFine: periodo.datFine
        })),
        docenti: dati.listaDocentiClasse.map((docente) => ({
            id: docente.pk,
            nome: docente.docente,
            materie: docente.materie
        })),
        voti: dati.voti
            .filter((voto) => voto.codTipo === "V")
            .map((voto) => ({
                id: voto.pk,
                materiaId: voto.pkMateria,
                docenteId: voto.pkDocente,
                valore: voto.valore,
                data: voto.datGiorno,
                commento: voto.desCommento
            }))
    };
}
