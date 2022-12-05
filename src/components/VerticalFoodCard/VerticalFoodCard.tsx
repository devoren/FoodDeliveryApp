import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput,
	FlatList,
} from "react-native";

import {
	COLORS,
	constants,
	dummyData,
	FONTS,
	icons,
	SIZES,
} from "../../constants";

const VerticalFoodCard: React.FC<any> = ({ containerStyle, item, onPress }) => {
	return (
		<TouchableOpacity
			style={{
				width: 200,
				padding: SIZES.radius,
				alignItems: "center",
				borderRadius: SIZES.radius,
				backgroundColor: COLORS.lightGray2,
				...containerStyle,
			}}
			onPress={onPress}
		>
			{/* Calories and Favourite */}
			<View
				style={{
					flexDirection: "row",
				}}
			>
				<View
					style={{
						flex: 1,
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
					<Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>
						{item.calories} Calories
					</Text>
				</View>
				<Image
					source={icons.love}
					style={{
						width: 20,
						height: 20,
						tintColor:
							item.isFavourite == true
								? COLORS.primary
								: COLORS.gray,
					}}
				/>
			</View>
			{/* Image */}
			<View
				style={{
					height: 150,
					width: 150,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Image
					source={item.image}
					style={{
						height: "100%",
						width: "100%",
					}}
				/>
			</View>
			{/* Info */}
			<View
				style={{
					alignItems: "center",
					marginTop: -20,
				}}
			>
				{/* Name */}
				<Text
					style={{
						...FONTS.h3,
					}}
				>
					{item.name}
				</Text>

				{/* Description */}
				<Text
					style={{
						color: COLORS.darkGray2,
						textAlign: "center",
						...FONTS.body5,
					}}
				>
					{item.description}
				</Text>

				{/* Price */}
				<Text
					style={{
						marginTop: SIZES.radius,
						...FONTS.h2,
					}}
				>
					${item.price}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default VerticalFoodCard;
