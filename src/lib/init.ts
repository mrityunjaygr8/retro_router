import { setHeader, unsetHeader } from "./api";
import retroStore from "./stores";
import tokenAtom from "./stores/token";
import userAtom from "./stores/user";

export const initApp = () => {
  const initToken = retroStore.get(tokenAtom);
  retroStore.get(userAtom);

  if (initToken) {
    setHeader("Authorization", `Token ${initToken}`);
  }

  retroStore.sub(tokenAtom, () => {
    const newToken = retroStore.get(tokenAtom);
    if (newToken) {
      setHeader("Authorization", `Token ${newToken}`);
    } else {
      unsetHeader("Authorization");
    }
  });
};
