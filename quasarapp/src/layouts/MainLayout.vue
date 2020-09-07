<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-blue-grey-7 text-white" elevated>
      <q-toolbar>
        <q-btn
          class="title"
          @click="promptToLogout()"
          flat
          style="font-family:Trebuchet MS,Papyrus,Verdana, Geneva, sans-serif;font-size:22px;font-weight:bold"
        >SightSeeing</q-btn>
        <q-item
          class="q-pt-md"
          style="font-family: NSimSun;font-weight:bold"
          clickable
          v-close-popup
          to="/index"
          v-show="role == 'generalUser'"
        >首頁</q-item>
        <q-space />
        <!-- gt-xs view -->

        <q-chip
          v-if="loggedIn"
          color="blue-grey-7"
          flat
          text-color="white"
          icon="account_circle"
          class="title"
        >{{ userDetail }}您好</q-chip>
        <!-- <q-item class="gt-xs" exact clickable to="/">
          <q-item-section>
            <q-item-label class>首頁</q-item-label>
          </q-item-section>
        </q-item>-->

        <!-- <q-item class="gt-xs" exact clickable to="/arrange-schedule" v-if="loggedIn">
          <q-item-section>
            <q-item-label class>建立旅程表</q-item-label>
          </q-item-section>
        </q-item>-->
        <div
          class="gt-xs title text-bold"
          @mouseover="menuOver = true"
          @mouseout="menuOver = false"
        >
          <q-btn-dropdown v-model="menu" flat label="景點分析">
            <q-list @mouseover.native="listOver = true" @mouseout.native="listOver = false">
              <q-item clickable v-close-popup to="/site_demend" v-show="role == 'generalUser'">
                <q-item-section>
                  <q-item-label>
                    景點GO-
                    <b>需求分析</b>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/site_ProsCons">
                <q-item-section>
                  <q-item-label>
                    景點GO-
                    <b>優缺點分析</b>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/site_Path">
                <q-item-section>
                  <q-item-label>
                    景點GO-
                    <b>路徑分析</b>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <div class="gt-xs title text-bold">
          <q-btn-dropdown flat label="飯店分析">
            <q-item clickable v-close-popup to="/hotel_demend" v-show="role == 'generalUser'">
              <q-item-section>
                <q-item-label>
                  飯店GO-
                  <b>需求分析</b>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/hotel_ProsCons">
              <q-item-section>
                <q-item-label>
                  飯店GO-
                  <b>優缺點分析</b>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-btn-dropdown>
          <q-btn
            class="q-pa-none"
            v-if="!loggedIn"
            to="/PageAuth"
            color="amber"
            icon-right="account_circle"
            style="font-family: NSimSun;font-weight:bold"
            label="登入/註冊"
          />
          <!-- <q-btn
            v-if="!loggedIn"
            @click="loginWithGoogle"
            color="negative"
            icon-right="account_circle"
            label="Google帳號登入"
            style="margin-left: 20px;"
          />-->
          <q-btn-dropdown v-if="loggedIn && role == 'generalUser'" flat label="會員功能">
            <q-list>
              <q-item clickable v-close-popup to="/collection">
                <q-item-section>
                  <q-item-label>我的收藏景點</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup to="/mySchedule">
                <q-item-section>
                  <q-item-label>我的旅程表</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <!-- <q-btn
            v-if="loggedIn"
            flat
            color="white"
            icon-right=""
            :label="userDetail + '您好'"
          />-->

          <q-btn
            v-if="loggedIn"
            flat
            @click="logoutUser"
            color="amber"
            icon-right="account_circle"
            label="登出"
            class="title text-bold"
          />
        </div>

        <!-- end -->

        <!-- sm（768px）phone mode -->
        <div class="lt-sm">
          <q-btn icon="menu" flat @click="rightDrawerOpen = !rightDrawerOpen" />
        </div>
        <!-- end -->
      </q-toolbar>
    </q-header>

    <!-- q-drawer start -->
    <q-drawer
      v-model="rightDrawerOpen"
      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            to="/"
            clickable
            :active="menuItem.label === 'Outbox'"
            v-ripple
            @click="rightDrawerOpen = !rightDrawerOpen"
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>{{ menuItem.label }}</q-item-section>
          </q-item>

          <q-separator v-if="menuItem.separator" />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <!-- q-drawer end -->

    <!-- qfooter -->
    <q-footer>
      <!-- tab section -->
      <q-tabs class="lt-sm bg-blue-grey-7" v-model="tab">
        <q-route-tab to="/" icon="home" label="首頁" />
        <q-route-tab to="/collection" icon="bookmark_border" label="我的收藏" />
        <q-route-tab to="/mySchedule" icon="explore" label="旅遊規劃" />
      </q-tabs>
      <!--  -->
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions, mapGetter } from "vuex";
import { debounce } from "quasar";
const menuList = [
  {
    icon: "home",
    label: "首頁",
    to: "/",
    separator: true,
  },
  {
    icon: "send",
    label: "Outbox",
    separator: false,
  },
  {
    icon: "delete",
    label: "Trash",
    separator: false,
  },
  {
    icon: "error",
    label: "Spam",
    separator: true,
  },
  {
    icon: "settings",
    label: "Settings",
    separator: false,
  },
  {
    icon: "feedback",
    label: "Send Feedback",
    separator: false,
  },
  {
    icon: "help",
    iconColor: "primary",
    label: "Help",
    separator: false,
  },
];
export default {
  name: "MainLayout",

  data() {
    return {
      tab: "mails",
      rightDrawerOpen: false,
      menuList,

      menu: false,
      menuOver: false,
      listOver: false,
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn"]),
    ...mapState("auth", ["role", "userDetail"]),
  },
  methods: {
    ...mapActions("auth", ["logoutUser"]),
    promptToLogout() {
      this.$q
        .dialog({
          class: "title text-bold",
          title: "切換身分",
          message: "您是否要登出並進入選擇身分頁面?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.logoutUser();
        });
    },
    debounceFunc: debounce(function () {
      this.checkMenu();
    }, 150),
    checkMenu() {
      if (this.menuOver || this.listOver) {
        this.menu = true;
      } else {
        this.menu = false;
      }
    },
  },
  watch: {
    menuOver(val) {
      this.debounceFunc();
    },
    listOver(val) {
      this.debounceFunc();
    },
  },
};
</script>
<style lang="scss">
.color {
  color: brown;
  font-size: 45px;
}
.my-card {
  width: 100%;
  max-width: 350px;
}
.title {
  font-family: Microsoft JhengHei;
}
</style>
