import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SimpleHeader from '../../components/SimpleHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/colors';
import TripInfoTopTabNavigator from '../../navigators/TripInfoTopTabNavigator';
const TripInfoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <SimpleHeader text='Trip info By Marcelin S.' />
      </View>
        <TripInfoTopTabNavigator />
    </SafeAreaView>
  );
};

export default TripInfoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteTone3,
        paddingTop: 40
    },
});