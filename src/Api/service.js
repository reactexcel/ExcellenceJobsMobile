import axios from 'axios';

axios.defaults.baseURL = '<link>';

export function getData(email) {
  return new Promise((resolve, reject) => {
    const url = 'http://192.168.1.126:8091/app_get_candidate';
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
    const url = 'http://192.168.1.126:8091/app_save_candidate_device';
    axios({
      method: 'post',
      url,
      data: {
        email_id: email,
        device_id: deviceId,
        token,
      },
    }).then((data) => {
      console.log(data);
      resolve(data);
    }, (error) => {
      console.log(error);
      reject(error);
    });
  });
}
