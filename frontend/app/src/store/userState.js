//udemy section43参考
// import {atom} from "recoil"

export const userState = () => atom({
  key: "userState",
  default: { isAdmin: false }
})
