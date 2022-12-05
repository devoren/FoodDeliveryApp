import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import CustomSwitch from "src/components/CustomSwitch";
import FormInput from "src/components/FormInput";
import TextButton from "src/components/TextButton";
import TextIconButton from "src/components/TextIconButton";
import { COLORS, FONTS, icons, SIZES } from "src/constants";
import { Http, Notice, utils } from "src/utils";
import { AuthLayout } from "..";
import { setUser } from "src/reducers/account";
import axios from "axios";
import { ENDPOINTS } from "src/kernel";

const SignIn: React.FC<any> = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");

	const [showPass, setShowPass] = useState(false);
	const [saveMe, setSaveMe] = useState(false);
	const dispatch = useDispatch();

	const isEnableSignIn = () => {
		return email != "" && password != "" && emailError == "";
	};
	const send = () => {
		Http.POST(
			ENDPOINTS.ACCOUNTS.LOGIN,
			{ email: email, password: password },
			(data) => {
				if (data.message) {
					Notice.Error(data.message);
				} else {
					dispatch(setUser(data));

					navigation.replace("Home");
					Notice.Success(data.message);
				}
			}
		);
		// axios
		// 	.post("http://192.168.1.9:8000/login", {
		// 		email: email,
		// 		password: password,
		// 	})
		// 	.then((data) => {
		// 		if (data.data.message) {
		// 			// enqueueSnackbar(lang.LogInError.emailError, { variant: "error", key: "snack" });
		// 			Alert.alert("OMG");
		// 		} else {
		// 			dispatch(
		// 				setUser({
		// 					...data.data,
		// 				})
		// 			);
		// 			navigation.replace("Home");
		// 		}
		// 		console.log(data);
		// 	})
		// 	.catch(function (err) {
		// 		console.log(
		// 			"Got an error logging in, here's the message: ",
		// 			err
		// 		);
		// 	});
	};

	return (
		<AuthLayout
			title="Let's Sign You In"
			subtitle="Welcome back, you've been missed!"
		>
			<View
				style={{
					flex: 1,
					marginTop: SIZES.padding * 2,
				}}
			>
				{/* Form Inputs  */}
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

				<FormInput
					label="Password"
					secureTextEntry={!showPass}
					autoCompleteType="password"
					containerStyle={{
						marginTop: SIZES.radius,
					}}
					onChange={(value: string) => setPassword(value)}
					appendComponent={
						<TouchableOpacity
							style={{
								width: 40,
								alignItems: "flex-end",
								justifyContent: "center",
							}}
							onPress={() => setShowPass(!showPass)}
						>
							<Image
								source={showPass ? icons.eye_close : icons.eye}
								style={{
									height: 20,
									width: 20,
									tintColor: COLORS.gray,
								}}
							/>
						</TouchableOpacity>
					}
				/>
				{/* Save me & Forgot Password  */}
				<View
					style={{
						flexDirection: "row",
						marginTop: SIZES.radius,
						justifyContent: "space-between",
					}}
				>
					<CustomSwitch
						value={saveMe}
						onChange={(value: boolean) => setSaveMe(value)}
					/>

					<TextButton
						label="Forgot Password?"
						buttonContainerStyle={{
							backgroundColor: null,
						}}
						labelStyle={{
							color: COLORS.gray,
							...FONTS.body4,
						}}
						onPress={() => navigation.navigate("ForgotPassword")}
					/>
				</View>

				{/* Sign In  */}
				<TextButton
					label="Sign In"
					disabled={isEnableSignIn() ? false : true}
					buttonContainerStyle={{
						height: 55,
						alignItems: "center",
						marginTop: SIZES.padding,
						borderRadius: SIZES.radius,
						backgroundColor: isEnableSignIn()
							? COLORS.primary
							: COLORS.transparentPrimary,
					}}
					onPress={() => {
						send();
					}}
				/>
				{/* Sign Up  */}
				<View
					style={{
						flexDirection: "row",
						marginTop: SIZES.radius,
						justifyContent: "center",
					}}
				>
					<Text
						style={{
							color: COLORS.darkGray,
							...FONTS.body3,
						}}
					>
						Don't have an account?
					</Text>
					<TextButton
						label="Sign Up"
						buttonContainerStyle={{
							marginLeft: 3,
							backgroundColor: null,
						}}
						labelStyle={{
							color: COLORS.primary,
							...FONTS.h3,
						}}
						onPress={() => navigation.navigate("SignUp")}
					/>
				</View>

				{/* Footer  */}
				<TextIconButton
					containerStyle={{
						height: 50,
						alignItems: "center",
						marginTop: 100,
						borderRadius: SIZES.radius,
						backgroundColor: COLORS.blue,
					}}
					label="Continue With Facebook"
					labelStyle={{
						marginLeft: SIZES.radius,
						color: COLORS.white,
					}}
					icon={icons.fb}
					iconStyle={{
						tintColor: COLORS.white,
					}}
					iconPosition="LEFT"
					onPress={() => console.log("FB")}
				/>

				<TextIconButton
					containerStyle={{
						height: 50,
						alignItems: "center",
						marginVertical: SIZES.radius,
						borderRadius: SIZES.radius,
						backgroundColor: COLORS.lightGray2,
					}}
					label="Continue With Google"
					labelStyle={{
						marginLeft: SIZES.radius,
					}}
					icon={icons.google}
					iconStyle={{
						tintColor: null,
					}}
					iconPosition="LEFT"
					onPress={() => console.log("Google")}
				/>
			</View>
		</AuthLayout>
	);
};

export default SignIn;
