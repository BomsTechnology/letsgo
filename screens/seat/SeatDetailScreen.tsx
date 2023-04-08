import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constants/colors';

import SimpleHeader from '../../components/SimpleHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from '../../constants/ComponentStyled';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

import SeatTable from '../../components/table/SeatTable';
import PersonnalVehiculeModal from '../../components/modal/PersonnalVehiculeModal';
import MotoVehiculeModal from '../../components/modal/MotoVehiculeModal';
import MiniBusVehiculeModal from '../../components/modal/MiniBusVehiculeModal';
import BigBusVehiculeModal from '../../components/modal/BigBusVehiculeModal';
import CustomButton from '../../components/buttons/CustomButton';

const SeatDetailScreen = () => {
  const [modalVisibleP, setModalVisibleP] = useState(false);
  const [modalVisibleM, setModalVisibleM] = useState(false);
  const [modalVisibleB, setModalVisibleB] = useState(false);
  const [modalVisibleMB, setModalVisibleMB] = useState(false);
  return (
    
    <>
    <PersonnalVehiculeModal modalVisible={modalVisibleP} setModalVisible={setModalVisibleP} />
    <MotoVehiculeModal modalVisible={modalVisibleM} setModalVisible={setModalVisibleM} />
    <MiniBusVehiculeModal modalVisible={modalVisibleMB} setModalVisible={setModalVisibleMB} />
    <BigBusVehiculeModal modalVisible={modalVisibleB} setModalVisible={setModalVisibleB} />

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


          <CustomButton
                bgColor={Colors.primaryColor}
                fgColor='#fff'
                isReady={true}
                onPress={() => setModalVisibleP(!modalVisibleP)}
                text="Open personnal"
          />

          <CustomButton
                bgColor={Colors.primaryColor}
                fgColor='#fff'
                isReady={true}
                onPress={() => setModalVisibleM(!modalVisibleM)}
                text="Open Moto"
          />

          <CustomButton
                bgColor={Colors.primaryColor}
                fgColor='#fff'
                isReady={true}
                onPress={() => setModalVisibleMB(!modalVisibleMB)}
                text="Open Mini Bus"
          />

          <CustomButton
                bgColor={Colors.primaryColor}
                fgColor='#fff'
                isReady={true}
                onPress={() => setModalVisibleB(!modalVisibleB)}
                text="Open Big bus"
          />

        </ScrollView>
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
});