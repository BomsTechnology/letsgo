import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../styles/colors'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: Colors.primaryShade1
  },
});

export default HomeScreen