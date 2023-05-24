import axios from "axios";
import { domain } from "../../shared/utils/common";

// Access the value of the cookie
const cookieValue = localStorage.getItem("jwt");
console.log(cookieValue);
export default function requestGetIsLogin() {
  return axios.get(`${domain}/api/v1/users/isLogin/${cookieValue}`, {
    withCredentials: true,
    headers: {
      Cookie: `jwt=${cookieValue}`,
    },
  });
}
