import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SimpleHeader from '@components/SimpleHeader'
import Colors from '@constants/colors'
import { RadioButton } from 'react-native-paper';
const { width, height } = Dimensions.get('window');
import { RootState, useAppSelector, useAppDispatch } from "@store/store";
import i18n from '../locales/i18n';
import { setLanguage } from '@services/useSetting';
import AsyncStorage from '@react-native-async-storage/async-storage'
const LanguageScreen = () => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
  const [lang, setLang] = React.useState("fr");
  const dispatch = useAppDispatch();


  const handleValueChange = async (newValue: string) => {
    setLang(newValue);
    i18n.locale = newValue;
    dispatch(setLanguage({ setting: settingState.setting, lang: newValue}))
    .unwrap().then( (data) => {
       AsyncStorage.setItem("setting", JSON.stringify(data));
    }); 
  };

  useEffect(() => {
    setLang(settingState.setting.language);
  }, []);


  return (
    <SafeAreaView style={settingState.setting.isDarkMode ? styles.container_DARK : styles.container}>
      <SimpleHeader text={i18n.t('language', {count: 1})} />

      <View style={{ alignItems: "center", width: '100%' }}>
        <Image
          resizeMode="contain"
          source={require("@assets/images/ico_language.png")}
          style={styles.image}
        />
        <Text
          style={settingState.setting.isDarkMode ? styles.title_DARK : styles.title}
        >{i18n.t('language', {count: 2})}</Text>
        <RadioButton.Group   onValueChange={handleValueChange} value={lang}>
           <RadioButton.Item color={Colors.primaryColor} style={styles.radio} labelStyle={settingState.setting.isDarkMode ? styles.radioText_DARK : styles.radioText} label={`${i18n.t('french')} (FR)`} value="fr" />
           <RadioButton.Item color={Colors.primaryColor} style={styles.radio} labelStyle={settingState.setting.isDarkMode ? styles.radioText_DARK : styles.radioText} label={`${i18n.t('english')} (US)`} value="en" />
        </RadioButton.Group>
      </View>
    </SafeAreaView>
  )
}

export default LanguageScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone2,
    padding: 20,
  },
  container_DARK: {
    flex: 1,
    backgroundColor: Colors.darkTone1,
    padding: 20,
  },
  image: {
    height: 150,
  },
  title: {
    width:'100%',
    fontFamily: 'Poppins_700Bold',
    marginTop: 20,
    fontSize: 18,
    color: Colors.onWhiteTone,
  },
  title_DARK: {
    width:'100%',
    fontFamily: 'Poppins_700Bold',
    marginTop: 20,
    fontSize: 18,
    color: Colors.onPrimaryColor,
  },
  radioText: {
    fontFamily: 'Poppins_400Regular',
    color: Colors.onWhiteTone,
  },
  radioText_DARK: {
    fontFamily: 'Poppins_400Regular',
    color: Colors.onPrimaryColor,
  },
  radio: {
    width: width - 20
  }
})