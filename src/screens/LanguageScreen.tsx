import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SimpleHeader from '@components/SimpleHeader'
import Colors from '@constants/colors'
import { RadioButton } from 'react-native-paper';
const { width, height } = Dimensions.get('window');
import { RootState, useAppSelector,  } from "@store/store";
const LanguageScreen = () => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
  const [value, setValue] = useState('fr');

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };
  return (
    <SafeAreaView style={settingState.setting.isDarkMode ? styles.container_DARK : styles.container}>
      <SimpleHeader text="Language" />

      <View style={{ alignItems: "center", width: '100%' }}>
        <Image
          resizeMode="contain"
          source={require("@assets/images/ico_language.png")}
          style={styles.image}
        />
        <Text
          style={settingState.setting.isDarkMode ? styles.title_DARK : styles.title}
        >Languages</Text>
        <RadioButton.Group   onValueChange={handleValueChange} value={value}>
           <RadioButton.Item color={Colors.primaryColor} style={styles.radio} labelStyle={settingState.setting.isDarkMode ? styles.radioText_DARK : styles.radioText} label="French (FR)" value="fr" />
           <RadioButton.Item color={Colors.primaryColor} style={styles.radio} labelStyle={settingState.setting.isDarkMode ? styles.radioText_DARK : styles.radioText} label="English (US)" value="en" />
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