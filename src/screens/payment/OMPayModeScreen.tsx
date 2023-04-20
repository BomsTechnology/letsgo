import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Colors from '@constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import SimpleHeader from '@components/SimpleHeader';
import CustomPhoneNumberInput from '@components/inputFields/CustomPhoneNumberInput';
import {useForm, FieldValues} from 'react-hook-form';
import { countryCodeProps } from "@data/CountryCode"
import CustomButton from '@components/buttons/CustomButton';
import {useNavigation} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import TripDetailTable from '@components/table/TripDetailTable';
const { width, height } = Dimensions.get('window');

const OMPayModeScreen = () => {
  const navigation = useNavigation();
  const [selectedCountry, setSelectedCountry] = useState<countryCodeProps | null>(null);
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const numberPhone = watch("phonenumber");
  const save = () => {
    navigation.navigate('TicketList' as never);
  }; 
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text='Trip Payment' />
    <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={[styles.containerImage, styles.shadowProp]}>
        <Image 
            resizeMode='cover'  
            source={require('@assets/images/orangemoney.png')} 
            style={[styles.image]} 
            />
      </View>
      <Text style={styles.title}>Orange Money</Text>
      <Text style={[styles.description]}>
        You are about to transfer money 
        from your mobile money account to pay your trip. 
        Verify transaction details and Enter your secret code
      </Text>
      <TripDetailTable/>
      </ScrollView>
      <View key="fixed" style={[styles.fixedBox]}>
      <CustomPhoneNumberInput 
          selectedCountry={selectedCountry}  
          placeholder="Enter your Phone number"
          name="phonenumber"
          control={control}
          label='Enter Sender Number'
          labelColor={Colors.secondaryColor}
          rules={{
            required: 'Phone number is required',
            minLength: {
              value: 9,
              message: 'Phone number should be least 9 characters long',
            },
            maxLength: {
              value: 9,
              message: 'Phone number should be max 9 characters long',
            },
          }}
        />
    <CustomButton 
              bgColor={Colors.primaryColor}
              fgColor='#fff'
              isReady={true}
              onPress={save}
              text="Pay"
              marginVertical={10}
            />
      </View>
    </SafeAreaView>
  )
}

export default OMPayModeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone2,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 180,
  },
  contentContainer: {
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 30,
    textAlign: 'center',
    color: Colors.grayTone1,
    marginTop: 5,
  },
  description: {
    fontFamily: 'Poppins_300Light',
    textAlign: 'center',
    color: Colors.grayTone1,
    fontSize: 15,
    marginHorizontal: 5,
    marginTop: 5,

  },
  paragraph: {
    fontSize: 15,
  },
  containerImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    overflow: 'hidden',
    alignSelf: 'center'
  },
  image: {
    width: "100%",
    height: "100%"
  },
  shadowProp: {
    shadowColor: Colors.primaryColor,
    elevation: 10,
    backgroundColor: Colors.whiteTone1,
  },
  fixedBox: {
    width: width,
    paddingHorizontal: 20,
    elevation: 10,
    backgroundColor: Colors.whiteTone2,
    position: 'absolute',
    bottom: 0,
    left:0,
    right: 0,
  }
})