const request = async (method, url, data, options = {}) => {
    try {
        if (method !== 'GET') {
            options.method = method;
        }

        const authData = JSON.parse(localStorage.getItem('auth'));

        if (authData.accessToken) {
            options = {
                ...options,
                headers: {
                    'X-Authorization' : authData.accessToken,
                    ...options.headers,
                    'Content-Type': 'application/json',
                },
            }; 
        }

        if (data) {
            options = {
                ...options,
                headers: {
                    ...options.headers,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            };
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP Error: ${response.status} ${response.statusText} - ${errorMessage}`);
        }

        const responseContentType = response.headers.get('Content-Type');
        if (!responseContentType) {
            return;
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error(`Request failed: ${method} ${url}`, error);
        throw error;
    }
};


export default {
    get: request.bind(null, 'GET'),
    post: request.bind(null, 'POST'),
    put: request.bind(null, 'PUT'),
    delete: request.bind(null, 'DELETE'),
    baseRequest: request,
}
