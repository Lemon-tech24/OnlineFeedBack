export const AddPost = async (data) => {
    try {
        const response = await fetch('http://localhost:5000/api/database/add/post', {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData
        } else {
            throw new Error('Failed to add post.');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}