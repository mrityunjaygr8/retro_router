import { atomWithStorage } from "jotai/utils";

const tokenAtom = atomWithStorage("token", null);
export default tokenAtom;
