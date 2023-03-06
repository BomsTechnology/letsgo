import React, {useState, useRef} from 'react';
import { StyleSheet, FlatList, ImageSourcePropType, Animated, View, StatusBar } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import OnboardingItem from '../components/OnboardingItem';

interface OnboardingItemProps {
    image: ImageSourcePropType;
    title: string;
    id: string;
    description: string;
};

const OnboardingScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({viewableItems}: {viewableItems: any}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const slides = [
        {
            id: '1',
            title: 'Welcome to letsGo!',
            description: 'Make the experience of making around the city easier, faster and alfordable',
            image: require("../assets/images/logo.png"),
        },
        {
            id: '2',
            title: 'All in one place',
            description: 'Take the control over your trips costs and access whenever you need to your data',
            image: require("../assets/images/logo.png"),
        },
        {
            id: '3',
            title: 'Earn free trips',
            description: 'Share your trips with people doing same road and get exclusive discounts(even free trips)',
            image: require("../assets/images/logo.png"),
        },
    ];
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList 
                    data={slides}
                    renderItem={
                        ({item} : {item: OnboardingItemProps}) => <OnboardingItem props={item}/>
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={
                        (item) => item.id
                    }
                    onScroll={
                        Animated.event([{
                            nativeEvent: {
                                contentOffset: {x: scrollX}
                            }
                        }],
                        {
                            useNativeDriver: false,
                    })}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                    />
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //marginTop: StatusBar.currentHeight || 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
 });

export default OnboardingScreen;