import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "src/constants";
import { AuthLayout } from "..";
import TextButton from "src/components/TextButton";
import FormInput from "src/components/FormInput";
import { utils } from "src/utils";

const ForgotPassword: React.FC<any> = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");

	const isEnableSendEmail = () => {
		return email != "" && emailError == "";
	};

	return (
		<AuthLayout
			title="Password Recovery"
			subtitle="Please enter your email address to recover your password"
			titleContainerStyle={{
				marginTop: SIZES.padding * 2,
			}}
		>
			<View
				style={{
					flex: 1,
					marginTop: SIZES.padding * 2,
				}}
			>
				<FormInput
					label="Email"
					keyboardType="email-address"
					autoCompleteType="email"
					onChange={(value: string) => {
						utils.validateEmail(value, setEmailError);

						setEmail(value);
					}}
					errorMsg={emailError}
					appendComponent={
						<View
							style={{
								justifyContent: "center",
							}}
						>
							<Image
								source={
									email == "" ||
									(email != "" && emailError == "")
										? icons.correct
										: icons.cancel
								}
								style={{
									height: 20,
									width: 20,
									tintColor:
										email == ""
											? COLORS.gray
											: email != "" && emailError == ""
											? COLORS.green
											: COLORS.red,
								}}
							/>
						</View>
					}
				/>
			</View>
			<TextButton
				label="Send Email"
				disabled={isEnableSendEmail() ? false : true}
				buttonContainerStyle={{
					height: 55,
					alignItems: "center",
					marginVertical: SIZES.padding,
					borderRadius: SIZES.radius,
					backgroundColor: isEnableSendEmail()
						? COLORS.primary
						: COLORS.transparentPrimary,
				}}
				onPress={() => {
					console.log("Sended");
					navigation.navigate("Otp");
				}}
			/>
		</AuthLayout>
	);
};

export default ForgotPassword;
