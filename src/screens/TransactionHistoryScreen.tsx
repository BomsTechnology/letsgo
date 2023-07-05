import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SimpleHeader from '@components/SimpleHeader'
import Colors from '@constants/colors'

const TransactionHistoryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text="Trasaction History" />

      <View style={{ alignItems: "center" }}>

      </View>
    </SafeAreaView>
  )
}

export default TransactionHistoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    padding: 20,
  },
})