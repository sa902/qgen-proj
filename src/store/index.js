import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey:
      "live_DcRoox7Iaak72trJ1dnhDwbVfIBlSGQ3sX1Zxg6sha6Iwmd5DDPD1wRSh6OB1tHW",
    selectedDog: "test",
  },
  getters: {
    getApiKey: (state) => state.apiKey,
    getSelectedDog: (state) => state.selectedDog,
  },
  mutations: {
    setSelectedDog: (state, newDogSelection) =>
      (state.selectedDog = newDogSelection),
  },
  actions: {
    setSelectedDog({ commit }, newDogSelection) {
      commit("setSelectedDog", newDogSelection);
    },
  },
  modules: {},
});
