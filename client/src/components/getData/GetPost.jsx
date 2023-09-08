export const getPosts = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/database/get/posts", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
        });

        if (!response.ok) {
            throw new Error(`Error`);
        }

        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error fetching data:", err);
        throw err;
    }
};