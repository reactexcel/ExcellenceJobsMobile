import axios from 'axios';
import * as baseUrl from './config';

export function getData(email) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: baseUrl.getUserData,
      data: {
        email_id: email,
        registration_id: 208496,
      },
    }).then((data) => {
      resolve(data);
      console.log(data);
    }, (error) => {
      reject(error);
      console.log(error);
    });
  });
}

export function saveDevice(email, deviceId, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: baseUrl.saveDeviceData,
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
export function logOut(email, deviceId) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: baseUrl.userLogOut,
      data: {
        email_id: email,
        device_id: deviceId,
      },
    }).then((data) => {
      resolve(data);
    }, (error) => {
      reject(error);
    });
  });
}
