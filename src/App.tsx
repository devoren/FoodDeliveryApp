import React from "react";
import {
	createStackNavigator,
	TransitionPresets,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import CustomDrawer from "./screens/CustomDrawer/CustomDrawer";
import RootReducer from "src/reducers";
import { Provider } from "react-redux";
import {
	Search,
	OnBoarding,
	SignIn,
	SignUp,
	ForgotPassword,
	Otp,
	FoodDetail,
	Checkout,
	Cart,
	Success,
	AddCard,
	MyCard,
	DeliveryStatus,
	Map,
} from "./screens";

import SplashScreen from "react-native-splash-screen";
const Stack = createStackNavigator();

const App = () => {
	React.useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<Provider store={RootReducer}>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
						gestureEnabled: true,
						...TransitionPresets.SlideFromRightIOS,
					}}
					initialRouteName={"Home"}
				>
					<Stack.Screen name="Home" component={CustomDrawer} />
					<Stack.Screen name="OnBoarding" component={OnBoarding} />
					<Stack.Screen name="SignIn" component={SignIn} />
					<Stack.Screen name="SignUp" component={SignUp} />
					<Stack.Screen
						name="ForgotPassword"
						component={ForgotPassword}
					/>
					<Stack.Screen name="Otp" component={Otp} />

					<Stack.Screen name="FoodDetail" component={FoodDetail} />

					<Stack.Screen name="Checkout" component={Checkout} />

					<Stack.Screen name="Cart" component={Cart} />

					<Stack.Screen
						name="Success"
						component={Success}
						options={{ gestureEnabled: false }}
					/>

					<Stack.Screen name="AddCard" component={AddCard} />

					<Stack.Screen name="MyCard" component={MyCard} />

					<Stack.Screen
						name="DeliveryStatus"
						component={DeliveryStatus}
						options={{ gestureEnabled: false }}
					/>

					<Stack.Screen name="Map" component={Map} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};

export default App;
