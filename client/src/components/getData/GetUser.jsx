export const getUser = async () => {
    try {
        const response = await fetch("http://localhost:5000/auth/login/success", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
        });
        if (response.ok) {
            const resObject = await response.json();

            if (resObject) {
                return resObject;
            } else {
                throw new Error('Response object is missing expected properties');
            }
        } else {
            throw new Error('Unauthorized');
        }
    } catch (err) {
        console.error(err);
    }
};

