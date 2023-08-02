import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import SimpleHeader from '@components/SimpleHeader'
import CustomButton from '@components/buttons/CustomButton'
import { RootState, useAppSelector,  } from "@store/store";
const ChangeCredentialScreen = () => {
  const settingState = useAppSelector(
    (state: RootState) => state.setting
  );
  return (
    <SafeAreaView style={settingState.setting.isDarkMode ? styles.container_DARK : styles.container}>
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
    backgroundColor: Colors.whiteTone2,
    padding: 20,
  },
  container_DARK: {
    flex: 1,
    backgroundColor: Colors.darkTone1,
    padding: 20,
  },
})