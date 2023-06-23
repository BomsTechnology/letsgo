import { StyleSheet, Text, View, GestureResponderEvent } from 'react-native';
import React from 'react';
import IconButton from './buttons/IconButton';
import Colors from '@constants/colors';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

interface SimpleHeaderProps {
    text: string;
    LeftbuttonAction?: (event: GestureResponderEvent) => void;
    LeftbuttonIcon?: JSX.Element;
    showLeftButton?: boolean;
    RightbuttonAction?: (event: GestureResponderEvent) => void;
    RightbuttonIcon?: JSX.Element;
}


const SimpleHeader = ({text, LeftbuttonAction, LeftbuttonIcon, showLeftButton, RightbuttonIcon, RightbuttonAction}: SimpleHeaderProps) => {
    const { goBack } = useNavigation();
    const leftIcon = LeftbuttonIcon ? LeftbuttonIcon : (<Ionicons name="chevron-back" size={25} color={Colors.grayTone1} /> );
    const leftOnPress = LeftbuttonAction ? LeftbuttonAction : goBack;
    const rightOnPress = RightbuttonAction ? RightbuttonAction : null;

  return (
    <View style={styles.container}>
        {showLeftButton == undefined || (showLeftButton != undefined && showLeftButton == true) ? <IconButton icon={leftIcon} onPress={leftOnPress}/> : undefined}
        <Text style={styles.text}>{text}</Text>
        { RightbuttonIcon != undefined  ? <IconButton icon={RightbuttonIcon} onPress={rightOnPress!}/> : undefined}
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