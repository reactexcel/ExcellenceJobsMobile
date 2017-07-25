import axios from 'axios';

axios.defaults.baseURL = '<link>';

export function getData(email) {
  return new Promise((resolve, reject) => {
    const url = 'http://144.76.34.244:8090/app_get_candidate';
    axios({
      method: 'post',
      url,
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
    const url = 'http://144.76.34.244:8090/app_save_candidate_device';
    axios({
      method: 'post',
      url,
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
