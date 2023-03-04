import axios from "axios";
import { domain } from "../../utils/common";

export default function requestGetAllSetOfUser(userId = "") {
  return axios.get(`${domain}/api/v1/users/getAllSetOfUser/${userId}`);
}
