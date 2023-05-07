import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ShopCardsStyle from './ShopCardsStyle';
import Colors from '../../assets/colors/colors';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


export default function Cards(foundEmployee){

  
    return(
    
      <View style={ShopCardsStyle.card}>
          <Image source={require("../../assets/images/app_icon/user.png")} style={ShopCardsStyle.cardImage}/>
          <View style={ShopCardsStyle.CardTextView}> 
          <Text style={ShopCardsStyle.CardTextTitle}> {foundEmployee.item.firstName} {foundEmployee.item.lastName} </Text>
          <View style={{flexDirection :'row'}}>

          <Text style={ShopCardsStyle.CardTextRating}> {foundEmployee.item.age} </Text>
          </View>
          </View>
          <Text style={ShopCardsStyle.CardTextLocation}>{foundEmployee.item.Role}</Text>
      </View>
        
    )   

}