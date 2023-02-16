import {defineStore} from 'pinia';
import {getWebdialerHost} from "@/helpers/utils";
import {useNumbersStore} from "@/stores/numbers.store";
import {notify} from "@kyvg/vue3-notification";
import {useAuthStore} from "@/stores/auth.store";
import {validateMobile} from "@/helpers/utils";

export const useDialerStore = defineStore({
    id: 'dialer',
    state: () => ({
        iframeUrl: null,
        isDialerShowing: false,
        hasInit: false,
        isLoading: true,
        iframeEl: null
    }),
    getters: {
        defaultIframeURL() {
            const numbersStore = useNumbersStore()
            let receiverId = numbersStore.currentUserReceiver
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
        initComplete() {
            this.isLoading = false
            this.hasInit = true
        },
        initDialer() {
            if (!this.hasInit) {
                const authStore = useAuthStore()
                this.isLoading = true
                this.iframeEl.contentWindow.postMessage(JSON.stringify({
                    event: "INIT_DIALER",
                    access_token: authStore.token
                }), "*")
            }
        },
        beginCall(phoneNumber) {
            if (this.hasInit) {
                this.setIsDialerShowing(true)
                this.iframeEl.contentWindow.postMessage(JSON.stringify({
                    event: "START_CALL",
                    phone_number: validateMobile(phoneNumber)
                }), "*")
            } else {
                this.initDialer()
                notify({
                    title: "Wait..",
                    text: "Please try again in 5 seconds, the dialer is still initializing 😄."
                })
            }
        }
    },
});
