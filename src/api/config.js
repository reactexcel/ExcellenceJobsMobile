import axios from 'axios';

axios.defaults.baseURL = 'http://5.9.144.226:8090/';
// axios.defaults.baseURL = 'http://144.76.34.244:8090/';
export const login = 'app_get_candidate';
export const deviceData = 'app_save_candidate_device';
export const logout = 'candidate/logout';
export const mobileUpdate = 'update/mobile';
