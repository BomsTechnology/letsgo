import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Divider } from '../../constants/ComponentStyled';
import Colors from '@constants/colors';

const TripDetailTable = () => {
  return (
    <View>
        <Divider style={{marginTop: 20, marginBottom: 5}}/>
        <Text style={[styles.description]}>Trip Budget Per Seat</Text>
        <Text style={[styles.title]}>XAF 250</Text>
        <Text style={[styles.description, ]}>Total Trip Budget</Text>
        <Text style={[styles.title, {color: Colors.secondaryShade1,}]}>XAF 1050</Text>
        <Divider style={{marginBottom: 10}}/>
        <View style={styles.containerItem}>
            <View style={[styles.item]}>
                <Text style={[styles.description,{ textAlign: 'left'}]}>Num S.</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.description,{ textAlign: 'center'}]}>Price S.</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.description,{ textAlign: 'center'}]}>Comfort P.</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.description,{ textAlign: 'right'}]}>Total</Text>
            </View>
        </View>
        <Divider style={{marginVertical: 10}}/>
        <View style={styles.containerItem}>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'left'}]}>1</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'center'}]}>250</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'center'}]}>300</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'right'}]}>550</Text>
            </View>
        </View>
        <View style={styles.containerItem}>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'left'}]}>4</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'center'}]}>250</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'center'}]}>300</Text>
            </View>
            <View style={[styles.item]}>
                <Text style={[styles.paragrah,{ textAlign: 'right'}]}>550</Text>
            </View>
        </View>
        <Divider style={{marginVertical: 10}}/>
        <Text style={[styles.description, {textAlign: 'right'}]}>Total Trip Budget</Text>
        <Text style={[styles.title, {color: Colors.secondaryShade1, textAlign: 'right'}]}>XAF 1050</Text>
        <Divider style={{marginBottom: 10}}/>
    </View>
  );
};

export default TripDetailTable;

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 20,
        color: Colors.grayTone1,
    },
    paragrah: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 18,
        color: Colors.grayTone1,
    },
    description: {
        fontFamily: 'Poppins_300Light',
        color: Colors.grayTone2,
        fontSize: 13,
    },
    containerItem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    item: {
        width: '24%'
    }
});