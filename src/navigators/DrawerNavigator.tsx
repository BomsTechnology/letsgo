import React from 'react'
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import { DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView , View,  Image, Text, TouchableOpacity,  StyleSheet} from 'react-native';
import IconButton from '@components/buttons/IconButton';
import Colors from '@constants/colors'
import { Ionicons , FontAwesome5, Entypo } from '@expo/vector-icons';
import { AppStackParamList } from '@navigators/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import Rating from '@components/Rating';
import { Linking } from 'react-native';




interface UserRatingProps {
  bgColor?: string; 
  fgColor?: string; 
}


const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ bgColor, fgColor}: UserRatingProps) => {

  const menuIcon =  (<Ionicons name="chevron-back" size={25} color={Colors.onWhiteTone} />);

  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
    return (
      <Drawer.Navigator
      drawerContent={
        (props) => {
           return(
               <SafeAreaView>
                  <View>
                     <IconButton icon={menuIcon}  onPress={()=>{ navigation.dispatch(DrawerActions.toggleDrawer());}}/>
                     <View style={{alignItems:'center'}}>
                     <Image
                      source={require('@assets/images/avatars/Avatar5.png')}
                      style={{
                        height: 130,
                        width: 130,
                        borderRadius: 65,
                      }}/>
                      <View style={{margin:10}}>
                      </View>
                      <Rating enablerating={false} rate={4}  size={12}/>
                      
                      <Text style={{fontWeight: "bold",fontSize: 19,marginTop:8, color: "#111",   marginBottom:8}}>Hi ALFRED Y. 👋</Text>
                         <TouchableOpacity style={{height:40, width:95,  backgroundColor:Colors.primaryColor, borderRadius:10,marginBottom:10 }}><Text  style={{textAlign:'center', marginTop:10,  color:'#fff', fontWeight:'bold'}}>Pooler</Text></TouchableOpacity>
                      </View>
                  </View>
                  <DrawerItemList {...props} />
               </SafeAreaView>
           )}}
        screenOptions={{ 
          drawerPosition: 'left'
         }}
      >
        <Drawer.Screen 
          name="Drawer" 
          component={TabNavigator}
          options={{headerShown: false,
                    drawerLabel:"Drawer",
                    title: "Drawer",
                    drawerInactiveTintColor:'black',
                    drawerActiveTintColor:'black',
                    drawerIcon: () => (
                      <Ionicons name="chevron-forward" size={25} color={Colors.onWhiteTone}  style={{position:'absolute', right:10}}/>
                    )
        }}/>
        <Drawer.Screen name="Menu"
          component={ProfileScreen}                  
          options={{headerShown: false,
                    drawerLabel:"Menu",
                    title: "Menu",
                    drawerInactiveTintColor:'black',
                    drawerActiveTintColor:'black',                   
                    drawerIcon: () => (
                      <Ionicons name="chevron-forward" size={25} color={Colors.onWhiteTone}  style={{position:'absolute', right:10}}/>
                    )
                  }}
          />
                    
      </Drawer.Navigator>
    );
}

export default DrawerNavigator

const styles = StyleSheet.create({
      container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:200,
        marginTop:5,
        borderRadius:6,
        height:42,
        marginBottom:15
    },
    shadowProp: {
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 20,
    },
})