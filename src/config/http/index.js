import axios from 'axios';
import { baseURL, robotUrl } from './env';
axios.defaults.headers.common['authorization'] = "defaults.headers.";
export const Mpost = async (url, data) => {
    let cab = await axios.post(baseURL + url, data)
        .then(function (res) {
        return res;
    })
        .catch(function (error) {
        return error;
    });
    return cab;
};
export const Rgetid = async (url, id) => {
    let cab = await axios.get(robotUrl + url + '/' + id)
        .then(function (res) {
        return res;
    })
        .catch(function (error) {
        return error;
    });
    return cab;
};
export const Rgetcount = async (url) => {
    let cab = await axios.get(robotUrl + url + '/count')
        .then(function (res) {
        return res;
    })
        .catch(function (error) {
        return error;
    });
    return cab;
};
export const Rget = async (url, data) => {
    let mydata = '?';
    let off = '0';
    for (const key in data) {
        if (off == '0') {
            off = "";
        }
        else {
            off = `&`;
        }
        mydata += `${off}${key}=${data[key]}`;
    }
    let cab = await axios.get(robotUrl + url + mydata)
        .then(function (res) {
        return res;
    })
        .catch(function (error) {
        return error;
    });
    return cab;
};
export const Rpost = async (url, data) => {
    let cab = await axios.post(robotUrl + url, data)
        .then(function (res) {
        return res;
    })
        .catch(function (error) {
        return error;
    });
    return cab;
};
export const Rput = async (url, id, data) => {
    let cab = await axios.put(robotUrl + url + '/' + id, data)
        .then(function (res) {
        return res;
    })
        .catch(function (error) {
        return error;
    });
    return cab;
};
export const Rdelete = async (url, id) => {
    let cab = await axios.delete(robotUrl + url + '/' + id)
        .then(function (res) {
        return res;
    })
        .catch(function (error) {
        return error;
    });
    return cab;
};
//# sourceMappingURL=index.js.map