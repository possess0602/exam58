import Vue from "vue";
import { uid } from "quasar";
const state = {
  name: "PageIndex",
  slide: "style",
  expend: false,
  schedules: {
    ID1: {
      title: "我的花蓮之旅",
      startDate: "2020/01/21-2020/01/25",
    },
    ID2: {
      title: "台南行",
      startDate: "2020/01/21-2020/01/25",
    },
    ID3: {
      title: "五日花東遊",
      startDate: "2020/01/21-2020/01/25",
    },
  },
  watch: {
    vertical(val) {
      this.navPos = val === true ? "right" : "bottom";
    },
  },
};
const mutations = {
  updateSchedule(state, payload) {
    // console.log("payload (from mutation)", payload);
    Object.assign(state.schedules[payload.id], payload.updates);
  },
  deleteSchedule(state, id) {
    // console.log("delete", id);
    // delete state.schedules[id];
    Vue.delete(state.schedules, id);
  },
  addSchedule(state, payload) {
    Vue.set(state.schedules, payload.id, payload.schedule);
  },
};
const actions = {
  updateSchedule({ commit }, payload) {
    commit("updateSchedule", payload);
  },
  deleteSchedule({ commit }, id) {
    commit("deleteSchedule", id);
  },
  addSchedule({ commit }, schedule) {
    let scheduleID = uid();
    let payload = {
      id: scheduleID,
      schedule: schedule,
    };
    commit("addSchedule", payload);
  },
};
const getters = {
  schedules: (state) => {
    return state.schedules;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
