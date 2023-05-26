import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SimpleHeader from '@components/SimpleHeader'
import Colors from '@constants/colors'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'
import TripInfoCard from '@components/cards/TripInfoCard'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Divider } from '@constants/ComponentStyled'
import CustomButton from '@components/buttons/CustomButton'
const { width, height } = Dimensions.get('window');
const TripPublishScreen = () => {
  const navigation = useNavigation();
  const geToDriver = () => {
    navigation.navigate('DriverDetail' as never);
  }
  const geToVehicule = () => {
    navigation.navigate('VehiculeDetail' as never);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <SimpleHeader text='Publish Trip Info' />
      </View>
      <View style={[styles.contentScroll]}>
      <ScrollView  showsVerticalScrollIndicator={false}>
      <View style={{ 
              flexDirection: 'row',
              justifyContent: 'space-between'
             }}>
            
              <View style={{ 
                      position: "relative",
                    }}>
                      <Ionicons
                          name="ios-ellipsis-vertical"
                          size={20}
                          color={Colors.primaryColor}
                          style={{ 
                            position: "absolute", 
                            bottom:60,
                            left:0
                          }}
                          /> 
                          <Ionicons
                          name="ios-ellipsis-vertical"
                          size={20}
                          color={Colors.primaryColor}
                          style={{ 
                            position: "absolute", 
                            top:20,
                            left:0
                          }}
                          /> 
                  <View style={{ 
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}>
                      <Ionicons
                          name="locate"
                          size={20}
                          color={Colors.primaryColor}
                          /> 
                        <View style={{ marginLeft: 5 }}>
                          <Text style={[styles.lightText]}>Departure</Text>
                          <Text style={[styles.boldText]}>Biyem-Assi</Text>
                          <Text style={[styles.mediumText]}>7:00, Today</Text>
                        </View>
                  </View>
                  <View style={{ 
                      flexDirection: "row",
                      alignItems: "flex-start",
                      marginTop: 10
                    }}>
                      <Ionicons
                          name="location-outline"
                          size={20}
                          color={Colors.secondaryColor}
                          /> 
                        <View style={{ marginLeft: 5 }}>
                        <Text style={[styles.lightText]}>Destination</Text>
                          <Text style={[styles.boldText]}>Melen, Ecole Polytechnique</Text>
                          <Text style={[styles.mediumText]}>7:00, Today</Text>
                        </View>
                  </View>
              </View>

            </View>
            <View style={{ 
                    marginTop: 20,
                    marginBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View style={{ 
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}>
                        <Ionicons
                          name="time-outline"
                          size={20}
                          color={Colors.accentYellow}
                          /> 
                        <View style={{ marginLeft: 5 }}>
                          <Text style={[styles.lightText]}>Duration</Text>
                          <Text style={[styles.semiBoldText]}>00h40</Text>
                        </View>
                    </View>

                    <View style={{ 
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}>
                        <FontAwesome5
                          name="dollar-sign"
                          size={20}
                          color={Colors.secondaryColor}
                          /> 
                        <View style={{ marginLeft: 5 }}>
                          <Text style={[styles.lightText]}>Budget</Text>
                          <Text style={[styles.semiBoldText]}>XFA 250</Text>
                        </View>
                    </View>
              </View>
            <Divider style={{ marginBottom: 10 }} />
            <Text style={[styles.lightText]}>Trip Service</Text>
            <Text style={[styles.headingText]}>Normal</Text>

            <Text style={[styles.lightText, {marginTop: 20}]}>Seats Number</Text>
            <Text style={[styles.headingText]}>3</Text>

            <Text style={[styles.lightText, {marginTop: 20}]}>Luggage Size</Text>
            <Text style={[styles.headingText]}>24Kg</Text>
            <View style={{ 
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginTop: 20,
                gap: 20,
              }}>
              
              <View style={{ 
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }}>
                  <Text style={[styles.lightText]}>Vehicule</Text>
                  <Image resizeMode='contain' style={{ height: 80, width: 80 }} source={require('@assets/images/car.png')} />
                  <Text style={[styles.headingText]}>Taxi</Text>
              </View>
              <View>
                <Text style={[styles.lightText]}>Driver Status</Text>
                <View style={{ 
                  backgroundColor: Colors.lightPrimary,
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 2
                }}>
                  <Text style={{ 
                              fontSize: 14,
                              textAlign: 'center',
                              fontFamily: 'Poppins_500Medium',
                              color: Colors.grayTone1,
                              marginRight: 3,
                            }}>Suscriber</Text>
                </View>
              </View>
        </View>

        <Divider style={{ marginTop: 10 }} />
      <TripInfoCard 
        onPress={geToDriver}
        label='Driver'
        info1='+237 655 667 788'
        info2='jackson@gmail.com'
        image={require('@assets/images/avatars/Avatar5.png')} 
        rate={5} 
        title='Prosper Jackson'
        />

        <TripInfoCard 
        onPress={geToVehicule}
        label='Vehicule'
        carColor='red'
        carMatricule='CE 237 CM'
        info1='Yaris'
        image={require('@assets/images/redYaris.jpg')} 
        rate={5} 
        title='Toyota'
                />
      </ScrollView>
      </View>
      <View key="fixed" style={[styles.seatBox]}>

       <CustomButton
         bgColor={Colors.accentOrange}
         fgColor='#fff'
         isReady={true}
         onPress={()=>{}}
         text="Delete trip"
       /> 
 </View>
    </SafeAreaView>
  )
}

export default TripPublishScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone3,
    paddingTop: 40,
},
contentScroll: {
  borderTopRightRadius: 40,
  borderTopLeftRadius: 40,
  flex: 1,
  backgroundColor: Colors.whiteTone1,
  elevation: 2,
  paddingHorizontal: 20,
  paddingBottom: 80,
  paddingTop: 20,
  position: 'relative',
  marginTop: 10
},
headingText: {
  fontSize: 20,
  fontFamily: 'Poppins_700Bold',
  color: Colors.grayTone1
},
boldText: {
  fontSize: 14,
  fontFamily: 'Poppins_700Bold',
  color: Colors.grayTone1
},
semiBoldText: {
  fontSize: 14,
  fontFamily: 'Poppins_600SemiBold',
  color: Colors.grayTone1
},
mediumText: {
  fontSize: 13,
  fontFamily: 'Poppins_500Medium',
  color: Colors.grayTone1
},
lightText: {
  fontSize: 12,
  fontFamily: 'Poppins_300Light',
  color: Colors.grayTone2
},
seatBox: {
  width: width,
  padding: 10,
  elevation: 10,
  backgroundColor: Colors.whiteTone1,
  position: 'absolute',
  bottom: 0,
  left:0,
  right: 0,
  borderTopWidth: 1,
  borderColor: Colors.grayTone4
}
});