import {Text, View , StyleSheet, useWindowDimensions, Image, ImageSourcePropType} from 'react-native';
import {useFonts, Poppins_500Medium, Poppins_800ExtraBold, Poppins_300Light} from '@expo-google-fonts/poppins';
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
        Poppins_500Medium, 
        Poppins_800ExtraBold,
        Poppins_300Light
    });
    
    if (!fontsLoaded) {
    return null;
    }

  return (
    <View style={[
        styles.container,
        {width}
    ]}>
        <View style={{ flex: 0.7,   }}>
            <Image source={props.image} style={[styles.image, {width: width - 20}]}/>
        </View>
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
        backgroundColor: Colors.whiteTone1
    },
    image: {
        resizeMode: 'contain',
        flex: 1,
        justifyContent: 'center',
        
    },
    title: {
        fontFamily: 'Poppins_800ExtraBold',
        fontWeight: '800',
        fontSize: 40,
        marginBottom: 15,
        textAlign: 'center',
        color: '#000',
        paddingHorizontal: 30
    },
    description: {
        fontFamily: 'Poppins_300Light',
        textAlign: 'center',
        fontWeight: '300',
        paddingHorizontal: 30,
        color: Colors.grayTone1,
        fontSize: 16
    }
});