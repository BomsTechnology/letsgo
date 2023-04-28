import React, { useCallback, useContext } from 'react'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import Colors from '@constants/colors'
import { Ionicons , FontAwesome5 } from '@expo/vector-icons';
import CustomButton from '@components/buttons/CustomButton';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import CustomInput from '@components/inputFields/CustomInput';
import {useForm, FieldValues} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconButton from '@components/buttons/IconButton';
import { AuthContext } from '@context/AuthContext';

const HomeScreen = () => { 
  const {height, width} = useWindowDimensions();
  const { logout, isLoading } = useContext(AuthContext);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    watch,
    //formState: {errors},
  } = useForm();

  const destination = watch('destination');
  const money = watch('money');
  const destinationIcon = ( <Ionicons name="location-outline" size={18} color={Colors.secondaryColor} /> );
  const moneyIcon = ( <FontAwesome5 name="search-dollar" size={16} color={Colors.primaryColor} /> );
  const menuIcon =  (<Ionicons name="menu" size={25} color={Colors.whiteTone1} />);
  const locateIcon = (<Ionicons name="ios-locate" size={25} color={Colors.onWhiteTone} />);
  const onPress = () =>  {}
  return (
    <SafeAreaView style={[styles.container, {
      height: height,
    }]}>
      <View style={[styles.headerBtnBox]}>
        <IconButton icon={menuIcon} bgColor={Colors.primaryColor} onPress={()=>{ navigation.dispatch(DrawerActions.toggleDrawer());}}/>
        <IconButton icon={locateIcon}  onPress={onPress}/>
      </View>

      <CustomButton 
                bgColor={Colors.primaryColor}
                fgColor='#fff'
                isReady={true}
                onPress={logout}
                marginVertical={0}
                fontSize={12}
                text="logout"
              />
        
      <View style={[styles.bottomBox, styles.shadowProp]}>
        <Text style={styles.title}>Hi Traveller</Text>
        <Text style={[styles.description]}>
          Where are you going today ?
        </Text>
        <CustomInput
          placeholder="Enter the address"
          name="destination"
          control={control}
          secureTextEntry={false}
          prefixType='icon'
          bgColor={Colors.whiteTone3}
          prefix={destinationIcon}
          shadow={false}
          marginVertical={0}
          fontSize={13}
          rules={{
            required: 'The address is required',
          }}
        />

        <View style={{ 
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 10,
          marginTop: 5
         }}>
          <View style={{  width: "60%" }}>
            <CustomInput
              placeholder="Your budget"
              name="money"
              control={control}
              secureTextEntry={false}
              prefixType='icon'
              sufixType='text'
              prefix={moneyIcon}
              bgColor={Colors.whiteTone3}
              shadow={false}
              keyboardType='numeric'
              marginVertical={0}
              fontSize={13}
              sufix="X A F"
              rules={{
                required: 'The price is required',
              }}
            />
          </View>
          <View style={{ width: "36%" }}>
            <CustomButton 
                bgColor={Colors.primaryColor}
                fgColor='#fff'
                isReady={destination && money}
                onPress={handleSubmit(onPress)}
                marginVertical={0}
                fontSize={12}
                text="Search"
              />
          </View>
        </View>
        

      
      </View>
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: Colors.whiteTone1,
    position: 'relative'
  },
  headerBtnBox: {
    position: 'absolute',
    top: 60,
    left: 20
  },
  bottomBox: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    padding: 20,
    backgroundColor: Colors.whiteTone2
  },
  shadowProp: {
    shadowColor: '#171717',
    elevation: 4,
    backgroundColor: Colors.whiteTone2,
    borderRadius: 10
  },
  title: {
    fontFamily: 'Poppins_800ExtraBold',
    fontSize: 18,
    textAlign: 'left',
    color: Colors.onWhiteTone,
  },
  description: {
    fontFamily: 'Poppins_300Light',
    textAlign: 'left',
    color: Colors.grayTone1,
    fontSize: 14,
    marginBottom: 10,
  },
});

export default HomeScreen