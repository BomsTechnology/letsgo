import {StyleSheet, Text, Pressable, GestureResponderEvent} from 'react-native';
import React from 'react';
import {useFonts, Poppins_500Medium, Poppins_800ExtraBold, Poppins_300Light} from '@expo-google-fonts/poppins';
import Colors from '../styles/colors';

interface CustomButtonProps {
  text: string;
  type: string;
  bgColor?: string;
  fgColor?: string;
  onPress: (event: GestureResponderEvent) => void;
}

const CustomButton = (props: CustomButtonProps) => {

  const [fontsLoaded] = useFonts({
    Poppins_500Medium, 
    Poppins_800ExtraBold,
    Poppins_300Light
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Pressable
      onPress={props.onPress}
      style={[
        styles.container,
        props.type === 'PRIMARY'
          ? styles.container_PRIMARY
          : props.type === 'SECONDARY'
          ? styles.container_SECONDARY
          : styles.container_TERTIARY,
        props.bgColor ? {backgroundColor: props.bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          props.type === 'TERTIARY'
            ? styles.text_TERTIARY
            : props.type === 'SECONDARY'
            ? styles.text_SECONDARY
            : {},
          props.fgColor ? {color: props.fgColor} : {},
          
        ]}>
        {props.text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: Colors.primaryColor,
  },

  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },

  container_TERTIARY: {},

  text: {
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'Poppins_500Medium',
    textTransform: 'uppercase'
  },

  text_SECONDARY: {
    color: '#3B71F3',
  },

  text_TERTIARY: {
    color: 'gray',
  },
});

export default CustomButton;
