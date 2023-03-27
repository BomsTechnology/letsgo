import React,{useState} from 'react'
import { View ,Text, StyleSheet} from 'react-native'
import Colors from '../constants/colors'
import { Poppins_700Bold , useFonts} from '@expo-google-fonts/poppins'
import Rating from './Rating'
const PoolerRating = () => {

  const [whiteMode, setMode]=useState(true)

  const [fontsLoaded] = useFonts({
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={[styles.container,styles.shadowProp,
      whiteMode? {backgroundColor:Colors.whiteTone2}
      :{backgroundColor:Colors.darkTone4,}
    ]}>
        <Rating rate={3} enablerating={true} />
        <View style={[styles.textContainer]}>
          <Text style={[styles.textStyle,
          whiteMode? {color:Colors.onWhiteTone}
          :{color:Colors.onPrimaryColor}
          ]}>3.6 out of  5</Text>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:263.67,
        marginTop:14,
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
})
export default PoolerRating