import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import CardItem from "src/components/CardItem";
import FooterTotal from "src/components/FooterTotal";
import FormInput from "src/components/FormInput";
import Header from "src/components/Header";
import IconButton from "src/components/IconButton";
import { COLORS, dummyData, FONTS, icons, SIZES } from "src/constants";
import { State } from "src/reducers";

const Checkout: React.FC<any> = ({ navigation, route }) => {
	const [selectedCard, setSelectedCard] = useState<any>(null);
	const orderedPrice = useSelector(
		(state: State) => state.common.orderedFoodPrice
	);
	useEffect(() => {
		let { selectedCard } = route.params;
		setSelectedCard(selectedCard);
	}, []);
	console.log(orderedPrice);

	const renderHeader = () => {
		return (
			<Header
				title="CHECKOUT"
				containerStyle={{
					height: 50,
					marginHorizontal: SIZES.padding,
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
						onPress={() => navigation.goBack()}
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

	const renderMyCards = () => {
		return (
			<View>
				{selectedCard &&
					dummyData.myCards.map((item, index) => {
						return (
							<CardItem
								key={`MyCard- ${item.id}`}
								item={item}
								isSelected={
									`${selectedCard?.key}-${selectedCard?.id}` ==
									`MyCard-${item.id}`
								}
								onPress={() =>
									setSelectedCard({ ...item, key: "MyCard" })
								}
							/>
						);
					})}
			</View>
		);
	};

	const renderDeliveryAddress = () => {
		return (
			<View
				style={{
					marginTop: SIZES.padding,
				}}
			>
				<Text
					style={{
						...FONTS.h3,
					}}
				>
					Delivery Address
				</Text>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginTop: SIZES.radius,
						paddingVertical: SIZES.radius,
						paddingHorizontal: SIZES.padding,
						borderWidth: 2,
						borderRadius: SIZES.radius,
						borderColor: COLORS.lightGray2,
					}}
				>
					<Image
						source={icons.location1}
						style={{
							width: 40,
							height: 40,
						}}
					/>
					<Text
						style={{
							marginLeft: SIZES.radius,
							width: "85%",
							...FONTS.body3,
						}}
					>
						{dummyData.myProfile.address}
					</Text>
				</View>
			</View>
		);
	};

	const renderCoupon = () => {
		return (
			<View
				style={{
					marginTop: SIZES.padding,
				}}
			>
				<Text
					style={{
						...FONTS.h3,
					}}
				>
					Add Coupon
				</Text>
				<FormInput
					inputContainerStyle={{
						marginTop: 0,
						paddingLeft: SIZES.padding,
						paddingRight: 0,
						borderWidth: 2,
						borderColor: COLORS.lightGray2,
						backgroundColor: COLORS.white,
						overflow: "hidden",
					}}
					placeholder="Coupon Code"
					appendComponent={
						<View
							style={{
								width: 60,
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: COLORS.primary,
							}}
						>
							<Image
								source={icons.discount}
								style={{
									width: 40,
									height: 40,
								}}
							/>
						</View>
					}
				/>
			</View>
		);
	};
	let shippingFee = 0.0;
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: COLORS.white,
			}}
		>
			{/* Header  */}
			{renderHeader()}
			{/* Body  */}
			<KeyboardAwareScrollView
				keyboardDismissMode="on-drag"
				extraScrollHeight={0}
				contentContainerStyle={{
					flexGrow: 1,
					paddingHorizontal: SIZES.padding,
					paddingBottom: 20,
				}}
			>
				{/* My Cards  */}
				{renderMyCards()}
				{/* Delivery Address  */}
				{renderDeliveryAddress()}
				{/* Coupon  */}
				{renderCoupon()}
			</KeyboardAwareScrollView>
			<FooterTotal
				subTotal={orderedPrice}
				shippingFee={shippingFee}
				total={orderedPrice + shippingFee}
				onPress={() => navigation.replace("Success")}
			/>
		</View>
	);
};

export default Checkout;
