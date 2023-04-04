import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../constants/colors';

const SeatTable = () => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <Text style={[styles.boldText, styles.item]}>Num</Text>
        <Text style={[styles.boldText, styles.item]}>Conforts</Text>
        <Text style={[styles.boldText, styles.item]}>Extra Price</Text>
      </View>
      <View style={[styles.bodyContent]}>
        <View style={[styles.item]}>
            <Text style={[styles.semiBoldText]}>1</Text>
        </View>
        <View style={[styles.item]}></View>
        <View style={[styles.item]}>
        <Text style={[styles.semiBoldText]}>XFA 300</Text>
        </View>
      </View>
      <View style={[styles.bodyContent]}>
        <View style={[styles.item]}>
            <Text style={[styles.semiBoldText]}>1</Text>
        </View>
        <View style={[styles.item]}></View>
        <View style={[styles.item]}>
        <Text style={[styles.semiBoldText]}>XFA 300</Text>
        </View>
      </View>
      <View style={[styles.bodyContent]}>
        <View style={[styles.item]}>
            <Text style={[styles.semiBoldText]}>1</Text>
        </View>
        <View style={[styles.item]}></View>
        <View style={[styles.item]}>
        <Text style={[styles.semiBoldText]}>XFA 300</Text>
        </View>
      </View>
      <View style={[styles.bodyContent]}>
        <View style={[styles.item]}>
            <Text style={[styles.semiBoldText]}>1</Text>
        </View>
        <View style={[styles.item]}></View>
        <View style={[styles.item]}>
        <Text style={[styles.semiBoldText]}>XFA 300</Text>
        </View>
      </View>
    </View>
  );
};

export default SeatTable;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 10
    },
    header: {
        backgroundColor: Colors.secondaryColor,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bodyContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.grayTone4,
        padding: 10
    },
    item: {
        width: '33%',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boldText: {
        fontSize: 15,
        fontFamily: 'Poppins_700Bold',
        color: Colors.grayTone1
      },
    semiBoldText: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.grayTone1
    },
    mediumText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: Colors.grayTone1
    },
});