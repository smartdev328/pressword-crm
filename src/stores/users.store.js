import { defineStore } from 'pinia';

import {fetchWrapper, BASE_API} from '@/helpers';


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
                this.users = await fetchWrapper.get(BASE_API);
            } catch (error) {
                this.users = { error };
            }
        },
    }
});
