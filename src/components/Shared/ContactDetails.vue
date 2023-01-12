<template>
  <div class="card" id="contact-view-detail">
    <div class="card-body text-center">
      <div class="position-relative d-inline-block">
        <img src="@/assets/images/anonymous.png" alt="" class="avatar-lg rounded-circle img-thumbnail shadow">
        <span class="contact-active position-absolute rounded-circle bg-success">
                  <span class="visually-hidden"></span>
                </span>
      </div>
      <h5 class="mt-4 mb-1">Tonya Noble</h5>
      <p class="text-muted">Nesta Technologies</p>

      <ul class="list-inline mb-0">
        <li class="list-inline-item avatar-xs">
          <a href="javascript:void(0);" class="avatar-title bg-soft-success text-success fs-15 rounded">
            <i class="ri-phone-line"></i>
          </a>
        </li>
        <li class="list-inline-item avatar-xs">
          <a href="javascript:void(0);" class="avatar-title bg-soft-danger text-danger fs-15 rounded">
            <i class="ri-mail-line"></i>
          </a>
        </li>
        <li class="list-inline-item avatar-xs">
          <a href="javascript:void(0);" class="avatar-title bg-soft-warning text-warning fs-15 rounded">
            <i class="ri-question-answer-line"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="card-body">
      <h6 class="text-muted text-uppercase fw-semibold mb-3">Personal Information</h6>
      <p class="text-muted mb-4">Hello, I'm Tonya Noble, The most effective objective is one that is tailored to the job you are applying for. It states what kind of career you are seeking, and what skills and experiences.</p>
      <div class="table-responsive table-card">
        <table class="table table-borderless mb-0">
          <tbody>
          <tr>
            <td class="fw-medium" scope="row">Designation</td>
            <td>Lead Designer / Developer</td>
          </tr>
          <tr>
            <td class="fw-medium" scope="row">Email ID</td>
            <td>tonyanoble@velzon.com</td>
          </tr>
          <tr>
            <td class="fw-medium" scope="row">Phone No</td>
            <td>414-453-5725</td>
          </tr>
          <tr>
            <td class="fw-medium" scope="row">Lead Score</td>
            <td>154</td>
          </tr>
          <tr>
            <td class="fw-medium" scope="row">Tags</td>
            <td>
              <span class="badge badge-soft-primary">Lead</span>
              <span class="badge badge-soft-primary">Partner</span>
            </td>
          </tr>
          <tr>
            <td class="fw-medium" scope="row">Last Contacted</td>
            <td>15 Dec, 2021 <small class="text-muted">08:58AM</small></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactDetails"
}
</script>

<style scoped>

</style>