import { defineStore } from 'pinia';

import {fetchUserNumbers} from '@/helpers';
import { useUsersStore } from "@/stores/users.store";


export const useNumbersStore = defineStore({
    id: 'numbers',
    state: () => ({
        numbers: null|[],
        activeNumber: null
    }),
    actions: {
        async getUserPhones() {
            const userStore = useUsersStore();
            this.numbers = userStore.currentUser.receivers;
            if (this.numbers?.length && !this.activeNumber) { //set active number to first number if not set
                this.activeNumber = this.numbers[0]
            }
        },
        setActiveNumber(number){
            this.activeNumber = number
        },
        // returns true if the user does NOT have an active number. It is expected to be called after getUserPhones()
        hasNoNumber(){
            return !this.activeNumber;
        }
    },
    persist: true
});
