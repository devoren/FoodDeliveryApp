import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTS, icons, SIZES } from "src/constants";
import LineDivider from "../LineDivider";
import TextButton from "../TextButton";

const FooterTotal: React.FC<any> = ({
	subTotal,
	shippingFee,
	total,
	onPress,
	containerStyle,
}) => {
	return (
		<View
			style={{
				...containerStyle,
			}}
		>
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
				colors={[COLORS.transparent, COLORS.lightGray1]}
				style={{
					position: "absolute",
					top: -15,
					left: 0,
					right: 0,
					height: Platform.OS === "ios" ? 200 : 50,
					borderTopLeftRadius: 15,
					borderTopRightRadius: 15,
				}}
			/>

			<View
				style={{
					padding: 15,
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					backgroundColor: COLORS.white,
				}}
			>
				{/* Subtotal  */}
				<View
					style={{
						flexDirection: "row",
					}}
				>
					<Text
						style={{
							flex: 1,
							...FONTS.body3,
						}}
					>
						Subtotal
					</Text>
					<Text
						style={{
							...FONTS.h3,
						}}
					>
						${subTotal}
					</Text>
				</View>
				{/* Shipping Fee  */}
				<View
					style={{
						flexDirection: "row",
						marginTop: SIZES.base,
						marginBottom: SIZES.padding,
					}}
				>
					<Text
						style={{
							flex: 1,
							...FONTS.body3,
						}}
					>
						Shipping Fee
					</Text>
					<Text
						style={{
							...FONTS.h3,
						}}
					>
						${shippingFee}
					</Text>
				</View>
				{/* Line  */}
				<LineDivider />

				{/* Total  */}
				<View
					style={{
						flexDirection: "row",
						marginBottom: SIZES.padding,
					}}
				>
					<Text
						style={{
							flex: 1,
							...FONTS.h2,
						}}
					>
						Total:
					</Text>
					<Text
						style={{
							...FONTS.h2,
						}}
					>
						${total}
					</Text>
				</View>
				{/* Button  */}
				<TextButton
					buttonContainerStyle={{
						height: 60,
						marginTop: SIZES.padding,
						borderRadius: SIZES.radius,
						backgroundColor: COLORS.primary,
					}}
					label="Place Your Order"
					onPress={onPress}
				/>
			</View>
		</View>
	);
};

export default FooterTotal;
