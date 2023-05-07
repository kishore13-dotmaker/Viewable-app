import React, { useEffect, useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import FormInput from "../Input/FormInput";
import FormButton from "../Buttons/FormButton";
import DismissKeyboard from "../../utils/DismissKeyboard";
import LoginStyles from "./LoginStyles";
// import { AuthContext } from '../../navigation/AuthProviders';
import SocialButtons from "../Buttons/SocialButtons";
import * as SecureStore from "expo-secure-store";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isloggedin, setLogged] = useState();

  // const {login} = useContext(AuthContext);
  const handleSubmit = () => {
    var details = {
      username: email,
      password: password,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch("http://192.168.1.4:3000/loginUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        await SecureStore.setItemAsync("accessToken", responseJson.accessToken);
        navigation.replace("Home");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <DismissKeyboard>
      <View style={LoginStyles.container}>
        <Image
          source={require("../../assets/images/app_icon/Phoenixlogo.png")}
          style={LoginStyles.logo}
          resizeMode="contain"
        />
        <Text style={LoginStyles.text}>Check-In</Text>

        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="Sign In"
          onPress={() => handleSubmit()}
        />
      </View>
    </DismissKeyboard>
  );
};

export default LoginScreen;
