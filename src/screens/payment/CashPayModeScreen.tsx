import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
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

const CashPayModeScreen = () => {
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
    navigation.navigate('Home' as never);
  }; 
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text='Trip Payment' />
    <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={[styles.containerImage, styles.shadowProp]}>
        <Image 
            resizeMode='cover'  
            source={require('@assets/images/cash.jpg')} 
            style={[styles.image]} 
            />
      </View>
      <Text style={styles.title}>Cash</Text>
      <Text style={[styles.description]}>
        You are about to transfer money 
        to the trip planner to pay your trip. 
        Pay your trip while a confirmation is awaited from the trip planner
      </Text>
      <TripDetailTable/>
      </ScrollView>
      <View key="fixed" style={[styles.fixedBox]}>
      <Text style={[styles.paragraph, {marginVertical: 5, color: Colors.secondaryColor}]}>Confirmation Response</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.description, {fontSize:14, marginTop: 0, marginHorizontal: 0}]}> Didn't receive it ?</Text>
          <TouchableOpacity>
            <Text style={[styles.paragraph]}> Resend payment request in 02:20</Text>
          </TouchableOpacity> 
        </View>
      
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

export default CashPayModeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone2,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 120,
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
    fontSize: 14,
    fontFamily: 'Poppins_500Medium'
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