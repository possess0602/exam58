<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-banner
        rounded
        class="text-white"
        style="background-image: url(statics/images/business_index.jpg);background-position: center;
    background-repeat: no-repeat;background-size: cover;height:auto;padding:150px"
      >
        <div
          class="q-py-lg text-bold text-center"
          style="color:white;font-family:Microsoft JhengHei;
          font-size:3vw;"
        >幫助了解現況，提升競爭力</div>
        <div
          class="q-py-lg text-grey-4 text-center"
          style="font-family:Microsoft JhengHei;
          font-size:2.2vw;"
        >提供給你有價值的分析內容</div>
        <div class="q-py-lg q-gutter-xs text-center">
          <!-- <q-btn
            to="/PageAuth"
            size="20px"
            icon="fab fa-google"
            style="color:black;font-family:Microsoft JhengHei;"
            color="teal-5"
            label="登入商業帳號"
          />-->
        </div>
      </q-banner>
    </div>

    <div class="rounded-borders q-pa-md q-mx-md q-gutter-sm bg-grey-1">
      <q-splitter v-model="splitterModel" style="height: 420px;font-family: Microsoft JhengHei;">
        <template v-slot:before>
          <q-tabs v-model="tab" vertical class="text-black">
            <!-- <q-tab name="demand" icon="img:statics/images/b_demand.png" label="需求分析" /> -->
            <q-tab name="proscons" icon="fas fa-crosshairs" label="優缺點分析" />
            <q-tab name="path" icon="las la-handshake" label="潛在合作夥伴分析" />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            class="bg-grey-1"
            style="font-family: Microsoft JhengHei;"
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="proscons">
              <!-- 第一格 -->
              <div class="row text-h4">
                <q-chip outline size="30px">優缺點分析</q-chip>
                <q-space />
                <q-btn
                  rounded
                  class="bg-blue-6 text-bold text-white q-pa-xs q-ma-xs"
                  size="18px"
                  icon="person_pin_circle"
                  to="/manager/site_ProsCons"
                >景點業者</q-btn>
                <q-btn
                  rounded
                  size="18px"
                  icon="person_pin_circle"
                  to="/manager/hotel_ProsCons"
                  class="text-bold q-pa-xs q-ma-xs"
                >飯店業者</q-btn>
              </div>

              <!-- 第二格 -->
              <p class="text-h5 q-pa-md q-my-sm bg-grey text-white" style="border-radius: 10px;">
                <b>主要對象:旅遊業者、景點或旅館經營業者。</b>
              </p>
              <!-- 第三格 -->
              <div class="text-h5 q-pa-md q-my-sm bg-red-3 text-white" style="border-radius: 10px;">
                <div style="font-weight:bold">目標</div>
                <div style="margin-bottom:5px">
                  <b>語意庫分析</b>評論，快速得知消費者的回饋，了解企業的優勢與不足
                </div>
                <q-separator class style="margin-left:2px;margin-right:15px" color="white" />
                <p class="text-h6 q-my-xs">透過優缺點分析，可了解企業在網路評論中，消費者所考量的觀點</p>
                <p class="text-h6">進而對缺點進行改善或重新規劃，或運用現有優勢做產品行銷</p>
              </div>
            </q-tab-panel>

            <q-tab-panel name="path">
              <!-- 第一格 -->
              <div class="row text-h4">
                <q-chip outline size="30px">潛在合作夥伴分析</q-chip>
                <q-space />
                <q-btn
                  rounded
                  size="18px"
                  icon="person_pin_circle"
                  to="/manager/site_Path"
                  class="bg-blue-6 text-bold text-white q-pa-xs q-ma-xs"
                >景點/飯店業者</q-btn>
              </div>
              <!-- 第二格 -->
              <p class="text-h5 q-pa-md q-my-sm bg-grey text-white" style="border-radius: 10px;">
                <b>主要對象:旅遊業者、景點或旅館經營業者。</b>
              </p>
              <!-- 第三格 -->
              <div
                class="text-h5 q-pa-md q-my-sm bg-blue-grey-2 text-black"
                style="border-radius: 10px;"
              >
                <div style="font-weight:bold">目標</div>
                <div style="margin-bottom:5px">
                  獲得目標消費者在旅遊中的偏好與動向，
                  <b>尋找潛在合作對象</b>。
                </div>
                <q-separator class style="margin-left:2px;margin-right:15px" color="white" />
                <p
                  class="text-h6 q-my-xs"
                >系統透過擷取網路打卡評論順序及相關評價，分析消費者在辦理飯店退房，或在景點遊玩之後，接下來的旅遊名單。業者可以藉此了解到目標客群的偏好，促成企業合作機會。</p>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: "proscons",
      splitterModel: 20
    };
  }
};
</script>
<style scoped></style>
