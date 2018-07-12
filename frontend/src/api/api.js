import axios from 'axios';

let base = 'http://127.0.0.1:8000';

export const requestLogin = params => { return axios.post(`${base}/api-token-auth/`, params).then(res => res.data); };

export const requestItems = params => { return axios.get(`${base}/griditems/?format=json`, params).then(res => res.data); };

export const requestWords = params => { return axios.get(`${base}/jieba/?format=json`, params).then(res => res.data); };

export const requestDumpIn = params => { return axios.post(`${base}/dumpin/?format=json`, params).then(res => res.data); };


