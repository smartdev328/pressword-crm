import { defineStore } from 'pinia';
import * as Sentry from "@sentry/vue";

import { fetchWrapper, BASE_API, getUserDetailsByPhone, PINIA_PERSIST_OPTIONS, updateUserBalance } from "@/helpers";


export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {},
        currentUser: null
    }),
    actions: {
        async getAll() {
            this.users = { loading: true };
            try {
                this.users = await fetchWrapper.get(BASE_API);
            } catch (error) {
                this.users = { error };
                Sentry.captureMessage("Error in fetching users method, users actions");
                Sentry.captureException(error);
            }
        },
        async loadCurrentUser(mobile_number) {
            this.currentUser = await getUserDetailsByPhone(mobile_number)
            // this.currentUser contains all user properties. E.g. this.currentUser.first_name
        },
        async updateUserBalance() {
            console.log('updateUserBalance')
            try {
                const data = await updateUserBalance(this.currentUser.id)
                this.currentUser.balance = data.balance
            } catch (error) {
                console.log(error)
                Sentry.captureMessage("Error in updateUserBalance method, users actions");
                Sentry.captureException(error);
            }
        },
    },
    persist: PINIA_PERSIST_OPTIONS
});
