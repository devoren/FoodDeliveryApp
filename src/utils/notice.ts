import { Vibration } from "react-native";
import Toast from "react-native-toast-message";

import RootReducer from "src/reducers";
import { SCALE } from "src/styles";

export const Info = (text2: string, text1?: string) => {
	Vibration.vibrate(1000);
	Toast.show({
		type: "info",
		position: "top",
		text1: text1,
		text2: text2,
		topOffset: SCALE.MD,
	});
};

export const Success = (text2: string, text1?: string) => {
	Vibration.vibrate(1000);
	Toast.show({
		type: "success",
		position: "top",
		text1: text1,
		text2: text2,
		topOffset: SCALE.MD,
	});
};

export const Error = (text2: string, text1?: string) => {
	Vibration.vibrate(1000);
	Toast.show({
		type: "error",
		position: "top",
		text1: text1,
		text2: text2,
		topOffset: SCALE.MD,
	});
};

export const Message = (text2: string, text1: string) => {
	Vibration.vibrate(1000);
	Toast.show({
		type: "message",
		position: "top",
		text1: text1,
		text2: text2,
		topOffset: SCALE.MD,
	});
};
