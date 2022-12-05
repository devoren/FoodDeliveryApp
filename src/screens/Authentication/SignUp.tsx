import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import CustomSwitch from "src/components/CustomSwitch";
import FormInput from "src/components/FormInput";
import TextButton from "src/components/TextButton";
import TextIconButton from "src/components/TextIconButton";
import { COLORS, FONTS, icons, SIZES } from "src/constants";
import { setUser } from "src/reducers/account";
import { utils } from "src/utils";
import { AuthLayout } from "..";
import axios from "axios";
const SignUp: React.FC<any> = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [emailError, setEmailError] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const [showPass, setShowPass] = useState(false);
	const dispatch = useDispatch();

	const isEnableSignUp = () => {
		return (
			email != "" &&
			username != "" &&
			password != "" &&
			emailError == "" &&
			usernameError == "" &&
			passwordError == ""
		);
	};
	const send = () => {
		axios
			.post("http://192.168.1.9:8000/register", {
				username: username,
				email: email,
				password: password,
			})
			.then((data) => {
				if (data.data.message) {
					// enqueueSnackbar(lang.LogInError.emailError, { variant: "error", key: "snack" });
					Alert.alert("OMG");
				} else {
					dispatch(
						setUser({
							...data.data,
						})
					);
					navigation.replace("Home");
				}
			})
			.catch(function (err) {
				console.log(
					"Got an error logging in, here's the message: ",
					err
				);
			});
	};
	return (
		<AuthLayout
			title="Getting Started"
			subtitle="Create an account to continue!"
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
					label="Username"
					autoCompleteType="username"
					containerStyle={{
						marginTop: SIZES.radius,
					}}
					onChange={(value: string) => {
						utils.validateUsername(value, setUsernameError);
						setUsername(value);
					}}
					errorMsg={usernameError}
					appendComponent={
						<View
							style={{
								justifyContent: "center",
							}}
						>
							<Image
								source={
									username == "" ||
									(username != "" && usernameError == "")
										? icons.correct
										: icons.cancel
								}
								style={{
									height: 20,
									width: 20,
									tintColor:
										username == ""
											? COLORS.gray
											: username != "" &&
											  usernameError == ""
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
					onChange={(value: string) => {
						utils.validatePassword(value, setPasswordError);
						setPassword(value);
					}}
					errorMsg={passwordError}
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

				{/* Sign Up  */}
				<TextButton
					label="Sign Up"
					disabled={isEnableSignUp() ? false : true}
					buttonContainerStyle={{
						height: 55,
						alignItems: "center",
						marginTop: SIZES.padding,
						borderRadius: SIZES.radius,
						backgroundColor: isEnableSignUp()
							? COLORS.primary
							: COLORS.transparentPrimary,
					}}
					onPress={() => {
						// navigation.navigate("Otp");
						send();
					}}
				/>
				{/* Sign In  */}
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
						Already have an account?
					</Text>
					<TextButton
						label="Sign In"
						buttonContainerStyle={{
							marginLeft: 3,
							backgroundColor: null,
						}}
						labelStyle={{
							color: COLORS.primary,
							...FONTS.h3,
						}}
						onPress={() => navigation.goBack()}
					/>
				</View>
				{/* Footer  */}
				<TextIconButton
					containerStyle={{
						height: 50,
						alignItems: "center",
						marginTop: 40,
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

export default SignUp;
