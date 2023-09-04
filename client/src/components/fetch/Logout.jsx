
export const logout = async () => {
    try {
        const response = await fetch('http://localhost:5000/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
        });

        if (response.ok) {
            window.location.href = 'http://localhost:5173/login';
        } else {
            // Handle logout failure if needed
            console.error('Logout failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};