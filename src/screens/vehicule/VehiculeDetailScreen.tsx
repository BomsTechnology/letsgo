import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SimpleHeader from '../../components/SimpleHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/colors';

import VehiculeDetailTopTabNavigator from '../../navigators/VehiculeDetailTopTabNavigator';

const VehiculeDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <SimpleHeader text='Vehicule Details' />
      </View>
      <VehiculeDetailTopTabNavigator />
      </SafeAreaView>
  );
};

export default VehiculeDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone3,
    paddingTop: 40
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    borderWidth: 0.5,
    borderColor: Colors.grayTone4,
    backgroundColor: Colors.whiteTone1,
  },
  contentScroll: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    elevation: 2,
    paddingHorizontal: 30,
    paddingTop: 20,
    position: 'relative',
    marginTop: 10
  },
  semiBoldText: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.grayTone1,
  },
  lightText: {
    fontSize: 14,
    fontFamily: 'Poppins_300Light',
    color: Colors.grayTone3,
    textDecorationLine: 'underline'
  },
});