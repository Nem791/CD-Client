import axios from "axios";
import { domain } from "../../shared/utils/common";

export default function requestGetTest(testId = "") {
  return axios.get(`${domain}/api/v1/test/${testId}`);
}
