import { atomWithStorage } from "jotai/utils";

const userAtom = atomWithStorage("user", "");
export default userAtom;
