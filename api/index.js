import { writeFile } from "node:fs/promises";
import { login } from "./login.js";
import { getDashboard } from "./argo.js";
import { normalizzaDashboard } from "./normalizzaDashboard.js";
import { insertData } from "./insertData.js";
import db from "./db.js";

async function main() {
    try {
        const { accessToken, authToken } = await login(credenziali.codScuola,credenziali.name,credenziali.password);
        const dashboard = await getDashboard(accessToken, authToken);
        const dashboardNormalizzato = normalizzaDashboard(dashboard);
        const contenutoJson = JSON.stringify(dashboard, null, 2);

        await insertData(dashboardNormalizzato);

       await writeFile("dashboard-normalizzato.txt", contenutoJson, "utf8");
    } finally {
        await db.end();
    }
}

main();
