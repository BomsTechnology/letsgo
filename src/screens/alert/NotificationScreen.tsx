import React,  { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet,  Image } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { AppStackParamList } from '@navigators/AppNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import tripStates, { TripStateProps } from '@data/TripState'
import SimpleHeader from '@components/SimpleHeader';
import { FlatList, TextInput } from 'react-native-gesture-handler'
import Colors from '@constants/colors';
import alertStates, {AlertStateProps} from '@data/AlertState';
import { AlertNavigator } from '@navigators/AlertNavigator';
import {Ionicons} from '@expo/vector-icons';




const NotificationScreen = () => {
  const [alertStateValue, setAlertStateValue] = useState<string>(alertStates[0].value);
  const navigation = useNavigation<NativeStackNavigationProp<AlertNavigator>>();
  const next = () =>  {
    if(alertStateValue == 'plannedalerts'){
        navigation.navigate('PlannedAlerts');
    }
  }
  const alertStateRender = ({ item }: {item : AlertStateProps}) =>{
    return (
        <TouchableOpacity 
            style={[
                    styles.alertState,
                    {
                        backgroundColor: alertStateValue == item.value ? Colors.primaryColor : 'transparent',
                    }
                ]} 
            onPress={() => setAlertStateValue(item.value)}
            >
            <Text
                style={[
                    styles.alertState_text,
                    {
                        color: alertStateValue == item.value ? Colors.whiteTone1 : Colors.grayTone1,
                    }
                ]}
                >{item.label}</Text>
        </TouchableOpacity>
    )
  }
   







  return (
    <SafeAreaView style={{marginLeft:15, marginRight:15}}>
     <SimpleHeader showButton={false} text='Alerts' />
     <View style={{ maxHeight: 100, marginLeft:16, marginBottom:9 }}>
            <FlatList
                    data={alertStates}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={alertStateRender}
                    keyExtractor={(item)=>item.value}
                    ItemSeparatorComponent={() => <View style={{width: 5}} />}
                />
        </View>
        <View style={{width:'100%',  height:40, borderWidth:2,borderRadius:7, borderColor:Colors.primaryColor, display:'flex',flexDirection:'row', justifyContent:'flex-start'}}>
                <Ionicons
                            name="search-outline"
                            size={20}
                            color={Colors.grayTone3}
                            style={{marginTop:8}}
                        /> 
            <TextInput
                placeholder='Search Event Alert'
            />
           
        </View>
            <View style={{justifyContent:'center', height:570,  width:'100%', position:'relative' }}>
                 <Image source={require('../../assets/images/planner.png')} style={{marginLeft:55}}/>
                 <Text style={{textAlign:'center', fontSize:30, fontWeight:'bold'}}>You didn't planned any alert yet</Text>
                 <TouchableOpacity style={{height:50, width:100, backgroundColor:Colors.primaryColor, borderRadius:10, display:'flex',  flexDirection:'row', padding:10, justifyContent:'space-between', position:'absolute', bottom:0,right:0}}>
                    <Ionicons
                                name="pencil"
                                size={15}
                                color={Colors.onPrimaryColor}
                                style={{marginTop:8}}
                            /> 
                    <Text style={{textAlign:'center',marginTop:5, color:Colors.onPrimaryColor}}>Compose</Text>
                 </TouchableOpacity>
            </View>
    </SafeAreaView>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.whiteTone3,
      padding: 20
  },
  alertState: {
      padding:6,
      paddingHorizontal: 10,
      borderRadius: 10,

  },
  alertState_text: {
      fontFamily: 'Poppins_300Light',
      fontSize: 14
  },
  filterItem: {
      paddingVertical:5,
      paddingHorizontal: 15,
      borderRadius: 20,
      borderWidth: 2
  },
  filterItem_text : {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 14
  }
})