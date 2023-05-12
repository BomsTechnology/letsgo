import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import { ScrollView } from 'react-native-gesture-handler';

const TripInfoPOIScreen = () => {
  return (
    <View style={[styles.container]}>
      <ScrollView>
      <Text>Itinerary</Text>
      </ScrollView>
    </View>
  );
};

export default TripInfoPOIScreen;

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    flex: 1,
    backgroundColor: Colors.whiteTone2,
    elevation: 2,
    paddingHorizontal: 20,
    paddingTop: 15
  }
});