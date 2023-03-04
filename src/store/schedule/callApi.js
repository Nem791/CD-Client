import axios from "axios";
import { domain } from "../../utils/common";

export default function requestGetSchedule(userId) {
  return axios.get(`${domain}/api/v1/schedule/getScheduleOfUser/${userId}`);
}
