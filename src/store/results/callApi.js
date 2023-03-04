import axios from "axios";
import { domain } from "../../shared/utils/common";

export default function requestGetResults(testId = "") {
  return axios.post(`${domain}/api/v1/answer-history/get-result`, { testId });
}
