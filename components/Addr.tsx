import React, { useState } from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native'
import Colors from '../constants/colors'
import { Inter_500Medium, useFonts } from '@expo-google-fonts/inter'
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons'

const Addr = () => {

    const [text, onChangeText] = useState('');


    const [fontsLoaded] = useFonts({
        Inter_500Medium
      });

      if (!fontsLoaded) {
        return null;
      }
  return (
    <View style={styles.container}>
        <View style={styles.locationStyle}>
            <View>
                <Text style={styles.title}>Your location</Text>
                <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder='Melen,Yaoundé-Cameron'
                inlineImageLeft='username'
                />
                
            </View>
            <View>
            <MaterialCommunityIcons 
            name='crosshairs-gps' 
            size={16} 
            style={styles.crosshairicon}/>
            
            </View>
        </View>
        <View style={styles.line}></View>
        <View style={styles.map}>
            <View>
            <Text style={styles.choiseText}>Choose on map</Text>
            </View>
            <View>
            <Octicons name="location" size={16} style={styles.locationDot} />
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        backgroundColor:Colors.darkTone1,
        height:117,
        borderRadius:10,
        marginTop:20

    },
    locationStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:14,
        marginLeft:8,
        marginRight:8
    },
    title:{
        fontFamily:'Inter_500Medium',
        fontWeight:'500',
        fontSize:20,
        lineHeight:20,
        color:Colors.onPrimaryColor,
    },
    input:{
        fontFamily:'Inter_500Medium',
        fontStyle:'normal',
        fontWeight:'500',
        fontSize:15,
        lineHeight:20,
        color:Colors.grayTone4,
        borderBottomColor:Colors.grayTone1,
        borderBottomWidth:2
    },
    line:{
        backgroundColor:Colors.grayTone1,
        height:2,
        marginLeft:8,
        marginRight:8
    },
    choiseText:{
        fontFamily:'Inter_500Medium',
        fontStyle:'normal',
        fontWeight:'500',
        fontSize:20,
        lineHeight:20,
        color:Colors.onPrimaryColor
    },
    map:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:8,
        marginRight:8,
        marginBottom:14
    },
    crosshairicon:{
        width:16,
        height:16,
        color:Colors.secondaryColor
    },
    locationDot:{
        color:Colors.secondaryColor
    }
})

export default Addr