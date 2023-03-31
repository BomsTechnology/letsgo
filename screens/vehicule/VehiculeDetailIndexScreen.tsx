import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import UserRating from '../../components/UserRating';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from '../../constants/ComponentStyled';
import Colors from '../../constants/colors';
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import ImageSliderModal from '../../components/modal/ImageSliderModal';

const VehiculeDetailIndexScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <ImageSliderModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <View style={{ flex:1 }}>
        <View style={[{
            justifyContent: 'center',
            alignItems: 'center'
          }]}>
            <UserRating rate={4} />
        </View>
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.lightText}>Organisation</Text>
          <Text style={styles.semiBoldText}>Buca Voyage</Text>
          <Divider style={{ marginVertical: 10 }} />
          <Text style={styles.lightText}>Phone</Text>
          <Text style={styles.semiBoldText}>+237 655 667 788</Text>
          <Divider style={{ marginVertical: 10 }} />
          <Text style={styles.lightText}>Email</Text>
          <Text style={styles.semiBoldText}>bucavoyage@gmail.com</Text>
          <Divider style={{ marginVertical: 10 }} />
          <Text style={styles.lightText}>Offical Website</Text>
          <Text style={styles.semiBoldText}>www.bucavoyage.com</Text>
          <Divider style={{ marginVertical: 10 }} />
          <Text style={styles.lightText}>Business Registration Number</Text>
          <Text style={styles.semiBoldText}>123456789</Text>
          <Divider style={{ marginVertical: 10 }} />

          <View style={{ 
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text style={[styles.lightText]}>Vehicule Images</Text>
            <Text style={[styles.lightText]}>Type</Text>
          </View>

          <View style={{ 
            flexDirection: 'row',
            alignItems: 'stretch',
            width: '100%',
            marginTop: 5
          }}>
              <TouchableOpacity onPress={ () => setModalVisible(!modalVisible)} style={{ 
                width: '50%',
                borderRadius: 20, 
                overflow: 'hidden', 
                height: 120 ,
                position: 'relative'
                }}>
                    <Image resizeMode='contain' style={[styles.image]} source={require('../../assets/images/logo.png')} />
                    <View style={{ 
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#000',
                      opacity: 0.6,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 5
                    }}>
                      <Text style={[styles.boldText, {color: '#fff'}]}>03 Images</Text>
                      <Text style={[styles.mediumText, {color: '#fff'}]}>CLick to preview</Text>
                    </View>
              </TouchableOpacity>
              <View style={{ 
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                  <Image resizeMode='contain' style={{ height: 50, width: 50 }} source={require('../../assets/images/car.png')} />
                  <Text style={styles.boldText}>Personnal</Text>
              </View>
          </View>

          <Divider style={{ marginVertical: 10 }} />

          <View style={{ 
            paddingBottom: 30
          }}>
            <Text style={styles.lightText}>General Confort</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                  name="wifi"
                  size={25}
                  color={Colors.grayTone1}
                  /> 
              <Text style={[styles.semiBoldText, {marginLeft: 10}]}>Wifi avalaible</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons
                  name="wifi"
                  size={25}
                  color={Colors.grayTone1}
                  /> 
              <Text style={[styles.semiBoldText, {marginLeft: 10}]}>No Smoking in the car</Text>
            </View>
            
          </View>

          </ScrollView>
      </View>
    </>
  );
};

export default VehiculeDetailIndexScreen;

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    elevation: 2,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 0,
    position: 'relative',
    marginTop: 10
  },
  image: {
    width: '100%',
    height: '100%'
  },
  boldText: {
    fontSize: 17,
    fontFamily: 'Poppins_700Bold',
    color: Colors.grayTone1
  },
  semiBoldText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.grayTone1
  },
  mediumText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: Colors.grayTone1
  },
  lightText: {
    fontSize: 12,
    fontFamily: 'Poppins_300Light',
    color: Colors.grayTone3
  },
});