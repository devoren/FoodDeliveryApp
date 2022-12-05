import React, { useEffect, useRef } from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";

import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import {
	COLORS,
	constants,
	dummyData,
	FONTS,
	icons,
	SIZES,
} from "../constants";

import { State } from "src/reducers";
import { setSelectedTab } from "src/reducers/common";
import { useDispatch, useSelector } from "react-redux";
import Header from "src/components/Header";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import Home from "./Home/Home";
import Search from "./Search/Search";
import Favourite from "./Favourite/Favourite";
import Notification from "./Notification/Notification";
import Cart from "./Cart/Cart";

const TabButton: React.FC<any> = ({
	label,
	icon,
	isFocused,
	outerContainerStyle,
	innerContainerStyle,
	onPress,
}) => {
	return (
		<TouchableWithoutFeedback
			onPress={onPress}
			// style={{
			// 	flex: 1,
			// }}
		>
			<Animated.View
				style={[
					{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						// backgroundColor: "blue",
					},
					outerContainerStyle,
				]}
			>
				<Animated.View
					style={[
						{
							flexDirection: "row",
							width: "80%",
							height: 50,
							alignItems: "center",
							justifyContent: "center",
							// backgroundColor: "yellow",
							borderRadius: 25,
						},
						innerContainerStyle,
					]}
				>
					<Image
						source={icon}
						style={{
							width: 20,
							height: 20,
							// backgroundColor: "green",
							tintColor: isFocused ? COLORS.white : COLORS.gray,
						}}
					/>
					{isFocused && (
						<Text
							numberOfLines={1}
							style={{
								marginLeft: SIZES.base,
								color: isFocused ? COLORS.white : COLORS.gray,
								...FONTS.h3,
							}}
						>
							{label}
						</Text>
					)}
				</Animated.View>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

const MainLayout: React.FC<any> = ({ drawerAnimationStyle, navigation }) => {
	const dispatch = useDispatch();
	const selectedTab = useSelector((state: State) => state.common.selected);
	const flatListRef = useRef<any>(null);

	const homeTabFlex = useSharedValue(0);
	const homeTabColor = useSharedValue(COLORS.white);
	const searchTabFlex = useSharedValue(0);
	const searchTabColor = useSharedValue(COLORS.white);
	const cartTabFlex = useSharedValue(0);
	const cartTabColor = useSharedValue(COLORS.white);
	const favouriteTabFlex = useSharedValue(0);
	const favouriteTabColor = useSharedValue(COLORS.white);
	const notificationTabFlex = useSharedValue(0);
	const notificationTabColor = useSharedValue(COLORS.white);
	console.log(homeTabFlex.value);

	const homeFlexStyle = useAnimatedStyle(() => {
		return {
			flex: homeTabFlex.value,
		};
	});

	const homeColorStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: homeTabColor.value,
		};
	});

	const searchFlexStyle = useAnimatedStyle(() => {
		return {
			flex: searchTabFlex.value,
		};
	});

	const searchColorStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: searchTabColor.value,
		};
	});
	const cartFlexStyle = useAnimatedStyle(() => {
		return {
			flex: cartTabFlex.value,
		};
	});

	const cartColorStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: cartTabColor.value,
		};
	});
	const favouriteFlexStyle = useAnimatedStyle(() => {
		return {
			flex: favouriteTabFlex.value,
		};
	});

	const favouriteColorStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: favouriteTabColor.value,
		};
	});
	const notificationFlexStyle = useAnimatedStyle(() => {
		return {
			flex: notificationTabFlex.value,
		};
	});

	const notificationColorStyle = useAnimatedStyle(() => {
		return {
			backgroundColor: notificationTabColor.value,
		};
	});

	useEffect(() => {
		if (selectedTab == constants.screens.home) {
			flatListRef.current.scrollToIndex({
				index: 0,
				animated: false,
			});

			homeTabFlex.value = withTiming(4, { duration: 250 });
			// @ts-ignore: Unreachable code error
			homeTabColor.value = withTiming(COLORS.primary, { duration: 250 });
		} else {
			homeTabFlex.value = withTiming(1, { duration: 250 });
			// @ts-ignore: Unreachable code error
			homeTabColor.value = withTiming(COLORS.white, { duration: 250 });
		}
		if (selectedTab == constants.screens.search) {
			flatListRef.current.scrollToIndex({
				index: 1,
				animated: false,
			});
			searchTabFlex.value = withTiming(4, { duration: 250 });
			// @ts-ignore: Unreachable code error
			searchTabColor.value = withTiming(COLORS.primary, {
				duration: 250,
			});
		} else {
			searchTabFlex.value = withTiming(1, { duration: 250 });
			// @ts-ignore: Unreachable code error
			searchTabColor.value = withTiming(COLORS.white, { duration: 250 });
		}
		if (selectedTab == constants.screens.cart) {
			flatListRef.current.scrollToIndex({
				index: 2,
				animated: false,
			});
			cartTabFlex.value = withTiming(4, { duration: 250 });
			// @ts-ignore: Unreachable code error
			cartTabColor.value = withTiming(COLORS.primary, {
				duration: 250,
			});
		} else {
			cartTabFlex.value = withTiming(1, { duration: 250 });
			// @ts-ignore: Unreachable code error
			cartTabColor.value = withTiming(COLORS.white, { duration: 250 });
		}
		if (selectedTab == constants.screens.favourite) {
			flatListRef.current.scrollToIndex({
				index: 3,
				animated: false,
			});
			favouriteTabFlex.value = withTiming(4, { duration: 250 });
			// @ts-ignore: Unreachable code error
			favouriteTabColor.value = withTiming(COLORS.primary, {
				duration: 250,
			});
		} else {
			favouriteTabFlex.value = withTiming(1, { duration: 250 });
			// @ts-ignore: Unreachable code error
			favouriteTabColor.value = withTiming(COLORS.white, {
				duration: 250,
			});
		}
		if (selectedTab == constants.screens.notification) {
			flatListRef.current.scrollToIndex({
				index: 4,
				animated: false,
			});
			notificationTabFlex.value = withTiming(4, { duration: 250 });
			// @ts-ignore: Unreachable code error
			notificationTabColor.value = withTiming(COLORS.primary, {
				duration: 250,
			});
		} else {
			notificationTabFlex.value = withTiming(1, { duration: 250 });
			// @ts-ignore: Unreachable code error
			notificationTabColor.value = withTiming(COLORS.white, {
				duration: 250,
			});
		}
	}, [selectedTab]);

	// console.log("data: ", homeTabFlex.value, homeTabColor.value);

	return (
		<Animated.View
			style={{
				flex: 1,
				backgroundColor: COLORS.white,
				...drawerAnimationStyle,
			}}
		>
			{/* Header */}
			<Header
				containerStyle={{
					height: 50,
					paddingHorizontal: SIZES.padding,
					marginTop: 30,
					alignItems: "center",
				}}
				title={selectedTab.toUpperCase()}
				leftComponent={
					<TouchableOpacity
						style={{
							width: 40,
							height: 40,
							alignItems: "center",
							justifyContent: "center",
							borderWidth: 1,
							borderColor: COLORS.gray2,
							borderRadius: SIZES.radius,
						}}
						onPress={() => navigation.openDrawer()}
					>
						<Image source={icons.menu} />
					</TouchableOpacity>
				}
				rightComponent={
					<TouchableOpacity
						style={{
							alignItems: "center",
							justifyContent: "center",
							borderRadius: SIZES.radius,
						}}
						onPress={() => navigation.navigate("SignIn")}
					>
						<Image
							source={dummyData.myProfile.profile_image}
							style={{
								width: 40,
								height: 40,
								borderRadius: SIZES.radius,
							}}
						/>
					</TouchableOpacity>
				}
			/>
			{/* Content */}
			<View
				style={{
					flex: 1,
				}}
			>
				<FlatList
					style={{ flexGrow: 0 }}
					removeClippedSubviews={false}
					ref={flatListRef}
					horizontal
					scrollEnabled={false}
					pagingEnabled
					snapToAlignment="center"
					snapToInterval={SIZES.width}
					overScrollMode="always"
					showsHorizontalScrollIndicator={false}
					data={constants.bottom_tabs}
					keyExtractor={(item) => `${item.id}`}
					renderItem={({ item, index }) => {
						return (
							<View
								style={{
									height: SIZES.height,
									width: SIZES.width,
								}}
							>
								{item.label == constants.screens.home &&
									((index = 0), (<Home />))}
								{item.label == constants.screens.search &&
									((index = 1), (<Search />))}
								{item.label == constants.screens.cart &&
									((index = 2), (<Cart />))}
								{item.label == constants.screens.favourite &&
									((index = 3), (<Favourite />))}
								{item.label == constants.screens.notification &&
									((index = 4), (<Notification />))}
							</View>
						);
					}}
					onScrollToIndexFailed={(error) => {
						flatListRef.current.scrollToOffset({
							offset: error.averageItemLength * error.index,
							animated: false,
						});
						setTimeout(() => {
							if (
								constants.bottom_tabs.length !== 0 &&
								flatListRef !== null
							) {
								flatListRef.current.scrollToIndex({
									index: error.index,
									animated: false,
								});
							}
						}, 100);
					}}
				/>
			</View>
			{/* Footer */}
			<View
				style={{
					height: 80,
					justifyContent: "flex-end",
				}}
			>
				{/* Shadow */}

				<LinearGradient
					start={{
						x: 0,
						y: 0,
					}}
					end={{ x: 0, y: 0.4 }}
					colors={[COLORS.transparent, COLORS.lightGray1]}
					style={{
						position: "absolute",
						top: -20,
						left: 0,
						right: 0,
						height: 80,
						borderTopLeftRadius: 15,
						borderTopRightRadius: 15,
					}}
				/>
				{/* Tabs */}
				<View
					style={{
						flex: 1,
						flexDirection: "row",
						paddingHorizontal: SIZES.radius,
						// paddingBottom: 10,
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						borderBottomLeftRadius: 25,
						backgroundColor: COLORS.white,
					}}
				>
					<TabButton
						label={constants.screens.home}
						icon={icons.home}
						isFocused={selectedTab == constants.screens.home}
						outerContainerStyle={homeFlexStyle}
						innerContainerStyle={homeColorStyle}
						onPress={() => {
							dispatch(setSelectedTab(constants.screens.home));
							navigation.navigate("MainLayout");
						}}
					/>
					<TabButton
						label={constants.screens.search}
						icon={icons.search}
						isFocused={selectedTab == constants.screens.search}
						outerContainerStyle={searchFlexStyle}
						innerContainerStyle={searchColorStyle}
						onPress={() => {
							dispatch(setSelectedTab(constants.screens.search));
							navigation.navigate("MainLayout");
						}}
					/>
					<TabButton
						label={constants.screens.cart}
						icon={icons.cart}
						isFocused={selectedTab == constants.screens.cart}
						outerContainerStyle={cartFlexStyle}
						innerContainerStyle={cartColorStyle}
						onPress={() => {
							dispatch(setSelectedTab(constants.screens.cart));
							navigation.navigate("MainLayout");
						}}
					/>
					<TabButton
						label={constants.screens.favourite}
						icon={icons.favourite}
						isFocused={selectedTab == constants.screens.favourite}
						outerContainerStyle={favouriteFlexStyle}
						innerContainerStyle={favouriteColorStyle}
						onPress={() => {
							dispatch(
								setSelectedTab(constants.screens.favourite)
							);
							navigation.navigate("MainLayout");
						}}
					/>
					<TabButton
						label={constants.screens.notification}
						icon={icons.notification}
						isFocused={
							selectedTab == constants.screens.notification
						}
						outerContainerStyle={notificationFlexStyle}
						innerContainerStyle={notificationColorStyle}
						onPress={() => {
							dispatch(
								setSelectedTab(constants.screens.notification)
							);
							navigation.navigate("MainLayout");
						}}
					/>
				</View>
			</View>
		</Animated.View>
	);
};

export default MainLayout;
