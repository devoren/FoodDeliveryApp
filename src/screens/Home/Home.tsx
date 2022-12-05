import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	TextInput,
	FlatList,
} from "react-native";
import HorizontalFoodCard from "src/components/HorizontalFoodCard";
import VerticalFoodCard from "src/components/VerticalFoodCard";
import FilterModal from "src/components/FilterModal";

import {
	COLORS,
	constants,
	dummyData,
	FONTS,
	icons,
	SIZES,
} from "../../constants";
import { useSelector } from "react-redux";
import { State } from "src/reducers";
import { useNavigation } from "@react-navigation/native";

const Section: React.FC<any> = ({ title, onPress, children }) => {
	return (
		<View>
			{/* Header */}
			<View
				style={{
					flexDirection: "row",
					marginHorizontal: SIZES.padding,
					marginTop: 30,
					marginBottom: 20,
				}}
			>
				<Text style={{ flex: 1, ...FONTS.h3 }}>{title}</Text>

				<TouchableOpacity onPress={onPress}>
					<Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
						Show All
					</Text>
				</TouchableOpacity>
			</View>

			{/* Content */}
			{children}
		</View>
	);
};

const Home: React.FC<any> = ({ props }) => {
	const navigation = useNavigation() as any;
	const [selectedCategoryId, setSelectedCategoryId] = useState(1);
	const [selectedMenuType, setSelectedMenuType] = useState(1);
	const [menuList, setMenuList] = useState([] as any);
	const [recommends, setRecommends] = useState([] as any);
	const [popular, setPopular] = useState([] as any);
	const address = useSelector((state: State) => state.account.user.address);

	const [showFilterModal, setShowFilterModal] = useState(false);

	useEffect(() => {
		handlechangeCategory(selectedCategoryId, selectedMenuType);
	}, []);

	const handlechangeCategory = (categoryId: number, menuTypeId: number) => {
		// Retrieve the popular menu
		let selectedPopular = dummyData.menu.find((a) => a.name == "Popular");

		// Retrieve the recommended menu
		let selectedRecommend = dummyData.menu.find(
			(a) => a.name == "Recommended"
		);

		// Find the menu based on the menuTypeId
		let selectedMenu = dummyData.menu.find((a) => a.id == menuTypeId);

		// Set the popular menu based on the categoryId
		setPopular(
			selectedPopular?.list.filter((a) =>
				a.categories.includes(categoryId)
			)
		);

		// Set the recommended menu based on the categoryId
		setRecommends(
			selectedRecommend?.list.filter((a) =>
				a.categories.includes(categoryId)
			)
		);

		// Set the menu based on the categoryId
		setMenuList(
			selectedMenu?.list.filter((a) => a.categories.includes(categoryId))
		);
	};

	const renderSearch = () => {
		return (
			<View
				style={{
					flexDirection: "row",
					height: 40,
					alignItems: "center",

					marginHorizontal: SIZES.padding,
					marginVertical: SIZES.base,
					paddingHorizontal: SIZES.radius,
					borderRadius: SIZES.radius,
					backgroundColor: COLORS.lightGray2,
				}}
			>
				{/* Icon  */}
				<Image
					source={icons.search}
					style={{
						height: 20,
						width: 20,
						tintColor: COLORS.black,
					}}
				/>

				{/* Text Input */}
				<TextInput
					style={{
						flex: 1,
						marginLeft: SIZES.radius,
						...FONTS.body3,
					}}
					placeholder="search food..."
				/>
				{/* Filter Button */}
				<TouchableOpacity onPress={() => setShowFilterModal(true)}>
					<Image
						source={icons.filter}
						style={{
							height: 20,
							width: 20,
							tintColor: COLORS.black,
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	const renderMenuTypes = () => {
		return (
			<FlatList
				horizontal
				data={dummyData.menu}
				keyExtractor={(item) => `${item.id}`}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					marginTop: 30,
					marginBottom: 20,
				}}
				renderItem={({ item, index }) => (
					<TouchableOpacity
						style={{
							marginLeft: SIZES.padding,
							marginRight:
								index == dummyData.menu.length - 1
									? SIZES.padding
									: 0,
						}}
						onPress={() => {
							console.log(index);

							setSelectedMenuType(item.id);
							handlechangeCategory(selectedCategoryId, item.id);
						}}
					>
						<Text
							style={{
								color:
									selectedMenuType == item.id
										? COLORS.primary
										: COLORS.black,
								fontStyle:
									selectedMenuType == item.id
										? "italic"
										: "normal",

								...FONTS.h3,
							}}
						>
							{item.name}
						</Text>
					</TouchableOpacity>
				)}
			/>
		);
	};

	const renderRecommendedSection = () => {
		return (
			<Section
				title="Recommended"
				onPress={() => {
					console.log("Show All Recommended");
				}}
			>
				<FlatList
					data={recommends}
					keyExtractor={(item) => `${item.id}`}
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({ item, index }) => (
						<HorizontalFoodCard
							containerStyle={{
								height: 180,
								width: SIZES.width * 0.85,
								marginLeft: index == 0 ? SIZES.padding : 18,
								marginRight:
									index == recommends.length - 1
										? SIZES.padding
										: 0,
								paddingRight: SIZES.radius,
								alignItems: "center",
							}}
							imageStyle={{
								marginTop: 35,
								height: 150,
								width: 150,
							}}
							item={item}
							onPress={() =>
								navigation.navigate("FoodDetail", {
									item,
								})
							}
						/>
					)}
				/>
			</Section>
		);
	};

	const renderPopularSection = () => {
		return (
			<Section
				title="Popular Near You"
				onPress={() => {
					console.log("Show All Popular Items");
				}}
			>
				<FlatList
					data={popular}
					keyExtractor={(item) => `${item.id}`}
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({ item, index }) => (
						<VerticalFoodCard
							containerStyle={{
								marginLeft: index == 0 ? SIZES.padding : 18,
								marginRight:
									index == recommends.length - 1
										? SIZES.padding
										: 0,
							}}
							item={item}
							onPress={() => {
								console.log("VerticalFoodCard");

								navigation.navigate("FoodDetail", {
									item,
								});
							}}
						/>
					)}
				/>
			</Section>
		);
	};

	const renderFoodCategories = () => {
		return (
			<FlatList
				data={dummyData.categories}
				keyExtractor={(item) => `${item.id}`}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item, index }) => (
					<TouchableOpacity
						style={{
							flexDirection: "row",
							height: 55,
							marginTop: SIZES.padding,
							marginLeft:
								index == 0 ? SIZES.padding : SIZES.radius,
							marginRight:
								index == dummyData.categories.length - 1
									? SIZES.padding
									: 0,
							paddingHorizontal: SIZES.base,
							borderRadius: SIZES.radius,
							backgroundColor:
								selectedCategoryId == item.id
									? COLORS.primary
									: COLORS.lightGray2,
						}}
						onPress={() => {
							setSelectedCategoryId(item.id);
							handlechangeCategory(item.id, selectedMenuType);
						}}
					>
						<Image
							source={item.icon}
							style={{
								marginTop: 5,
								height: 50,
								width: 50,
							}}
						/>
						<Text
							style={{
								alignSelf: "center",
								marginRight: SIZES.base,
								color:
									selectedCategoryId == item.id
										? COLORS.white
										: COLORS.darkGray,
								...FONTS.h3,
							}}
						>
							{item.name}
						</Text>
					</TouchableOpacity>
				)}
			/>
		);
	};

	const renderDeliveryTo = () => {
		return (
			<View
				style={{
					marginTop: SIZES.padding,
					marginHorizontal: SIZES.padding,
				}}
			>
				<Text
					style={{
						color: COLORS.primary,
						...FONTS.body3,
					}}
				>
					DELIVERY TO
				</Text>
				<TouchableOpacity
					style={{
						flexDirection: "row",
						marginTop: SIZES.base,
						alignItems: "center",
					}}
				>
					<Text style={{ ...FONTS.h3 }}>
						{dummyData.myProfile.address}
					</Text>
					<Image
						source={icons.down_arrow}
						style={{
							marginLeft: SIZES.base,
							height: 20,
							width: 20,
						}}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View
			style={{
				flex: 1,
			}}
		>
			{/* Search */}
			{renderSearch()}

			{/* Filter  */}

			{showFilterModal && (
				<FilterModal
					isVisible={showFilterModal}
					onClose={() => {
						setShowFilterModal(false);
					}}
				/>
			)}

			{/* List */}
			<FlatList
				data={menuList}
				keyExtractor={(item) => `${item.id}`}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<View>
						{/* Delivery To */}
						{renderDeliveryTo()}

						{/* Food Categories  */}
						{renderFoodCategories()}

						{/* Popular  */}
						{renderPopularSection()}

						{/* Recommended  */}
						{renderRecommendedSection()}

						{/* Menu Types  */}
						{renderMenuTypes()}
					</View>
				}
				renderItem={({ item, index }) => {
					return (
						<HorizontalFoodCard
							containerStyle={{
								height: 130,
								alignItems: "center",
								marginHorizontal: SIZES.padding,
								marginBottom: SIZES.radius,
							}}
							imageStyle={{
								marginTop: 20,
								height: 110,
								width: 110,
							}}
							item={item}
							onPress={() =>
								navigation.navigate("FoodDetail", {
									item,
								})
							}
						/>
					);
				}}
				ListFooterComponent={<View style={{ height: 200 }} />}
			/>
		</View>
	);
};

export default Home;
