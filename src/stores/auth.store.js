import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { router } from '@/router';
import { useAlertStore } from '@/stores';

const baseUrl = `https://api.pressone.co/api`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        validateMobile(mobile_phone){
            //check phone number to make sure it starts with +234
            if(mobile_phone.substring(0,1) !== "+"){
                if(mobile_phone.substring(0,3) === "234") //if input is "234803444555", then just add a +
                    mobile_phone = "+"+mobile_phone;
                else //else add a +234
                    mobile_phone = "+234"+mobile_phone;
            }
            return mobile_phone;
        },
        async getOTP(mobile_phone) {
            mobile_phone = this.validateMobile(mobile_phone);
            return fetchWrapper.post(`${baseUrl}/login/`, { 'mobile':mobile_phone }); // we intentionally did not catch error
        },
        async login(username, password) {
            try {
                const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });    

                // update pinia state
                this.user = user;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));

                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/sign-in');
        }
    }
});
