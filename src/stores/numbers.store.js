import { defineStore } from 'pinia';

import {fetchUserNumbers} from '@/helpers';


export const useNumbersStore = defineStore({
    id: 'numbers',
    state: () => ({
        numbers: null,
        activeNumber: null
    }),
    actions: {
        async getUserPhones() {
            // load all the phone numbers the user has
            const page = 1
            let hasNextPage = false
            while (this.numbers === null || hasNextPage) {
                const numbersResponse = await fetchUserNumbers(page);
                this.numbers = [...(this.numbers || []), ...numbersResponse.results]
                hasNextPage = !!numbersResponse.next
            }

            if (this.numbers?.length) {
                this.activeNumber = this.numbers[0]
            }
        },
    },
});
