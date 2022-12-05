import { icons, images } from "./";

const myProfile = {
	// name: "John Doe",
	profile_image: images.profile,
	address: "408 Isabaev Balpyk bi, Almaty",
};

const categories = [
	{
		id: 1,
		name: "Fast Food",
		icon: icons.burger,
	},
	{
		id: 2,
		name: "Fruit Item",
		icon: icons.cherry,
	},
	{
		id: 3,
		name: "Rice Item",
		icon: icons.rice,
	},
];

const hamburger = {
	id: 1,
	name: "Hamburger",
	description: "Chicken patty hamburger",
	categories: [1, 2],
	price: 15.99,
	calories: 128,
	isFavourite: true,
	qty: 2,
	image: require("../assets/dummyData/hamburger.png"),
};

const hotTacos = {
	id: 2,
	name: "Hot Tacos",
	description: "Mexican tortilla & tacos",
	categories: [1, 3],
	price: 10.99,
	calories: 78,
	isFavourite: false,
	qty: 3,
	image: require("../assets/dummyData/hot_tacos.png"),
};

const vegBiryani = {
	id: 3,
	name: "Veg Biryani",
	description:
		"A popular spice and vegetables mixed favoured rice dish which is typically prepared by layering the biryani gravy and basmati rice in flat bottom vessel.",
	categories: [1, 2, 3],
	price: 10.99,
	calories: 94,
	isFavourite: true,
	qty: 2,
	image: require("../assets/dummyData/veg_biryani.png"),
};

const wrapSandwich = {
	id: 4,
	name: "Wrap Sandwich",
	description: "Grilled vegetables sandwich",
	categories: [1, 2],
	price: 10.99,
	calories: 104,
	isFavourite: true,
	qty: 3,
	image: require("../assets/dummyData/wrap_sandwich.png"),
};

const menu = [
	{
		id: 1,
		name: "Featured",
		list: [hamburger, hotTacos, vegBiryani],
	},
	{
		id: 2,
		name: "Nearby you",
		list: [hamburger, vegBiryani, wrapSandwich],
	},
	{
		id: 3,
		name: "Popular",
		list: [hamburger, hotTacos, wrapSandwich],
	},
	{
		id: 4,
		name: "Newest",
		list: [hamburger, hotTacos, vegBiryani],
	},
	{
		id: 5,
		name: "Trending",
		list: [hamburger, vegBiryani, wrapSandwich],
	},
	{
		id: 6,
		name: "Recommended",
		list: [hamburger, hotTacos, wrapSandwich],
	},
];

const sizes = [
	{
		id: 1,
		label: '12"',
	},
	{
		id: 2,
		label: '14"',
	},
	{
		id: 3,
		label: '16"',
	},
	{
		id: 4,
		label: '18"',
	},
];

const myCart = [
	{
		...hamburger,
		// qty: 2,
	},
	{
		...hotTacos,
		// qty: 3,
	},
	{
		...vegBiryani,
		// qty: 2,
	},
];

const myCards = [
	{
		id: 1,
		name: "Master Card",
		icon: require("../assets/icons/mastercard.png"),
		card_no: "1234",
	},
	{
		id: 2,
		name: "Google Pay",
		icon: require("../assets/icons/google.png"),
		card_no: "1234",
	},
];

const allCards = [
	{
		id: 1,
		name: "Apple Pay",
		icon: require("../assets/icons/apple.png"),
	},
	{
		id: 2,
		name: "Visa",
		icon: require("../assets/icons/visa.png"),
	},
	{
		id: 3,
		name: "PayPal",
		icon: require("../assets/icons/paypal.png"),
	},
	{
		id: 4,
		name: "Google Pay",
		icon: require("../assets/icons/google.png"),
	},
	{
		id: 5,
		name: "Master Card",
		icon: require("../assets/icons/mastercard.png"),
	},
];

const fromLocs = [
	{
		latitude: 44.91570775111117,
		longitude: 78.21658139273984,
	},
	{
		latitude: 44.91570775111117,
		longitude: 78.21658139273984,
	},
	{
		latitude: 44.91570775111117,
		longitude: 78.21658139273984,
	},
	{
		latitude: 44.91570775111117,
		longitude: 78.21658139273984,
	},
	{
		latitude: 44.91570775111117,
		longitude: 78.21658139273984,
	},
	{
		latitude: 44.91570775111117,
		longitude: 78.21658139273984,
	},
];

export default {
	vegBiryani,
	myProfile,
	categories,
	menu,
	sizes,
	myCart,
	myCards,
	allCards,
	fromLocs,
};
