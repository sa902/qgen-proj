import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey:
      "live_DcRoox7Iaak72trJ1dnhDwbVfIBlSGQ3sX1Zxg6sha6Iwmd5DDPD1wRSh6OB1tHW",
    selectedDogBreedID: null,
    selectedDogList: null,
  },
  getters: {
    getApiKey: (state) => state.apiKey,
    getSelectedDogBreedID: (state) => state.selectedDogBreedID,
    getSelectedDogList: (state) => state.selectedDogList,
  },
  mutations: {
    setSelectedDogBreedID: (state, newDogSelection) =>
      (state.selectedDogBreedID = newDogSelection),
    setSelectedDogList: (state, selectedDogList) =>
      (state.selectedDogList = selectedDogList),
  },
  actions: {
    setSelectedDogBreedID({ commit, state }, newDogSelection) {
      commit("setSelectedDogBreedID", newDogSelection);
      axios
        .get("https://api.thedogapi.com/v1/images/search", {
          headers: { "x-api-key": state.apiKey },
          params: {
            limit: 5,
            size: "full",
            breed_id: newDogSelection,
          },
        })
        .then((response) => {
          commit("setSelectedDogList", response.data);
        });
    },
    setSelectedDogList({ commit }, newDogList) {
      commit("setSelectedDogList", newDogList);
    },
  },
  modules: {},
});
