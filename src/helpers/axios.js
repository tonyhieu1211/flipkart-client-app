import axios from 'axios';
import { authConstants } from '../actions/constants';
import store from '../store';
import {api} from '../urlConfig';

let token = window.localStorage.getItem('token');


const axiosInstance = axios.create({
    baseURL: api,
    headers:{
        'Authorization':`Bearer ${token}`
    }
});

axiosInstance.interceptors.request.use(req => {
    const { auth } = store.getState();
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`
    }
    return req;
});

axiosInstance.interceptors.response.use(res => res,
    error => {
        
        const status = error.response ? error.response.status : 400 ;
        console.log(status);
        if(status == 500){
            localStorage.clear();
            store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
        }
        return Promise.reject(error);
});

export default axiosInstance;