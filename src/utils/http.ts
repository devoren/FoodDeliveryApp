import axios from "axios";

import { API } from "src/kernel";
import RootReducer from "src/reducers";

enum Method {
	GET = "GET",
	PUT = "PUT",
	POST = "POST",
	DELETE = "DELETE",
}

const fe = async (
	method: Method,
	url: string,
	body: any,
	response: (data: any) => void
	// access_token?: any
) => {
	// const common = RootReducer.getState().common;

	// const data = new FormData();
	// for (const key in body) {
	// 	if (key.slice(-2) == "[]") {
	// 		for (let i = 0; i < body[key].length; i++) {
	// 			data.append(key, body[key][i]);
	// 		}
	// 	} else {
	// 		data.append(key, body[key]);
	// 	}
	// }

	axios(API.HOST + url, {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
		data: body,
		// data: body ? data : null,
	})
		.then((data) => response(data.data))
		.catch((error) => {
			console.log(error);
		});
};

export const GET = (
	url: string,
	response: (data: any) => void
	// access_token?: any
) => fe(Method.GET, url, null, response);

export const PUT = (
	url: string,
	body: any,
	response: (data: any) => void,
	access_token?: any
) => fe(Method.PUT, url, body, response);

export const POST = (
	url: string,
	body: any,
	response: (data: any) => void,
	access_token?: any
) => fe(Method.POST, url, body, response);

export const DELETE = (
	url: string,
	response: (data: any) => void,
	access_token?: any
) => fe(Method.DELETE, url, null, response);
