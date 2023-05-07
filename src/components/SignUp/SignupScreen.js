import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import FormInput from "../Input/FormInput";
import FormButton from "../Buttons/FormButton";
import DismissKeyboard from "../../utils/DismissKeyboard";
import SignUpStyles from "./SignUpStyles";
// import { AuthContext } from '../../navigation/AuthProviders';
import SocialButtons from "../Buttons/SocialButtons";
import {ip} from "../Home/IPAddress"
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [Role, setRole] = useState();
  const getMyObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // read error
    }

    //console.log("Done.");
  };

  // const {login} = useContext(AuthContext);
const handleSubmit = async () => {
  const details = {
    firstName: firstName,
    lastName: lastName,
    username: email,
    password: password,
    verifyPassword: confirmPassword,
    Role: Role,
  };

  const formBody = Object.keys(details)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(details[key]))
    .join("&");

  try {
    const response = await fetch(ip+"/registerUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    });

    const responseJson = await response.json();
    console.log(responseJson);
    Alert.alert("Registration Successful, thank you!");
  } catch (error) {
    console.error(error);
  }
};


  return (
    <DismissKeyboard>
      <View style={SignUpStyles.container}>
        <Text style={SignUpStyles.text}>Admin Details</Text>
        <FormInput
          labelValue={firstName}
          onChangeText={(firstName) => setFirstName(firstName)}
          placeholderText="First Name"
          iconType="pencil"
        />

        <FormInput
          labelValue={lastName}
          onChangeText={(lastName) => setLastName(lastName)}
          placeholderText="Last Name"
          iconType="pencil"
        />
        <FormInput
          labelValue={Role}
          onChangeText={(Role) => setRole(Role)}
          placeholderText="User Role"
          iconType="lock"
        />
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user-o"
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

        <FormInput
          labelValue={confirmPassword}
          onChangeText={(userPassword) => setConfirmPassword(userPassword)}
          placeholderText="Confirm Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton buttonTitle="Sign Up" onPress={() => handleSubmit()} />

        <TouchableOpacity
          style={SignUpStyles.forgotButton}
          onPress={() => navigation.navigate("Login")}
        ></TouchableOpacity>
      </View>
    </DismissKeyboard>
  );
};

export default SignUpScreen;
