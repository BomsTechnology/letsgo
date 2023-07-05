import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SimpleHeader from '@components/SimpleHeader'
import Colors from '@constants/colors'
import { RadioButton } from 'react-native-paper';
const { width, height } = Dimensions.get('window');
const LanguageScreen = () => {
  const [value, setValue] = useState('french');

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
  };
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text="Language" />

      <View style={{ alignItems: "center", width: '100%' }}>
        <Image
          resizeMode="contain"
          source={require("@assets/images/ico_language.png")}
          style={styles.image}
        />
        <Text
          style={styles.title}
        >Languages</Text>
        <RadioButton.Group   onValueChange={handleValueChange} value={value}>
           <RadioButton.Item color={Colors.primaryColor} style={styles.radio} labelStyle={styles.radioText} label="French (FR)" value="french" />
           <RadioButton.Item color={Colors.primaryColor} style={styles.radio} labelStyle={styles.radioText} label="English (US)" value="english" />
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
  image: {
    height: 150,
  },
  title: {
    width:'100%',
    fontFamily: 'Poppins_700Bold',
    marginTop: 20,
    fontSize: 18
  },
  radioText: {
    fontFamily: 'Poppins_400Regular',
  },
  radio: {
    width: width - 20
  }
})