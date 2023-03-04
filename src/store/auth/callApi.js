import axios from "axios";
import { domain } from "../../shared/utils/common";

export default function requestGetIsLogin() {
  return axios.get(`${domain}/api/v1/users/isLogin`, {
    withCredentials: true,
  });
}
