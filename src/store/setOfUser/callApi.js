import axios from "axios";
import { domain } from "../../shared/utils/common";

export default function requestGetAllSetOfUser(userId = "") {
  return axios.get(`${domain}/api/v1/users/getAllSetOfUser/${userId}`);
}
