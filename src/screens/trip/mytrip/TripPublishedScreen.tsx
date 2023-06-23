import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SortBy from '@components/SortBy';
import CardMyTrip from '@components/cards/CardMyTrip';
import { useNavigation } from '@react-navigation/core'
import { AppStackParamList } from '@navigators/AppNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
const TripPublishedScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const next = () =>  {
    navigation.navigate('TripPublish');
  }
  return (
    <>
        <SortBy />
        <View style={[styles.container]}>
            <CardMyTrip onPress={next} /> 
        </View>
    </>
  );
};

export default TripPublishedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 70,
    paddingTop: 10,
  }
});