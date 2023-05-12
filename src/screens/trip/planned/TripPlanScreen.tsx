import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@constants/colors'
import SimpleHeader from '@components/SimpleHeader'
import TripPlanTopTabNavigator from '@navigators/TripPlanTopTabNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'

const TripPlanScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <SimpleHeader showButton={false} text='Plan Trip' />
      </View>
        <TripPlanTopTabNavigator />
    </SafeAreaView>
  )
}

export default TripPlanScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone3,
    paddingTop: 40
},
})