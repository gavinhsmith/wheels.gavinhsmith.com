import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import "./style.css";

import App from "./App.vue";
import Entry from "./routes/Entry.vue";
import Home from "./routes/Main.vue";
import Error404 from "./routes/404.vue";

const routes = [
  { path: "/", component: Entry },
  { path: "/home", component: Home },
  {
    path: "/:pathMatch(.*)*",
    component: Error404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
