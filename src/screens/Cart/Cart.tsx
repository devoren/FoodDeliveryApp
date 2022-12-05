import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useDispatch, useSelector } from "react-redux";
import CartQuantityButton from "src/components/CartQuantityButton";
import FooterTotal from "src/components/FooterTotal";
import Header from "src/components/Header";
import IconButton from "src/components/IconButton";
import StepperInput from "src/components/StepperInput";
import { COLORS, dummyData, FONTS, icons, SIZES } from "src/constants";
import { State } from "src/reducers";
import { setFoodPrice } from "src/reducers/common";

const Cart: React.FC<any> = ({ navigation, route }) => {
	const [myCartList, setMyCartList] = useState(dummyData.myCart);
	const selectedTab = useSelector((state: State) => state.common.selected);

	const dispatch = useDispatch();

	const updateQuantityHandler = (newQty: number, id: number) => {
		const newMyCartList = myCartList.map((cl) =>
			cl.id === id ? { ...cl, qty: newQty } : cl
		);

		setMyCartList(newMyCartList);
		// for (let index = 0; index < dummyData.myCart[index].id; index++) {
		// 	element = dummyData.myCart[index].qty + dummyData.myCart[index].qty;
		// }
	};

	const removeMyCartHandler = (id: number) => {
		let newMyCartList = [...myCartList];

		const index = newMyCartList.findIndex((cart) => cart.id === id);
		newMyCartList.splice(index, 1);
		setMyCartList(newMyCartList);
	};

	const renderHeader = () => {
		return (
			<Header
				title="MY CART"
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
					<CartQuantityButton
						quantity={dummyData.myCart.length}
						onPress={() => {
							navigation.navigate("Cart");
						}}
					/>
				}
			/>
		);
	};

	const renderCartList = () => {
		return (
			<SwipeListView
				data={myCartList}
				keyExtractor={(item) => `${item.id}`}
				contentContainerStyle={{
					marginTop: SIZES.radius,
					paddingHorizontal: SIZES.padding,
					paddingBottom: SIZES.padding * 2,
					flexGrow: 1,
				}}
				disableRightSwipe={true}
				rightOpenValue={-75}
				renderItem={(data, rowMap) => (
					<View
						style={{
							height: 100,
							backgroundColor: COLORS.lightGray2,
							...styles.cartItemContainer,
						}}
					>
						<View
							style={{
								width: 90,
								height: 100,
								marginLeft: -10,
							}}
						>
							<Image
								source={data.item.image}
								resizeMode="contain"
								style={{
									width: "100%",
									height: "100%",
									position: "absolute",
									top: 10,
								}}
							/>
						</View>

						<View
							style={{
								flex: 1,
							}}
						>
							<Text
								style={{
									...FONTS.body3,
								}}
							>
								{data.item.name}
							</Text>
							<Text
								style={{
									color: COLORS.primary,
									...FONTS.h3,
								}}
							>
								${data.item.price}
							</Text>
						</View>
						{/* Quantity  */}
						<StepperInput
							containerStyle={{
								height: 50,
								width: 125,
								backgroundColor: COLORS.white,
							}}
							value={data.item.qty}
							onAdd={() =>
								updateQuantityHandler(
									data.item.qty + 1,
									data.item.id
								)
							}
							onMinus={() => {
								if (data.item.qty > 1) {
									updateQuantityHandler(
										data.item.qty - 1,
										data.item.id
									);
								}
							}}
						/>
					</View>
				)}
				renderHiddenItem={(data, rowMap) => (
					<IconButton
						containerStyle={{
							flex: 1,
							justifyContent: "flex-end",
							backgroundColor: COLORS.primary,
							...styles.cartItemContainer,
						}}
						icon={icons.delete_icon}
						iconStyle={{
							marginRight: 10,
						}}
						onPress={() => removeMyCartHandler(data.item.id)}
					/>
				)}
			/>
		);
	};

	let shippingFee = 0;
	let subTotalPrice =
		myCartList[0].price * myCartList[0].qty +
		myCartList[1].price * myCartList[1].qty +
		myCartList[2].price * myCartList[2].qty;

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: COLORS.white,
			}}
		>
			{/* Header  */}
			{selectedTab != "Cart" ? renderHeader() : null}

			{/* Cart List  */}
			{renderCartList()}

			{/* Footer Total  */}
			<FooterTotal
				containerStyle={selectedTab == "Cart" ? { bottom: 180 } : null}
				subTotal={subTotalPrice.toFixed(2)}
				shippingFee={shippingFee.toFixed(2)}
				total={(subTotalPrice + shippingFee).toFixed(2)}
				onPress={() => {
					dispatch(setFoodPrice(Number(subTotalPrice.toFixed(2))));
					navigation.navigate("MyCard");
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	cartItemContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: SIZES.radius,
		paddingHorizontal: SIZES.radius,
		borderRadius: SIZES.radius,
	},
});

export default Cart;
