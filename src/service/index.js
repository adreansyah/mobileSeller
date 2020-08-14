import axios from 'axios';
import { getToken, logout } from 'helper'

const Axios = (url = null) => {
    const TOKEN = getToken()
    let instance = axios.create();
    if (url) {
        instance.defaults.baseURL = url
    } else {
        if (process.env.NODE_ENV === "production") {
            instance.defaults.baseURL = process.env.REACT_APP_API_URL
        }
    }
    instance.defaults.timeout = 1000 * process.env.REACT_APP_API_TIMEOUT;
    instance.defaults.headers.common['Content-Type'] = 'application/json';
    if (TOKEN) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
    }
    instance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        let code, status, message = '';
        if (error.response) {
            code = error.response.status;
            status = error.response.statusText;
            message = (error.response.data.detail) ? error.response.data.detail : (error.response.data.message) ? error.response.data.message : error.response.statusText;
        } else {
            code = status = message = error.message;
        }
        code === 401 && logout()
        let errorData = {
            code,
            status,
            message
        };
        throw (errorData)
    });
    return instance;
}

export const Services = (url) => ({
    get: (endpointName, params = null, config = null) => {
        let data = {};
        if (params) { data['params'] = params; }
        if (config) { data = { ...data, ...config }; }
        return Axios(url).get(endpointName, data);
    },
    getRequest: (endpointName, params = null, config = null) => {
        return Axios().get(endpointName, params, config)
    },
    post: (endpointName, params = null, config = null) => {
        return Axios(url).post(endpointName, params, config);
    },
    put: (endpointName, params = null, config = null) => {
        return Axios(url).put(endpointName, params, config);
    },
    delete: (endpointName, params = null, config = null) => {
        let data = {};
        if (params) { data['params'] = params; }
        if (config) { data = { ...data, ...config }; }
        return Axios(url).delete(endpointName, data);
    }
})