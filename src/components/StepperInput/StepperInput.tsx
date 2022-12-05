import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "src/constants";
import IconButton from "../IconButton";

const StepperInput: React.FC<any> = ({
	containerStyle,
	value = 1,
	onAdd,
	onMinus,
}) => {
	return (
		<View
			style={{
				flexDirection: "row",
				height: 60,
				width: 140,
				backgroundColor: COLORS.lightGray2,
				borderRadius: SIZES.radius,
				...containerStyle,
			}}
		>
			<IconButton
				containerStyle={{
					width: 50,
					alignItems: "center",
					justifyContent: "center",
				}}
				icon={icons.minus}
				iconStyle={{
					width: 25,
					height: 25,
					tintColor: value > 1 ? COLORS.primary : COLORS.gray,
				}}
				onPress={onMinus}
			/>
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text
					style={{
						...FONTS.h2,
					}}
				>
					{value}
				</Text>
			</View>
			<IconButton
				containerStyle={{
					width: 50,
					alignItems: "center",
					justifyContent: "center",
				}}
				icon={icons.plus}
				iconStyle={{
					width: 25,
					height: 25,
					tintColor: COLORS.primary,
				}}
				onPress={onAdd}
			/>
		</View>
	);
};

export default StepperInput;
