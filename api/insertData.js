import db from "./db.js";
import { createHash } from "node:crypto";

function creaIdentificatoreCompito(compito) {
    const valore = [
        compito.lezioneId,
        compito.dataConsegna,
        compito.testo
    ].join("|");

    return createHash("sha256").update(valore).digest("hex");
}

export async function insertData(dati) {

    for (const compito of dati.compiti) {
        const identificatore = creaIdentificatoreCompito(compito);

        const [materia] = await db.execute(
            `SELECT id FROM materie WHERE argo_id = ?`,
            [compito.materiaId]
        );

        await db.execute(
            `INSERT INTO compiti
            (lezione_argo_id, materia_id, testo, data_consegna, identificatore)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                materia_id = VALUES(materia_id),
                testo = VALUES(testo),
                data_consegna = VALUES(data_consegna)`,
            [
                compito.lezioneId,
                materia[0].id,
                compito.testo,
                compito.dataConsegna,
                identificatore
            ]
        );
    }

    for (const voto of dati.voti) {
        const [materia] = await db.execute(
            `SELECT id FROM materie WHERE argo_id = ?`,
            [voto.materiaId]
        );

        await db.execute(
            `INSERT INTO voti
            (materia_id, data, voto_argo_id, commento, descrizione, valore)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            materia_id = VALUES(materia_id),
            data = VALUES(data),
            commento = VALUES(commento),
            descrizione = VALUES(descrizione),
            valore = VALUES(valore)`,
            
            [
                materia[0].id,
                voto.data,
                voto.id,
                voto.commento,
                voto.descrizione ?? null,
                voto.valore
            ]
        );

    }
}
