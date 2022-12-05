import { useDrawerProgress } from "@react-navigation/drawer";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { COLORS } from "src/constants";

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

export {homeTabFlex, homeTabColor,
	searchTabFlex,
	searchTabColor,
	cartTabFlex,
	cartTabColor,
	favouriteTabFlex,
	favouriteTabColor,
	notificationTabFlex,
	notificationTabColor,
	homeFlexStyle,
	homeColorStyle,
	searchFlexStyle,
	searchColorStyle,
	cartFlexStyle,
	cartColorStyle,
	favouriteFlexStyle,
	favouriteColorStyle,
	notificationFlexStyle,
	notificationColorStyle}