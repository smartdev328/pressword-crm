<template>
  <div class="active-call-container" v-show="dialerStore.isDialerShowing">
    <div class="active-call-iframe-container">
      <Loading v-show="dialerStore.isLoading"/>
      <iframe ref="active-call" v-show="!dialerStore.isLoading" :src="dialerStore.iframeUrl" frameborder="0"
              allow="microphone"></iframe>
    </div>
  </div>
</template>

<script>
import {useDialerStore} from "@/stores/dialer.store";
import Loading from "@/components/Shared/Loading.vue";

export default {
  name: "ActiveCall",
  components: {
    Loading
  },
  setup() {
    const dialerStore = useDialerStore()
    return {
      dialerStore
    }
  },
  data() {
    return {
      IFRAME_MSG: {
        INIT_COMPLETE: "INIT_COMPLETE",
        CALL_TERMINATED: "CALL_TERMINATED",
        CALL_INCOMING: "CALL_INCOMING",
        CALL_FAILED: "CALL_FAILED",
        CALL_CANCELED: "CALL_CANCELED",
        CALL_REJECTED: "CALL_REJECTED"
      }
    }
  },
  mounted() {
    this.dialerStore.resetIFrameURL()
    this.dialerStore.iframeEl = this.$refs["active-call"]

    window.addEventListener("message", message => {
      if (message.source === this.$refs["active-call"].contentWindow) {
        switch (message.data) {
          case this.IFRAME_MSG.CALL_TERMINATED:
          case this.IFRAME_MSG.CALL_CANCELED:
          case this.IFRAME_MSG.CALL_FAILED:
          case this.IFRAME_MSG.CALL_REJECTED:
            this.dialerStore.setIsDialerShowing(false)
            break
          case this.IFRAME_MSG.CALL_INCOMING:
            this.dialerStore.setIsDialerShowing(true)
            break
          case this.IFRAME_MSG.INIT_COMPLETE:
            this.dialerStore.isLoading = false
            break
          default:
            this.dialerStore.setIsDialerShowing(false)
        }
      }
    }, true)
  }
}
</script>

<style scoped>
iframe {
  width: inherit;
  height: inherit;
}

@media screen and (min-width: 1024px) {
  .active-call-container {
    width: calc(100% - 250px) !important;
  }
}

.active-call-iframe-container {
  height: 450px;
  width: 350px;
  background: white;
}

.active-call-container {
  position: fixed;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.65);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>