import { defineStore } from 'pinia';

import {requestLoginOTP, verifyLoginToken} from '@/helpers';
import { router } from '@/router';
import { useAlertStore, useUsersStore } from "@/stores";
import { validateMobile } from "@/helpers/utils";
import { getActivePinia } from "pinia";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        mobile_number: null,
        token: null,
        returnUrl: null,
        loading:false,
        authError:null
    }),
    actions: {
        async getOTP(mobile_phone) {
            this.authError = "";
            this.loading = true; //it is set to false on SignInView.vue.
            if(mobile_phone.length < 10) throw new Error("Phone number must be atleast 10 digits")
            mobile_phone = validateMobile(mobile_phone);
            return requestLoginOTP(mobile_phone); // we intentionally did not catch error
        },
        async login(mobile_phone, otp, remember) {
            this.loading = true;
            this.authError = "";
            mobile_phone = validateMobile(mobile_phone);
            try {
                const {token} = await verifyLoginToken(mobile_phone, otp, remember);
                this.token = token;
                this.mobile_number = mobile_phone;
                const userStore = useUsersStore();
                await userStore.loadCurrentUser(this.mobile_number);
                this.loading = false;
                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
            } catch (error) {
                error = "There was a problem validating your token, please try again"
                this.loading = false;
                const alertStore = useAlertStore();
                alertStore.error(error);
                this.authError = error;
            }
        },
        isAuthenticated() {
            return !!this.token
        },
        logout() {
            this.token = null;
            this.mobile_number = null;
            //clear stores
            // map through that list and use the **$reset** fn to reset the state
            getActivePinia()._s.forEach(store => store.$reset());
            router.push('/sign-in');
        }
    },
    persist: true
});
