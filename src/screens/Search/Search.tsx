import React from "react";
import {
	Button,
	Linking,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Animated from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { styledAnimation } from "src/components/ScaleAnimation";
import { COLORS } from "src/constants";
import { State } from "src/reducers";
import {
	setIncrement,
	setDecrement,
	setRestore,
	setTheme,
} from "src/reducers/common";

const Search: React.FC<any> = ({ drawerAnimationStyle, navigation }) => {
	const dispatch = useDispatch();
	const counter = useSelector((state: State) => state.common.counter);
	const theme = useSelector((state: State) => state.common.theme);

	return (
		<Animated.View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: COLORS.white,
				...drawerAnimationStyle,
			}}
		>
			<View>
				<View style={styles.countViewStyle}>
					<Button
						onPress={() => {
							dispatch(setIncrement());
						}}
						title="+"
					/>
					<Text style={styles.welcome}>Counter: {counter}</Text>
					<Button
						onPress={() => {
							dispatch(setDecrement());
						}}
						title="-"
					/>
				</View>
				<Button
					onPress={() => {
						dispatch(setRestore());
					}}
					title="Clear"
				/>

				<Button
					onPress={() => {
						Linking.openURL("https://instagram.com/orennurkeldi");
						navigation.pop("Home");
					}}
					title="MY INSTAGRAM"
				/>
			</View>
		</Animated.View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.white,
	},
	welcome: {
		fontSize: 16,
		textAlign: "center",
		margin: 10,
		color: "black",
	},
	countViewStyle: {
		flexDirection: "row",
	},
	theme: {
		fontSize: 16,
		padding: 8,
		margin: 10,
		backgroundColor: "#cecece",
		color: "#000",
		borderRadius: 5,
	},
});

export default Search;
