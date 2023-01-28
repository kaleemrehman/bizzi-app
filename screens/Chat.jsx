import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChatMessage from '../components/ChatMessage'
import BackButton from '../components/BackButton'
import KeyAvoid from '../components/KeyAvoid'
import { MD2Colors, TextInput } from 'react-native-paper'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { createChats, createMessages, updateChats } from '../src/graphql/mutations'
import { getChats, listChats, listMessages } from '../src/graphql/queries'
import { onCreateMessages } from '../src/graphql/subscriptions'

const Chat = ({}) => {
    const [message, setMessage] = useState('');
    const [userIn, setUserIn] = useState();
    const [data, setData] = useState({})
    const [messages, setMessages] = useState();
    const [clientId, setClientId] = useState();
    const [chatId, setChatId] = useState();
    
    const route = useRoute();
    const sellerId = route?.params?.sellerId;
    const client = route?.params?.client
    const identification = route?.params?.identification;
    const name = route?.params?.name;
    const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({title: 'Chat avec ' + route?.params?.name})
      setChatId(identification);                              
    },[])
    
    const addChat = async() => {  
      console.log('ADDING CHAT')       
        try {
            const response = API.graphql(graphqlOperation(createChats, {
                input: {id:identification ,clientChatsId:client, sellerChatsId:sellerId }}))
            console.log(response);            
        } catch (error) {
            console.log('ERROR ADDING CHAT: ', error)
        }        
    }    
    
    const addMessage = async() => {      
      try {
          const response = await API.graphql(graphqlOperation(createMessages, {
              input: {message: message, senderId:clientId, chatsMessagesId: chatId }}))
          console.log('addMessage: ',response);          
      } catch (error) {
          Alert.alert(error.message);
      } 
      setMessage('')       
    }

    const getMessages = async() => {
      console.log('getMessages')
      let filter = {
        chatsMessagesId: {
            eq: chatId
        }
      };
      try {
        const response = await API.graphql(graphqlOperation(listMessages, { filter: filter})).then((value) => {          
          setMessages(value.data.listMessages.items);          
          }, 
          (reason) => console.log('REASON: ', reason))          
          } catch (error) {
              Alert.alert(error.message);
        } 
    }

    const realTime = async() => {      
      const subscription = API.graphql(
        graphqlOperation(onCreateMessages, )
      ).subscribe({        
        next: ({ provider, value }) => setMessages((msg) => [...msg, value.data.onCreateMessages] ),
        error: (error) => console.warn(error)
      });
      return () => subscription.unsubscribe()
    }

    useEffect(() => {
        async function loadUser(){            
          console.log('loadUser');
            const user = await Auth.currentAuthenticatedUser();            
            setUserIn(user);
            setClientId(user.attributes.profile)
            console.log('getMessages')
            const result = await API.graphql(graphqlOperation(getChats, { id: identification}));  
            let filter = {
              chatsMessagesId: {
                  eq: identification
              }
            };
            try {
              const response = await API.graphql(graphqlOperation(listMessages, { filter: filter})).then((value) => {
                console.log('setting messages')          
                setMessages(value.data.listMessages.items);          
                }, 
                (reason) => console.log('REASON: ', reason))          
                } catch (error) {
                    Alert.alert(error.message);
              }
              console.log('Subscribing')          
              const subscription = API.graphql(
                graphqlOperation(onCreateMessages, )
              ).subscribe({        
                next: ({ provider, value }) => setMessages((msg) => [...msg, value.data.onCreateMessages] ),
                error: (error) => console.warn('REALTIME PROBLEM: ',error)
              });
              return () => subscription.unsubscribe()
                      
        }                               
        loadUser();
        
        
    },[]);
    
    // console.log('Messages from chat: ', messages)
    // console.log('CHATID: ',chatId);
    // console.log('identification: ', identification)
  return (
    <Wrapper>    
        <View style={{flex:1}}>
            <ScrollView style={{paddingVertical:20}}  >
              {
                messages?.sort((a,b) => {
                  if (false){
                    return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
                  } else {
                    return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
                  }
                }).map((item, index) => (
                  <ChatMessage key={index} isOwner={item.senderId === clientId} message={item.message} />

                ))
              }
            </ScrollView>

            <KeyAvoid>
                <View style={styles.footer}>
                    <TextInput
                    multiline={true}
                    underlineColor='transparent'
                    activeUnderlineColor='transparent'
                    label="Message"
                    value={message}
                    onChangeText={text => setMessage(text)}
                    style={styles.textInput}                             
                    />
                <TouchableOpacity onPress={addMessage} >
                    <MaterialCommunityIcons name='send-circle' size={40} color={MD2Colors.lightGreen500} />
                </TouchableOpacity>
                </View>       
          </KeyAvoid>
        </View>
    </Wrapper>
  )
}

export default Chat

const styles = StyleSheet.create({
    footer:{
        width:'90%',
        bottom:10, 
        position:'absolute',
        flexDirection:'row',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:MD2Colors.grey100,
        borderRadius:20,
        marginBottom:20,
        borderWidth:2,
        borderColor: '#7c9cf4'
      },
      textInput:{
        width:'85%',
        backgroundColor:'transparent',
        // 
        
      }
})