import React, { useState } from 'react'
import { StyleSheet, View ,GestureResponderEvent, Text, Image, Button, TouchableOpacity, ImageSourcePropType} from 'react-native'
import Colors from '../constants/colors'
import { Poppins_700Bold } from '@expo-google-fonts/poppins'
import { Inter_500Medium ,Inter_600SemiBold,Inter_400Regular, useFonts} from '@expo-google-fonts/inter'
import Rating from './Rating'

type tripCardProps={
    data:{
        avatar:ImageSourcePropType,
        name: string,
        from: string,
        to: string,
        duration: string,
        distance: string,
        datetime:string,
        price:number
     },
    onPressHelp?:(event:GestureResponderEvent)=>void,
    onPressRate?:(event:GestureResponderEvent)=>void,
    withRating:boolean
}


const TripCards = (props:tripCardProps) => {



  return (
    <View style={[styles.container,styles.shadowProp,
        {backgroundColor:Colors.whiteTone2}
        
    ]}>
        <View style={styles.cardHeader}>
            <Image 
                source={props.data.avatar}
                style={styles.avatar}
             />
             {
                props.withRating? 
                (
                    <View style={{flexDirection:'column', marginLeft:14}}>
                        <Rating rate={4} enablerating={false} />
                        <Text style={styles.userName}>Your trip with {props.data.name}</Text>
                    </View>
                )
               :(
                    <Text style={[styles.userName,{marginLeft:14},
                        {color:Colors.onWhiteTone}
                  
                    ]}>Your trip with {props.data.name}</Text>
               )
             }

        </View>
        <View style={styles.firstBody}>
            <View style={styles.locationContainer}>

                <Text style={[styles.start,
                     {color:Colors.onWhiteTone}
                    
                ]}>From {props.data.from} </Text>

                <Text style={[styles.start,
                     {color:Colors.onWhiteTone}
                ]}>To {props.data.to} </Text>

            </View>
            <View style={styles.durationContainer}>
                <Text style={styles.time}> {props.data.duration} </Text>
                <Text style={styles.distance}> {props.data.distance} </Text>
            </View>
        </View>

        <View style={styles.separator}></View>

        <View style={[styles.priceContainer,props.withRating && {marginBottom:14}]}>

            <Text style={[styles.datetimeText,
                 {color:Colors.onWhiteTone}
                
            ]}>
                On {props.data.datetime} Payed with 
            </Text>

            { props.withRating ?
                (
                    <View style={{flexDirection:'column',alignItems:'flex-end', marginRight:14}}>
                        <Text style={styles.price1}>$2.93</Text>
                        <Text style={styles.rateText}>Free</Text>
                    </View>
                )

                :(
                    <Text style={styles.price}>${props.data.price}</Text>
                )
            }

            
        </View>

        {!props.withRating &&
            (
            <View style={styles.cardFooter}>
                <TouchableOpacity
                    onPress={props.onPressHelp}
                    style={[styles.helButton,
                    {backgroundColor:Colors.whiteTone2}
                   
                ]}>
                    <Text style={[styles.helptext,
                        {color:Colors.onWhiteTone}
                        
                    ]}>
                        I need help
                    </Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                    onPress={props.onPressRate}
                    style={ [styles.rateButton
                ]}
                >
                    <Text style={styles.helptext}>Rate trip</Text>
                </TouchableOpacity>
            </View>
            )
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'column',
        gap:30,
        borderRadius:16,
        marginTop:14
    },
    cardHeader:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginLeft:14,
        marginTop:14
    },
    avatar:{
        width:53,
        height:53,
        borderRadius:50
    },
    userName:{
        fontFamily:'Poppins_700Bold',
        fontSize:22,
        fontWeight:'700',
        lineHeight:34,
    },
    firstBody:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    locationContainer:{
        display:'flex',
        flexDirection:'column',
        alignContent:'space-between',
        gap:25,
        width:'60%',
        marginLeft:14,
        marginRight:14
    },
    start:{
        fontFamily:'Inter_500Medium',
        fontSize:16,
        fontWeight:'500',
        lineHeight:22,
    },
    finish:{},
    durationContainer:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        gap:8,
        minHeight:50,
        marginRight:14,
    },
    distance:{
        fontFamily:'Inter_400Regular',
        fontWeight:'400',
        fontSize:20,
        color:Colors.secondaryColor,
            },
    time:{
        fontFamily:'Inter_600SemiBold',
        fontWeight:'600',
        fontSize:28,
        color:Colors.secondaryColor
    },
    separator:{
        height:1,
        marginLeft:14,
        marginRight:14,
        backgroundColor:Colors.grayTone1
    },
    priceContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',

    },
    datetimeText:{
        marginLeft:14,
        width:'60%',
        fontFamily:'Inter_400Regular',
        fontWeight:'400',
        fontSize:16,
        lineHeight:22,
        
    },
    price:{
        marginRight:14,
        fontFamily:'Inter_600SemiBold',
        fontWeight:'600',
        fontSize:28,
        
        color:Colors.primaryColor
    },
    cardFooter:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20
    },
    helButton:{
        marginLeft:14,
        width:151,
        height:54,
        borderColor:Colors.grayTone3,
        borderWidth:2,
        borderRadius:32,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    helptext:{
        fontFamily:'Poppins_700Bold',
        fontSize:16,
        fontWeight:'700',
        letterSpacing:3,
        
    },
    rateButton:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:129,
        height:54,
        borderRadius:32,
        backgroundColor:Colors.primaryColor,
        marginRight:14
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 30,
      },
      rateText:{
        fontFamily:'Inter_600SemiBold',
        color:Colors.secondaryShade1,
        fontWeight:'600'
      },

      price1:{
        fontFamily:'Inter_600SemiBold',
        fontWeight:'600',
        fontSize:28,
        color:Colors.secondaryShade1
    },

})
export default TripCards