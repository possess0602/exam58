<template>
  <div class="q-pa-md">
    <div class="col"></div>
    <div class="col-12 col-md-auto">
      <div class="row">
        <div class="q-gt-xs">
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
            hint="選擇城市"
            style="width: 250px; padding-bottom: 32px"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">沒有結果</q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="q-ml-md">
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
            hint="請選擇服務"
            style="width: 250px; padding-bottom: 32px"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">沒有結果</q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="q-ml-md">
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
            hint="請選擇服務"
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
    </div>
    <div class="col"></div>

    <div class="row q-mt-sm">
      <div class="col"></div>
      <div class="col-12 col-md-auto">
        <q-btn
          :loading="loading1"
          :percentage="percentage1"
          color="cyan-9"
          @click="startComputing(1)"
          v-on:click="runR(1)"
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
  </div>
  <!--  -->

  <!--  -->
</template>
<script>
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
    ...mapGetters("h_demand", ["after_axios"])
  },
  components: {},
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

  methods: {
    ...mapActions("h_demand", ["resetTxtdatas", "resetTxtdatas_diff"]),
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
