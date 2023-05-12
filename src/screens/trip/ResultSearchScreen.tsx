import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import Colors from '@constants/colors';
import {useNavigation} from '@react-navigation/core';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '@navigators/AppStackNavigator';

type Props = NativeStackScreenProps<AppStackParamList, 'ResultSearch'>;

import CardResultSearch from '@components/cards/CardResultSearchPlaned';
import SimpleHeader from '@components/SimpleHeader';
import NoResultotTrip from '../../components/NoResultotTrip';
const ResultSearchScreen = ({route}: Props) => {
  const { goBack } = useNavigation();


  return (
    <SafeAreaView style={styles.container}>
        <SimpleHeader text='Planned Trips' />
        <View style={{ 
          marginVertical: 10,
          borderWidth: 2,
          borderColor: Colors.primaryColor,
          backgroundColor: Colors.whiteTone2,
          borderRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
         }}>
          <View>
            <Text style={{ 
              fontSize: 16,
              fontFamily: 'Poppins_500Medium',
             }}>{route.params.destination}</Text>
            <Text style={{ 
              fontSize: 16,
              fontFamily: 'Poppins_300Light',
             }}>XFA {route.params.price}</Text>
          </View>
          <TouchableOpacity onPress={() => goBack()} >
          <Ionicons
                name="close-circle"
                size={25}
                color={Colors.grayTone1}
                />
          </TouchableOpacity>
        </View>
       {/*  <Text style={{ 
              fontSize: 20,
              marginVertical: 10,
              marginLeft: 5,
              fontFamily: 'Poppins_600SemiBold',
             }}>Select a Planed trip</Text>
      <CardResultSearch /> */}

      
      <NoResultotTrip destination={route.params.destination} />


    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteTone1,
        paddingHorizontal: 20,
        paddingVertical: 40
    },
});

export default ResultSearchScreen;