import { StyleSheet, useWindowDimensions, View, TouchableOpacity, Animated, GestureResponderEvent, Pressable, Text } from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Ionicons} from '@expo/vector-icons';
import { Svg, G, Circle, CircleProps } from 'react-native-svg';
import Colors from '../constants/colors';

interface NextButtonProps {
  percentage: number,
  scrollTo:  (event: GestureResponderEvent) => void,
}

const OnBoardingNextButton = (props: NextButtonProps) => {
    const {width} = useWindowDimensions();
    const size = 80;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef<Circle | null>(null);

    const animation = ({toValue}: {toValue: number}) =>  {
      return Animated.timing(progressAnimation, {
          toValue,
          duration: 250,
          useNativeDriver: true
      }).start();
    }

    useEffect(() =>  {
      animation({toValue: props.percentage});
    }, [props.percentage]);

    useEffect(() => {
      progressAnimation.addListener(
        (value) => {
          const strokeDashoffset = circumference - (circumference * value.value) / 100;
          
          const setNativeProps = progressRef.current?.setNativeProps as (props: CircleProps) => void | undefined;
            setNativeProps?.({ strokeDashoffset: strokeDashoffset });
        },
      );

      return () => {
        progressAnimation.removeAllListeners();
      };
    }, []);

  return (
    <View style={[styles.container, {width}]}>
    <Pressable onPress={props.scrollTo}  >
      <Svg width={size} height={size} >
        <Circle cy={center} cx={center} r={radius} stroke={Colors.grayTone4} strokeWidth={strokeWidth} />
        <Circle 
          ref={progressRef}
          cy={center} 
          cx={center} 
          r={radius} 
          stroke={Colors.primaryColor}
          strokeWidth={strokeWidth} 
          strokeDasharray={circumference}
          />
          <Pressable  style={styles.button} >
          <Ionicons
                name="chevron-forward"
                size={32}
                color={Colors.primaryColor}
                /> 
          </Pressable >
      </Svg>
    </Pressable>
    </View>
  );
};

export default OnBoardingNextButton;

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.whiteTone1 ,
        position: 'relative'
    },
    button: {
      position: 'absolute',
      backgroundColor: Colors.whiteTone1 ,
      borderRadius: 100,
      padding: 8, 
      alignSelf: 'center',
      top: 14
    }
});