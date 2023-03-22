import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import StepHeader from '../components/StepHeader';

const UserRoleScreen = () => {
  return (
    <SafeAreaView style={styles.container}>   
        <StepHeader elementsNumber={4} currentStep={3} />
        <Text style={styles.title}>Choose a role !</Text>
        <Text style={styles.description}>Which role whould you want to take in this log in?</Text>
    </SafeAreaView>
  );
};

export default UserRoleScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteTone1,
        paddingHorizontal: 20,
        paddingVertical: 40
    },
      title: {
        fontFamily: 'Poppins_800ExtraBold',
        fontSize: 35,
        marginBottom: 15,
        textAlign: 'left',
        color: '#000',
    },
    description: {
        fontFamily: 'Poppins_300Light',
        textAlign: 'left',
        color: Colors.grayTone1,
        fontSize: 16
    },
    paragraph: {
      fontSize: 15,
    },
});