import axios from 'axios';
import * as config from './config';

export default function fireApi(method, url, data) {
  let URL = url;
  if (data.action === 'login') {
    delete (data.action);
    URL = config.login;
  } else if (data.action === 'deviceData') {
    delete (data.action);
    URL = config.deviceData;
  }
  const header = {
    method,
    url: URL,
    data,
  };
  return axios(header);
}
