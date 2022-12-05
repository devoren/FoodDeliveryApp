import { Appearance } from "react-native";
import TYPE from "./types";

interface AccounState {
	user: {
		username: string;
		first_name: string;
		last_name: string;
		region: string;
	};
}
const initialState: AccounState = {
	user: {
		username: "Oren",
		first_name: "Oren",
		last_name: "Nurkeldi",
		region: "Kazakhstan, Almaty",
	},
};

export default (state: AccounState = initialState, action: any) => {
	switch (action.type) {
		case TYPE.USER:
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};
