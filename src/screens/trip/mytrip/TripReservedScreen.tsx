import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SortBy from '@components/SortBy';
import { useNavigation } from '@react-navigation/core'
import { AppStackParamList } from '@navigators/AppNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import TicketCard from '@components/cards/TicketCard';

const TripReservedScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const next = () =>  {
    navigation.navigate('TripInfo', {
      from: 'reserved'
    });
  }
  return (
    <>
        <SortBy />
        <View style={[styles.container]}>
            <TicketCard onPress={next} /> 
        </View>
    </>
  );
};

export default TripReservedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 70,
    paddingTop: 10,
  }
});