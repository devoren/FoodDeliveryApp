import {
	createDrawerNavigator,
	DrawerContentScrollView,
	useDrawerProgress,
} from "@react-navigation/drawer";
import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import LineDivider from "src/components/LineDivider";
import { styledAnimation } from "src/components/ScaleAnimation";
import {
	COLORS,
	constants,
	dummyData,
	FONTS,
	icons,
	SIZES,
} from "src/constants";
import { State } from "src/reducers";
import { setSelectedTab } from "src/reducers/common";
import { MainLayout, Search } from "src/screens";
import Cart from "../Cart/Cart";

const CustomDrawerItem: React.FC<any> = ({
	label,
	icon,
	isFocused,
	onPress,
}) => {
	return (
		<TouchableOpacity
			style={{
				flexDirection: "row",
				height: 40,
				marginBottom: SIZES.base,
				alignItems: "center",
				paddingLeft: SIZES.radius,
				borderRadius: SIZES.base,
				backgroundColor: isFocused
					? COLORS.transparentBlack1
					: undefined,
			}}
			onPress={onPress}
		>
			<Image
				source={icon}
				style={{
					width: 20,
					height: 20,
					tintColor: COLORS.white,
				}}
			/>
			<Text
				style={{
					marginLeft: 15,
					color: COLORS.white,
					...FONTS.h3,
				}}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

const CustomDrawerContent: React.FC<any> = ({ navigation, selectedTab }) => {
	const dispatch = useDispatch();
	const user = useSelector((state: State) => state.account.user);

	return (
		<DrawerContentScrollView
			scrollEnabled={true}
			contentContainerStyle={{
				flex: 1,
			}}
		>
			{/* {Close} */}
			<View
				style={{
					flex: 1,
					paddingHorizontal: SIZES.radius,
					// backgroundColor: "red",
				}}
			>
				<View
					style={{
						alignItems: "flex-start",
						justifyContent: "center",
					}}
				>
					<TouchableOpacity
						style={{
							alignItems: "center",
							justifyContent: "center",
							// backgroundColor: "blue",
						}}
						onPress={() => navigation.closeDrawer()}
					>
						<Image
							source={icons.cross}
							style={{
								height: 35,
								width: 35,
								tintColor: COLORS.white,
							}}
						/>
					</TouchableOpacity>
				</View>

				{/* Profile */}
				<TouchableOpacity
					style={{
						flexDirection: "row",
						marginTop: SIZES.radius,
						alignItems: "center",
					}}
					onPress={() => console.log("Profile")}
				>
					<Image
						source={dummyData.myProfile?.profile_image}
						style={{
							width: 50,
							height: 50,
							borderRadius: SIZES.radius,
						}}
					/>

					<View
						style={{
							marginLeft: SIZES.radius,
						}}
					>
						<Text
							style={{
								color: COLORS.white,
								...FONTS.h3,
							}}
						>
							{/* {firstname}
							 {lastname} */}
							Hello, {user.username}
						</Text>
						<Text
							style={{
								color: COLORS.white,
								...FONTS.body4,
							}}
						>
							View your profile
						</Text>
					</View>
				</TouchableOpacity>
				{/* Drawer Items  */}
				<View
					style={{
						flex: 1,
						marginTop: SIZES.padding,
					}}
				>
					<CustomDrawerItem
						label={constants.screens.home}
						icon={icons.home}
						isFocused={selectedTab == constants.screens.home}
						onPress={() => {
							dispatch(setSelectedTab(constants.screens.home));
							navigation.navigate("MainLayout");
						}}
					/>

					<CustomDrawerItem
						label={constants.screens.my_wallet}
						icon={icons.wallet}
						// isFocused={selectedTab == constants.screens.my_wallet}
						// onPress={() => {
						// 	dispatch(
						// 		setSelectedTab(constants.screens.my_wallet)
						// 	);
						// 	navigation.navigate("Search");
						// }}
					/>

					<CustomDrawerItem
						label={constants.screens.cart}
						icon={icons.cart}
						isFocused={selectedTab == constants.screens.cart}
						onPress={() => {
							dispatch(setSelectedTab(constants.screens.cart));
							navigation.navigate("MainLayout");
						}}
					/>

					<CustomDrawerItem
						label={constants.screens.notification}
						icon={icons.notification}
						isFocused={
							selectedTab == constants.screens.notification
						}
						onPress={() => {
							dispatch(
								setSelectedTab(constants.screens.notification)
							);
							navigation.navigate("MainLayout");
						}}
					/>

					<CustomDrawerItem
						label={constants.screens.favourite}
						icon={icons.favourite}
						isFocused={selectedTab == constants.screens.favourite}
						onPress={() => {
							dispatch(
								setSelectedTab(constants.screens.favourite)
							);
							navigation.navigate("MainLayout");
						}}
					/>

					{/* Line Divider */}
					<LineDivider
						lineStyle={{
							height: 1,
							marginVertical: SIZES.radius,
							marginLeft: SIZES.radius,
							backgroundColor: COLORS.lightGray1,
						}}
					/>

					<CustomDrawerItem
						label={"Track Your Order"}
						icon={icons.location}
						// isFocused={
						// 	selectedTab == constants.screens.track_order_status
						// }
						onPress={() => {
							// dispatch(
							// 	setSelectedTab(
							// 		constants.screens.track_order_status
							// 	)
							// );
							navigation.navigate("DeliveryStatus");
						}}
					/>
					<CustomDrawerItem label={"Coupons"} icon={icons.coupon} />
					<CustomDrawerItem label={"Settings"} icon={icons.setting} />
					<CustomDrawerItem
						label={"Invite a Friend"}
						icon={icons.profile}
					/>
					<CustomDrawerItem label={"Help Center"} icon={icons.help} />
				</View>
				<View
					style={{
						marginBottom: SIZES.padding,
					}}
				>
					<CustomDrawerItem
						label={"Logout"}
						icon={icons.logout}
						onPress={() => {
							dispatch(setSelectedTab(constants.screens.home));
							navigation.replace("SignIn");
						}}
					/>
				</View>
			</View>
		</DrawerContentScrollView>
	);
};

const Drawer = createDrawerNavigator();
const CustomDrawer: React.FC<any> = ({}) => {
	const selectedTab = useSelector((state: State) => state.common.selected);

	return (
		<View style={{ flex: 1, backgroundColor: COLORS.primary }}>
			<Drawer.Navigator
				screenOptions={{
					drawerType: "slide",
					headerShown: false,
					drawerStyle: {
						flex: 1,
						width: "65%",
						paddingRight: 20,
						backgroundColor: "transparent",
					},
					overlayColor: "transparent",
					sceneContainerStyle: {
						backgroundColor: "transparent",
					},
				}}
				initialRouteName="MainLayout"
				drawerContent={(props) => {
					return (
						<CustomDrawerContent
							navigation={props.navigation}
							selectedTab={selectedTab}
						/>
					);
				}}
			>
				<Drawer.Screen name="MainLayout">
					{(props) => (
						<MainLayout
							{...props}
							// drawerAnimationStyle={styledAnimation}
						/>
					)}
				</Drawer.Screen>
				{/* <Drawer.Screen name="Search">
					{(props) => (
						<Cart
							{...props}
							// drawerAnimationStyle={styledAnimation}
						/>
					)}
				</Drawer.Screen> */}
			</Drawer.Navigator>
		</View>
	);
};

export default CustomDrawer;
