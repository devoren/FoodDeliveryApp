const COLOR = {
	TRANSPARENT: "transparent",
	PRIMARY: "#2196f3",
	SECONDARY: "#767676",
	WHITE: "#ffffff",
	BLACK: "#000000",

	RGBA: (hex: any, alpha = 1) => {
		const [r, g, b] = hex.match(/\w\w/g).map((x: any) => parseInt(x, 16));

		return `rgba(${r},${g},${b},${alpha})`;
	},

	// ACTIONS
	SUCCESS: "#3adb76",
	WARNING: "#ffae00",
	ALERT: "#cc4b37",

	// BASESCALE
	BASE: {
		1: "#2f4a65",
		3: "#6e6e94",
	},

	// GRAYSCALE
	GRAY: {
		1: "#333333",
		2: "#4f4f4f",
		3: "#828282",
		4: "#bdbdbd",
		5: "#e0e0e0",
		6: "#f2f2f2",
		7: "#f9f9f9",
	},

	GREEN: {
		2: "#44b700",
	},

	RED: {
		2: "#d41e1e",
		3: "#ff235d",
	},

	// BLUESCALE
	BLUE: {
		6: "#edf2f6",
	},
};

export default COLOR;
