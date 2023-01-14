import { defineStore } from 'pinia';

import {getUserDetailsByPhone, requestLoginOTP, verifyLoginToken} from '@/helpers';
import { router } from '@/router';
import { useAlertStore } from '@/stores';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        mobile_number: null,
        token: null,
        returnUrl: null,
        currentUser: null,

        showEditProfile: false
    }),
    actions: {
        validateMobile(mobile_phone){
            //check phone number to make sure it starts with +234
            if(mobile_phone.substring(0,1) !== "+"){
                if(mobile_phone.substring(0,3) === "234") //if input is "234803444555", then just add a +
                    mobile_phone = "+"+mobile_phone;
                else if(mobile_phone.substring(0,1) === "0") //else add a +234
                    mobile_phone = "+234"+mobile_phone.substring(1,);
                else
                    mobile_phone = "+234"+mobile_phone;
            }
            return mobile_phone;
        },
        async getOTP(mobile_phone) {
            mobile_phone = this.validateMobile(mobile_phone);
            return requestLoginOTP(mobile_phone); // we intentionally did not catch error
        },
        async login(mobile_phone, otp) {
            mobile_phone = this.validateMobile(mobile_phone);
            try {
                const {token} = await verifyLoginToken(mobile_phone, otp);
                this.token = token;
                this.mobile_number = mobile_phone;
                await this.loadCurrentUser()
                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async loadCurrentUser() {
            this.currentUser = await getUserDetailsByPhone(this.mobile_number)
            // this.currentUser contains all user properties. E.g. this.currentUser.first_name
        },
        isAuthenticated() {
            return !!this.token
        },
        logout() {
            this.token = null;
            this.mobile_number = null;
            router.push('/sign-in');
        }
    },
    persist: true
});
