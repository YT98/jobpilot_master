async function protectedRequest(url: string, method: string, body: any = null, contentType: string = 'application/json') {
    // TODO: Handle the case where the token is not present
    // TODO: Handle errors

    if (method === 'GET') {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            }
        });
        return response;
    } else {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': contentType,
            },
            body: body,
        });
        return response;
    }
}

export default protectedRequest;