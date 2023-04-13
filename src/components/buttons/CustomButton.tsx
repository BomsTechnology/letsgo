import {StyleSheet, Text, Pressable, GestureResponderEvent} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';

interface CustomButtonProps {
  text: string;
  bgColor: string;
  fgColor: string;
  isReady: boolean;
  onPress: (event: GestureResponderEvent) => void;
  marginHorizontal?: number;
  marginVertical?: number;
}

const CustomButton = (props: CustomButtonProps) => {

  return (
    <Pressable
      onPress={props.onPress}
      disabled={!props.isReady}
      style={[
        styles.container,
        {
          backgroundColor: props.isReady ? props.bgColor : Colors.whiteTone3,
          marginVertical: props.marginVertical ? props.marginVertical : undefined
        },
      ]}>
      <Text
        style={[
          styles.text,
          {color: props.isReady ? props.fgColor : Colors.grayTone3},
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

  text: {
    fontWeight: 'bold',
    fontFamily: 'Poppins_500Medium',
    textTransform: 'uppercase',
    letterSpacing: 3
  },


});

export default CustomButton;
