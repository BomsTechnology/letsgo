import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import SimpleHeader from '@components/SimpleHeader'
import CustomButton from '@components/buttons/CustomButton'

const ChangeCredentialScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text="Change Credential" />
      <Text>ChangeCredentialScreen</Text>
      <CustomButton
          bgColor={Colors.primaryColor}
          fgColor="#fff"
          isReady={false}
          onPress={() => {}}
          marginVertical={20}
          text="update"
        />
        <CustomButton
          bgColor={Colors.accentOrange}
          fgColor="#fff"
          isReady={true}
          onPress={() => {}}
          text="cancel"
        />
    </SafeAreaView>
  )
}

export default ChangeCredentialScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    padding: 20,
  },
})