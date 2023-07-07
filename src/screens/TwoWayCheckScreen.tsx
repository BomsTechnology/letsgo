import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import SimpleHeader from '@components/SimpleHeader'
import CustomButton from '@components/buttons/CustomButton'

const TwoWayCheckScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text="Two-way Check" />
      <Text>TwoWayCheckScreen</Text>
      <CustomButton
          bgColor={Colors.primaryColor}
          fgColor="#fff"
          isReady={false}
          onPress={() => {}}
          marginVertical={20}
          text="turn in"
        />
    </SafeAreaView>
  )
}

export default TwoWayCheckScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    padding: 20,
  },
})