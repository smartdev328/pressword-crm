import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { BASE_API } from "@/helpers/constants";
import {useNumbersStore} from "@/stores";

const getActiveBusinessId = () => {
    const numberStore = useNumbersStore()
    if (!numberStore.activeNumber) {
        return ''
    }
    return numberStore.activeNumber.business_number.id
}

const parseData = async response => {
    return response instanceof Promise ? (await response)?.data : response.data
}

export const verifyLoginToken = async (mobile_phone, otp, remember = true) => {
    return fetchWrapper.post(`${BASE_API}/auth/token/`, {'mobile': mobile_phone, 'token': otp, 'remember': remember})
}

export const requestLoginOTP = async (mobile_phone) => {
    return parseData(fetchWrapper.post(`${BASE_API}/api/login/`, {'mobile': mobile_phone}))
}

export const getUserDetailsByPhone = async (mobile_phone) => {
    return parseData(fetchWrapper.get(`${BASE_API}/api/users/by_mobile/?mobile=${mobile_phone}`, null))
}

export const fetchUserCalls = async (link) => {
    if(link){
        return parseData(fetchWrapper.get(link, null))
    }else{
        return parseData(fetchWrapper.get(`${BASE_API}/api/v2/crm_calls/?business_id=${getActiveBusinessId()}`, null))
    }
}

export const fetchUserContacts = async (page = 1) => {
    return parseData(fetchWrapper.get(`${BASE_API}/api/contacts/?page=${page}&business_id=${getActiveBusinessId()}`, null))
}

export const addNewContact = async (payload) => {
    return parseData(fetchWrapper.post(`${BASE_API}/api/contacts/`, payload))
}

export const updateContact = async (id, payload) => {
    return parseData(fetchWrapper.patch(`${BASE_API}/api/contacts/${id}/?business_id=${getActiveBusinessId()}`, payload))
}

export const deleteContact = async (id) => {
    return parseData(fetchWrapper.delete(`${BASE_API}/api/contacts/${id}/?business_id=${getActiveBusinessId()}`))
}

export const addNewContacts = async (payload) => {
    return parseData(fetchWrapper.post(`${BASE_API}/api/contacts/upload_contacts/`, payload))
}

export const fetchCallNotes = async () => {
    return parseData(fetchWrapper.get(`${BASE_API}/api/call_notes/?business_id=${getActiveBusinessId()}`))
}

export const fetchUserNumbers = async (page = 1) => {
    return parseData(fetchWrapper.get(`${BASE_API}/api/numbers/?page=${page}`))
}

export const fetchTeamMembers = async () => {
    return parseData(fetchWrapper.get(`${BASE_API}/api/receiver_numbers/`))
}

export const addNewTeamMember = async (payload) => {
    return parseData(fetchWrapper.post(`${BASE_API}/api/receiver_numbers/`, payload))
}

export const updateTeamMember = async (id, payload) => {
    return parseData(fetchWrapper.patch(`${BASE_API}/api/receiver_numbers/${id}/`, payload))
}

export const deleteTeamMember = async (id) => {
    return parseData(fetchWrapper.delete(`${BASE_API}/api/receiver_numbers/${id}/`))
}

export const updateTeamMemberAsPrimary = async (id) => {
    return parseData(fetchWrapper.post(`${BASE_API}/api/set_primary_receiver/${id}/`, null))
}

export const updateUserProfile = async (id, payload) => {
    return parseData(fetchWrapper.patch(`${BASE_API}/api/users/${id}/`, payload))
}

export const updateUserBalance = async (id) => {
    return parseData(fetchWrapper.get(`${BASE_API}/api/users/${id}/balance/`))
}

export const isCardExsist = async (id) => {
    return parseData(fetchWrapper.get(`${BASE_API}/api/users/${id}/cards/`))
}
export const cargeCardAuth = async (payload) => {
    return parseData(fetchWrapper.post(`${BASE_API}/api/top_up/charge_card_authorization/`, payload))
}
export const cargeNewCard = async (payload) => {
    return parseData(fetchWrapper.post(`${BASE_API}/api/top_up/charge/`, { ...payload, "payment_mode": 'CARD' }))
}
export const verifyTopUpPayment = async (ref) => {
    return parseData(fetchWrapper.get(`${BASE_API}/api/purchase/status/${ref}/`))
}