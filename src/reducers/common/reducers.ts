import { Appearance } from "react-native";
import TYPE from "./types";

interface CommonState {
	counter: number;
	theme: string;
	selected: string;
	orderedFoodPrice: number;
}
const colorScheme = Appearance.getColorScheme();
const initialState: CommonState = {
	counter: 1,
	theme: String(colorScheme),
	selected: "Home",
	orderedFoodPrice: 0,
};

export default (state: CommonState = initialState, action: any) => {
	switch (action.type) {
		case TYPE.INCREMENT:
			return {
				...state,
				counter: state.counter + 1,
			};
		case TYPE.DECREMENT:
			return {
				...state,
				counter: state.counter - 1,
			};
		case TYPE.RESTORE:
			return {
				...state,
				counter: 0,
			};
		case TYPE.THEME: {
			if (state.theme === "dark") {
				return {
					...state,
					theme: "light",
				};
			} else {
				return {
					...state,
					theme: "dark",
				};
			}
		}
		case TYPE.SET_FOODPRICE:
			return {
				...state,
				orderedFoodPrice: action.payload,
			};
		case TYPE.SET_SELECTED:
			return {
				...state,
				selected: action.payload,
			};
		default:
			return state;
	}
};
