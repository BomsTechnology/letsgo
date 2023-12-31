import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import SimpleHeader from '@components/SimpleHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@constants/colors';
import UserRating from '@components/UserRating';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from '@constants/ComponentStyled';
const PlannerDetailScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <SimpleHeader text='Planner Details' />
        <View style={[{
          justifyContent: 'center',
          alignItems: 'center'
        }]}>
          <Image resizeMode='contain' style={[styles.image]} source={require('@assets/images/buca.jpeg')} />
          <UserRating rate={4} />
        </View>
      </View>
      <ScrollView style={[styles.contentScroll]} showsVerticalScrollIndicator={false}>
        <Text style={styles.lightText}>Organisation</Text>
        <Text style={styles.semiBoldText}>Buca Voyage</Text>
        <Text style={styles.lightText}>Phone</Text>
        <Text style={styles.semiBoldText}>+237 655 667 788</Text>
        <Text style={styles.lightText}>Email</Text>
        <Text style={styles.semiBoldText}>bucavoyage@gmail.com</Text>
        <Text style={styles.lightText}>Offical Website</Text>
        <Text style={styles.semiBoldText}>www.bucavoyage.com</Text>
        <Text style={styles.lightText}>Business Registration Number</Text>
        <Text style={styles.semiBoldText}>123456789</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlannerDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    paddingTop: 40
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    borderWidth: 0.5,
    borderColor: Colors.grayTone4,
    backgroundColor: Colors.whiteTone1,
  },
  contentScroll: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    elevation: 2,
    paddingHorizontal: 30,
    paddingTop: 20,
    position: 'relative',
    marginTop: 10
  },
  semiBoldText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.grayTone1,
    marginVertical: 10 
    
  },
  lightText: {
    fontSize: 12,
    fontFamily: 'Poppins_300Light',
    color: Colors.grayTone2,
  },
});