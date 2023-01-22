export const BASE_API = 'https://api.pressone.co';

export const AUTH_EXCLUDE_LIST = [
    '/api/login/',
    '/auth/token/'
]

export const PINIA_PERSIST_OPTIONS = {
    storage: sessionStorage
}