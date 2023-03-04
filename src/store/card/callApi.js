import axios from "axios";
import { domain } from "../../utils/common";

export default function requestGetAllCardInSet(setId = "") {
  console.log("x");
  return axios.get(`${domain}/api/v1/sets/${setId}/getAllCard`);
}
