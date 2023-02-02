<template>
  <div>
    <slot name="completeSetup"></slot>
    <!-- auth-page wrapper -->
    <div
      class="auth-page-wrapper auth-bg-cover py-5 justify-content-center align-items-center min-vh-100"
      :style="{
        display: props.isShowCompleteSteps ? 'none' : 'flex'
      }"
    >
      <div class="bg-overlay" :style="{backgroundImage: `url(${patternBg})`}"></div>
      <!-- auth-page content -->
      <div class="auth-page-content overflow-hidden pt-lg-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="card overflow-hidden">
                <div class="row g-0">
                  <div class="col-lg-6">
                    <slot name="image"></slot>
                  </div>
                  <!-- end col -->
                  <div class="col-lg-6">
                    <slot name="form"></slot>
                  </div>
                  <!-- end col -->
                </div>
                <!-- end row -->
              </div>
              <!-- end card -->
            </div>
            <!-- end col -->

          </div>
          <!-- end row -->
        </div>
        <!-- end container -->
      </div>
      <!-- end auth page content -->

      <!-- footer -->
      <slot name="footer"></slot>
      <!-- end Footer -->
    </div>
    <!-- end auth-page-wrapper -->
    
  </div>
</template>

<script setup>
import patternBg from "@/assets/images/cover-pattern.png"

const props = defineProps({
  isShowCompleteSteps: Boolean
})
</script>

<style scoped>

</style>