import React from "react";
import { View, Text, TextInput } from "react-native";
import { COLORS, FONTS, SIZES } from "src/constants";

const FormInput: React.FC<any> = ({
	containerStyle,
	inputContainerStyle,
	label,
	placeholder,
	inputStyle,
	value = "",
	prependComponent,
	appendComponent,
	onChange,
	secureTextEntry,
	keyboardType = "default",
	autoCompleteType = "off",
	autoCapitalize = "none",
	errorMsg = "",
	maxLength,
}) => {
	return (
		<View style={{ ...containerStyle }}>
			{/* Label & Error msg  */}
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
					{label}
				</Text>
				<Text style={{ color: COLORS.red, ...FONTS.body4 }}>
					{errorMsg}
				</Text>
			</View>

			{/* Text Input  */}
			<View
				style={{
					flexDirection: "row",
					height: 55,
					paddingHorizontal: SIZES.padding,
					marginTop: SIZES.base,
					borderRadius: SIZES.radius,
					backgroundColor: COLORS.lightGray2,
					...inputContainerStyle,
				}}
			>
				{prependComponent}
				<TextInput
					style={{
						flex: 1,
						...inputStyle,
					}}
					value={value}
					placeholder={placeholder}
					placeholderTextColor={COLORS.gray}
					secureTextEntry={secureTextEntry}
					keyboardType={keyboardType}
					autoComplete={autoCompleteType}
					autoCapitalize={autoCapitalize}
					maxLength={maxLength}
					onChangeText={(text) => onChange(text)}
				/>
				{appendComponent}
			</View>
		</View>
	);
};

export default FormInput;
