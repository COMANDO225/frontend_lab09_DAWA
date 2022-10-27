const urlbase = "http://localhost:8000/api";

async function get(url) {
    try {
        const response = await fetch(`${urlbase}${url}`);
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function post(url, body) {
    try {
        const response = await fetch(`${urlbase}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
