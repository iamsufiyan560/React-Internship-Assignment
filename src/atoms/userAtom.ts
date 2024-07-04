import { atom } from "recoil";

const initialUserData = JSON.parse(localStorage.getItem("userData") || "null");

const userAtom = atom({
  key: "userAtom",
  default: initialUserData,
});

export default userAtom;
