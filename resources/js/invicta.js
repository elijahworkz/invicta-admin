import { createApp, ref } from "vue";
import { setupAxios } from "./services/axios";
import { createRouterInstance } from "./services/router";
import mitt from "mitt";
import isNil from "lodash/isNil";

// components
import App from "@/App.vue";
import { ElNotification } from "element-plus";
import "element-plus/es/components/message-box/style/index";
import "element-plus/es/components/notification/style/index";
import "element-plus/es/components/button-group/style/index";

class Invicta {
  constructor() {
    this.app = null;
    this.mountElement = "#app";
    this.bootingCallbacks = [];
    this.eventBus = mitt();
    this.errors = ref({});
    this.loadingElement = document.querySelector(".loading.pulse");
    this.user = {
      data: null,
      name: null,
    };
  }

  loadingStatus(status) {
    this.loadingElement.textContent = status;
  }

  booting(callback) {
    // console.log('we have a new callback')
    this.bootingCallbacks.push(callback);
  }

  boot() {
    // console.log('in boot', this.bootingCallbacks)
    this.bootingCallbacks.forEach((callback) => callback(this.app));
  }

  init(config) {
    this.config = config;
    this.axios = setupAxios(
      `${this.getConfig("appUrl")}${this.getConfig("appPath")}`,
    );
    this.user = JSON.parse(atob(this.getConfig("user")));
    delete this.config.user;

    this.app = createApp(App);
    this.setupRouter();

    this.app.use(this.router);
    this.start();
  }

  getConfig(key) {
    if (this.config && Object.prototype.hasOwnProperty.call(this.config, key)) {
      return this.config[key];
    }
    return [];
  }

  can(ability) {
    if (this.user.dev == undefined || this.user.permissions == undefined)
      return false;

    if (this.user.dev) {
      return true;
    }
    return this.user.permissions.includes(ability);
  }

  start() {
    this.boot();

    this.app.mount(this.mountElement);
  }

  setupRouter() {
    this.router = createRouterInstance(this.getConfig("appPath"));
  }

  componentExists(name) {
    return !isNil(this.app._context.components[name]);
  }

  component(name, component) {
    if (!this.componentExists(name)) {
      this.app.component(name, component);
    }
  }

  // Emits dom events
  event(name, data = null) {
    let e = data
      ? new CustomEvent(name, { detail: { data } })
      : new Event(name);

    document.dispatchEvent(e);
  }

  // Listents to mitt events
  on(name, callback) {
    this.eventBus.on(name, callback);
  }

  // Remove mitt events
  off(name, callback) {
    this.eventBus.off(name, callback);
  }

  // Emits mitt events
  emit(name, data = {}) {
    this.eventBus.emit(name, data);
  }

  pageTitle(title) {
    useTitle(title, { titleTemplate: `%s - ${this.getConfig("appName")}` });
  }

  setErrors(errors) {
    this.errors.value = errors;
  }

  remember(key, value = null) {
    key = `invicta-${key}`;

    if (!value) {
      return localStorage.getItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  }

  message(args) {
    ElNotification({ ...args });
  }

  log(message, payload = null) {
    if (payload) {
      console.log(`[Invicta] ${message}`, payload);
    } else {
      console.log("[Invicta]", message);
    }
  }
}

export default Invicta;
