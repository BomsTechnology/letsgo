import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '@constants/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import SimpleHeader from '@components/SimpleHeader'
import tripStates, { TripStateProps } from '@data/TripState'
import filterTripItems, { FilterTripItemProps } from '@data/FilterTripItem'
import { FlatList } from 'react-native-gesture-handler'
import CardMyTrip from '@components/cards/CardMyTrip'
import TicketCard from '@components/cards/TicketCard'
import { useNavigation } from '@react-navigation/core'
import { AppStackParamList } from '@navigators/AppStackNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


const TripListScreen = () => {
    const [tripStateValue, setTripStateValue] = useState<string>(tripStates[0].value);
    const [filterTripValue, setFilterTripValue] = useState<string>(filterTripItems[0].value);
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    const next = () =>  {
        if(tripStateValue == 'published'){
            navigation.navigate('TripPublish');
        }else if(tripStateValue == 'reserved'){
            navigation.navigate('TripInfo', {
                from: 'reserved'
              });
        }else if(tripStateValue == 'confirmed'){
            navigation.navigate('TripInfo', {
                from: 'confirmed'
              });
        }else{
            navigation.navigate('TripInfo', {
                from: 'confirmed'
              });
        }
    }
    const tripStateRender = ({ item }: {item : TripStateProps}) =>{
        return (
            <TouchableOpacity 
                style={[
                        styles.tripState,
                        {
                            backgroundColor: tripStateValue == item.value ? Colors.primaryColor : 'transparent',
                        }
                    ]} 
                onPress={() => setTripStateValue(item.value)}
                >
                <Text
                    style={[
                        styles.tripState_text,
                        {
                            color: tripStateValue == item.value ? Colors.whiteTone1 : Colors.grayTone1,
                        }
                    ]}
                    >{item.label}</Text>
            </TouchableOpacity>
        )
      }

    const filterItemRender = ({ item }: {item : FilterTripItemProps}) =>{
    return (
        <TouchableOpacity 
                style={[
                        styles.filterItem,
                        {
                            borderColor: filterTripValue == item.value ? Colors.secondaryColor : Colors.grayTone4,
                        }
                    ]} 
                onPress={() => setFilterTripValue(item.value)}
                >
                <Text
                    style={[
                        styles.filterItem_text,
                        {
                            color: filterTripValue == item.value ? Colors.grayTone1 : Colors.grayTone4,
                        }
                    ]}
                    >{item.label}</Text>
            </TouchableOpacity>
    )
    }

  return (
    <SafeAreaView style={styles.container}>
        <SimpleHeader showButton={false} text='My Trips' />
        <View style={{ maxHeight: 100 }}>
            <FlatList
                    data={tripStates}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={tripStateRender}
                    keyExtractor={(item)=>item.value}
                    ItemSeparatorComponent={() => <View style={{width: 5}} />}
                />
        </View>
        <View style={{ 
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                maxHeight: 100 
            }}>
            <Text style={[styles.filterItem_text]}>Sort By : </Text>
            <FlatList
                    data={filterTripItems}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={filterItemRender}
                    keyExtractor={(item)=>item.value}
                    ItemSeparatorComponent={() => <View style={{width: 10}} />}
                />
        </View>
            <View style={{ height: 20 }}></View>
        { tripStateValue == "published" ? <CardMyTrip onPress={next} /> :
         <TicketCard onPress={next} />
        }
    </SafeAreaView>
  )
}

export default TripListScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteTone3,
        padding: 20
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
    filterItem: {
        paddingVertical:5,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 2
    },
    filterItem_text : {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14
    }
})