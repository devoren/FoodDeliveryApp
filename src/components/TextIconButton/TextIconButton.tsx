import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";

import { COLORS, FONTS } from "../../constants";

const TextIconButton: React.FC<any> = ({
	containerStyle,
	label,
	labelStyle,
	icon,
	iconStyle,
	iconPosition,
	onPress,
	disabled,
}) => {
	return (
		<TouchableOpacity
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
				...containerStyle,
			}}
			onPress={onPress}
			disabled={disabled}
		>
			{iconPosition == "LEFT" && (
				<Image
					source={icon}
					style={{
						marginLeft: 5,
						width: 20,
						height: 20,
						tintColor: COLORS.black,
						...iconStyle,
					}}
				/>
			)}
			<Text style={{ ...FONTS.body3, ...labelStyle }}>{label}</Text>
			{iconPosition == "RIGHT" && (
				<Image
					source={icon}
					style={{
						marginLeft: 5,
						width: 20,
						height: 20,
						tintColor: COLORS.black,
						...iconStyle,
					}}
				/>
			)}
		</TouchableOpacity>
	);
};

export default TextIconButton;
