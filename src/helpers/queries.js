import {fetchWrapper} from "@/helpers/fetch-wrapper";
import {BASE_API} from "@/helpers/constants";

export const verifyLoginToken = async (mobile_phone, otp) => {
    return fetchWrapper.post(`${BASE_API}/auth/token/`, { 'mobile':mobile_phone ,'token': otp })
}

export const requestLoginOTP = async (mobile_phone) => {
    return fetchWrapper.post(`${BASE_API}/api/login/`, { 'mobile':mobile_phone })
}

export const getUserDetailsByPhone = async (mobile_phone) => {
    return fetchWrapper.get(`${BASE_API}/api/users/by_mobile/?mobile=${mobile_phone}`,null)
}

export const fetchUserCalls = async () => {
    return fetchWrapper.get(`${BASE_API}/api/crm_calls/`, null)
}

export const fetchUserContacts = async () => {
    return fetchWrapper.get(`${BASE_API}/api/contacts/`, null)
}

export const addNewContact = async (payload) => {
    return fetchWrapper.post(`${BASE_API}/api/contacts/`, payload)
}

export const updateContact = async (id, payload) => {
    return fetchWrapper.patch(`${BASE_API}/api/contacts/${id}/`, payload)
}

export const deleteContact = async (id) => {
    return fetchWrapper.delete(`${BASE_API}/api/contacts/${id}/`)
}

export const fetchCallNotes = async () => {
    return fetchWrapper.get(`${BASE_API}/api/call_notes/`)
}
