import axios, { axiosInstance } from "boot/axios";
import Vue from "vue";
import { fstore, firebaseAuth, firebaseApp, firestore } from "boot/firebase";
import { uid } from "quasar";

const state = {
  name: "PageIndex1",
  slide: "style",
  expend: false,
  collections: {},
  h_collections: {},
  search: "",
  watch: {},
  src: ""
};
const mutations = {
  addCollection(state, payload) {
    Vue.set(state.collections, payload.id, payload.collection);
    // console.log("資料格式", payload);

    // state.sightseeingMembers = payload;
  },
  h_addCollection(state, payload) {
    Vue.set(state.h_collections, payload.id, payload.collection);
    // console.log("h_addCollection: ", state.h_collections);

    // state.sightseeingMembers = payload;
  },
  deleteCollection(state, id) {
    Vue.delete(state.collections, id);
  },
  h_deleteCollection(state, id) {
    Vue.delete(state.h_collections, id);
  },
  setSearch(state, value) {
    state.search = value;
  }
};
const actions = {
  // 讀景點收藏的資料
  fbReadData({ commit }) {
    const uid = firebaseAuth.currentUser.uid;
    // console.log("fbReadData", uid);
    const userCollection = fstore
      .collection("sightseeingMember")
      .doc(uid)
      .collection("我的收藏");

    userCollection.onSnapshot(Snapshot => {
      Snapshot.forEach(doc => {
        // console.log(doc.data());

        commit("addCollection", {
          id: doc.id,
          collection: doc.data()
        });
      });
    });
  },
  // 讀飯店收藏的資料
  h_fbReadData({ commit }) {
    const uid = firebaseAuth.currentUser.uid;
    // console.log("fbReadData", uid);
    const userCollection = fstore
      .collection("sightseeingMember")
      .doc(uid)
      .collection("我的飯店收藏");

    userCollection.onSnapshot(Snapshot => {
      Snapshot.forEach(doc => {
        // console.log(doc.data());

        commit("h_addCollection", {
          id: doc.id,
          collection: doc.data()
        });
      });
    });
  },
  fbAddtoCollection({}, value) {
    const uid = firebaseAuth.currentUser.uid;
    const collectionId = value.id;
    const addToCollection = fstore
      .collection("sightseeingMember")
      .doc(uid)
      .collection("我的收藏")
      .doc(collectionId);

    // 取src
    axiosInstance
      .post("http://140.136.155.116/api/getGoogleImg", {
        name: value.site_name
      })
      .then(res => {
        addToCollection
          .set({
            site_name: value.site_name,
            id: value.id,
            city: value.city_name,
            address: value.address,
            comment: value.comment,
            rate: value.rate,
            src: res.data
          })
          .then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
  h_fbAddtoCollection({}, value) {
    const uid = firebaseAuth.currentUser.uid;
    const collectionId = value.id;
    const addToCollection = fstore
      .collection("sightseeingMember")
      .doc(uid)
      .collection("我的飯店收藏")
      .doc(collectionId);

    // 取src
    axiosInstance
      .post("http://140.136.155.116/api/getGoogleImg", {
        name: value.site_name
      })
      .then(res => {
        addToCollection
          .set({
            site_name: value.site_name,
            id: value.id,
            city: value.city_name,
            address: value.address,
            comment: value.comment,
            rate: value.rate,
            src: res.data
          })
          .then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
  proconsAddToCollection({}, site_name) {
    const uid = firebaseAuth.currentUser.uid;
    // const collectionId = datas.data.id;
    // const addToCollection

    axiosInstance
      .post("http://140.136.155.116/api/getGoogleImg", {
        name: site_name
      })
      .then(res => {
        axiosInstance
          .post("http://140.136.155.116/api/proconsAddToCollection", {
            name: site_name
          })
          .then(datas => {
            fstore
              .collection("sightseeingMember")
              .doc(uid)
              .collection("我的收藏")
              .doc(datas.data[0].id)
              .set({
                site_name: datas.data[0].name,
                id: datas.data[0].id,
                city: datas.data[0].city_name,
                address: datas.data[0].address,
                comment: datas.data[0].comment,
                rate: datas.data[0].rate,
                src: res.data
              })
              .then(function() {
                console.log("Document successfully written!");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
          });
      });
    // 取src
  },
  h_proconsAddToCollection({}, hotel_name) {
    const uid = firebaseAuth.currentUser.uid;
    // const collectionId = datas.data.id;
    // const addToCollection

    axiosInstance
      .post("http://140.136.155.116/api/getGoogleImg", {
        name: hotel_name
      })
      .then(res => {
        axiosInstance
          .post("http://140.136.155.116/api/h_proconsAddToCollection", {
            name: hotel_name
          })
          .then(datas => {
            fstore
              .collection("sightseeingMember")
              .doc(uid)
              .collection("我的飯店收藏")
              .doc(datas.data[0].id)
              .set({
                site_name: datas.data[0].name,
                id: datas.data[0].id,
                city: datas.data[0].city_name,
                address: datas.data[0].address,
                comment: datas.data[0].comment,
                rate: datas.data[0].rate,
                src: res.data
              })
              .then(function() {
                console.log("Document successfully written!");
              })
              .catch(function(error) {
                console.error("Error writing document: ", error);
              });
          });
      });
  },
  fbDeleteCollection({ commit }, id) {
    const uid = firebaseAuth.currentUser.uid;
    const deleteData = fstore
      .collection("sightseeingMember")
      .doc(uid)
      .collection("我的收藏")
      .doc(id);
    deleteData
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
        commit("deleteCollection", id);
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  },
  h_fbDeleteCollection({ commit }, id) {
    const uid = firebaseAuth.currentUser.uid;
    const deleteData = fstore
      .collection("sightseeingMember")
      .doc(uid)
      .collection("我的飯店收藏")
      .doc(id);
    deleteData
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
        commit("h_deleteCollection", id);
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  },
  // 加入偏好（含axios）
  fbAddToPrefer({ commit }, id) {
    axiosInstance
      .post("http://140.136.155.116/api/preferTag", {
        site_id: id
      })
      .then(res => {
        const site_id = res.data.map(item => item.tag);
        console.log("vuex-post api取prefer:", site_id);
        const uid = firebaseAuth.currentUser.uid;
        const addToPrefer = fstore
          .collection("sightseeingMember")
          .doc(uid)
          .collection("偏好分析");
        const increment = firestore.FieldValue.increment(1);

        site_id.forEach(function(data, index) {
          addToPrefer
            .doc(data)
            .get()
            .then(function(doc) {
              if (doc.exists) {
                addToPrefer.doc(data).update({
                  time: increment
                });
              } else {
                addToPrefer.doc(data).set({
                  time: increment
                });
              }
            })
            .catch(function(error) {
              console.log("Error getting document:", error);
            });
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  }
};
const getters = {
  h_collections: (state, getters) => {
    let h_collectionsFiltered = getters.h_collectionsFiltered;
    let h_collections = {};
    Object.keys(h_collectionsFiltered).forEach(function(key) {
      let h_collection = h_collectionsFiltered[key];

      h_collections[key] = h_collection;
    });
    return h_collections;
    //
  },
  h_collectionsFiltered: state => {
    let collectionsFiltered = {};
    if (state.search) {
      Object.keys(state.h_collections).forEach(function(key) {
        let h_collection = state.h_collections[key],
          collectionNameLowerCase = h_collection.site_name.toLowerCase(),
          collectionCityLowerCase = h_collection.city.toLowerCase(),
          searchcollection = state.search.toLowerCase();
        if (
          collectionNameLowerCase.includes(searchcollection) ||
          collectionCityLowerCase.includes(searchcollection)
        ) {
          collectionsFiltered[key] = h_collection;
        }
      });
      return collectionsFiltered;
    }
    return state.h_collections;
  },
  collectionsFiltered: state => {
    let collectionsFiltered = {};
    if (state.search) {
      Object.keys(state.collections).forEach(function(key) {
        let collection = state.collections[key],
          collectionNameLowerCase = collection.site_name.toLowerCase(),
          collectionCityLowerCase = collection.city.toLowerCase(),
          searchcollection = state.search.toLowerCase();
        if (
          collectionNameLowerCase.includes(searchcollection) ||
          collectionCityLowerCase.includes(searchcollection)
        ) {
          collectionsFiltered[key] = collection;
        }
      });
      return collectionsFiltered;
    }
    return state.collections;
  },
  collections: (state, getters) => {
    let collectionsFiltered = getters.collectionsFiltered;
    let collections = {};
    Object.keys(collectionsFiltered).forEach(function(key) {
      let collection = collectionsFiltered[key];

      collections[key] = collection;
    });
    return collections;
  }
};
export default {
  namespaced: true,

  state,
  mutations,
  actions,
  getters
};
