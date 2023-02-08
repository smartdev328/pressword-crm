import { useAuthStore } from '@/stores';
import {AUTH_EXCLUDE_LIST} from "@/helpers/constants";

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
    patch: request('PATCH')
};

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method: method,
            headers: authHeader(url)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { token } = useAuthStore();
    const needsAuth = !AUTH_EXCLUDE_LIST.includes((new URL(url)).pathname)
    if (needsAuth) {
        // if it's not authenticated also (i.e. token is null), a 401 is fine
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

async function handleResponse(response) {
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    // check for error response
    if (!response.ok) {
        const { isAuthenticated, logout } = useAuthStore();
        if ([401, 403].includes(response.status) && isAuthenticated) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            logout();
        }

        // get error message from body or default to response status
        const error = data ? (data.message ? data.message : JSON.stringify(data)) : response.status;
        return Promise.reject(error);
    }

    return {
        data,
        headers: response.headers
    };
}
