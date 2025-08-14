import api, { setHeader, unsetHeader } from "./api";
import retroStore from "./stores";
import tokenAtom from "./stores/token";

export const initApp = () => {
  console.log("Init app and setting up API client");
  const initToken = retroStore.get(tokenAtom);

  if (initToken) {
    console.log("initial auth token set on API client");
    console.log(`Token: ${initToken}`);
    setHeader("Authorization", `Token ${initToken}`);
  }

  retroStore.sub(tokenAtom, () => {
    const newToken = retroStore.get(tokenAtom);
    if (newToken) {
      setHeader("Authorization", `Token ${newToken}`);
      console.log("auth token updated on API");
    } else {
      unsetHeader("Authorization");
      console.log("auth token unset on API");
    }
  });
};
