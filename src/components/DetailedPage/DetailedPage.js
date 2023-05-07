import React, { useEffect, useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import ImageBackground from "react-native/Libraries/Image/ImageBackground";
import DetailsStyles from "./DetailedPageStyle";
import { StatusBar } from "expo-status-bar";
import Colors from "../../assets/colors/colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import HotelImage from "./HotelImage";
import * as SecureStore from "expo-secure-store";
const { width } = Dimensions.get("screen");

const DetailedPage = ({ navigation, route, props }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [checkin, setCheckin] = useState();
  const[time,setTime]=useState();
  const[overTime,setOverTime]=useState();
  const[hours,setHours] = useState();
  const[employee_id,setEmployee_id] = useState();
  const item = route.params;
  const API_URL = "http://3.89.108.233:3000";
  
  const Check_in = async () => {
  try {
    const employee_id = await SecureStore.getItemAsync("employee_id");
    //console.log(employee_id);
    setEmployee_id(employee_id);
    
    const details = {
      employee_id: employee_id,
      checkin: checkin,
      time: time,
    };
    
    const formBody = Object.keys(details)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(details[key]))
      .join("&");

    const response = await fetch("http://192.168.1.4:3000/checkin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    });

    const responseJson = await response.json();
     Alert.alert("Check-In Successful, thank you!");
    //console.log(responseJson);
  } catch (error) {
    console.error(error);
  };
};

  const over_Time = async () => {
  try {
    const employee_id = await SecureStore.getItemAsync("employee_id");
    //console.log(employee_id);
    setEmployee_id(employee_id);
    
    const details = {
      employee_id: employee_id,
      overtime: overTime,
      hours: hours,
    };
    
    const formBody = Object.keys(details)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(details[key]))
      .join("&");

    const response = await fetch(ip+"/overtime", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    });

    const responseJson = await response.json();
    //console.log(responseJson);
    Alert.alert("Overtime Updated, thank you!");
  } catch (error) {
    console.error(error);
  }

};
  return (
    <SafeAreaView style={DetailsStyles.SafeAreaView}>
      <ScrollView>
        <StatusBar
          translucent={false}
          backgroundColor={Colors.white}
          barstyle="dark-content"
        />
        <View style={DetailsStyles.ImageContainer}>
          <ImageBackground
            style={DetailsStyles.ImageBackground}
            source={require("../../assets/images/app_icon/user.png")}
            //source={{ uri: item.image }}
          >
            <View style={DetailsStyles.header}>
              <TouchableOpacity onPress={navigation.goBack}>
                <View style={DetailsStyles.headerBtn}>
                  <FontAwesome
                    name={"chevron-left"}
                    size={20}
                    color={Colors.black}
                  />
                </View>
              </TouchableOpacity>
              <View style={DetailsStyles.headerBtn}>
                <FontAwesome
                  name={"heart"}
                  size={20}
                  color={Colors.red}
                  onPress={navigation.goBack}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={DetailsStyles.DetailsContainer}>
          <View style={DetailsStyles.title}>
            <Text style={DetailsStyles.titleText}>{item.firstName} {item.lastName}</Text>
          </View>
          <Text style={DetailsStyles.locationText}>{item.Role}</Text>
          <Text style={DetailsStyles.detailsText}>{item.DOJ}</Text>

          <FlatList
            snapToInterval={width - 20}
            keyExtractor={(_, key) => key.toString()}
            contentContainerStyle={{ marginTop: 20 }}
            horizontal
            showsHorizontalScrollIndicator={true}
            data={item.phoneImage}
            renderItem={({ item }) => <HotelImage image={item} />}
          />
          <View style={DetailsStyles.footer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={DetailsStyles.footerText}>{item.age}</Text>
              <FontAwesome
                name="star"
                size={21}
                color={Colors.blueHome}
                style={{ marginLeft: 10 }}
              />
            </View>

            <TouchableOpacity onPress={async () => {
              await SecureStore.setItemAsync("employee_id", item._id);
              navigation.navigate("Check-In", item);
            }}>
              <View style={DetailsStyles.bookNow}>
                <Text style={{ color: Colors.white }}>CHECK-IN</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={async () => {
              await SecureStore.setItemAsync("employee_id", item._id);
              navigation.navigate("Over-Time", item);
            }}>
              <View style={DetailsStyles.bookNow}>
                <Text style={{ color: Colors.white }}>OVERTIME</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <FormButton
        buttonTitle="Checkout"
        onPress={() => navigation.navigate('StripePayment')}
      /> */}
        <View style={DetailsStyles.centeredView}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={DetailsStyles.centeredView}>
              <View style={DetailsStyles.modalView}>
                <View style={DetailsStyles.row}>
                
                  <TextInput
                    style={DetailsStyles.input}
                    labelValue={checkin}
                    onChangeText={(checkin) => setCheckin(checkin)}
                    placeholder="CHECK-IN DATE"
                  />
                
                  <TextInput
                    style={DetailsStyles.input}
                    labelValue={time}
                    onChangeText={(time) => setTime(time)}
                    placeholder="CHECK-IN TIME"
                  />
                </View>
                <Pressable
                  style={[DetailsStyles.button, DetailsStyles.buttonClose]}
                  onPress={() => Check_in()}
                >
                  <Text style={DetailsStyles.textStyle}>UPDATE CHECK-IN</Text>
                </Pressable>
                <Pressable
                  style={[DetailsStyles.button, DetailsStyles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={DetailsStyles.textStyle}>
                    Go Back to Profile
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <View style={DetailsStyles.centeredView}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modal}
            onRequestClose={() => {
              setModal(!modal);
            }}
          >
            <View style={DetailsStyles.centeredView}>
              <View style={DetailsStyles.modalView}>
                <View style={DetailsStyles.row}>
                  
                  <TextInput
                    style={DetailsStyles.input}
                    labelValue={overTime}
                    onChangeText={(overTime) => setOverTime(overTime)}
                    placeholder="OVERTIME DATE"
                  />
              
                  <TextInput
                    style={DetailsStyles.input}
                    labelValue={hours}
                    onChangeText={(hours) => setHours(hours)}
                    placeholder="OVERTIME HOURS"
                  />
                </View>
                <Pressable
                  style={[DetailsStyles.button, DetailsStyles.buttonClose]}
                  onPress={() => over_Time()}
                >
                  <Text style={DetailsStyles.textStyle}>UPDATE OVERTIME</Text>
                </Pressable>
                <Pressable
                  style={[DetailsStyles.button, DetailsStyles.buttonClose]}
                  onPress={() => setModal(!modal)}
                >
                  <Text style={DetailsStyles.textStyle}>
                    Go Back to Profile
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailedPage;
