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
}
