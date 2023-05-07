import React, { useState } from "react";
import Home from "./src/components/Home/HomeScreen";
import LoginScreen from "./src/components/Login/LoginScreen";
import SignUpScreen from "./src/components/SignUp/SignupScreen";
import ForgotPasswordScreen from "./src/components/ForgotPassword/ForgotPasswordScreen";
import DetailedPage from "./src/components/DetailedPage/DetailedPage";
import Onboarding from "./src/components/Onboarding/OnboardingScreen";
import StripePayment from "./src/components/StripePayment/Payment";
import ProfileScreen from "./src/components/UserProfile/Profile";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Popup from "./src/components/DetailedPage/Popup";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmployeeScreen from "./src/components/SignUp/EmployeeCreation"
import CheckinHistory from "./src/components/History/CheckinHistory";
import OvertimeHistory from "./src/components/History/OvertimeHistory";
// import Routes from './src/Navigation/Routes';
const Stack = createNativeStackNavigator();

const App = () => {
  let [fontsLoaded] = useFonts({
    openSans: require("./src/assets/fonts/OpenSans-Regular.ttf"),
    openSansBold: require("./src/assets/fonts/OpenSans-Bold.ttf"),
    openSansSemiBold: require("./src/assets/fonts/OpenSans-SemiBold.ttf"),
  });

  const [showOnboard, setShowOnboard] = useState(true);

  const handleOnboardFinish = () => {
    setShowOnboard(false);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // return (
  //   <View style={{ flex: 1 }}>
  //     <Routes />
  //   </View>
  // );

  return (
    //   <>
    //   {showOnboard && <Onboarding handleDone={handleOnboardFinish} />}
    //   {!showOnboard && <Home />}
    // </>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
          {(props) => (
            <Onboarding {...props} handleDone={handleOnboardFinish} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="EmployeeCreation" component={EmployeeScreen} />

        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Check-In" component={CheckinHistory} />
        <Stack.Screen name="Over-Time" component={OvertimeHistory} />
        <Stack.Screen
          name="DetailedPage"
          component={DetailedPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="StripePayment" component={StripePayment} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Popup" component={Popup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
