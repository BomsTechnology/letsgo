import { StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import { ScrollView } from 'react-native-gesture-handler';
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import { Divider } from '@constants/ComponentStyled'; 
import TripInfoCard from '@components/cards/TripInfoCard';
import CustomButton from '@components/buttons/CustomButton';
const { width, height } = Dimensions.get('window');
import {useNavigation} from '@react-navigation/native';
import IconButton from '@components/buttons/IconButton';

const TripInfoScheduleScreen = () => {
  const navigation = useNavigation();
  const shareIcon = (<Ionicons name="share" size={25} color={Colors.grayTone1} />);

  const geToSeat = () => {
    navigation.navigate('SeatDetail' as never);
  }
  const geToPlanner = () => {
    navigation.navigate('PlannerDetail' as never);
  }
  const geToDriver = () => {
    navigation.navigate('DriverDetail' as never);
  }
  const geToVehicule = () => {
    navigation.navigate('VehiculeDetail' as never);
  }
  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
            {/* Start Header */}
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

              <IconButton icon={shareIcon} shadow={false} onPress={() => {}} />
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
              <Divider />
              <View style={{ 
                    marginVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                  <Text style={[styles.lightText]}>Trip Service</Text>
                  <Text style={[styles.semiBoldText]}>Day, Normal</Text>
              </View>
              <Divider />
             {/* End Header */}

             {/* Start Trip Info Card */}
                <TripInfoCard 
                onPress={geToPlanner}
                label='Planner'
                info1='+237 655 667 788'
                info2='bucavoyage@gmail.com'
                image={require('@assets/images/logo.png')} 
                rate={5} 
                title='Buca Voyage'
                />
                
                <TripInfoCard 
                onPress={geToDriver}
                label='Driver'
                info1='+237 655 667 788'
                info2='marc@gmail.com'
                image={require('@assets/images/logo.png')} 
                rate={5} 
                title='Marc S.'
                />

                <TripInfoCard 
                onPress={geToVehicule}
                label='Vehicule'
                carColor='red'
                carMatricule='CE 237 CM'
                info1='Yaris'
                image={require('@assets/images/logo.png')} 
                rate={5} 
                title='Toyote'
                />
            {/* End Trip Info Card */}

      </ScrollView>

      {/* Start Book Seat */}

      <View key="fixed" style={[styles.seatBox]}>
          <View style={{ 
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
              <Text style={[styles.lightText, {fontSize: 14}]}>Seats</Text>
              <Text style={[styles.semiBoldText]}>4 Available</Text>
          </View>
          <CustomButton
                bgColor={Colors.primaryColor}
                fgColor='#fff'
                isReady={true}
                onPress={geToSeat}
                text="Book Here"
              />
      </View>

            {/* End Book Seat*/}
    </View>
  );
};

export default TripInfoScheduleScreen;

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    elevation: 2,
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 105,
    position: 'relative'
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