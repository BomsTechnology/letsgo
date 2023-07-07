import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '@constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface deviceItemProps {
    id: string;
    deviceOs: string;
    name: string;
    isCurrent: boolean;
    loginMethod: string;
    country: string;
    state: string;
    lastLoggin: string;
  }

const DeviceItem = ({props} : {props: deviceItemProps}) => {
  return (
    <View
        style={[
          styles.deviceContainer,
          {
            borderColor: props.isCurrent
              ? Colors.primaryColor
              : Colors.grayTone3,
          },
        ]}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.deviceOs == "IOS" ? (
            <Ionicons name="logo-apple" size={70} color={ props.isCurrent
              ? Colors.primaryColor
              :Colors.grayTone1} />
          ) : props.deviceOs == "ANDROID" ? (
            <Ionicons name="logo-android" size={70} color={props.isCurrent
              ? Colors.primaryColor
              :Colors.grayTone1} />
          ) : (
            <Ionicons name="earth" size={70} color={props.isCurrent
              ? Colors.primaryColor
              :Colors.grayTone1} />
          )}
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={styles.deviceName}
          >
            {props.name}
          </Text>
          <Text style={styles.deviceMinText}>{props.loginMethod}</Text>
          <Text style={styles.deviceMinText}>
            {props.country} - {props.state}
          </Text>
          <Text style={styles.deviceMinText}>{props.lastLoggin}</Text>
        </View>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!props.isCurrent && (
            <Ionicons name="trash" size={20} color={Colors.secondaryColor} />
          )}
        </TouchableOpacity>
      </View>
  )
}

export default DeviceItem

const styles = StyleSheet.create({
    deviceContainer: {
        flexDirection: "row",
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        gap: 5,
      },
      deviceMinText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 13,
        color: Colors.grayTone2,
      },
      deviceName:{
        fontFamily: "Poppins_600SemiBold",
        fontSize: 15,
        color: Colors.grayTone1,
      }
})