import React, { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	Modal,
	TouchableWithoutFeedback,
	Easing,
	ScrollView,
} from "react-native";
import Animated from "react-native-reanimated";

import { COLORS, constants, FONTS, icons, SIZES } from "../../constants";

import IconButton from "../IconButton";
import TextButton from "../TextButton";
import TextIconButton from "../TextIconButton";
import TwoPointSlider from "../TwoPointSlider";

const Section: React.FC<any> = ({ containerStyle, title, children }) => {
	return (
		<View
			style={{
				marginTop: SIZES.padding,
				...containerStyle,
			}}
		>
			<Text style={{ ...FONTS.h3 }}>{title}</Text>
			{children}
		</View>
	);
};

const FilterModal: React.FC<any> = ({ isVisible, onClose }) => {
	const modalAnimatedValue = useRef(new Animated.Value(0)).current;

	const [showFilterModal, setShowFilterModal] = useState(isVisible);

	const [deliveryTime, setDeliveryTime] = useState<number>();
	const [ratings, setRatings] = useState<number>();
	const [tags, setTags] = useState();

	useEffect(() => {
		if (showFilterModal) {
			Animated.timing(modalAnimatedValue, {
				toValue: 1,
				duration: 250,
				easing: Easing.linear as any,
			}).start();
		} else {
			Animated.timing(modalAnimatedValue, {
				toValue: 0,
				duration: 250,
				easing: Easing.linear as any,
			}).start(() => onClose());
		}
	}, [showFilterModal]);

	const modalY = modalAnimatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [SIZES.height, SIZES.height - 680],
	});

	const renderDistance = () => {
		return (
			<Section title="Distance">
				<View
					style={{
						alignItems: "center",
					}}
				>
					<TwoPointSlider
						defaultValues={[3, 10]}
						min={1}
						max={22}
						prefix=""
						postfix="km"
						onValuesChange={(values: any) =>
							console.log("values: ", values)
						}
					/>
				</View>
			</Section>
		);
	};

	const renderDeliveryTime = () => {
		return (
			<Section
				title="Delivery Time"
				containerStyle={{
					marginTop: 40,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						flexWrap: "wrap",
						marginTop: SIZES.radius,
					}}
				>
					{constants.delivery_time.map((item, index) => {
						return (
							<TextButton
								key={`Delivery_time-${index}`}
								label={item.label}
								labelStyle={{
									color:
										item.id == deliveryTime
											? COLORS.white
											: COLORS.gray,
									...FONTS.body3,
								}}
								buttonContainerStyle={{
									width: "30%",
									height: 50,
									margin: 5,
									alignItems: "center",
									borderRadius: SIZES.base,
									backgroundColor:
										item.id == deliveryTime
											? COLORS.primary
											: COLORS.lightGray2,
								}}
								onPress={() => setDeliveryTime(item.id)}
							/>
						);
					})}
				</View>
			</Section>
		);
	};

	const renderPricingRange = () => {
		return (
			<Section title="Pricing Range">
				<View
					style={{
						alignItems: "center",
					}}
				>
					<TwoPointSlider
						defaultValues={[10, 50]}
						min={1}
						max={100}
						prefix="$"
						postfix=""
						onValuesChange={(values: any) =>
							console.log("values: ", values)
						}
					/>
				</View>
			</Section>
		);
	};

	const renderRating = () => {
		return (
			<Section
				title="Ratings"
				containerStyle={{
					marginTop: 40,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						marginTop: SIZES.radius,
					}}
				>
					{constants.ratings.map((item, index) => {
						return (
							<TextIconButton
								key={`Ratings-${index}`}
								containerStyle={{
									flex: 1,
									height: 50,
									margin: 5,
									alignItems: "center",
									borderRadius: SIZES.base,
									backgroundColor:
										item.id == ratings
											? COLORS.primary
											: COLORS.lightGray2,
								}}
								label={item.label}
								labelStyle={{
									color:
										item.id == ratings
											? COLORS.white
											: COLORS.gray,
								}}
								icon={icons.star}
								iconStyle={{
									tintColor:
										item.id == ratings
											? COLORS.white
											: COLORS.gray,
								}}
								iconPosition="RIGHT"
								onPress={() => setRatings(item.id)}
							/>
						);
					})}
				</View>
			</Section>
		);
	};

	const renderTags = () => {
		return (
			<Section
				title="Tags"
				containerStyle={{
					marginTop: 40,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						flexWrap: "wrap",
						marginTop: SIZES.radius,
					}}
				>
					{constants.tags.map((item, index) => {
						return (
							<TextButton
								key={`Tags-${index}`}
								label={item.label}
								labelStyle={{
									color:
										item.id == deliveryTime
											? COLORS.white
											: COLORS.gray,
									...FONTS.body3,
								}}
								buttonContainerStyle={{
									height: 50,
									margin: 5,
									paddingHorizontal: SIZES.padding,
									alignItems: "center",
									borderRadius: SIZES.base,
									backgroundColor:
										item.id == deliveryTime
											? COLORS.primary
											: COLORS.lightGray2,
								}}
								onPress={() => setDeliveryTime(item.id)}
							/>
						);
					})}
				</View>
			</Section>
		);
	};

	return (
		<Modal animationType="fade" transparent={true} visible={isVisible}>
			<View
				style={{
					flex: 1,
					backgroundColor: COLORS.transparentBlack7,
				}}
			>
				{/* Transparent Background  */}
				<TouchableWithoutFeedback
					onPress={() => setShowFilterModal(false)}
				>
					<View
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
						}}
					/>
				</TouchableWithoutFeedback>

				<Animated.View
					style={{
						position: "absolute",
						left: 0,
						top: modalY,
						width: "100%",
						height: "100%",
						padding: SIZES.padding,
						borderTopRightRadius: SIZES.padding,
						borderTopLeftRadius: SIZES.padding,
						backgroundColor: COLORS.white,
					}}
				>
					{/* Header  */}
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginBottom: 5,
						}}
					>
						<Text
							style={{
								flex: 1,
								...FONTS.h3,
							}}
						>
							Filter Your Search
						</Text>

						<IconButton
							containerStyle={{
								borderWidth: 2,
								borderRadius: 10,
								borderColor: COLORS.gray2,
							}}
							icon={icons.cross}
							iconStyle={{
								tintColor: COLORS.gray2,
							}}
							onPress={() => setShowFilterModal(false)}
						/>
					</View>
					<ScrollView
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingBottom: 250,
						}}
					>
						{/* Distance  */}
						{renderDistance()}

						{/* Delivery Time */}
						{renderDeliveryTime()}

						{/* pricing Range */}
						{renderPricingRange()}

						{/* Ratings */}
						{renderRating()}

						{/* Tags */}
						{renderTags()}
					</ScrollView>

					{/* Apply Button */}
					<View
						style={{
							position: "absolute",
							bottom: 140,
							left: 0,
							right: 0,
							height: 110,
							paddingHorizontal: SIZES.padding,
							paddingVertical: SIZES.padding,
							backgroundColor: COLORS.white,
						}}
					>
						<TextButton
							label="Apply Filters"
							buttonContainerStyle={{
								height: 50,
								borderRadius: SIZES.base,
								backgroundColor: COLORS.primary,
							}}
							onPress={() => console.log("Apply Filter")}
						/>
					</View>
				</Animated.View>
			</View>
		</Modal>
	);
};

export default FilterModal;
