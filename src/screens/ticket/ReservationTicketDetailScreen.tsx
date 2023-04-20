import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleHeader from '@components/SimpleHeader';
import Colors from '@constants/colors';
import CustomButton from '@components/buttons/CustomButton';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from '@constants/ComponentStyled';
import QRCode from 'react-native-qrcode-svg';

const TicketDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ 
          paddingHorizontal: 20,
       }}>
      <SimpleHeader text='Ticket' />
      </View>


          <ImageBackground 
            style={{ width: "100%", flex: 1, paddingTop: 80 }}
            source={require('@assets/images/world_dotted_map.png')} 
        >
          
          <ScrollView showsVerticalScrollIndicator={false} style={{ 
              paddingHorizontal: 20,
          }}>

            <View
              style={[styles.qrcodeBLock]}
            >

            <Text
                    style={[
                     styles.title,
                     { 
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      color: Colors.accentOrange,
                      marginBottom: 20
                   }, 
                    ]}
                >qr code scan by planner only to validate ticket</Text>
              <QRCode value='bondico' logo={require('@assets/images/logo.png')} size={150}  logoBackgroundColor='#fff' />
            </View>
            <View
              style={[styles.secondBLock]}
            >

              <View style={{ 
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%"
                }}>
                    <View style={{ 
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Ionicons
                            name="time-outline"
                            size={20}
                            color={Colors.accentOrange}
                            /> 
                        <Text style={[styles.title,]}>
                            00h40
                        </Text>
                    </View>
                  
                  <View style={{ 
                        marginLeft: 15,
                        position: "relative",
                      }}>
                        <Ionicons
                            name="ios-ellipsis-vertical"
                            size={20}
                            color={Colors.primaryColor}
                            style={{ 
                              position: "absolute", 
                              bottom:40,
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
                            <Text style={[styles.title,]}>Biyem-Assi</Text>
                            <Text style={[styles.description,]}>7:00, Today</Text>
                          </View>
                    </View>
                    <View style={{ 
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginTop: 20
                      }}>
                        <Ionicons
                            name="location-outline"
                            size={20}
                            color={Colors.secondaryColor}
                            /> 
                          <View style={{ marginLeft: 5 }}>
                            <Text style={[styles.title,]}>Melen, Ecole Polytechnique</Text>
                            <Text style={[styles.description,]}>7:00, Today</Text>
                          </View>
                    </View>
                  </View>            
              </View>

            <View style={{ marginTop:10 }}>
                <Text
                    style={[{ 
                        textAlign: 'left',
                        textTransform: 'uppercase',
                        },
                        styles.description,
                    ]}
                >Reserved at</Text>
                <Text
                style={[{ 
                    textAlign: 'left'
                    },
                    styles.title,
                ]}
                >8:15, Monday 5 june 2023</Text>
            </View>

              <Divider style={{ 
                  marginVertical: 10
               }}/>

              <View style={[{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5
          }]}>
            <View >
                <Text
                    style={[{ 
                        textAlign: 'left',
                        textTransform: 'uppercase',
                        },
                        styles.description,
                    ]}
                >Passager Name</Text>
                <Text
                style={[{ 
                    textAlign: 'left'
                    },
                    styles.title,
                ]}
                >Karlin Becker</Text>
            </View>

            <View >
                <Text
                style={[{ 
                        textAlign: 'right',
                        textTransform: 'uppercase',
                    },
                    styles.description,
                ]}
                >National ID number</Text>
                <Text
                    style={[{ 
                        textAlign: 'right',
                        textTransform: 'uppercase',
                     }, 
                     styles.title,
                    ]}
                >482312995</Text>
            </View>
              </View>

              <View style={[{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8
          }]}>
            <View >
                <Text
                    style={[{ 
                        textAlign: 'left',
                        textTransform: 'uppercase',
                        },
                        styles.description,
                    ]}
                >Trip Planner</Text>
                <Text
                style={[{ 
                    textAlign: 'left'
                    },
                    styles.title,
                ]}
                >Buca Voyage</Text>
            </View>

            <View >
                <Text
                style={[{ 
                        textAlign: 'right',
                        textTransform: 'uppercase',
                    },
                    styles.description,
                ]}
                >Trip service</Text>
                <Text
                    style={[{ 
                        textAlign: 'right',
                        textTransform: 'uppercase',
                     }, 
                     styles.title,
                    ]}
                >Day, Normal</Text>
            </View>
              </View>


              <View style={[{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8
          }]}>
            <View >
                <Text
                    style={[{ 
                        textAlign: 'left',
                        textTransform: 'uppercase',
                        },
                        styles.description,
                    ]}
                >Trip Driver</Text>
                <Text
                style={[{ 
                    textAlign: 'left'
                    },
                    styles.title,
                ]}
                >Jason Prosper</Text>
            </View>

            <View >
                <Text
                style={[{ 
                        textAlign: 'right',
                        textTransform: 'uppercase',
                    },
                    styles.description,
                ]}
                >Trip vehicule</Text>
                <Text
                    style={[{ 
                        textAlign: 'right',
                        textTransform: 'uppercase',
                     }, 
                     styles.title,
                    ]}
                >Bus, CE 123 LG</Text>
            </View>
              </View>

            </View>
            <View
              style={[styles.thirdBLock]}
            >

<View style={[{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8
          }]}>
            <View >
                <Text
                    style={[{ 
                        textAlign: 'left',
                        textTransform: 'uppercase',
                        },
                        styles.description,
                    ]}
                >Reservation id</Text>
                <Text
                style={[{ 
                    textAlign: 'left'
                    },
                    styles.title,
                ]}
                >12345678</Text>
            </View>

            <View >
                <Text
                style={[{ 
                        textAlign: 'right',
                        textTransform: 'uppercase',
                    },
                    styles.description,
                ]}
                >Currency</Text>
                <Text
                    style={[{ 
                        textAlign: 'right',
                        textTransform: 'uppercase',
                     }, 
                     styles.title,
                    ]}
                >XAF</Text>
            </View>
              </View>

              <View style={[{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8
          }]}>
            <View >
                <Text
                    style={[{ 
                        textAlign: 'left',
                        textTransform: 'uppercase',
                        },
                        styles.description,
                    ]}
                >Trip id</Text>
                <Text
                style={[{ 
                    textAlign: 'left'
                    },
                    styles.title,
                ]}
                >23145678</Text>
            </View>

            <View >
                <Text
                style={[{ 
                        textAlign: 'right',
                        textTransform: 'uppercase',
                    },
                    styles.description,
                ]}
                >Payment method</Text>
                <Text
                    style={[{ 
                        textAlign: 'right',
                        textTransform: 'uppercase',
                     }, 
                     styles.title,
                    ]}
                >Orange Money</Text>
            </View>
              </View>

              <View style={{ marginTop:20 }}>
                <Text
                style={[{ 
                        textAlign: 'left',
                        textTransform: 'uppercase',
                    },
                    styles.description,
                ]}
                >Resevation policy</Text>
                <Text
                    style={[{ 
                        textAlign: 'left',
                     }, 
                     styles.title,
                    ]}
                >Dear pooler, you have up to 24hrs before the trip day to confirm</Text>
            </View>

            </View>

          <CustomButton
            bgColor={Colors.primaryColor}
            fgColor={'#fff'}
            onPress={()=>{}}
            isReady={true}
            text='download all tickets'
            marginVertical={10}
          />
          </ScrollView>
        </ImageBackground>
      
    </SafeAreaView>
  );
};

export default TicketDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone2,
    paddingTop: 40,
    position: "relative"
  },
  qrcodeBLock: {
    width: "100%",
    backgroundColor: Colors.whiteTone1,
    borderRadius: 20,
    padding: 20,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderBottomColor: Colors.grayTone1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondBLock: {
    width: "100%",
    backgroundColor: Colors.whiteTone1,
    borderRadius: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.grayTone1,
  },
  thirdBLock: {
    width: "100%",
    backgroundColor: Colors.whiteTone1,
    borderRadius: 20,
    padding: 10,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderTopColor: Colors.grayTone1,
  },
  shadowProp: {
    shadowColor: Colors.primaryColor,
    elevation: 2,
    backgroundColor: Colors.whiteTone1,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: Colors.grayTone1,
  },
  description: {
    fontFamily: 'Poppins_300Light',
    color: Colors.grayTone1,
    fontSize: 12,

  },
  paragraph: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium'
  },
});