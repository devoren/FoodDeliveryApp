import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

import { COLORS, FONTS, icons, SIZES } from "../../constants";

const RadioButton: React.FC<any> = ({
	containerStyle,
	label,
	labelStyle,
	iconStyle,
	isSelected,
	onPress,
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
		>
			<Image
				source={isSelected ? icons.check_on : icons.check_off}
				style={{
					marginLeft: 5,
					width: 30,
					height: 30,
					...iconStyle,
				}}
			/>
			<Text
				style={{
					marginLeft: SIZES.radius,
					color: COLORS.gray,
					...FONTS.body3,
					...labelStyle,
				}}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

export default RadioButton;
