<template>
  <form @submit.prevent="submitForm">
    <div class="col">
      <q-banner
        class="bg-grey-3"
        style="margin: 20px"
      >
        <template v-slot:avatar>
          <q-icon
            name="account_circle"
            color="primary"
          />
        </template>

        <p>{{ tab }}</p>
      </q-banner>

      <q-input
        style="margin: 20px"
        class="col"
        outlined
        v-model="formData.email"
        label="Email"
        stack-label
        ref="email"
        :rules="[val => isValidEmailAddress(val) || '請輸入Email正確格式']"
        lazy-rules
      />
      <q-input
        style="margin: 20px"
        class="col"
        outlined
        ref="password"
        type="password"
        v-model="formData.password"
        label="password"
        stack-label
        :rules="[val => val.length >= 6 || '請輸入最少6個字元']"
        lazy-rules
      />
      <q-space />
      <div class="col text-center">
        <q-btn
          class="full-width"
          color="amber"
          :label="tab"
          icon="ion-mail"
          type="submit"
          style="padding-left:43px;padding-right:43px;"
        />
      </div>

      <div class="col text-center">
        <!-- <q-linear-progress size="10px" value="1" class="q-mt-md" color="grey"> -->

        <q-separator />
        <div class="flex flex-center q-mt-md q-pa-none">
          <q-badge
            size="18px"
            color="white"
            text-color="grey"
            :label="'第三方' + tab + '方式'"
            style="font-weight:bold;"
          />
        </div>
        <!-- </q-linear-progress> -->
      </div>

      <div class="col text-center">
        <q-btn
          class="q-mt-md full-width"
          @click="loginWithGoogle"
          icon="ion-logo-google"
          color="negative"
          :label="'Google帳號' + tab"
        />
      </div>

      <div class="col text-center">
        <q-btn
          class="q-mt-md full-width text-white"
          @click="loginWithLine"
          icon="fab fa-line"
          style="background-color:#00C300;"
          :label="'line' + tab + '(測試)'"
        />
      </div>
    </div>
  </form>
</template>

<script>
  import { openURL } from "quasar";
  import { mapActions } from "vuex";
  export default {
    props: ["tab"],
    data() {
      return {
        formData: {
          email: "",
          password: "",
        },
      };
    },

    methods: {
      ...mapActions("auth", ["registerUser", "loginUser", "loginWithGoogle"]),

      isValidEmailAddress(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      submitForm() {
        this.$refs.email.validate();
        this.$refs.password.validate();
        if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
          if (this.tab == "登入") {
            this.loginUser(this.formData);
          } else {
            this.registerUser(this.formData);
          }
        }
      },
      // line login
      loginWithLine() {
        console.log("LineAuth");
        var response_type = "code";
        var client_id = 1654565142;
        // var redirect_uri = "http://sightseeing.nctu.me:8080";
        var redirect_uri = "http://sightseeing.nctu.me/api/lineLogin";
        var state = "12345abcde";
        var scope = "openid%20profile";
        var nonce = "09876xyz";

        openURL(
          "https://access.line.me/oauth2/v2.1/authorize?response_type=" +
          response_type +
          "&client_id=" +
          client_id +
          "&redirect_uri=" +
          redirect_uri +
          "&state=" +
          state +
          "&scope=" +
          scope +
          "&nonce=" +
          nonce +
          '"'
        );
      },
    },
  };
</script>
