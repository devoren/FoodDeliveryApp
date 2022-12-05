import { useDrawerProgress } from "@react-navigation/drawer";
import { useState } from "react";
import Animated, { useSharedValue } from "react-native-reanimated";

const progress = useDrawerProgress() as any;
// const [progress, setProgress] = useState(new Animated.Value(0))
const scale = Animated.interpolateNode(progress, {
	inputRange: [0, 1],
	outputRange: [1, 0.9],
});

const borderRadius = Animated.interpolateNode(progress, {
	inputRange: [0, 1],
	outputRange: [0, 26],
});

export const styledAnimation = { borderRadius, transform: [{ scale }] };
