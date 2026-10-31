import { writeFile } from "node:fs/promises";
import { login } from "./login.js";
import { getDashboard } from "./argo.js";
import { normalizzaDashboard } from "./normalizzaDashboard.js";
import { insertData } from "./insertData.js";
import db from "./db.js";


export async function main(credenziali) {
    try {
        const { accessToken, authToken } = await login(credenziali.codScuola,credenziali.name,credenziali.password);
        if(!accessToken || !authToken){
            return { successo: false };
        }
        const dashboard = await getDashboard(accessToken, authToken);
        const dashboardNormalizzato = normalizzaDashboard(dashboard);
        const contenutoJson = JSON.stringify(dashboard, null, 2);

        await insertData(dashboardNormalizzato);

       await writeFile("dashboard-normalizzato.txt", contenutoJson, "utf8");
       return { successo: true };
    } finally {
        await db.end();
    }
}