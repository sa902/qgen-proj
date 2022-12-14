import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import login from "@/libs/MockLoginServer";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiKey:
      "live_DcRoox7Iaak72trJ1dnhDwbVfIBlSGQ3sX1Zxg6sha6Iwmd5DDPD1wRSh6OB1tHW",
    selectedDogList: null,
    allDogs: null,
    dogTypes: null,
    order: "Asc",
    page: 1,
    limit: 10,
    pagination_count: 0,
    cardSize: "large",
    breedID: null,
    tableView: false,
    isAdmin: false,
  },
  getters: {
    getTableView: (state) => state.tableView,
    getApiKey: (state) => state.apiKey,
    getSelectedDogList: (state) => state.selectedDogList,
    getAllDogs: (state) => state.allDogs,
    getDogTypes: (state) => state.dogTypes,
    getOrder: (state) => state.order,
    getLimit: (state) => state.limit,
    getPaginationCount: (state) => state.pagination_count,
    getPage: (state) => state.page,
    getCardSize: (state) => state.cardSize,
    getBreedID: (state) => state.breedID,
    getIsAdmin: (state) => state.isAdmin,
  },
  mutations: {
    setTableView: (state, tableView) => (state.tableView = tableView),
    setBreedID: (state, breedID) => (state.breedID = breedID),
    setAllDogs: (state, allDogs) => (state.allDogs = allDogs),
    setDogTypes: (state, dogTypes) => (state.dogTypes = dogTypes),
    setOrder: (state, order) => (state.order = order),
    setLimit: (state, limit) => (state.limit = limit),
    setPaginationCount: (state, pagination_count) =>
      (state.pagination_count = pagination_count),
    setPage: (state, page) => (state.page = page),
    setCardSize: (state, cardSize) => (state.cardSize = cardSize),
    setAdmin: (state, admin) => (state.isAdmin = admin),
  },
  actions: {
    login({ commit }, loginCredentials) {
      let authStatus = login(loginCredentials.email, loginCredentials.password);
      commit("setAdmin", authStatus);
    },
    logout({ commit }) {
      commit("setAdmin", false);
    },
    setTableView({ commit }, tableView) {
      commit("setTableView", tableView);
    },
    setBreedID({ commit }, breedID) {
      commit("setBreedID", breedID);
    },
    setCardSize({ commit }, cardSize) {
      commit("setTableView", false);
      commit("setCardSize", cardSize);
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
      commit("setAllDogs", null);
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
          commit("setPaginationCount", response.headers["pagination-count"]);
          commit("setAllDogs", response.data);
        });
    },
  },
  modules: {},
});
