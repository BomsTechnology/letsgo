import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal, Dimensions, FlatList, ImageSourcePropType, Alert, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import {Ionicons} from '@expo/vector-icons';
import {useFonts, Poppins_500Medium, Poppins_800ExtraBold, Poppins_300Light} from '@expo-google-fonts/poppins';
import { countryCodeProps, countryCodes } from "../data/CountryCode"
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
  
            <Text style={{fontSize: 18, color: "#fff"}}>{item.name}</Text>
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
                 style={{
                  height: 400,
                  width: width*0.8,
                  backgroundColor: "#342342",
                  borderRadius: 12,
                  paddingBottom: 20
                 }}
                >
            <FlatList
                     data={countryCodes}
                     renderItem={renderItem}
                     keyExtractor={(item)=>item.code}
                     showsVerticalScrollIndicator={false}
                     style={{
                      paddingHorizontal: 20,
                      marginVertical:10
                     }}
                    />
          </View>
        </View>
      </Modal>
    <View style={styles.container}>
      <Text>Phone</Text>
      <View style={styles.inputContainer}>
            <TouchableOpacity
            onPress={() => setModalVisible(true)}
                style={{ 
                    width: 100,
                    height: 50,
                    marginHorizontal: 5,
                    borderBottomColor: "#111",
                    borderBottomWidth: 1,
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <View style={{ justifyContent: 'center' }}>
                    <Ionicons
                    name="chevron-down-outline"
                    size={20}
                    color={'#111'}
                    /> 
                </View>
                <View style={{ justifyContent: 'center', marginHorizontal: 8 }}>
                <Image
                    source={ selectedArea?.flag!}
                    style={{
                    height: 15,
                    width: 20,
                    }}
                    />
                </View>
                <View style={{ justifyContent: 'center',  }}>
                    <Text style={{ fontSize: 16, color: '#111', fontFamily: 'Poppins_300Light' }}>{ selectedArea?.callingCode }</Text>
                </View> 
            </TouchableOpacity>
            <TextInput 
            placeholder='Enter your phone number'
            placeholderTextColor={'#111'}
            selectionColor={'#111'}
            keyboardType='numeric'
            style={{
                flex:1,
                marginVertical: 10,
                height: 40,
                color: '#111',
                borderBottomColor: "#111",
                borderBottomWidth: 1,
                fontFamily: 'Poppins_300Light',
                fontSize: 16
            }}/>
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
        elevation: 2,
        flexDirection: 'row'
    }, 
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
});