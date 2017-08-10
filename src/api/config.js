import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.126:8091/';
export const login = 'app_get_candidate';
export const deviceData = 'app_save_candidate_device';
export const logout = 'candidate/logout';
