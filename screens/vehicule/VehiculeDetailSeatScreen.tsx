import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/colors';
import SeatTable from '../../components/SeatTable';

const VehiculeDetailSeatScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ 
              width: '70%',
              borderRadius: 20, 
              overflow: 'hidden', 
              height: 120 ,
              position: 'relative',
              alignSelf: 'center'
              }}>
              <Image resizeMode='contain' style={[styles.image]} source={require('../../assets/images/logo.png')} />
              <View style={{ 
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                opacity: 0.6,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 5
                }}>
                <Text style={[styles.boldText, {color: '#fff'}]}>04 Seats</Text>
                <Text style={[styles.mediumText, {color: '#fff'}]}>CLick to preview</Text>
                </View>
        </View>

        <SeatTable />
    </ScrollView>
  );
};

export default VehiculeDetailSeatScreen;

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    elevation: 2,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    position: 'relative',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  boldText: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: Colors.grayTone1
  },
  semiBoldText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.grayTone1
  },
  mediumText: {
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    color: Colors.grayTone1
  },
  lightText: {
    fontSize: 12,
    fontFamily: 'Poppins_300Light',
    color: Colors.grayTone3
  },
});