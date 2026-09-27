export async function getDashboard(accessToken, authToken) {
    const response = await fetch(
        "https://didattica.portaleargo.it/famiglia/api/dashboard/dashboard",
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "argo-client-version": "4.2.0",
                "Content-Type": "application/json",
                "x-auth-token": authToken,
                "x-cod-min": process.env.ARGO_SCHOOL,
                "os-type": "WEB"
            },
            body: JSON.stringify({
                dataultimoaggiornamento: "2026-09-01 00:00:00",
                opzioni: null
            })
        }
    );

    if (!response.ok) {
        throw new Error(`Impossibile recuperare la dashboard Argo: ${response.status}`);
    }

    return response.json();
}
