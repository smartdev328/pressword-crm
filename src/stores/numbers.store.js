import {defineStore} from 'pinia';

import {useUsersStore} from "@/stores/users.store";
import {formatPhoneNumber} from "@/helpers/utils";
import {PINIA_PERSIST_OPTIONS} from "@/helpers";


export const useNumbersStore = defineStore({
    id: 'numbers',
    state: () => ({
        numbers: null|[], // this is an array of Receivers (User.receivers)
        activeNumber: null //Receiver object
    }),
    getters: {
        activeNumberLabel: (state) => state.activeNumber ? formatPhoneNumber(state.activeNumber.business_number.phone_number) : "PressWorld",
        currentUserReceiver() {
            const userStore = useUsersStore();
            return this.activeNumber.id;
        }
    },
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
        },
    },
    persist: PINIA_PERSIST_OPTIONS
});
