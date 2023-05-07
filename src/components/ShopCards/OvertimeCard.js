import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BookCardsStyle from './BookingCardStyles';
import Colors from '../../assets/colors/colors';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


export default function OvertimeCards(checkin){

  
    return(
    
      <View style={BookCardsStyle.card}>
          {/* <Image source={shops.item.img} style={BookCardsStyle.cardImage}/> */}
          <View style={BookCardsStyle.CardTextView}> 
          <Text style={BookCardsStyle.CardTextTitle}> {checkin.item.overtime} </Text>
          <View style={{flexDirection :'row'}}>
          <Text style={BookCardsStyle.CardTextRating}> {checkin.item.hours} </Text>
          </View>
          </View>
      </View>
        
    )   

}