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
    dogTypes: null,
    //
    order: "Asc",
    page: 1,
    limit: 10,
    pagination_count: 0,
    cardSize: "large",
    breedID: null,
  },
  getters: {
    getApiKey: (state) => state.apiKey,
    getSelectedDogBreedID: (state) => state.selectedDogBreedID,
    getSelectedDogList: (state) => state.selectedDogList,
    getAllDogs: (state) => state.allDogs,
    getDogTypes: (state) => state.dogTypes,
    getOrder: (state) => state.order,
    getLimit: (state) => state.limit,
    getPaginationCount: (state) => state.pagination_count,
    getPage: (state) => state.page,
    getCardSize: (state) => state.cardSize,
    getBreedID: (state) => state.breedID,
  },
  mutations: {
    setBreedID: (state, breedID) => (state.breedID = breedID),
    setSelectedDogBreedID: (state, newDogSelection) =>
      (state.selectedDogBreedID = newDogSelection),
    setSelectedDogList: (state, selectedDogList) =>
      (state.selectedDogList = selectedDogList),
    setAllDogs: (state, allDogs) => (state.allDogs = allDogs),
    setDogTypes: (state, dogTypes) => (state.dogTypes = dogTypes),
    setOrder: (state, order) => (state.order = order),
    setLimit: (state, limit) => (state.limit = limit),
    setPaginationCount: (state, pagination_count) =>
      (state.pagination_count = pagination_count),
    setPage: (state, page) => (state.page = page),
    setCardSize: (state, cardSize) => (state.cardSize = cardSize),
  },
  actions: {
    setBreedID({ commit }, breedID) {
      commit("setBreedID", breedID);
    },
    setCardSize({ commit }, cardSize) {
      console.log("changing the state of the cards yo ");
      commit("setCardSize", cardSize);
    },
    setSelectedDogBreedID({ commit, state }, newDogSelection) {
      commit("setSelectedDogBreedID", newDogSelection);
      axios
        .get("https://api.thedogapi.com/v1/images/search", {
          headers: { "x-api-key": state.apiKey },
          params: {
            limit: 10,
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
    setDogTypes({ commit, state }) {
      axios
        .get("https://api.thedogapi.com/v1/breeds", {
          headers: { "x-api-key": state.apiKey },
        })
        .then((response) => {
          commit("setDogTypes", response.data);
        });
    },
    setPage({ commit }, page) {
      commit("setPage", page);
    },
    setDefaultPaginationParameters({ commit }) {
      // order: "Desc",
      //   page: 1,
      //   limit: 10,
      //   pagination_count: 0,
      commit("setPage", 1);
      commit("setLimit", 10);
      commit("setPaginationCount", 0);
      commit("setOrder", "Desc");
    },
    setAllDogs({ commit, state }) {
      let breedID = state.breedID === "0" ? null : state.breedID;
      axios
        .get("https://api.thedogapi.com/v1/images/search", {
          headers: { "x-api-key": state.apiKey },
          params: {
            limit: state.limit,
            order: state.order,
            page: state.page - 1,
            breed_id: breedID,
          },
        })
        .then((response) => {
          console.log("our response is ", response);
          console.log(
            "this is the pagination count ",
            response.headers["pagination-count"]
          );
          commit("setPaginationCount", response.headers["pagination-count"]);
          commit("setAllDogs", response.data);
        });
    },
    setAllDogsTwo({ commit }, payload) {
      commit("setAllDogs", payload);
    },
  },
  modules: {},
});
