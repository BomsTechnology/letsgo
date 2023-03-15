import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal, Dimensions, FlatList, ImageSourcePropType, Alert, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import {Ionicons} from '@expo/vector-icons';
import {useFonts, Poppins_500Medium, Poppins_800ExtraBold, Poppins_300Light} from '@expo-google-fonts/poppins';
import { countryCodeProps, countryCodes } from "../data/CountryCode"
import Colors from '../constants/colors';
interface CustomPhoneNumberInputProps {
    selectedArea: countryCodeProps,
    setModalVisible: Function,
}


const { width, height } = Dimensions.get('window');

const CustomPhoneNumberInput = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedArea, setSelectedArea] = useState<countryCodeProps | null>(null);
    const [fontsLoaded] = useFonts({
        Poppins_500Medium, 
        Poppins_800ExtraBold,
        Poppins_300Light
    });

  
    const renderItem = ({ item }: {item : countryCodeProps}) =>{
        return (
          <TouchableOpacity
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center"
            }}
            onPress={() =>{
              setSelectedArea(item),
              setModalVisible(false)
            }}
          >
            <Image
             source={ item.flag}
             style={{
              height: 25,
              width: 40,
              marginRight: 10
             }}
            />
  
            <Text style={{fontSize: 14, fontFamily: 'Poppins_500Medium', color: Colors.grayTone1}}>{item.name}</Text>
          </TouchableOpacity>
        )
      }
    
    if (!fontsLoaded) {
    return null;
    }

    

  return (
    <>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
         <View
             style={{flex: 1, alignItems: "center", justifyContent: "center"}}
            >
                <View
                 style={[styles.shadowProp,{
                  height: 400,
                  width: width*0.8,
                  backgroundColor: Colors.whiteTone3,
                  borderRadius: 12,
                  paddingBottom: 20
                 }]}
                >
            <FlatList
                     data={countryCodes}
                     renderItem={renderItem}
                     keyExtractor={(item)=>item.code}
                     showsVerticalScrollIndicator={true}
                     style={{
                      paddingHorizontal: 20,
                      marginVertical:10
                     }}
                    />
          </View>
        </View>
      </Modal>
    <View style={styles.container}>
      <Text style={{ margin: 5 }}>Phone</Text>
      <View style={styles.inputContainer}>
            <TouchableOpacity
            onPress={() => setModalVisible(true)}
                style={[styles.shadowProp,{ 
                    width: 100,
                    height: 50,
                    marginRight: 5,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 8
                }]}
            >
                <View style={{ justifyContent: 'center' }}>
                    <Ionicons
                    name="chevron-down-outline"
                    size={15}
                    color={Colors.grayTone3}
                    /> 
                </View>
                <View style={{ justifyContent: 'center', marginHorizontal: 8 }}>
                <Image
                    source={ selectedArea?.flag!}
                    style={{
                    height: 10,
                    width: 15,
                    }}
                    />
                </View>
                <View style={{ justifyContent: 'center',  }}>
                    <Text style={{ fontSize: 16, color: Colors.grayTone1, fontFamily: 'Poppins_300Light' }}>{ selectedArea?.callingCode }</Text>
                </View> 
            </TouchableOpacity>
            <TextInput 
            placeholder='Enter your phone number'
            placeholderTextColor={Colors.grayTone3}
            selectionColor={Colors.grayTone1}
            keyboardType='numeric'
            style={[styles.shadowProp,{
                flex:1,
                height: 50,
                color: Colors.grayTone1,
                fontFamily: 'Poppins_300Light',
                fontSize: 16,
                paddingHorizontal: 8
            }]}/>
      </View>
      
    </View>
    
    </>
  );
};

export default CustomPhoneNumberInput;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
    },
    inputContainer: {
        paddingHorizontal:5,
        flexDirection: 'row'
    }, 
    shadowProp: {
      shadowColor: '#171717',
      elevation: 4,
      backgroundColor: Colors.whiteTone1,
      borderRadius: 10
    },
});