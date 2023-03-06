import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Ionicons, MaterialCommunityIcons, FontAwesome5} from '@expo/vector-icons';
import React from 'react';

interface CustomInputProps {
   // control: Control;
    name: string;
    placeholder: string;
    secureTextEntry: boolean;
    rules?: Object;
  }

const CustomInput = () => {
  return (
      <View
        style={[
          styles.container,
        ]}>
          <View
            style={[
              styles.iconStyle
            ]}>
           <Ionicons
                name="information-circle"
                size={25}
                color={"#3280F0"}
                />  
        </View>
        <TextInput
          placeholder="Enter Your Name Here"
          underlineColorAndroid="transparent"
          style={styles.input}
        />
      </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
      width: '100%',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 5,
      height: 40,
    },
    container_NORMAL: {
      borderColor: '#e8e8e8',
    },
    container_ERROR: {
      borderColor: 'red',
    },
    input: {
      flex: 1
    },
    iconStyle: {
      //padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
      alignItems: 'center',
    },
    text_ERROR: {
      color: 'red',
      alignSelf: 'stretch',
    },
  });