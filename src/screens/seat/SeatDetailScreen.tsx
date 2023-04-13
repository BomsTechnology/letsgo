import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Colors from '@constants/colors';

import SimpleHeader from '@components/SimpleHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from '@constants/ComponentStyled';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import SeatTable from '@components/table/SeatTable';
import PersonnalVehiculeModal from '@components/modal/PersonnalVehiculeModal';
import CustomButton from '@components/buttons/CustomButton';
const { width, height } = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';

const SeatDetailScreen = () => {
  const navigation = useNavigation();
  const [modalVisibleP, setModalVisibleP] = useState(false);

  const geToPayMode = () => {
    navigation.navigate('SelectPayMode' as never);
  }

  return (
    <>
    <PersonnalVehiculeModal modalVisible={modalVisibleP} setModalVisible={setModalVisibleP} />

    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <SimpleHeader text='Trip Seat Details' />
      </View>
      <View style={[styles.contentContainer]}>

        <View >
          <Text style={styles.lightText}>General Confort</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
                name="wifi"
                size={25}
                color={Colors.grayTone1}
                /> 
            <Text style={[styles.semiBoldText, {marginLeft: 10}]}>Wifi avalaible</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
                name="wifi"
                size={25}
                color={Colors.grayTone1}
                /> 
            <Text style={[styles.semiBoldText, {marginLeft: 10}]}>No Smoking in the car</Text>
          </View>
          
        </View>
        <Divider style={{ marginVertical: 10 }} />
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex:1,}}>
        <View style={{ 
                width: '70%',
                borderRadius: 20, 
                overflow: 'hidden', 
                height: 120 ,
                position: 'relative',
                alignSelf: 'center'
                }}>
                
                <TouchableOpacity onPress={ () => setModalVisibleP(!modalVisibleP)} style={{ 
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
                  </TouchableOpacity>
          </View>

          <SeatTable withStatus />


          

        </ScrollView>
        <View key="fixed" style={[styles.seatBox]}>
              <CustomButton
                    bgColor={Colors.primaryColor}
                    fgColor='#fff'
                    isReady={true}
                    onPress={geToPayMode}
                    text="Book the selected seats"
                  />
          </View>
      </View>   
    </SafeAreaView>
    </>
  );
};
export default SeatDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone3,
    paddingTop: 40
  },
  contentContainer: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    flexGrow: 1,
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    elevation: 2,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    position: 'relative'
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
    color: Colors.grayTone2
  },
  seatBox: {
    width: width,
    padding: 10,
    elevation: 10,
    backgroundColor: Colors.whiteTone1,
    position: 'absolute',
    bottom: 0,
    left:0,
    right: 0,
    borderTopWidth: 1,
    borderColor: Colors.grayTone4
  }
});