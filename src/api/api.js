import axios from 'axios';

axios.defaults.baseURL = 'http://144.76.34.244:8090/';

export const loginApi = action => (axios({
  method: 'post',
  url: 'app_get_candidate',
  data: {
    email_id: action.payload.email,
  },
})
);

export const devieDataApi = action => axios({
  method: 'post',
  url: 'app_save_candidate_device',
  data: {
    email_id: action.payload.email,
    device_id: action.payload.device,
    token: action.payload.token,
  },
});
