import React from 'react'
import { View ,Text, StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import Rating from './Rating';

interface UserRatingProps {
  rate: number;
  bgColor?: string; 
  fgColor?: string;
  enablerating?: boolean 
}

const UserRating = ({rate, bgColor, fgColor, enablerating}: UserRatingProps) => {
  return (
    <View style={[styles.container,styles.shadowProp,
       {backgroundColor: bgColor ? bgColor : Colors.whiteTone2}
    ]}>
        <Rating rate={rate} enablerating={enablerating != undefined ? enablerating : false} />

    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:200,
        marginTop:5,
        borderRadius:6,
        height:42
    },

    textContainer:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    },
    textStyle:{
      fontFamily:'Poppins_700Bold',
      fontWeight:'700',
      fontSize:16,
      lineHeight:24
    },
    shadowProp: {
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 20,
    },
});
export default UserRating;