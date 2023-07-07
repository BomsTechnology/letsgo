import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "@constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import SimpleHeader from "@components/SimpleHeader";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

interface messageProps {
  id: string;
  fromMe: boolean;
  message: string;
}

const ChatScreen = () => {
  const messages: messageProps[] = [
    {
      id: "1",
      fromMe: true,
      message: "Hi, how are you?",
    },
    {
      id: "2",
      fromMe: false,
      message: "Hi, how are you? Hi, how are you? Hi, how are you?",
    }
  ]

  const messageRender =  ({item}: {item: messageProps}) => {
    return (
      <View style={{ 
        backgroundColor: item.fromMe ? Colors.primaryColor : Colors.whiteTone2,
        elevation:5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        borderTopEndRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        maxWidth: '90%'
       }}>
        <Text style={{ 
          color: item.fromMe ? Colors.whiteTone2 : Colors.grayTone2,
          fontFamily: 'Poppins_400Regular',
          fontSize: 14,
          width: 'auto',
         }}>{item.message}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader text="Chatbot" />
      <FlatList
        data={messages}
        showsHorizontalScrollIndicator={false}
        renderItem={messageRender}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        contentContainerStyle={{ 
          padding:5,
          alignItems: 'flex-start'
         }}
      />
      <View
        style={styles.inputContainer}
      >
        <TextInput placeholder="Type your message here..." placeholderTextColor={Colors.grayTone2}   style={styles.input}/>
        <TouchableOpacity>
          <Ionicons name="send" size={25} color={Colors.primaryColor} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    padding: 20,
  },
  inputContainer: {
    elevation: 10,
          width: "100%",
          height: 50,
          backgroundColor: Colors.whiteTone2,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10
  },
  input: {
    flex:1,
    height: 50,
    color: Colors.grayTone1,
    fontFamily: 'Poppins_300Light',
    fontSize: 14,
  },
  listContent: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
});
