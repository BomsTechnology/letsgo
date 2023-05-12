import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {useForm, FieldValues} from 'react-hook-form';
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import CustomInput from '@components/inputFields/CustomInput';
import Colors from '@constants/colors';
import CustomDropdownInput, {DropDataProps} from '@components/inputFields/CustomDropdownInput';
import CheckboxField from '@components/inputFields/CheckboxField';
import CustomButton from '@components/buttons/CustomButton';

const TripPlanMoreScreen = () => {
  const [isCheckedDay, setCheckedDay] = useState(true);
  const [isCheckedNight, setCheckedNight] = useState(false);

  const [selectedService, setSelectedService] = useState("");
  const [selectedVehicule, setSelectedVehicule] = useState("");
  const dataServiceType: DropDataProps[] = [
    {key:'1', value:'Normal'},
    {key:'2', value:'Depot'},
    {key:'3', value:'Course'},
    {key:'4', value:'Urgence'},
  ];

  const dataVehiculeType: DropDataProps[] = [
    {key:'1', value:'Personal'},
    {key:'2', value:'Taxi'},
    {key:'3', value:'Bus 28 Seats'},
    {key:'4', value:'Bus 70 Seats'},
  ];

  const toogleDay = () => {
    setCheckedNight(false);
    setCheckedDay(true);
  }

  const toogleNight = () => {
    setCheckedDay(false);
    setCheckedNight(true);
  }
  const {
    control,
    handleSubmit,
    watch,
    //formState: {errors},
  } = useForm();

  const moneyIcon = ( <FontAwesome5 name="search-dollar" size={20} color={Colors.primaryColor} /> );
  const onPress = () => {};
  return (
    <View style={[styles.container]}>
      <ScrollView  showsVerticalScrollIndicator={false}>
      
      <Text style={styles.description}>Luggage Weight (in kg)</Text>
      <CustomInput
        placeholder="LUGGAGE WEIGHT (in kg)"
        name="weight"
        control={control}
        secureTextEntry={false}
        bgColor={Colors.whiteTone1}
        rules={{
          required: 'The adress is required',
        }}
        />

      <Text style={styles.description}>Budget</Text>
      <CustomInput
        placeholder="Your budget"
        name="money"
        control={control}
        secureTextEntry={false}
        prefixType='icon'
        sufixType='text'
        prefix={moneyIcon}
        keyboardType='numeric'
        sufix="X A F"
        bgColor='#fff'
        rules={{
          required: 'The price is required',
        }}
        />


    <Text style={styles.description}>Number of seat</Text>
      <CustomInput
        placeholder="Number of seat"
        name="nbSeat"
        control={control}
        secureTextEntry={false}
        keyboardType='numeric'
        bgColor='#fff'
        rules={{
          required: 'The Number of seat is required',
        }}
        />

        <Text style={styles.description}>Type of Service</Text>
        <View style={{ 
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20
         }}>
          <View>
          <CheckboxField 
            text="Day"
            isChecked={isCheckedDay}
            setChecked={toogleDay}
            size={25}
            />
          </View>
          <View>
          <CheckboxField 
            text="Night"
            isChecked={isCheckedNight}
            setChecked={toogleNight}
            size={25}
            />
          </View>
        </View>

        <CustomDropdownInput  
            placeholder='Select Type of Service' 
            data={dataServiceType} 
            setSelected={setSelectedService} 
            defaultOption={{key:'1', value:'Normal'}}
            search={false}
          />

      <Text style={styles.description}>Type of Vehicule</Text>
      <CustomDropdownInput  
            placeholder='Select Type of vehicule' 
            data={dataVehiculeType} 
            setSelected={setSelectedVehicule} 
            defaultOption={{key:'2', value:'Taxi'}}
            search={false}
          />
          
        <CustomButton 
                bgColor={Colors.primaryColor}
                fgColor='#fff'
                isReady={true}
                onPress={onPress}
                text="Publish the trip"
                marginVertical={10}
              />

        <CustomButton 
          bgColor={Colors.errorInputColor}
          fgColor='#fff'
          isReady={true}
          onPress={onPress}
          text="Discard"
          marginVertical={10}
        />
      
      </ScrollView>
    </View>
  )
}

export default TripPlanMoreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  description: {
    fontFamily: 'Poppins_300Light',
    textAlign: 'left',
    color: Colors.grayTone1,
    fontSize: 14,
    marginHorizontal: 5,
    marginTop: 15
},
})