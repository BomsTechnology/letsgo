import React, { useState } from 'react'
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import SimpleHeader from '@components/SimpleHeader'
import Colors from '@constants/colors'

import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { countryCodeProps } from '@data/CountryCode'
import CustomPhoneNumberInput from '@components/inputFields/CustomPhoneNumberInput'
import CustomButton from '@components/buttons/CustomButton'
import { useForm } from 'react-hook-form'
import CustomInput from '@components/inputFields/CustomInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { ScrollView } from 'react-native-gesture-handler'
import { getUserInfo, udapteUserInfo } from '@services/useUser';

const ProfileScreen = () => {
  const authState = useAppSelector((state: RootState) => state.auth);
  const userState = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<countryCodeProps | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const numberPhone = watch("phonenumber");
  const email = watch("email");
  const firstname = watch("firstname");
  const lastname = watch("lastname")

  const editProfile = () => {
    dispatch(getUserInfo(authState.token!.access_token!));
  }; 
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <SimpleHeader text='Profile' />
        <View style={[{
          justifyContent: 'center',
          alignItems: 'center'
        }]}>
          <Image resizeMode='contain' style={[styles.image]} source={require('@assets/images/avatars/Avatar5.png')} />
          <View
            style={{ 
              flexDirection: 'row',
              alignItems: 'center',
              gap: 30,
              marginTop: 10
             }}
            >
              <TouchableOpacity style={{ 
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: Colors.whiteTone1,
                elevation: 2,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10
               }}>
              <Ionicons name="pencil" size={16} color={Colors.primaryColor}/> 
                <Text>Edit avatar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ 
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: Colors.whiteTone1,
                elevation: 2,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10
               }}>
              <Ionicons name="trash" size={16} color={Colors.errorInputColor}/> 
                <Text>Delete Picture</Text>
              </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={[styles.contentScroll]} showsVerticalScrollIndicator={false}>
        <Text style={styles.semiBoldText}>Last Name</Text>
        <CustomInput
          placeholder="Enter your Last Name"
          name="lastname"
          control={control}
          secureTextEntry={false}
          bgColor='#fff'
          rules={{
            required: 'The Last Name is required',
          }}
          />
        <Text style={[styles.semiBoldText, {marginTop: 10}]}>First Name</Text>
        <CustomInput
          placeholder="Enter your First Name"
          name="firstname"
          control={control}
          secureTextEntry={false}
          bgColor='#fff'
          rules={{
            required: 'The First Name is required',
          }}
          />
        <CustomPhoneNumberInput 
            setSelectedCountry={setSelectedCountry}
            placeholder="Enter your Phone number"
            name="phonenumber"
            control={control}
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
        <Text style={styles.semiBoldText}>Email</Text>
        <CustomInput
          placeholder="Enter your Email"
          name="email"
          control={control}
          secureTextEntry={false}
          bgColor='#fff'
          rules={{
            required: 'The Email is required',
          }}
          />
        <CustomButton 
            bgColor={Colors.primaryColor}
            fgColor='#fff'
            isReady={true}
            onPress={handleSubmit(editProfile)}
            marginVertical={30}
            text="update profile"
          /> 
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone3,
    paddingTop: 40
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    borderWidth: 0.5,
    borderColor: Colors.grayTone4,
    backgroundColor: Colors.whiteTone1,
  },
  contentScroll: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    position: 'relative',
    marginTop: 10,
    backgroundColor: Colors.whiteTone1
  },
  semiBoldText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: Colors.grayTone1,
  },
  lightText: {
    fontSize: 12,
    fontFamily: 'Poppins_300Light',
    color: Colors.grayTone2,
  },
});
export default ProfileScreen