import { StyleSheet, ScrollView, View, ImageBackground, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SimpleHeader from '@components/SimpleHeader';
import Colors from '@constants/colors';
import TicketCard from '@components/cards/TicketCard';
import CustomButton from '@components/buttons/CustomButton';
import { useNavigation } from '@react-navigation/core';
const { width, height } = Dimensions.get('window');


const TicketListScreen = () => {
  
  const navigation = useNavigation();
  const next = () =>  {
    navigation.navigate('TicketDetail' as never);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ 
          paddingHorizontal: 20,
       }}>
      <SimpleHeader text='Ticket List' />
      </View>


          <ImageBackground
            style={{ width: "100%", flex: 1,   paddingTop: 100 }}
            source={require('@assets/images/world_dotted_map.png')} 
        >
          
          <View style={{ 
          paddingHorizontal: 20,
       }}>
            <TicketCard onPress={next} />
            
        </View>
        
      </ImageBackground>


          
      <View key="fixed" style={[styles.fixedBox]}>
        <CustomButton
            bgColor={Colors.primaryColor}
            fgColor={'#fff'}
            onPress={()=>{}}
            isReady={true}
            text='download all tickets'
            marginVertical={10}
          />
      </View> 
    </SafeAreaView>
  );
};

export default TicketListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteTone2,
        paddingTop: 40,
        paddingBottom: 60,
        position: "relative"
      },
      fixedBox: {
        width: width,
        paddingHorizontal: 20,
        elevation: 10,
        backgroundColor: Colors.whiteTone2,
        position: 'absolute',
        bottom: 0,
        left:0,
        right: 0,
      }
});