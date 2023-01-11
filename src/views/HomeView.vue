<template>
  <div class="page-content">
    <div class="container-fluid">
      <!-- start page title -->
      <div class="row">
        <div class="col-12">
          <div
            class="page-title-box d-sm-flex align-items-center justify-content-between"
          >
            <h5 class="mb-sm-0">Home</h5>
            <!--
            <div class="page-title-right">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item">
                <a href="javascript: void(0);">Dashboards</a>
              </li>
              <li class="breadcrumb-item active">CRM</li>
            </ol>
          </div>
          -->
          </div>
        </div>
      </div>
      <!-- end page title -->

      <div class="row">
        <div class="col-xl-12">
          <div class="card crm-widget">
            <div class="card-body p-0">
              <div class="row row-cols-xxl-3 row-cols-md-3 row-cols-1 g-0">
                <div class="col">
                  <div class="py-4 px-3">
                    <h5 class="text-muted text-uppercase fs-13">
                      Available Balance
                      <i
                        class="ri-arrow-up-circle-line text-success fs-18 float-end align-middle"
                      ></i>
                    </h5>
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0">
                        <i
                          class="ri-exchange-dollar-line display-6 text-muted"
                        ></i>
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h2 class="mb-0">
                          ₦
                          <span class="counter-value" data-target="540.30"
                            >540.30</span
                          >
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end col -->
                <div class="col">
                  <div class="mt-3 mt-md-0 py-4 px-3">
                    <h5 class="text-muted text-uppercase fs-13">
                       Total Calls (last 7 days)
                      <i
                        class="ri-arrow-up-circle-line text-success fs-18 float-end align-middle"
                      ></i>
                    </h5>
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0">
                        <i
                          class="ri-contacts-book-line display-6 text-muted"
                        ></i>
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h2 class="mb-0">
                          <span class="counter-value" data-target="132">
                            132
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end col -->
                <div class="col">
                  <div class="mt-3 mt-md-0 py-4 px-3">
                    <h5 class="text-muted text-uppercase fs-13">
                      Avg Calls Per User (last 7 days)
                      <i
                        class="ri-arrow-down-circle-line text-danger fs-18 float-end align-middle"
                      ></i>
                    </h5>
                    <div class="d-flex align-items-center">
                      <div class="flex-shrink-0">
                        <i class="ri-team-line display-6 text-muted"></i>
                      </div>
                      <div class="flex-grow-1 ms-3">
                        <h2 class="mb-0">
                          <span class="counter-value" data-target="9">9</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end col -->
              </div>
              <!-- end row -->
            </div>
            <!-- end card body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->

      <div class="row">
        <div class="col-xl-7">
          <div class="card">
            <div class="card-header align-items-center d-flex">
              <h4 class="card-title mb-0 flex-grow-1">Recent Calls</h4>
            </div>
            <!-- end card header -->

            <div class="card-body">
              <div class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead class="table-light">
                    <tr>
                      <th scope="col" style="width: 5px"> </th> <!--Direction of call-->
                      <th scope="col">Phone</th>
                      <th scope="col">Duration</th>
                      <th scope="col">Agent</th>
                      <th scope="col">Time</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="width: 5px">
                        <i class="mdi mdi-call-received"></i>
                      </td>
                      <td>
                        <a href="tel:+2348183948394" class="fw-semibold">
                          +2348183948394
                        </a>
                      </td>
                      <td>
                        3:24
                      </td>
                      <td>
                        <div class="d-flex gap-2 align-items-center">
                          <div class="flex-shrink-0">
                            <img
                              src="@/assets/images/users/avatar-3.jpg"
                              alt=""
                              class="avatar-xs rounded-circle"
                            />
                          </div>
                          <div class="flex-grow-1">Jordan Kennedy</div>
                        </div>
                      </td>
                      <td>10 Oct, 14:47</td>
                      <td>
                        <ul class="list-inline hstack gap-2 mb-0">
                          <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Call">
                            <a href="javascript:void(0);" class="text-muted d-inline-block">
                              <i class="ri-phone-line fs-16"></i>
                            </a>
                          </li>
                          <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                            <a class="edit-item-btn" href="#showModal" data-bs-toggle="modal"><i class="ri-pencil-fill align-bottom text-muted"></i></a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 5px">
                        <i class="mdi mdi-call-made"></i>
                      </td>
                      <td>
                        <a href="tel:+2348183948394" class="fw-semibold">
                          +2348183948394
                        </a>
                      </td>
                      <td>
                        3:24
                      </td>
                      <td>
                        <div class="d-flex gap-2 align-items-center">
                          <div class="flex-shrink-0">
                            <img
                              src="@/assets/images/users/avatar-3.jpg"
                              alt=""
                              class="avatar-xs rounded-circle"
                            />
                          </div>
                          <div class="flex-grow-1">Jordan Kennedy</div>
                        </div>
                      </td>
                      <td>10 Oct, 14:47</td>
                      <td>
                        <ul class="list-inline hstack gap-2 mb-0">
                          <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Call">
                            <a href="javascript:void(0);" class="text-muted d-inline-block">
                              <i class="ri-phone-line fs-16"></i>
                            </a>
                          </li>
                          <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                            <a class="edit-item-btn" href="#showModal" data-bs-toggle="modal"><i class="ri-pencil-fill align-bottom text-muted"></i></a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td style="width: 5px">
                        <i class="mdi mdi-call-received"></i>
                      </td>
                      <td>
                        <a href="tel:+2348183948394" class="fw-semibold">
                          +2348183948394
                        </a>
                      </td>
                      <td>
                        3:24
                      </td>
                      <td>
                        <div class="d-flex gap-2 align-items-center">
                          <div class="flex-shrink-0">
                            <img
                              src="@/assets/images/users/avatar-3.jpg"
                              alt=""
                              class="avatar-xs rounded-circle"
                            />
                          </div>
                          <div class="flex-grow-1">Jordan Kennedy</div>
                        </div>
                      </td>
                      <td>10 Oct, 14:47</td>
                      <td>
                        <ul class="list-inline hstack gap-2 mb-0">
                          <li class="list-inline-item edit" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Call">
                            <a href="javascript:void(0);" class="text-muted d-inline-block">
                              <i class="ri-phone-line fs-16"></i>
                            </a>
                          </li>
                          <li class="list-inline-item" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="top" title="Edit">
                            <a class="edit-item-btn" href="#showModal" data-bs-toggle="modal"><i class="ri-pencil-fill align-bottom text-muted"></i></a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- end table -->
              </div>
              <!-- end table responsive -->
            </div>
            <!-- end card body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->

        <div class="col-xxl-5">
          <div class="card">
            <div class="card-header align-items-center d-flex">
              <h4 class="card-title mb-0 flex-grow-1">Recent Notes</h4>
            </div>
            <!-- end card header -->
            <div class="card-body pt-0">
              <ul class="list-group list-group-flush border-dashed">
                <li class="list-group-item ps-0">
                  <div class="row align-items-center g-3">
                    <div class="col-auto">
                      <div
                        class="avatar-sm p-1 py-2 h-auto bg-light rounded-3 shadow"
                      >
                        <div class="text-center">
                          <h5 class="mb-0">25</h5>
                          <div class="text-muted">Tue</div>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <h5 class="text-muted mt-0 mb-1 fs-13">11:30am - Call with 0803419983215</h5>
                      <a href="#" class="text-reset fs-14 mb-0"
                        >Customer yet to receive their order</a
                      >
                    </div>
                    <div class="col-sm-auto"></div>
                  </div>
                  <!-- end row -->
                </li>
                <!-- end -->
                <li class="list-group-item ps-0">
                  <div class="row align-items-center g-3">
                    <div class="col-auto">
                      <div
                        class="avatar-sm p-1 py-2 h-auto bg-light rounded-3 shadow"
                      >
                        <div class="text-center">
                          <h5 class="mb-0">01</h5>
                          <div class="text-muted">Fri</div>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <h5 class="text-muted mt-0 mb-1 fs-13">3:33pm - Call with 0802711689094</h5>
                      <a href="#" class="text-reset fs-14 mb-0"
                        >Meeting for campaign with sales team</a
                      >
                    </div>
                    <div class="col-sm-auto"></div>
                  </div>
                  <!-- end row -->
                </li>
                <!-- end -->
                <li class="list-group-item ps-0">
                  <div class="row align-items-center g-3">
                    <div class="col-auto">
                      <div
                        class="avatar-sm p-1 py-2 h-auto bg-light rounded-3 shadow"
                      >
                        <div class="text-center">
                          <h5 class="mb-0">25</h5>
                          <div class="text-muted">Tue</div>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <h5 class="text-muted mt-0 mb-1 fs-13">1:48pm - Call with 0802711689094</h5>
                      <a href="#" class="text-reset fs-14 mb-0"
                        >Please send a refund immediately</a
                      >
                    </div>
                    <div class="col-sm-auto"></div>
                  </div>
                  <!-- end row -->
                </li>
                <!-- end -->
              </ul>
              <!-- end -->
            </div>
            <!-- end card body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->

        <div class="col-xl-5">
          <div class="card card-height-100">
            <div class="card-header align-items-center d-flex">
              <h4 class="card-title mb-0 flex-grow-1">Quick Contact Add</h4>
            </div>
            <!-- end card header -->

            <div class="card-body p-4">
              <form action="javascript:void(0);">
                <div class="row">
                  <div class="col-6">
                    <div class="mb-3">
                      <label htmlFor="firstNameinput" class="form-label"
                        >First Name</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter your firstname"
                        id="firstNameinput"
                      />
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-6">
                    <div class="mb-3">
                      <label htmlFor="lastNameinput" class="form-label"
                        >Last Name</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter your lastname"
                        id="lastNameinput"
                      />
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-12">
                    <div class="mb-3">
                      <label htmlFor="compnayNameinput" class="form-label"
                        >Company Name</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter company name"
                        id="compnayNameinput"
                      />
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-6">
                    <div class="mb-3">
                      <label htmlFor="phonenumberInput" class="form-label"
                        >Phone Number</label
                      >
                      <input
                        type="tel"
                        class="form-control"
                        placeholder="+(245) 451 45123"
                        id="phonenumberInput"
                      />
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-6">
                    <div class="mb-3">
                      <label htmlFor="emailidInput" class="form-label"
                        >Email Address</label
                      >
                      <input
                        type="email"
                        class="form-control"
                        placeholder="example@gamil.com"
                        id="emailidInput"
                      />
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-12">
                    <div class="mb-3">
                      <label
                        htmlFor="address1ControlTextarea"
                        class="form-label"
                        >Address</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Address 1"
                        id="address1ControlTextarea"
                      />
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-6">
                    <div class="mb-3">
                      <label htmlFor="citynameInput" class="form-label"
                        >City</label
                      >
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Enter your city"
                        id="citynameInput"
                      />
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-6">
                    <div class="mb-3">
                      <label htmlFor="ForminputState" class="form-label"
                        >State</label
                      >
                      <select id="ForminputState" class="form-select">
                        <option selected>Choose...</option>
                        <option>...</option>
                      </select>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-lg-12">
                    <div class="text-end">
                      <button type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </div>
                  <!--end col-->
                </div>
                <!--end row-->
              </form>
            </div>
            <!-- end card body -->
          </div>
          <!-- end card -->
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
    <!-- container-fluid -->
  </div>
  <!-- End Page-content -->
</template>

<script>
export default {
  name: "HomeView",
  mounted() {
    //app.js
    const appJs = document.createElement("script");
    appJs.setAttribute("src", "src/assets/js/app.js");
    document.head.appendChild(appJs);
  },
};
</script>

<style scoped></style>
