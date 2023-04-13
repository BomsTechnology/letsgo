import { StyleSheet, Text, View } from 'react-native';
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
    setCheckedConfirm(false);
    setCheckedReserve(true);
  }

  const toogleConfirm = () => {
    setCheckedReserve(false);
    setCheckedConfirm(true);
  }

  const save = () => {
    navigation.navigate('FavoriteDestination' as never);
  }; 

  const backToHome = () => {
    navigation.navigate('Home' as never);
  }; 

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text='Trip Seat Booking' />
      <ScrollView style={styles.contentContainer}>
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
            defaultOption={{key:'2', value:'Orange Money'}}
            search={false} 
          />
          
        <CustomButton 
                bgColor={Colors.primaryColor}
                fgColor='#fff'
                isReady={selected != ""}
                onPress={save}
                text="Proced to payment"
              />

        <CustomButton 
          bgColor={Colors.errorInputColor}
          fgColor='#fff'
          isReady={true}
          onPress={backToHome}
          text="Back to home"
        />

      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectPayModeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone2,
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
});