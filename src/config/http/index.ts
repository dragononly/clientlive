import axios from 'axios';
import { baseURL, robotUrl } from './env';


export const Mpost = async (url: string, data: any) => {
	let cab = await axios.post(baseURL + url, data)
		.then(function (res) {
			return res
		})
		.catch(function (error) {
			return error
		});
	return cab
}


// export const MpostOut = async (url: string, data: any) => {


// 	let cab = await axios.post("http://cdn.pccpa.cn:9000/openapi/accesstoken", { appid: '"tj73325e554f56eb05"', appkey: "f778ae2021e0f8e98e5ac76fe00e28b0" })
// 		.then(function (res) {

// 			return res
// 		})
// 		.catch(function (error) {
// 			return error
// 		});
// 	return cab
// }


export const Rgetid = async (url: string, id: string) => {
	let cab = await axios.get(robotUrl + url + '/' + id)
		.then(function (res) {
			return res
		})
		.catch(function (error) {
			return error
		});
	return cab
}

export const Rgetcount = async (url: string) => {
	let cab = await axios.get(robotUrl + url + '/count')
		.then(function (res) {
			return res
		})
		.catch(function (error) {
			return error
		});
	return cab
}

export const Rget = async (url: string, data: any) => {
	let mydata = '?'
	let off = '0'
	for (const key in data) {
		if (off == '0') {
			off = ""
		} else {
			off = `&`
		}
		mydata += `${off}${key}=${data[key]}`
	}


	let cab = await axios.get(robotUrl + url + mydata)
		.then(function (res) {
			return res
		})
		.catch(function (error) {
			return error
		});


	return cab
}


export const Rpost = async (url: any, data: any,) => {
	let cab = await axios.post(robotUrl + url, data)
		.then(function (res) {
			return res
		})
		.catch(function (error) {
			return error
		});
	return cab
}

export const Rput = async (url: string, id: string, data: any) => {
	let cab = await axios.put(robotUrl + url + '/' + id, data)
		.then(function (res) {
			return res
		})
		.catch(function (error) {
			return error
		});
	return cab
}
export const Rdelete = async (url: string, id: string) => {
	let cab = await axios.delete(robotUrl + url + '/' + id)
		.then(function (res) {
			return res
		})
		.catch(function (error) {
			return error
		});
	return cab
}

