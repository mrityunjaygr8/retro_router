import { createStore } from "jotai";
import tokenAtom from "./token";

const retroStore = createStore();

const preloadAuth = () => {
  retroStore.get(tokenAtom);
};

export { preloadAuth };
export default retroStore;
