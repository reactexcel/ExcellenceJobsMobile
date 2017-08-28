import axios from 'axios';

export default function fireApi(method, url, data) {
  console.log(url, data);
  const header = {
    method,
    url,
    data,
  };
  return axios(header);
}
