import React from 'react'
import { StyleSheet } from 'react-native';
import SimpleHeader from '@components/SimpleHeader';
import Colors from '@constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import AlertTopTabNavigator from '@navigators/AlertTopTabNavigator';



const NotificationScreen = () => {
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