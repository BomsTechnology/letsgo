import { StyleSheet, Text, View, GestureResponderEvent } from 'react-native';
import React from 'react';
import IconButton from './buttons/IconButton';
import Colors from '@constants/colors';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

interface SimpleHeaderProps {
    text: string;
    buttonAction?: (event: GestureResponderEvent) => void;
    buttonIcon?: JSX.Element;
    showButton?: boolean
}


const SimpleHeader = ({text, buttonAction, buttonIcon, showButton}: SimpleHeaderProps) => {
    const { goBack } = useNavigation();
    const icon = buttonIcon ? buttonIcon : (<Ionicons name="chevron-back" size={25} color={Colors.grayTone1} /> );
    const onPress = buttonAction ? buttonAction : goBack;

  return (
    <View style={styles.container}>
        {showButton == undefined || (showButton != undefined && showButton == true) ? <IconButton icon={icon} onPress={onPress}/> : undefined}
        <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default SimpleHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    text: {
        flexDirection: 'row',
        flexGrow: 1,
        textAlign: 'center',
        fontFamily: 'Poppins_800ExtraBold',
        alignSelf: 'center',
        fontSize: 24
    }
});