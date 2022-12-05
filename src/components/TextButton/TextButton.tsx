import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { COLORS, FONTS, SIZES } from "../../constants";

const TextButton: React.FC<any> = ({
	label,
	labelStyle,
	label2 = "",
	label2Style,
	disabled,
	buttonContainerStyle,
	onPress,
}) => {
	return (
		<TouchableOpacity
			style={{
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: COLORS.primary,
				...buttonContainerStyle,
			}}
			disabled={disabled}
			onPress={onPress}
		>
			<Text
				style={{
					color: COLORS.white,
					...FONTS.h3,
					...labelStyle,
				}}
			>
				{label}
			</Text>
			{label2 != "" && (
				<Text
					style={{
						flex: 1,
						textAlign: "right",
						color: COLORS.white,
						...FONTS.h3,
						...label2Style,
					}}
				>
					{label2}
				</Text>
			)}
		</TouchableOpacity>
	);
};

export default TextButton;
