import axios from 'axios';
import * as config from './config';

export function getData(email) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: config.getUserData,
      data: {
        email_id: email,
      },
    }).then((data) => {
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
}

export function saveDevice(email, deviceId, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: config.saveDeviceData,
      data: {
        email_id: email,
        device_id: deviceId,
        token,
      },
    }).then((data) => {
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
}
