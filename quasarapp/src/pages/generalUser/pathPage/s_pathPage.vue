<template>
  <q-page>
    <div class="q-pa-md doc-container">
      <div
        class="gt-xs q-pa-lg items-center text-black bg-grey-3"
        style="height:auto;"
      >
        <div class="row">
          <div class="col"></div>

          <div class="col-12 col-md-auto">
            <p style="font-size: 28px;font-family: Microsoft JhengHei;">
              {{ choose }}路徑推薦分析
            </p>
          </div>

          <div class="col q-mt-sm q-ml-sm">
            <!-- <siPathInfo></siPathInfo> -->
          </div>
        </div>

        <div class="row">
          <div class="col"></div>

          <div class="col-12 col-md-auto">
            <div>
              <b
                class="text"
                style="font-size: 20px;font-family: Microsoft JhengHei;"
                >不採雷的路線推薦，給拿不定下一站的您!</b
              >
              <br />
            </div>
          </div>
          <div class="col"></div>
        </div>

        <!-- proscons-select 區域 -->
        <div class="row">
          <div class="col"></div>
          <div class="col-12 col-md-auto">
            <path-select></path-select>
          </div>
          <div class="col"></div>
        </div>

        <!-- end proscons select -->
      </div>
    </div>

    <!--  -->

    <!-- </div> -->
    <!-- end proscons select -->

    <!-- 左右區域 web -->
    <div v-show="isShow">
      <div class="q-pa-md">
        <div class="row">
          <div class="col-6" style="margin:0px auto;">
            <path-data>
              <template slot="finishTip">
                <div class="text-h6 text-bold" style="font-family:NSimSun">
                  完成
                </div>
              </template>
            </path-data>
          </div>
        </div>
        <div class="row"></div>
        <!-- 懶人包區域 -->
        <div class="col-6" style="width:50%;margin:0px auto">
          <path-r>
            <template slot="photoExplain">
              <pathPhotoInfo></pathPhotoInfo>
            </template>
          </path-r>
        </div>
      </div>
    </div>

    <!-- 介紹頁面 -->
    <div v-show="!isShow" class="row" style="font-family: Microsoft JhengHei;">
      <div
        class="col q-ma-md text-center text-h4 text-white"
        style="padding:150px; background-size: cover;background-position: center;background-repeat: no-repeat;background-image: url('https://images.unsplash.com/photo-1557683311-eac922347aa1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1315&q=80');"
      >
        <p>
          請先選擇
          <b>城市</b>

          <br />選擇 <b>景點作為你的起始點</b>，按開始以進行分析
        </p>
      </div>
    </div>

    <!-- end -->
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "vueFrame",
  components: {
    pathSelect: () => import("components/path/path_select.vue"),
    pathR: () => import("components/path/path_R.vue"),
    pathData: () => import("components/path/path_data.vue"),
    pathButtonToggle: () => import("components/path/path_button_toggle.vue"),
    siPathInfo: () => import("components/path/si_path_info.vue"),
    pathPhotoInfo: () => import("components/path/generalUser/pathPhotoInfo.vue")
  },
  data() {
    return {
      //顯示下方頁面
      isShow: false
    };
  },
  computed: {
    ...mapGetters("path", [
      "selected_city",
      "selected_site",
      "start_index",
      "run_index",
      "data_index"
    ])
  },
  watch: {
    start_index(val) {
      this.isShow = true;
    },
    selected_city(val) {
      this.isShow = false;
    },
    selected_site(val) {
      this.isShow = false;
    }
  }
};
</script>

<style></style>
