import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	Modal,
	Alert,
} from "react-native";
import { COLORS, FONTS, icons, SIZES } from "src/constants";
import { AuthLayout } from "..";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import TextButton from "src/components/TextButton";

const Otp: React.FC<any> = ({ navigation }) => {
	const [timer, setTimer] = useState(60);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let interval = setInterval(() => {
			setTimer((prevTimer) => {
				if (prevTimer > 0) {
					return prevTimer - 1;
				} else {
					return prevTimer;
				}
			});
		}, 1000);
		return () => clearInterval(interval);
	}, []);
	const goPrevScreen = () => {
		const routes = navigation.getState()?.routes;
		const prevRoute = routes[routes.length - 2];
		console.log(prevRoute.name);

		if (prevRoute.name == "SignUp") {
			navigation.replace("Home");
		} else if (prevRoute.name == "ForgotPassword") {
			navigation.replace("SignIn");
		}
	};
	return (
		<AuthLayout
			title="OTP Authentication"
			subtitle="An authentication code has been sent to EMAIL"
			titleContainerStyle={{
				marginTop: SIZES.padding * 2,
			}}
		>
			{/* OTP inputs  */}
			<View
				style={{
					flex: 1,
					marginTop: SIZES.padding * 2,
				}}
			>
				<OTPInputView
					pinCount={4}
					style={{
						width: "100%",
						height: 65,
						backgroundColor: COLORS.white,
					}}
					codeInputFieldStyle={{
						width: 65,
						height: 65,
						borderRadius: SIZES.radius,
						backgroundColor: COLORS.lightGray2,
						color: COLORS.black,
						...FONTS.h3,
					}}
					codeInputHighlightStyle={{
						borderColor: COLORS.primary,
					}}
					onCodeFilled={(code) => {
						console.log(code);
						goPrevScreen();
					}}
				/>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						marginTop: SIZES.padding,
					}}
				>
					<Text
						style={{
							color: COLORS.darkGray2,
							...FONTS.body3,
						}}
					>
						Didn't receive code?
					</Text>
					<TextButton
						label={
							timer == 0 || timer == 60
								? "Resend"
								: `Resend (${timer}s)`
						}
						disabled={timer == 0 ? false : true}
						buttonContainerStyle={{
							marginLeft: SIZES.base,
							backgroundColor: null,
						}}
						labelStyle={{
							color: COLORS.primary,
							...FONTS.h3,
						}}
						onPress={() => setTimer(60)}
					/>
				</View>
			</View>
			{/* Footer  */}
			<View>
				<TextButton
					label="Continue"
					buttonContainerStyle={{
						height: 50,
						marginBottom: SIZES.radius,
						alignItems: "center",
						borderRadius: SIZES.radius,
					}}
					onPress={() => {
						console.log("Continue");
						setTimeout(() => {
							<ActivityIndicator size={"small"} />;
						}, 3000);
						goPrevScreen();
					}}
				/>
				<View
					style={{
						marginTop: SIZES.padding,
						alignItems: "center",
					}}
				>
					<Text
						style={{
							color: COLORS.darkGray,
							...FONTS.body3,
						}}
					>
						By signing up, you agree to our.
					</Text>
					<TextButton
						label={"Terms and Conditions"}
						buttonContainerStyle={{
							marginBottom: SIZES.base,
							backgroundColor: null,
						}}
						labelStyle={{
							color: COLORS.primary,
							...FONTS.body3,
						}}
						onPress={() => {
							console.log("TnC");
						}}
					/>
				</View>
			</View>
		</AuthLayout>
	);
};

export default Otp;
