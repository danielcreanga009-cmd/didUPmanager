import { writeFile } from "node:fs/promises";
import { login } from "./login.js";
import { getDashboard } from "./argo.js";
import { normalizzaDashboard } from "./normalizzaDashboard.js";
import { insertData } from "./insertData.js";
import { createDB } from "./db.js";


export async function main(credenziali) {
    const db = await createDB();
    try {
        const { accessToken, authToken } = await login(credenziali.codScuola,credenziali.name,credenziali.password);
        if(!accessToken || !authToken){
            return { successo: false };
        }
        const dashboard = await getDashboard(accessToken, authToken);
        const dashboardNormalizzato = normalizzaDashboard(dashboard);
        const contenutoJson = JSON.stringify(dashboard, null, 2);

        await insertData(dashboardNormalizzato,db);

       await writeFile("dashboard-normalizzato.txt", contenutoJson, "utf8");

       const idUtente = dashboard.data.dati[0].pk;

       return {
            successo: true,
            idUtente
        };
    } finally {
        await db.end();
    }
}