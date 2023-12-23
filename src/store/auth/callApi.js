import axios from "axios";
import { domain } from "../../shared/utils/common";

export default function requestGetIsLogin() {
  // Access the value of the cookie
  const cookieValue = localStorage.getItem("jwt");
  return axios.get(`${domain}/api/v1/users/isLogin/${cookieValue}`, {
    withCredentials: true,
    headers: {
      Authorization: `jwt=${cookieValue}`,
    },
  });
}
