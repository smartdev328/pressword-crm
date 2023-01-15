import { defineStore } from 'pinia';

import {requestLoginOTP, verifyLoginToken} from '@/helpers';
import { router } from '@/router';
import { useAlertStore, useUsersStore } from "@/stores";
import { validateMobile } from "@/helpers/utils";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        mobile_number: null,
        token: null,
        returnUrl: null,
    }),
    actions: {
        async getOTP(mobile_phone) {
            mobile_phone = validateMobile(mobile_phone);
            return requestLoginOTP(mobile_phone); // we intentionally did not catch error
        },
        async login(mobile_phone, otp) {
            mobile_phone = validateMobile(mobile_phone);
            try {
                const {token} = await verifyLoginToken(mobile_phone, otp);
                this.token = token;
                this.mobile_number = mobile_phone;
                const userStore = useUsersStore();
                await userStore.loadCurrentUser(this.mobile_number);
                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
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
