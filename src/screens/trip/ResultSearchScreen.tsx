import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import Colors from '@constants/colors';

import CardResultSearch from '@components/cards/CardResultSearchPlaned';
import SimpleHeader from '@components/SimpleHeader';
const ResultSearchScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
        <SimpleHeader text='Planned Trips' />
        <View style={{ 
          marginVertical: 10,
          borderWidth: 2,
          borderColor: Colors.primaryColor,
          backgroundColor: Colors.whiteTone1,
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
             }}>Melen, Ecole Polytechnique</Text>
            <Text style={{ 
              fontSize: 16,
              fontFamily: 'Poppins_300Light',
             }}>XFA 250</Text>
          </View>
          <TouchableOpacity>
          <Ionicons
                name="close-circle"
                size={25}
                color={Colors.grayTone1}
                />
          </TouchableOpacity>
        </View>
        <Text style={{ 
              fontSize: 20,
              marginVertical: 10,
              marginLeft: 5,
              fontFamily: 'Poppins_600SemiBold',
             }}>Select a Planed trip</Text>

    <CardResultSearch />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteTone3,
        paddingHorizontal: 20,
        paddingVertical: 40
    },
});

export default ResultSearchScreen;