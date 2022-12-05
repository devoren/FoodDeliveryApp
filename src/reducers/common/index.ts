import { action } from "typesafe-actions";

import reducers from "./reducers";
import TYPE from "./types";

export const setIncrement = () => (dispatch: any) => {
	dispatch(action(TYPE.INCREMENT));
};
export const setDecrement = () => (dispatch: any) => {
	dispatch(action(TYPE.DECREMENT));
};
export const setRestore = () => (dispatch: any) => {
	dispatch(action(TYPE.RESTORE));
};
export const setTheme = (theme: string) => (dispatch: any) => {
	dispatch(action(TYPE.THEME, theme));
};
export const setSelectedTab = (data: string) => (dispatch: any) => {
	dispatch(action(TYPE.SET_SELECTED, data));
};
export const setFoodPrice = (data: number) => (dispatch: any) => {
	dispatch(action(TYPE.SET_FOODPRICE, data));
};
export default reducers;
