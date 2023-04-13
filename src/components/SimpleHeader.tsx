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
}


const SimpleHeader = ({text, buttonAction, buttonIcon}: SimpleHeaderProps) => {
    const { goBack } = useNavigation();
    const icon = buttonIcon ? buttonIcon : (<Ionicons name="chevron-back" size={25} color={Colors.grayTone1} /> );
    const onPress = buttonAction ? buttonAction : goBack;

  return (
    <View style={styles.container}>
        <IconButton icon={icon} onPress={onPress}/>
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