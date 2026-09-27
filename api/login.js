import { chromium } from "playwright";
import "dotenv/config";

export async function login() {
    const browser = await chromium.launch({
        headless: true
    });

    const page = await browser.newPage();

    let accessToken;
    let authToken;

    const tokensReceived = new Promise((resolve, reject) => {
        page.on("response", async response => {
            const url = response.url();

            try {
                if (url.includes("/oauth2/token")) {
                    const result = await response.json();
                    accessToken = result.access_token;
                }

                if (url.includes("/famiglia/api/login")) {
                    const result = await response.json();
                    authToken = result.data[0].token;
                }

                // Quando entrambi i token sono presenti
                if (accessToken && authToken) {
                    resolve();
                }
            } catch (error) {
                reject(error);
            }
        });
    });

    await page.goto("https://argofamiglia.it/");

    await page.getByRole("link", { name: "ACCEDI" }).click();

    await page
        .getByRole("textbox", { name: " Codice Scuola" })
        .fill(process.env.ARGO_SCHOOL);

    await page
        .getByRole("textbox", { name: " Nome Utente" })
        .fill(process.env.ARGO_USERNAME);

    await page
        .getByRole("textbox", { name: " Password" })
        .fill(process.env.ARGO_PASSWORD);

    await page.getByRole("button", { name: "Entra" }).click();

    // Aspetta finché entrambi i token non sono stati ricevuti
    await tokensReceived;

    await browser.close();

    return {
        accessToken,
        authToken
    };
}