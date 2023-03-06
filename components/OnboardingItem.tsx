import {Text, View , StyleSheet, FlatList, useWindowDimensions, Image, ImageSourcePropType} from 'react-native';
import {useFonts, Poppins_500Medium} from '@expo-google-fonts/poppins';
import React from 'react';
import Colors from '../styles/colors';

interface OnboardingItemProps {
    image: ImageSourcePropType;
    title: string;
    id: string;
    description: string;
};

const OnboardingItem = ({props}: {props: OnboardingItemProps}) => {

    const {width} = useWindowDimensions();
    const [fontsLoaded] = useFonts({
        Poppins_500Medium
    });
    
    if (!fontsLoaded) {
    return null;
    }

  return (
    <View style={[
        styles.container,
        {width}
    ]}>
        <Image source={props.image} style={[styles.image, {width}]}/>
        <View style={{ flex: 0.3 }}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.description}>{props.description}</Text>
        </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    image: {
        resizeMode: 'contain',
        flex: 0.7,
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Poppins_500Medium',
        fontWeight: '800',
        fontSize: 38,
        marginBottom: 10,
        textAlign: 'left',
        color: '#000',
        paddingHorizontal: 20
    },
    description: {
        fontFamily: 'Poppins_500Medium',
        textAlign: 'left',
        fontWeight: '300',
        paddingRight: 64,
        paddingLeft: 20
    }
});