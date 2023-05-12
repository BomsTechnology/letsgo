import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import CustomButton from './buttons/CustomButton';
import Colors from '@constants/colors';
import {useNavigation} from '@react-navigation/core';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigators/AppStackNavigator';

interface NoResultotTripProps {
    destination: string;
}

const NoResultotTrip = ({destination}: NoResultotTripProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    const goToPlan = () =>  { navigation.push('TripPlan') }
  return (
    <View style={[styles.container]}>
        <Image source={require('@assets/images/traveller.png')} />
        <Text style={[styles.text]}>
            There are no trip available to the address 
            “{destination}”
        </Text>
        <CustomButton 
                bgColor={Colors.primaryColor}
                fgColor='#fff'
                isReady={true}
                onPress={goToPlan}
                text="Plan this trip"
              /> 
    </View>
  );
};

export default NoResultotTrip;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:'center',
        flex: 1,
        paddingEnd: 10
    },
    text: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 22,
        textAlign: 'center',
        marginVertical: 20
    }
});