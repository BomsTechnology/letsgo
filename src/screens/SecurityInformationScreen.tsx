import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SimpleHeader from '@components/SimpleHeader'
import Colors from '@constants/colors'

const SecurityInformationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text="Security Information" />

      <View style={{ alignItems: "center" }}>
        <Image
          resizeMode="contain"
          source={require("@assets/images/ico_security.png")}
          style={styles.image}
        />
      </View>
    </SafeAreaView>
  )
}

export default SecurityInformationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone2,
    padding: 20,
  },
  image: {
    height: 150,
  },
})