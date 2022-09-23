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
    allDogs: null,
  },
  getters: {
    getApiKey: (state) => state.apiKey,
    getSelectedDogBreedID: (state) => state.selectedDogBreedID,
    getSelectedDogList: (state) => state.selectedDogList,
    getAllDogs: (state) => state.allDogs,
  },
  mutations: {
    setSelectedDogBreedID: (state, newDogSelection) =>
      (state.selectedDogBreedID = newDogSelection),
    setSelectedDogList: (state, selectedDogList) =>
      (state.selectedDogList = selectedDogList),
    setAllDogs: (state, allDogs) => (state.allDogs = allDogs),
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
    setAllDogs({ commit, state }) {
      axios
        .get("https://api.thedogapi.com/v1/images/search", {
          headers: { "x-api-key": state.apiKey },
          params: {
            limit: 10,
            page: 0,
            order: "Desc",
            size: "full",
          },
        })
        .then((response) => {
          console.log("our response is ", response);
          commit("setAllDogs", response.data);
        });
    },
  },
  modules: {},
});
