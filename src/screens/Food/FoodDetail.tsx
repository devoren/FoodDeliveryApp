import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartQuantityButton from "src/components/CartQuantityButton";
import Header from "src/components/Header";
import IconButton from "src/components/IconButton";
import LineDivider from "src/components/LineDivider";
import Rating from "src/components/Rating";
import StepperInput from "src/components/StepperInput";
import TextButton from "src/components/TextButton";
import TextIconButton from "src/components/TextIconButton";
import { COLORS, dummyData, FONTS, icons, SIZES } from "src/constants";
import { State } from "src/reducers";
import { setDecrement, setIncrement } from "src/reducers/common";

const FoodDetail: React.FC<any> = ({ route }) => {
	const navigation = useNavigation() as any;
	const [foodItem, setFoodItem] = useState(dummyData.vegBiryani);
	const [selectedSize, setSelectedSize] = useState<number>();
	const dispatch = useDispatch();
	const qty = useSelector((state: State) => state.common.counter);
	const [selected, setSelectedCard] = useState(null);
	let item = route.params.item;

	console.log(item.name);

	const renderHeader = () => {
		return (
			<Header
				title="DETAILS"
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
						onPress={() => navigation.navigate("Home")}
					/>
				}
				rightComponent={
					<CartQuantityButton
						quantity={dummyData.myCart.length}
						onPress={() => navigation.navigate("Cart")}
					/>
				}
			/>
		);
	};

	const renderDetails = () => {
		return (
			<View
				style={{
					marginTop: SIZES.radius,
					marginBottom: SIZES.padding,
					paddingHorizontal: SIZES.padding,
				}}
			>
				{/* Food Card  */}
				<View
					style={{
						height: 190,
						borderRadius: 15,
						backgroundColor: COLORS.lightGray2,
					}}
				>
					{/* Calories & Favourite  */}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginTop: SIZES.base,
							paddingHorizontal: SIZES.radius,
						}}
					>
						{/* Calories  */}
						<View
							style={{
								flexDirection: "row",
							}}
						>
							<Image
								source={icons.calories}
								style={{
									width: 30,
									height: 30,
								}}
							/>

							<Text
								style={{
									color: COLORS.darkGray2,
									...FONTS.body4,
								}}
							>
								{item.calories} calories
							</Text>
						</View>
						{/* Favourite  */}
						<Image
							source={icons.love}
							style={{
								width: 20,
								height: 20,
								tintColor: item.isFavourite
									? COLORS.primary
									: COLORS.gray,
							}}
						/>
					</View>
					{/* Food Image  */}
					<Image
						source={item.image}
						resizeMode="contain"
						style={{
							height: 170,
							width: "100%",
						}}
					/>
				</View>
				{/* Food Info  */}
				<View
					style={{
						marginTop: SIZES.padding,
					}}
				>
					<Text
						style={{
							...FONTS.h1,
						}}
					>
						{item.name}
					</Text>
					<Text
						style={{
							marginTop: SIZES.base,
							color: COLORS.darkGray,
							textAlign: "justify",
							...FONTS.body3,
						}}
					>
						{item.description}
					</Text>

					<View
						style={{
							flexDirection: "row",
							marginTop: SIZES.padding,
						}}
					>
						{/* Ratings  */}
						<TextIconButton
							containerStyle={{
								backgroundColor: COLORS.primary,
								paddingVertical: SIZES.base,
								paddingHorizontal: SIZES.radius,
								borderRadius: SIZES.radius,
							}}
							icon={icons.star}
							iconStyle={{
								tintColor: COLORS.white,
							}}
							iconPosition="LEFT"
							label="4.5"
							labelStyle={{
								color: COLORS.white,
								marginLeft: SIZES.base,
							}}
							disabled={true}
						/>
						{/* Duration  */}
						<TextIconButton
							containerStyle={{
								paddingVertical: SIZES.base,
								marginLeft: SIZES.radius,
							}}
							icon={icons.clock}
							iconStyle={{
								tintColor: COLORS.black,
							}}
							iconPosition="LEFT"
							label="30 mins"
							labelStyle={{
								marginLeft: SIZES.base,
							}}
							disabled={true}
						/>
						{/* Shipping  */}
						<TextIconButton
							containerStyle={{
								paddingVertical: SIZES.base,
								marginLeft: SIZES.radius,
							}}
							icon={icons.dollar}
							iconStyle={{
								tintColor: COLORS.black,
							}}
							iconPosition="LEFT"
							label="Free Shipping"
							labelStyle={{
								marginLeft: SIZES.base,
							}}
							disabled={true}
						/>
					</View>

					{/* Sizes  */}
					<View
						style={{
							flexDirection: "row",
							marginTop: SIZES.padding,
							alignItems: "center",
						}}
					>
						<Text
							style={{
								...FONTS.h3,
							}}
						>
							Sizes:
						</Text>
						<View
							style={{
								flexDirection: "row",
								flexWrap: "wrap",
								marginLeft: SIZES.padding,
							}}
						>
							{dummyData.sizes.map((item, index) => {
								return (
									<TextButton
										key={`Sizes- ${index}`}
										buttonContainerStyle={{
											width: 55,
											height: 55,
											margin: SIZES.base,
											borderWidth: 1,
											borderRadius: SIZES.radius,
											borderColor:
												selectedSize == item.id
													? COLORS.primary
													: COLORS.gray2,
											backgroundColor:
												selectedSize == item.id
													? COLORS.primary
													: null,
										}}
										label={item.label}
										labelStyle={{
											color:
												selectedSize == item.id
													? COLORS.white
													: COLORS.gray2,
											...FONTS.body2,
										}}
										onPress={() => setSelectedSize(item.id)}
									/>
								);
							})}
						</View>
					</View>
				</View>
			</View>
		);
	};

	const renderRestaurant = () => {
		return (
			<View
				style={{
					flexDirection: "row",
					marginVertical: SIZES.padding,
					paddingHorizontal: SIZES.padding,
					alignItems: "center",
				}}
			>
				<Image
					source={icons.cafe}
					style={{
						width: 50,
						height: 50,
					}}
				/>

				{/* Info  */}
				<View
					style={{
						flex: 1,
						marginLeft: SIZES.base * 2,
						justifyContent: "center",
					}}
				>
					<Text
						style={{
							...FONTS.h3,
						}}
					>
						Bahandi Burger
					</Text>
					<Text
						style={{
							color: COLORS.gray,
							...FONTS.body4,
						}}
					>
						1.2 KM away from you
					</Text>
				</View>

				{/* Ratings  */}
				<Rating
					rating={4}
					iconStyle={{
						marginLeft: 3,
					}}
				/>
			</View>
		);
	};

	const renderFooter = () => {
		const newPrice = qty * item.price;
		return (
			<View
				style={{
					flexDirection: "row",
					height: 110,
					alignItems: "center",
					paddingHorizontal: SIZES.padding,
					paddingBottom: SIZES.radius,
				}}
			>
				<StepperInput
					value={qty}
					onAdd={() => {
						dispatch(setIncrement());
					}}
					onMinus={() => {
						if (qty > 1) {
							dispatch(setDecrement());
						}
					}}
				/>
				<TextButton
					buttonContainerStyle={{
						flex: 1,
						flexDirection: "row",
						height: 60,
						marginLeft: SIZES.radius,
						paddingHorizontal: SIZES.radius,
						borderRadius: SIZES.radius,
						backgroundColor: COLORS.primary,
					}}
					label="Buy Now"
					label2={"$" + newPrice}
					onPress={() => navigation.navigate("Cart", { item })}
				/>
			</View>
		);
	};
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
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}
			>
				{/* Food Detail  */}
				{renderDetails()}
				<LineDivider />
				{/* Restaurant  */}
				{renderRestaurant()}
			</ScrollView>
			{/* Footer  */}
			<LineDivider />
			{renderFooter()}
		</View>
	);
};

export default FoodDetail;
