import axios from 'axios';

export default function fireApi(method, url, data) {
  console.log(data);
  const header = {
    method,
    url,
    data,
  };
  return axios(header);
}
