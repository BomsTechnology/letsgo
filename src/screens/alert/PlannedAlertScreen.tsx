import { View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Colors from "@constants/colors";
import CustomButton from "@components/buttons/CustomButton";
import NoResult from "@components/NoResult";
import { useAppDispatch } from "@store/store";
import { toogleShowFilter, toogleShowInput } from '@store/features/search/myTripSearchSlice'
import React, { useEffect } from "react";
import SortBy from "@components/SortBy";

function PlannedAlertScreen() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(toogleShowFilter(false));
        dispatch(toogleShowInput(true));
    }, []);
    const icon = (<Ionicons name="pencil" size={18} color={Colors.whiteTone1} /> );
    return ( 
        <View style={{ 
            position: 'relative',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start'
         }}>
            <SortBy />
            <NoResult 
                message={`You didn't planned any alert yet`} 
                image={require('@assets/images/planner.png')}
                /> 
            <View style={[styles.buttonContainer]}>
                <CustomButton 
                        bgColor={Colors.primaryColor}
                        fgColor='#fff'
                        isReady={true}
                        onPress={()=>{}}
                        text={'compose'}
                        icon={icon}
                        fontSize={12}
                        radius={20}
                    /> 
            </View>
        </View>
     );
}

export default PlannedAlertScreen;

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 0,
    }
  });