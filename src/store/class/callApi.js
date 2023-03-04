import axios from "axios";
import { domain } from "../../utils/common";

export default function requestGetClass(classId = "") {
  // console.log(classId);
  return axios.get(`${domain}/api/v1/class/${classId}`);
}
