import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormInput from "src/components/FormInput";
import Header from "src/components/Header";
import IconButton from "src/components/IconButton";
import RadioButton from "src/components/RadioButton";
import TextButton from "src/components/TextButton";
import { COLORS, FONTS, icons, images, SIZES } from "src/constants";
import { utils } from "src/utils";

const AddCard: React.FC<any> = ({ navigation, route }) => {
	const [selectedCard, setSelectedCard] = useState<any>(null);

	const [cardNumber, setCardNumber] = useState("");
	const [cardNumberError, setCardNumberError] = useState("");
	const [cardName, setCardName] = useState("");
	const [cardNameError, setCardNameError] = useState("");
	const [expiryDate, setExpiryDate] = useState("");
	const [expiryDateError, setExpiryDateError] = useState("");
	const [cvv, setCvv] = useState("");
	const [cvvError, setCvvError] = useState("");
	const [isRemember, setIsRemember] = useState(false);

	useEffect(() => {
		let { selectedCard } = route.params;
		console.log(selectedCard.name);

		setSelectedCard(selectedCard);
	}, []);

	const isEnableAddCard = () => {
		return (
			cardNumber != "" &&
			cardName != "" &&
			expiryDate != "" &&
			cvv != "" &&
			cardNumberError == "" &&
			cardNameError == "" &&
			expiryDateError == "" &&
			cvvError == ""
		);
	};
	console.log(isEnableAddCard());

	const renderHeader = () => {
		return (
			<Header
				title="ADD CARD"
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
					<View
						style={{
							width: 40,
						}}
					/>
				}
			/>
		);
	};

	const renderCard = () => {
		return (
			<ImageBackground
				source={images.card}
				style={{
					height: 200,
					width: "100%",
					marginTop: SIZES.radius,
					borderRadius: SIZES.radius,
					overflow: "hidden",
				}}
			>
				<Image
					source={selectedCard?.icon}
					resizeMode="contain"
					style={{
						position: "absolute",
						top: 20,
						right: 20,
						height: 40,
						width: 80,
					}}
				/>
				{/* Details  */}
				<View
					style={{
						position: "absolute",
						bottom: 10,
						left: 0,
						right: 0,
						paddingHorizontal: SIZES.padding,
					}}
				>
					<Text
						style={{
							color: COLORS.white,
							...FONTS.h3,
						}}
					>
						{cardName.toUpperCase()}
					</Text>
					<View
						style={{
							flexDirection: "row",
						}}
					>
						<Text
							style={{
								flex: 1,
								color: COLORS.white,
								...FONTS.body3,
							}}
						>
							{cardNumber}
						</Text>
						<Text
							style={{
								color: COLORS.white,
								...FONTS.body3,
							}}
						>
							{expiryDate}
						</Text>
					</View>
				</View>
			</ImageBackground>
		);
	};

	const renderForm = () => {
		return (
			<View
				style={{
					marginTop: SIZES.padding * 2,
				}}
			>
				{/* Card Number  */}
				<FormInput
					label="Card Number"
					keyboardType="numeric"
					value={cardNumber}
					placeholder="0000 0000 0000 0000"
					maxLength={19}
					onChange={(value: string) => {
						setCardNumber(
							value
								.replace(
									/[^0-9]/g,
									"" // To allow only numbers
								)
								.replace(/\s/g, "")
								.replace(/(\d{4})/g, "$1 ")
								.trim()
						);
						utils.validateInput(value, 19, setCardNumberError);
					}}
					errorMsg={cardNumberError}
					appendComponent={
						<View
							style={{
								justifyContent: "center",
							}}
						>
							<Image
								source={
									cardNumber == "" ||
									(cardNumber != "" && cardNumberError == "")
										? icons.correct
										: icons.cancel
								}
								style={{
									height: 20,
									width: 20,
									tintColor:
										cardNumber == ""
											? COLORS.gray
											: cardNumber != "" &&
											  cardNumberError == ""
											? COLORS.green
											: COLORS.red,
								}}
							/>
						</View>
					}
				/>
				{/* Cardholder Name  */}
				<FormInput
					label="Cardholder Name"
					value={cardName}
					placeholder="Cardholder Name"
					containerStyle={{
						marginTop: SIZES.radius,
					}}
					onChange={(value: string) => {
						utils.validateInput(value, 1, setCardNameError);
						setCardName(value);
					}}
					errorMsg={cardNameError}
					appendComponent={
						<View
							style={{
								justifyContent: "center",
							}}
						>
							<Image
								source={
									cardName == "" ||
									(cardName != "" && cardNameError == "")
										? icons.correct
										: icons.cancel
								}
								style={{
									height: 20,
									width: 20,
									tintColor:
										cardName == ""
											? COLORS.gray
											: cardName != "" &&
											  cardNameError == ""
											? COLORS.green
											: COLORS.red,
								}}
							/>
						</View>
					}
				/>
				{/* Expiry Date /  CVV  */}
				<View
					style={{
						flexDirection: "row",
						marginTop: SIZES.radius,
					}}
				>
					<FormInput
						label="Expiry Date"
						value={expiryDate}
						placeholder="MM/YY"
						keyboardType="numeric"
						maxLength={5}
						containerStyle={{
							flex: 1,
						}}
						onChange={(value: string) => {
							utils.validateInput(value, 5, setExpiryDateError);
							setExpiryDate(
								value
									.replace(
										/[^0-9]/g,
										"" // To allow only numbers
									)
									.replace(
										/^([2-9])$/g,
										"0$1" // To handle 3 > 03
									)
									.replace(
										/^(1{1})([3-9]{1})$/g,
										"0$1/$2" // 13 > 01/3
									)
									.replace(
										/^0{1,}/g,
										"0" // To handle 00 > 0
									)
									.replace(
										/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
										"$1/$2" // To handle 113 > 11/3
									)
							);
						}}
						errorMsg={expiryDateError}
						appendComponent={
							<View
								style={{
									justifyContent: "center",
								}}
							>
								<Image
									source={
										expiryDate == "" ||
										(expiryDate != "" &&
											expiryDateError == "")
											? icons.correct
											: icons.cancel
									}
									style={{
										height: 20,
										width: 20,
										tintColor:
											expiryDate == ""
												? COLORS.gray
												: expiryDate != "" &&
												  expiryDateError == ""
												? COLORS.green
												: COLORS.red,
									}}
								/>
							</View>
						}
					/>
					<FormInput
						label="CVV"
						value={cvv}
						placeholder="CVV"
						keyboardType="numeric"
						maxLength={3}
						containerStyle={{
							flex: 1,
							marginLeft: SIZES.radius,
						}}
						onChange={(value: string) => {
							utils.validateInput(value, 3, setCvvError);
							setCvv(value);
						}}
						errorMsg={cvvError}
						appendComponent={
							<View
								style={{
									justifyContent: "center",
								}}
							>
								<Image
									source={
										cvv == "" ||
										(cvv != "" && cvvError == "")
											? icons.correct
											: icons.cancel
									}
									style={{
										height: 20,
										width: 20,
										tintColor:
											cvv == ""
												? COLORS.gray
												: cvv != "" && cvvError == ""
												? COLORS.green
												: COLORS.red,
									}}
								/>
							</View>
						}
					/>
				</View>

				{/* Remmeber  */}
				<View
					style={{
						alignItems: "flex-start",
						marginTop: SIZES.padding,
					}}
				>
					<RadioButton
						label="Remember this card details."
						isSelected={isRemember}
						onPress={() => {
							setIsRemember(!isRemember);
						}}
					/>
				</View>
			</View>
		);
	};

	const renderFooter = () => {
		return (
			<View
				style={{
					marginTop: SIZES.padding * 2,
					paddingTop: SIZES.radius,
					paddingHorizontal: SIZES.radius,
					paddingBottom: SIZES.padding,
				}}
			>
				<TextButton
					label="Add Card"
					disabled={!isEnableAddCard()}
					buttonContainerStyle={{
						height: 60,
						borderRadius: SIZES.radius,
						backgroundColor: isEnableAddCard()
							? COLORS.primary
							: COLORS.transparentPrimary,
					}}
					onPress={() => {
						navigation.goBack();
					}}
				/>
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
			{/* Header  */}
			{renderHeader()}
			{/* Body  */}
			<KeyboardAwareScrollView
				keyboardDismissMode="on-drag"
				extraScrollHeight={-200}
				contentContainerStyle={{
					// flex: 1,
					flexGrow: 1,
					paddingHorizontal: SIZES.padding,
				}}
			>
				{/* Card  */}
				{renderCard()}
				{/* Form  */}
				{renderForm()}
			</KeyboardAwareScrollView>
			{/* Footer  */}
			{renderFooter()}
		</View>
	);
};

export default AddCard;
