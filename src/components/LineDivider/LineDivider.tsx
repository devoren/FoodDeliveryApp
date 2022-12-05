import React from "react";
import { View } from "react-native";
import { COLORS, SIZES } from "src/constants";

const LineDivider: React.FC<any> = ({ lineStyle }) => {
	return (
		<View
			style={{
				height: 2,
				width: "100%",
				backgroundColor: COLORS.lightGray2,
				...lineStyle,
			}}
		/>
	);
};
export default LineDivider;
