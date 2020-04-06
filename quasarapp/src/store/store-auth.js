// import { LocalStorage } from "quasar";
import { firebaseAuth, google_provider } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";
const state = {
  loggedIn: false,
};
const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
  },
};
const actions = {
  registerUser({}, payload) {
    firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log("response : ", response);
      })
      .catch((error) => {
        showErrorMessage(error.message);
      });
  },
  loginUser({}, payload) {
    firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((response) => {
        console.log("response : ", response);
      })
      .catch((error) => {
        showErrorMessage(error.message);
      });
  },
  loginWithGoogle() {
    firebaseAuth
      .signInWithPopup(google_provider)
      .then((result) => {
        this.user = result.user;
      })
      .catch((err) => console.error(err));
  },
  logoutUser() {
    firebaseAuth.signOut();
  },

  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        commit("setLoggedIn", true);
        // LocalStorage.set("loggedIn", true);
        this.$router.push("/").catch((err) => {});
        dispatch("schedules/fbReadData", null, { root: true });
      } else {
        commit("setLoggedIn", false);
        // LocalStorage.set("loggedIn", false);
        this.$router.replace("/Pageauth").catch((err) => {});
      }
    });
  },
};
const getters = {
  funcs: (state) => {
    return state.funcs;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};