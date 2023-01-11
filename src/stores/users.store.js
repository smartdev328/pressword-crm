import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';

const baseUrl = `https://api.pressone.co`;

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {},
        user: {}
    }),
    actions: {
        async getAll() {
            this.users = { loading: true };
            try {
                this.users = await fetchWrapper.get(baseUrl);    
            } catch (error) {
                this.users = { error };
            }
        },
        async getByMobile(mobile, token) {
            this.user = { loading: true };
            try {
                this.user = await fetchWrapper.get(`${baseUrl}/api/users/by_mobile/?mobile=${mobile}`,null);
                //this.user contains all user properties. E.g. this.user.first_name
            } catch (error) {
                this.user = { error };
                console.log("error");console.log(error);
            }
        }
    }
});
