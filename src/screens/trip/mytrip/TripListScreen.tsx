import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import SimpleHeader from '@components/SimpleHeader'
import { useNavigation } from '@react-navigation/core'
import { AppStackParamList } from '@navigators/AppNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Ionicons,  } from '@expo/vector-icons';
import TripMyListTopTabNavigator from '@navigators/TripMyListTopTabNavigator'
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { toogleShowFilter, toogleShowInput } from '@store/features/search/myTripSearchSlice'

const TripListScreen = () => {
    const mytripSearchState = useAppSelector((state: RootState) => state.myTripSearch);
    const dispatch = useAppDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

    const leftIcon = mytripSearchState.showInput ? (<Ionicons name="close" size={22} color={Colors.grayTone1} />) : (<Ionicons name="search" size={22} color={Colors.grayTone1} />);
    const rightIcon = (<Ionicons name="document-text" size={22} color={Colors.grayTone1} />);

  return (
    <SafeAreaView style={styles.container}>
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <SimpleHeader  
                    text='My Trips'
                    LeftbuttonAction={()=> dispatch(toogleShowInput(!mytripSearchState.showInput))} 
                    LeftbuttonIcon={leftIcon}
                    RightbuttonIcon={rightIcon}
                    RightbuttonAction={() => navigation.navigate('Draft')}
                />
        </View>
        <TripMyListTopTabNavigator />
        
    </SafeAreaView>
  );
};

export default TripListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteTone3,
    },
    tripState: {
        padding:6,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    tripState_text: {
        fontFamily: 'Poppins_300Light',
        fontSize: 14
    },
})