<template>
  <!-- 三個下拉式選單 -->
  <div class="q-pa-md">
    <q-form @submit="runR(1);startComputing(1)" class="q-gutter-md">
      <div class="row">
        <div class="col">
          <q-select
            filled
            clearable
            v-model="selected_p_local"
            v-on:change="onProductChange"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="options"
            @filter="filterFn"
            label="選擇城市"
            :rules="[ val => val && val.length > 1 || '請選擇城市']"
            style="width: 250px; padding-bottom: 32px"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">沒有結果</q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col q-ml-md">
          <q-select
            filled
            clearable
            v-model="selected_p_detail_item_local"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="options"
            @filter="filterFn_2"
            :rules="[ val => val && val.length > 1 || '請選擇類型']"
            label="請選擇類型"
            style="width: 250px; padding-bottom: 32px"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">沒有結果</q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col q-ml-md">
          <q-select
            filled
            clearable
            v-model="selected_p_detail_item_local2"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :options="options"
            @filter="filterFn_3"
            :rules="[ val => val && val.length > 1 || '請選擇類型']"
            label="請選擇類型"
            style="width: 250px; padding-bottom: 32px"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">沒有結果</q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
      <div class="row q-mt-sm">
        <div class="col"></div>
        <div class="col" style="margin-left: 95px">
          <q-btn
            :loading="loading1"
            :percentage="percentage1"
            color="cyan-9"
            type="submit"
            style="width: 150px"
          >
            開始
            <template v-slot:loading>
              <q-spinner-gears class="on-left" />分析中...
            </template>
          </q-btn>
        </div>

        <div class="col"></div>
      </div>
    </q-form>
  </div>
</template>
<script>
import { QSpinnerFacebook } from "quasar";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
const stringOptions = ["台北", "桃園", "新竹", "苗栗", "台東"];
export default {
  props: [
    // vuex from props 測試觀察用
    "selected_p",
    "selected_p_detail_item",
    "selected_p_detail_item_2",
    // 選單選擇資料
    "citys",
    "cats"
  ],
  computed: {
    ...mapGetters("demand", ["after_axios"])
  },
  data() {
    return {
      // 選單選擇資料
      selected_p_local: "",
      selected_p_detail_item_local: "",
      selected_p_detail_item_local2: "",
      // 預設options資料
      options: stringOptions,
      isShow: false,
      // 分析按鈕
      loading1: false,
      // 按鈕百分比
      percentage1: 0
    };
  },
  // computed: {
  //   // 第一層
  //   selected_p_local: {
  //     get() {
  //       return this.selected_p_local;
  //     },
  //     set(val) {
  //       this.$emit("changed_1", val);
  //     }
  //   },
  //   // 第二層
  //   selected_p_detail_item_local: {
  //     get() {
  //       return this.selected_p_detail_item_local;
  //     },
  //     set(val) {
  //       this.$emit("changed_2", val);
  //     }
  //   },
  //   // 第三層
  //   selected_p_detail_item_local2: {
  //     get() {
  //       return this.selected_p_detail_item_local2;
  //     },
  //     set(val) {
  //       this.$emit("changed_3", val);
  //     }
  //   }
  // },
  methods: {
    ...mapActions("demand", ["resetTxtdatas", "resetTxtdatas_diff"]),
    startComputing(id) {
      // 開啟loading狀態
      this[`loading${id}`] = true;
      this[`percentage${id}`] = 0;
      // 設定增加速度間距
      this[`interval${id}`] = setInterval(() => {
        this[`percentage${id}`] += Math.floor(Math.random() * 8 + 10);
        if (this[`percentage${id}`] >= 100) {
          clearInterval(this[`interval${id}`]);
          // 完成時關閉loading狀態
          this[`loading${id}`] = false;
        }
      }, 700);
    },

    // ???
    onProductChange: function() {
      // reset!
      this.selected_p_detail_item = "";
    },
    runR(val) {
      this.resetTxtdatas().then(() => {
        console.log("runR");

        this.$emit("runR", val);
      });
    },
    // 第一層過濾清單
    filterFn(val, update, abort) {
      var a = Object.values(this.citys).map(city => city.city_name);
      update(() => {
        const needle = val.toLowerCase();
        this.options = a.filter(v => v.toLowerCase().indexOf(needle) > -1);
      });
    },
    // 第二層過濾清單
    filterFn_2(val, update, abort) {
      var b1 = Object.values(this.cats).map(cat => cat.tag);
      update(() => {
        const needle = val.toLowerCase();
        this.options = b1.filter(v => v.toLowerCase().indexOf(needle) > -1);
      });
    },
    // 第三層過濾清單
    filterFn_3(val, update, abort) {
      var b2 = Object.values(this.cats).map(cat => cat.tag);
      update(() => {
        const needle = val.toLowerCase();
        this.options = b2.filter(v => v.toLowerCase().indexOf(needle) > -1);
      });
    }
  },
  // 當選定第一層時emit回parent
  watch: {
    selected_p_local(val) {
      this.$emit("changed_1", val);
      //更改時先確認後面選單為空值
      this.selected_p_detail_item_local = "";
      this.selected_p_detail_item_local2 = "";
    },
    selected_p_detail_item_local(val) {
      this.$emit("changed_2", val);
    },
    selected_p_detail_item_local2(val) {
      this.$emit("changed_3", val);
    },
    after_axios(val) {
      this[`percentage1`] = 97;
    }
  }
};
</script>
