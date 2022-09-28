import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faUserSecret,
  faTable,
  faTableCells,
  faTableCellsLarge,
  faCircle,
  faCoffee,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faUserSecret,
  faTable,
  faCircle,
  faCoffee,
  faTableCells,
  faTableCellsLarge,
  faSpinner
);

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
