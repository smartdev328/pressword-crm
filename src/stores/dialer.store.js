import {defineStore} from 'pinia';
import {getWebdialerHost} from "@/helpers/utils";
import {useNumbersStore} from "@/stores/numbers.store";
import {notify} from "@kyvg/vue3-notification";

export const useDialerStore = defineStore({
    id: 'dialer',
    state: () => ({
        iframeUrl: null,
        isDialerShowing: false,
        isLoading: true,
        iframeEl: null
    }),
    getters: {
        defaultIframeURL() {
            const numbersStore = useNumbersStore()
            let receiverId = numbersStore.currentUserReceiver.id
            if (receiverId) {
                receiverId = parseInt(receiverId).toString(16)
                return `${getWebdialerHost()}?s=${receiverId}`
            }
            return ""
        }
    },
    actions: {
        resetIFrameURL() {
            this.iframeUrl = this.defaultIframeURL
        },
        setIsDialerShowing(value) {
            this.isDialerShowing = value
        },
        beginCall(phoneNumber) {
            if (!this.isLoading) {
                this.setIsDialerShowing(true)
                this.iframeEl.contentWindow.postMessage(JSON.stringify({
                    event: "AUTO_START_CALL",
                    phone_number: phoneNumber
                }), "*")
            }
            else {
                notify({
                    title: "Wait..",
                    text: "Please try again in 5 seconds, the dialer is still initializing 😄."
                })
            }
        }
    },
});
