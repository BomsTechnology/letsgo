import { View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Colors from "@constants/colors";
import CustomButton from "@components/buttons/CustomButton";
import NoResult from "@components/NoResult";

function PlannedAlertScreen() {
    const icon = (<Ionicons name="pencil" size={18} color={Colors.whiteTone1} /> );
    return ( 
        <View style={{ 
            position: 'relative',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start'
         }}>
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