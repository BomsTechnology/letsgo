import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import SortBy from '@components/SortBy';
import CardMyTrip from '@components/cards/CardMyTrip';
import SimpleHeader from '@components/SimpleHeader'
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { toogleShowFilter, toogleShowInput } from '@store/features/search/myTripSearchSlice'
import Colors from '@constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '@components/buttons/CustomButton';
import { Ionicons } from '@expo/vector-icons';

const DrafScreen = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(toogleShowInput(true));
    }, []);
    const icon = (<Ionicons name="pencil" size={18} color={Colors.whiteTone1} /> );

    return (
        <SafeAreaView style={styles.container}>
            <SimpleHeader  text='My Drafts'/>
            <View style={{ 
                position: 'relative',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start'
             }}>
                <SortBy />
                <View style={{height:20}}></View>
                <CardMyTrip onPress={()=>{}} /> 
                <View style={[styles.buttonContainer]}>
                    <CustomButton 
                            bgColor={Colors.primaryColor}
                            fgColor='#fff'
                            isReady={true}
                            onPress={()=>{}}
                            text={'compose trip'}
                            icon={icon}
                            fontSize={12}
                        /> 
                </View>
            </View>
        </SafeAreaView>
        
    );
};

export default DrafScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteTone3,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    }
});