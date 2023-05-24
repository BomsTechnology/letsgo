import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Colors from '@constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import SimpleHeader from '@components/SimpleHeader';
import CustomButton from '@components/buttons/CustomButton';
import {useNavigation} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import CheckboxField from '@components/inputFields/CheckboxField';
import CustomDropdownInput, {DropDataProps} from '@components/inputFields/CustomDropdownInput';

const SelectPayModeScreen = () => {
  const navigation = useNavigation();
  const [isCheckedConfirm, setCheckedConfirm] = useState(true);
  const [isCheckedReserve, setCheckedReserve] = useState(false);
  const [isCheckedPolicy, setCheckedPolicy] = useState(false);
  const [asError, setAsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selected, setSelected] = useState("");
  const dataConfirm: DropDataProps[] = [
    {key:'1', value:'Mobile Money'},
    {key:'2', value:'Orange Money'},
    {key:'3', value:'Card'},
  ];

  const dataReserve: DropDataProps[] = [
    {key:'1', value:'Cash'},
    {key:'2', value:'Mobile Money'},
    {key:'3', value:'Orange Money'},
    {key:'4', value:'Card'},
  ];

  const toogleReserve = () => {
    setAsError(false);
    setCheckedConfirm(false);
    setCheckedReserve(true);
  }

  const toogleConfirm = () => {
    setAsError(false);
    setCheckedReserve(false);
    setCheckedConfirm(true);
  }

  const selectPay = () => {
    setAsError(false);
    switch (selected) {
      case 'Orange Money':
        navigation.navigate('OMPayMode' as never);
        break;
      case 'Mobile Money':
        navigation.navigate('MOMOPayMode' as never);
        break;
      case 'Card':
        navigation.navigate('CardPayMode' as never);
        break;
      case 'Cash':
        if(isCheckedReserve){
          navigation.navigate('CashPayMode' as never);
        }else{
            setAsError(true);
            setErrorMessage('Cash Pay not allow for connfirmation')
        }
        break;
    }
  }; 

  const backToHome = () => {
    navigation.navigate('Home' as never);
  }; 

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text='Trip Seat Booking' />
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Select Booking Option</Text>
        <Text style={[styles.description]}>
          Do you want to confirm booking by paying now or reserve and pay later
        </Text>

        <View style={{ 
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            marginTop: 20
         }}>
          <View>
          <CheckboxField 
            text="Confirm"
            isChecked={isCheckedConfirm}
            setChecked={toogleConfirm}
            size={25}
            />
          </View>
          <View>
          <CheckboxField 
            text="Reserve"
            isChecked={isCheckedReserve}
            setChecked={toogleReserve}
            size={25}
            />
          </View>
        </View>

        <CustomDropdownInput  
            placeholder='Select payment option' 
            data={isCheckedConfirm ? dataConfirm : dataReserve} 
            setSelected={setSelected} 
            search={false}
            asError={asError}
            errorMessage={errorMessage} 
          />

          <View style={{ 
            paddingHorizontal: 30
           }}>
            <CheckboxField 
              text="By checking this box, I agree to the terms of use and acknowledge yhe"
              isChecked={isCheckedPolicy}
              setChecked={() => setCheckedPolicy(!isCheckedPolicy)}
              size={25}
              />
             { isCheckedConfirm ? <TouchableOpacity>
                 <Text style={[styles.hText]}>Confirmation Policy</Text>
              </TouchableOpacity> :
              <TouchableOpacity>
                  <Text style={[styles.hText]}>Reservation Policy</Text>
              </TouchableOpacity>}
          </View>
          
        <CustomButton 
                bgColor={Colors.primaryColor}
                fgColor='#fff'
                isReady={(selected != "") && isCheckedPolicy == true}
                onPress={selectPay}
                text="Proced to payment"
                marginVertical={10}
              />

        <CustomButton 
          bgColor={Colors.errorInputColor}
          fgColor='#fff'
          isReady={true}
          onPress={backToHome}
          text="Back to home"
          marginVertical={10}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectPayModeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    paddingHorizontal: 20,
    paddingTop: 40
  },
  contentContainer: {
    flex: 1,
    marginTop: 20
  },
  title: {
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 30,
    textAlign: 'left',
    color: '#000',
  },
  description: {
    fontFamily: 'Poppins_300Light',
    textAlign: 'left',
    color: Colors.grayTone1,
    fontSize: 16,
    marginHorizontal: 5,
    marginTop: 5
  },
  paragraph: {
    fontSize: 15,
  },
  hText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: Colors.secondaryColor,
    textAlign: 'left',
    marginLeft: 50
}
});