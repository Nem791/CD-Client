import axios from "axios";

export async function callApi({
  method,
  apiUrl,
  body = null,
  headers = {},
  params = {},
}) {
  try {
    const config = {
      method,
      url: apiUrl,
      data: body,
      headers,
      params,
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
