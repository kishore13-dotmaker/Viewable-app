import React from 'react';
import {View, Image, Text, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BookCardsStyle from './BookingCardStyles';
import Colors from '../../assets/colors/colors';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


export default function BookCards(checkin){

  
    return(
    
      <View style={BookCardsStyle.card}>
          {/* <Image source={shops.item.img} style={BookCardsStyle.cardImage}/> */}
          <View style={BookCardsStyle.CardTextView}> 
          <Text style={BookCardsStyle.CardTextTitle}> {checkin.item.check_in} </Text>
          <View style={{flexDirection :'row'}}>

          <FontAwesome name='rupee' size={20} color= {Colors.blueHome}/>
          <Text style={BookCardsStyle.CardTextRating}> {bookingHistory.item.time} </Text>
          </View>
          </View>
      </View>
        
    )   

}