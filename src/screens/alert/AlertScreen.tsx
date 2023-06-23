import React,  { useEffect } from 'react'
import {  Text, View, StyleSheet,  Image } from 'react-native';
import SimpleHeader from '@components/SimpleHeader';
import Colors from '@constants/colors';
import {Ionicons} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@components/buttons/CustomButton';
import { useAppDispatch } from "@store/store";
import { toogleShowFilter, toogleShowInput } from '@store/features/search/myTripSearchSlice'
import AlertTopTabNavigator from '@navigators/AlertTopTabNavigator';



const NotificationScreen = () => {
  const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(toogleShowFilter(false));
        dispatch(toogleShowInput(true));
    }, []);
  return (
    <SafeAreaView style={styles.container}>
        <SimpleHeader showLeftButton={false} text='Alerts' />
        <AlertTopTabNavigator />
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: Colors.whiteTone3,
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 70,
  }
});