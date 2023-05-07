import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";

import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Colors from "../../assets/colors/colors";
import HomeStyles from "./HomeScreenStyles";
import SearchBar from "../SearchBar/SerachBar";
import ListOptions from "../ListOptions/ListOptions";
import Categories from "../Categories/Categories";
import Card from "../ShopCards/card";
import shops from "../consts/shops";
import * as SecureStore from "expo-secure-store";
import SearchBarStyles from "../SearchBar/SearchBarStyles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
const { width } = Dimensions.get("screen");

const Home = ({ navigation }) => {
  const [location, setLocation] = useState("chennai");
  const [foundEmployee, setFoundEmployee] = useState();
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState();

  const handleSubmit = async () => {
    var accessToken = await SecureStore.getItemAsync("accessToken");
    var details = {
      accessToken: accessToken,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch(ip+"/findUser", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        navigation.navigate("Profile");
        await SecureStore.setItemAsync("username", responseJson.user.username);
        await SecureStore.setItemAsync("name", responseJson.user.firstName);
      });
  };

  const handleConfirmLocation = function () {
    var url = new URL("http://192.168.1.4:3000/findEmployees"),
      params = { firstName: search };
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    fetch(url)
      .then((response) => response.json())
      .then(async (json) => {
        setFoundEmployee(json.foundEmployee);
      })
      .catch((error) => console.log(error)) // display errors
      .finally(() => setLoading(false));
  };
  
  return (
    <SafeAreaView style={HomeStyles.safeArea}>
      <StatusBar
        translucent={false}
        backgroundColor={Colors.white}
        barstyle="dark-content"
      />
      <View style={HomeStyles.header}>
        <View>
          <Text style={{ color: Colors.greyHome }}>Employee Management</Text>
          <Text
            style={{ color: Colors.black, fontSize: 20, fontWeight: "bold" }}
          >
            Check-in
          </Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Image
            source={require("../../assets/images/app_icon/profile.jpg")}
            style={HomeStyles.profileImage}
          />
        </Pressable>
      </View>

      <View style={SearchBarStyles.HomeSearch}>
        <View style={SearchBarStyles.inputContainer}>
          <FontAwesome name={"search"} size={25} color={Colors.greyHome} />
          <TextInput
            placeholder="Search Employee"
            onChangeText={(search) => setSearch(search)}
          />
        </View>

        <Pressable onPress={() => handleConfirmLocation()}>
          <View style={SearchBarStyles.sortBtn}>
            <MaterialIcons name="home-search" size={25} color={Colors.black} />
          </View>
        </Pressable>
      </View>

      <FlatList
        snapToInterval={width - 20}
        contentontainerStyle={HomeStyles.contentontainerStyle}
        showsHorizontalScrollIndicator={false}
        vertical={true}
        data={foundEmployee}
        keyExtractor={(item, index) => {
          return item._id;
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={async () => {
              await SecureStore.setItemAsync("employee_id", item._id);
              navigation.navigate("DetailedPage", item);
            }}
          >
            <Card item={item} />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
