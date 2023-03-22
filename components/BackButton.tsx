import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import Colors from '../constants/colors';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
const BackButton = () => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.container}>
        <Pressable onPress={goBack} style={[styles.shadowProp, {padding: 8}]}>
        <Ionicons
                name="chevron-back"
                size={25}
                color={Colors.grayTone1}
                /> 
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 10
    },
    shadowProp: {
        shadowColor: '#171717',
        elevation: 4,
        backgroundColor: Colors.whiteTone1,
        borderRadius: 10
      },
});

export default BackButton;