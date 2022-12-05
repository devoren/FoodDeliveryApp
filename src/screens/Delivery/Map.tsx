import React, { useRef, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Linking,
	TouchableNativeFeedback,
	Pressable,
	Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import IconButton from "src/components/IconButton";
import {
	COLORS,
	constants,
	dummyData,
	FONTS,
	icons,
	images,
	SIZES,
} from "src/constants";
import { utils } from "src/utils";

const Map: React.FC<any> = ({ navigation }) => {
	const mapView = useRef<any>();
	const [region, setRegion] = useState<any>(null);
	const [toLoc, setToLoc] = useState<any>(null);
	const [fromLoc, setFromLoc] = useState<any>(null);
	const [angle, setAngle] = useState(0);

	const [isReady, setIsReady] = useState(false);
	const [duration, setDuration] = useState<number>(8);

	React.useEffect(() => {
		let initialRegion = {
			latitude: 44.894923183423174,
			longitude: 78.23551154040813,
			latitudeDelta: 0.05,
			longitudeDelta: 0.05,
		};

		let destination = {
			latitude: 44.894923183423174,
			longitude: 78.23551154040813,
		};

		setToLoc(destination);
		setFromLoc(dummyData.fromLocs[1]);

		setRegion(initialRegion);
	}, []);

	const call = () => {
		const url = "tel:+7 708 669 24 35";
		Linking.openURL(url);
	};

	const renderMap = () => {
		return (
			<MapView
				ref={mapView}
				style={{
					flex: 1,
				}}
				provider={PROVIDER_GOOGLE}
				initialRegion={region}
				// zoomControlEnabled
				showsUserLocation={true}
				showsMyLocationButton={true}
			>
				{fromLoc && (
					<Marker
						key={"FromLoc"}
						coordinate={fromLoc}
						tracksViewChanges={false}
						icon={icons.navigator1}
						rotation={angle}
						anchor={{ x: 0.5, y: 0.5 }}
					/>
				)}
				{toLoc && (
					<Marker
						key={"ToLoc"}
						coordinate={toLoc}
						tracksViewChanges={false}
						icon={icons.pin}
						anchor={{ x: 0.5, y: 0.5 }}
					/>
				)}
				<MapViewDirections
					origin={fromLoc}
					destination={toLoc}
					apikey={constants.GOOGLE_MAP_API_KEY}
					strokeWidth={5}
					strokeColor={COLORS.primary}
					optimizeWaypoints={true}
					onReady={(result) => {
						setDuration(Math.ceil(result.duration));
						console.log(result);

						if (!isReady) {
							// Fit the map based on the route
							mapView.current.fitToCoordinates(
								result.coordinates,
								{
									edgePadding: {
										right: SIZES.width * 0.1,
										bottom: 400,
										left: SIZES.width * 0.1,
										top: SIZES.height * 0.1,
									},
								}
							);

							// Reposition the navigator
							if (result.coordinates.length >= 2) {
								let angle = utils.calculateAngle(
									result.coordinates
								);

								setAngle(angle);
							}
							setIsReady(true);
						}
					}}
				/>
			</MapView>
		);
	};

	const renderHeaderButtons = () => {
		return (
			<>
				<IconButton
					icon={icons.back}
					containerStyle={{
						position: "absolute",
						top: SIZES.padding,
						left: SIZES.padding,
						...styles.buttonStyle,
					}}
					iconStyle={{
						width: 20,
						height: 20,
						tintColor: COLORS.gray2,
					}}
					onPress={() => {
						navigation.goBack();
					}}
				/>
				<View
					style={{
						position: "absolute",
						top: SIZES.padding,
						right: SIZES.padding,
					}}
				>
					<IconButton
						icon={icons.globe}
						containerStyle={{
							...styles.buttonStyle,
						}}
						iconStyle={{
							width: 20,
							height: 20,
							tintColor: COLORS.gray,
						}}
						onPress={() => {
							mapView.current.animateToRegion({
								latitude: 44.894923183423174,
								longitude: 78.23551154040813,
								latitudeDelta: 0.06,
								longitudeDelta: 0.06,
							});
						}}
					/>
					<IconButton
						icon={icons.focus}
						containerStyle={{
							marginTop: SIZES.radius,
							...styles.buttonStyle,
						}}
						iconStyle={{
							width: 20,
							height: 20,
							tintColor: COLORS.gray,
						}}
						onPress={() => {
							mapView.current.animateToRegion({
								latitude: 44.91570775111117,
								longitude: 78.21658139273984,
								latitudeDelta: 0.002,
								longitudeDelta: 0.002,
							});
						}}
					/>
				</View>
			</>
		);
	};

	const renderInfo = () => {
		return (
			<View
				style={{
					position: "absolute",
					bottom: 0,
					width: "100%",
				}}
			>
				<LinearGradient
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					colors={[COLORS.transparent, COLORS.lightGray1]}
					style={{
						position: "absolute",
						top: -20,
						left: 0,
						right: 0,
						height: Platform.OS === "ios" ? 200 : 50,
					}}
				/>
				<View
					style={{
						padding: SIZES.radius,
						borderTopLeftRadius: 30,
						borderTopRightRadius: 30,
						backgroundColor: COLORS.white,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Image
							source={icons.clock}
							style={{
								width: 40,
								height: 40,
								tintColor: COLORS.black,
							}}
						/>
						<View
							style={{
								marginLeft: SIZES.padding,
							}}
						>
							<Text
								style={{
									color: COLORS.gray,
									...FONTS.body4,
								}}
							>
								Your Delivery Time
							</Text>
							<Text
								style={{
									...FONTS.h3,
								}}
							>
								{duration} minutes
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							marginTop: SIZES.padding,
						}}
					>
						<Image
							source={icons.focus}
							style={{
								width: 40,
								height: 40,
								tintColor: COLORS.black,
							}}
						/>
						<View
							style={{
								marginLeft: SIZES.padding,
							}}
						>
							<Text
								style={{
									color: COLORS.gray,
									...FONTS.body4,
								}}
							>
								Your Address
							</Text>
							<Text
								style={{
									...FONTS.h3,
								}}
							>
								{dummyData.myProfile.address}
							</Text>
						</View>
					</View>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							height: 70,
							marginTop: SIZES.padding,
							borderRadius: SIZES.radius,
							paddingHorizontal: SIZES.radius,
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: COLORS.primary,
						}}
					>
						<Image
							source={images.profile}
							style={{
								width: 40,
								height: 40,
								borderRadius: 5,
							}}
						/>
						<View
							style={{
								flex: 1,
								marginLeft: SIZES.base * 2,
							}}
						>
							<Text
								style={{
									color: COLORS.white,
									...FONTS.h3,
								}}
							>
								John Doe
							</Text>
							<Text
								style={{
									color: COLORS.white,
									...FONTS.body4,
								}}
							>
								Delivery Man
							</Text>
						</View>
						<Pressable
							style={{
								height: 40,
								width: 40,
								alignItems: "center",
								justifyContent: "center",
								borderWidth: 1,
								borderRadius: 5,
								borderColor: COLORS.white,
								backgroundColor: COLORS.transparentWhite1,
							}}
							onPress={call}
						>
							<Image
								source={icons.call}
								style={{
									width: 30,
									height: 30,
								}}
							/>
						</Pressable>
					</TouchableOpacity>
				</View>
			</View>
		);
	};

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			{/* Map  */}
			{renderMap()}
			{/* Header Buttons  */}
			{renderHeaderButtons()}
			{/* Footer / Info  */}
			{renderInfo()}
		</View>
	);
};

const styles = StyleSheet.create({
	buttonStyle: {
		width: 40,
		height: 40,
		borderRadius: SIZES.radius,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: COLORS.gray2,
		backgroundColor: COLORS.white,
	},
});

export default Map;
