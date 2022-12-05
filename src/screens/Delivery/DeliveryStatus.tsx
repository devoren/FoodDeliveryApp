import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import Header from "src/components/Header";
import IconButton from "src/components/IconButton";
import LineDivider from "src/components/LineDivider";
import TextButton from "src/components/TextButton";
import TextIconButton from "src/components/TextIconButton";
import { COLORS, constants, FONTS, icons, images, SIZES } from "src/constants";

const DeliveryStatus: React.FC<any> = ({ navigation }) => {
	const [currentStep, setCurrentStep] = useState(3);

	const renderHeader = () => {
		return (
			<Header
				title="DELIVERY STATUS"
				containerStyle={{
					height: 50,
					// marginHorizontal: SIZES.padding,
					marginTop: 8,
				}}
				leftComponent={
					<IconButton
						icon={icons.back}
						containerStyle={{
							width: 40,
							height: 40,
							justifyContent: "center",
							alignItems: "center",
							borderWidth: 1,
							borderRadius: SIZES.radius,
							borderColor: COLORS.gray2,
						}}
						iconStyle={{
							width: 20,
							height: 20,
							tintColor: COLORS.gray2,
						}}
						onPress={() => navigation.navigate("Cart")}
					/>
				}
				rightComponent={
					<View
						style={{
							width: 40,
						}}
					/>
				}
			/>
		);
	};

	const renderInfo = () => {
		return (
			<View
				style={{
					marginTop: SIZES.radius,
					paddingHorizontal: SIZES.padding,
				}}
			>
				<Text
					style={{
						textAlign: "center",
						color: COLORS.gray,
						...FONTS.body4,
					}}
				>
					Estimated Delivery
				</Text>
				<Text
					style={{
						textAlign: "center",
						...FONTS.h2,
					}}
				>
					12 Feb 2022 / 12:30PM
				</Text>
			</View>
		);
	};

	const renderTrackOrder = () => {
		return (
			<View
				style={{
					marginTop: SIZES.padding,
					paddingVertical: SIZES.padding,
					borderRadius: SIZES.radius,
					borderWidth: 2,
					borderColor: COLORS.lightGray2,
					backgroundColor: COLORS.white2,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: 20,
						paddingHorizontal: SIZES.padding,
					}}
				>
					<Text
						style={{
							...FONTS.h3,
						}}
					>
						Track Order
					</Text>
					<Text
						style={{
							color: COLORS.gray,
							...FONTS.body3,
						}}
					>
						AL012345
					</Text>
				</View>
				<LineDivider
					lineStyle={{
						backgroundColor: COLORS.lightGray2,
					}}
				/>
				<View
					style={{
						marginTop: SIZES.padding,
						paddingHorizontal: SIZES.padding,
					}}
				>
					{constants.track_order_status.map((item, index) => {
						return (
							<View key={`StatusList-${index}`}>
								<View
									style={{
										flexDirection: "row",
										alignItems: "center",
										marginVertical: -5,
									}}
								>
									<Image
										source={icons.check_circle}
										style={{
											width: 40,
											height: 40,
											tintColor:
												index <= currentStep
													? COLORS.primary
													: COLORS.lightGray1,
										}}
									/>
									<View
										style={{
											marginLeft: SIZES.radius,
										}}
									>
										<Text
											style={{
												...FONTS.h3,
											}}
										>
											{item.title}
										</Text>
										<Text
											style={{
												color: COLORS.gray,
												...FONTS.body4,
											}}
										>
											{item.sub_title}
										</Text>
									</View>
								</View>
								{index <
									constants.track_order_status.length - 1 && (
									<View>
										{index < currentStep && (
											<View
												style={{
													height: 50,
													width: 3,
													marginLeft: 18,
													backgroundColor:
														COLORS.primary,
													zIndex: -1,
												}}
											/>
										)}
										{index >= currentStep && (
											<Image
												source={icons.dotted_line}
												resizeMode="cover"
												style={{
													width: 4,
													height: 50,
													marginLeft: 17,
												}}
											/>
										)}
									</View>
								)}
							</View>
						);
					})}
				</View>
			</View>
		);
	};

	const renderFooter = () => {
		return (
			<View
				style={{
					marginTop: SIZES.radius,
					marginBottom: SIZES.padding,
				}}
			>
				{currentStep < constants.track_order_status.length - 1 && (
					<View
						style={{
							flexDirection: "row",
							height: 55,
						}}
					>
						<TextButton
							label="Cancel"
							labelStyle={{
								color: COLORS.primary,
							}}
							buttonContainerStyle={{
								width: "40%",
								borderRadius: SIZES.base,
								backgroundColor: COLORS.lightGray2,
							}}
							onPress={() => navigation.navigate("Home")}
						/>
						<TextIconButton
							containerStyle={{
								flex: 1,
								marginLeft: SIZES.radius,
								borderRadius: SIZES.base,
								backgroundColor: COLORS.primary,
							}}
							label="Map View"
							labelStyle={{
								color: COLORS.white,
								...FONTS.h3,
							}}
							icon={icons.map}
							iconStyle={{
								width: 25,
								height: 25,
								tintColor: COLORS.white,
								marginRight: SIZES.base,
							}}
							iconPosition="LEFT"
							onPress={() => navigation.navigate("Map")}
						/>
					</View>
				)}
				{currentStep == constants.track_order_status.length - 1 && (
					<TextButton
						label="DONE"
						buttonContainerStyle={{
							height: 55,
							borderRadius: SIZES.base,
						}}
						onPress={() => navigation.navigate("Home")}
					/>
				)}
			</View>
		);
	};

	return (
		<View
			style={{
				flex: 1,
				paddingHorizontal: SIZES.padding,
				backgroundColor: COLORS.white,
			}}
		>
			{/* Header  */}
			{renderHeader()}

			{/* Info  */}
			{renderInfo()}

			{/* Track Order  */}
			<ScrollView showsVerticalScrollIndicator={false}>
				{renderTrackOrder()}
			</ScrollView>
			{/* Footer  */}
			{renderFooter()}
		</View>
	);
};

export default DeliveryStatus;
