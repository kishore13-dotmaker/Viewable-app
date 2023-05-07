import React, { Component, useState, useEffect } from "react";
import {
   SafeAreaView,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";
import BookingHistoryStyles from "./bookingHistoryStyle";
import HomeStyles from "../Home/HomeScreenStyles";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import { StackActions } from "@react-navigation/native";
const { width } = Dimensions.get("screen");
import OvertimeCards from "../ShopCards/OvertimeCard";


const OvertimeHistory = (navigation) => {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [checkin, setCheckin] = useState();
  const[employee_id,setEmployee_id]=useState();

    const handleSubmit = async () => {
      const employee_id = await SecureStore.getItemAsync("employee_id");
    //console.log(employee_id);
    setEmployee_id(employee_id);
    const details = {
      todate: toDate,
      fromdate: fromDate,
      employee_id: employee_id,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch("http://192.168.1.4:3000/overtimeHistory", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then(async (response) => {
        try {
          setCheckin(response.overtime);
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <SafeAreaView>
    <TextInput
        style={HomeStyles.input}
        labelValue={fromDate}
        onChangeText={(fromDate) => setFromDate(fromDate)}
        placeholder="From Date"
      />
      <TextInput
        style={HomeStyles.input}
        labelValue={toDate}
        onChangeText={(toDate) => setToDate(toDate)}
        placeholder="To Date"
      />
      <Pressable
        style={[HomeStyles.button, HomeStyles.buttonClose]}
        onPress={() => handleSubmit()}
      >
        <Text style={HomeStyles.textStyle}>Confirm Date</Text>
      </Pressable>
    <FlatList
      snapToInterval={width - 20}
      contentontainerStyle={BookingHistoryStyles.contentontainerStyle}
      showsHorizontalScrollIndicator={false}
      vertical={true}
      data={checkin}
      keyExtractor={(item, index) => {
        return item._id;
      }}
      renderItem={({ item }) => <OvertimeCards item={item} />}
    />
    </SafeAreaView>
  );
};

export default OvertimeHistory;

