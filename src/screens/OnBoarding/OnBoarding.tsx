import React, { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	Image,
	Animated,
	ImageBackgroundBase,
	ImageBackground,
} from "react-native";
import TextButton from "src/components/TextButton";
import { COLORS, constants, FONTS, images, SIZES } from "src/constants";

const OnBoarding: React.FC<any> = ({ navigation }) => {
	const scrollX = useRef(new Animated.Value(0)).current;

	const flatListRef = useRef<any>();
	const [currentIndex, setCurrentIndex] = useState(0);

	// @ts-ignore: Unreachable code error
	const onViewChangeRef = useRef(({ viewableItems, changed }) => {
		// @ts-ignore: Unreachable code error
		setCurrentIndex(viewableItems[0].index);
	});

	useEffect(() => {
		console.log("CurrentIndex: ", currentIndex);
	}, [currentIndex]);

	const Dots = () => {
		const dotPosition = Animated.divide(scrollX, SIZES.width);

		return (
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{constants.onboarding_screens.map((item, index) => {
					const dotColor = dotPosition.interpolate({
						inputRange: [index - 1, index, index + 1],
						outputRange: [
							COLORS.lightOrange,
							COLORS.primary,
							COLORS.lightOrange,
						],
						extrapolate: "clamp",
					});

					const dotWidth = dotPosition.interpolate({
						inputRange: [index - 1, index, index + 1],
						outputRange: [10, 30, 10],
						extrapolate: "clamp",
					});

					return (
						<Animated.View
							key={`${index}`}
							style={{
								borderRadius: 5,
								marginHorizontal: 6,
								width: dotWidth,
								height: 10,
								backgroundColor: dotColor,
							}}
						/>
					);
				})}
			</View>
		);
	};

	const renderHeaderLogo = () => {
		return (
			<View
				style={{
					position: "absolute",
					top: 25,
					left: 0,
					right: 0,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Image
					source={images.logo_02}
					resizeMode="contain"
					style={{
						width: SIZES.width * 0.5,
						height: 100,
					}}
				/>
			</View>
		);
	};
	const renderFooter = () => {
		return (
			<View
				style={{
					height: 160,
				}}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
					}}
				>
					<Dots />
				</View>
				{/* Buttons  */}
				{currentIndex < constants.onboarding_screens.length - 1 && (
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							paddingHorizontal: SIZES.padding,
							marginVertical: SIZES.padding,
						}}
					>
						<TextButton
							label="Skip"
							buttonContainerStyle={{
								backgroundColor: null,
							}}
							labelStyle={{
								color: COLORS.darkGray2,
							}}
							onPress={() => {
								navigation.replace("SignIn");
							}}
						/>
						<TextButton
							label="Next"
							buttonContainerStyle={{
								height: 60,
								width: 200,
								borderRadius: SIZES.radius,
							}}
							onPress={() => {
								flatListRef.current.scrollToIndex({
									index: currentIndex + 1,
									animation: true,
								});
							}}
						/>
					</View>
				)}
				{currentIndex == constants.onboarding_screens.length - 1 && (
					<View
						style={{
							paddingHorizontal: SIZES.padding,
							paddingVertical: SIZES.padding,
						}}
					>
						<TextButton
							label="Let's Get Started"
							buttonContainerStyle={{
								height: 60,
								borderRadius: SIZES.radius,
							}}
							onPress={() => navigation.replace("SignIn")}
						/>
					</View>
				)}
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
			{renderHeaderLogo()}

			<Animated.FlatList
				ref={flatListRef}
				horizontal
				pagingEnabled
				data={constants.onboarding_screens}
				scrollEventThrottle={16}
				snapToAlignment="center"
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => `${item.id}`}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
				onViewableItemsChanged={onViewChangeRef.current}
				renderItem={({ item, index }) => {
					return (
						<View
							style={{
								width: SIZES.width,
							}}
						>
							{/* Header */}
							<View
								style={{
									flex: 3,
								}}
							>
								<ImageBackground
									source={item.backgroundImage}
									style={{
										flex: 1,
										alignItems: "center",
										justifyContent: "flex-end",
										height: index == 1 ? "92%" : "107.4%",
										width: "100%",
									}}
								>
									<Image
										source={item.bannerImage}
										resizeMode="contain"
										style={{
											width: SIZES.width * 0.7,
											height: SIZES.width * 0.7,
											marginBottom: -SIZES.padding * 2,
										}}
									/>
								</ImageBackground>
							</View>
							{/* Detail */}
							<View
								style={{
									flex: 1,
									marginTop: 40,
									alignItems: "center",
									justifyContent: "center",
									paddingHorizontal: SIZES.radius,
								}}
							>
								<Text
									style={{
										...FONTS.h1,
										fontSize: 25,
									}}
								>
									{item.title}
								</Text>
								<Text
									style={{
										marginTop: SIZES.radius,
										textAlign: "center",
										color: COLORS.darkGray,
										paddingHorizontal: SIZES.padding,
										...FONTS.body3,
									}}
								>
									{item.description}
								</Text>
							</View>
						</View>
					);
				}}
			/>

			{renderFooter()}
		</View>
	);
};

export default OnBoarding;
