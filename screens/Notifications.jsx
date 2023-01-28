import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'
import { listChats, listTransactions } from '../src/graphql/queries'
import NotificationItem from '../components/NotificationItem'
import ChatItem from '../components/ChatItem'
import { useNavigation, useRoute } from '@react-navigation/native'


const Notifications = () => {
    const [notif, setNotif] = useState([]);    
    const [ascending, setAscending] = useState(false);
    const [userIn, setUserIn] = useState();
    const [loading, setLoading] = useState();
    const [chats, setChats] = useState();
    const [reloadCards, setReloadCards] = useState();
    const navigation = useNavigation();
    const route = useRoute();

    // console.log('userIn: ',userIn?.attributes?.profile);
    
    useLayoutEffect(() => {
        navigation.setOptions({title:'Activité'})
    },[])

    const getChats = async() => {
        let filter = {
            sellerChatsId: {
              eq: userIn?.attributes?.profile
          }
      };
        try {
          const response = API.graphql(graphqlOperation(listChats, { filter: filter})).then((value) => 
            setChats(value.data.listChats.items), 
            (reason) => console.log('REASON: ', reason))
          // console.log('RESPONSE: ',response);          
      } catch (error) {
          Alert.alert(error.message);
      } 
      }

      useEffect(() => {
        if (route?.params?.msg === 'added'){
            // setSnackVisible(true);
            setReloadCards(true);
        }
    },[route]);

    useEffect(() => {
        setLoading(true);
        async function loadUser(){            
            const user = await Auth.currentAuthenticatedUser();            
            setUserIn(user);            
            let filter = {                
                // } CHECK NOTIFICATIONS WHERE YOU ARE A BUYER OR SELLER
                or: [{ clientTransactionsId: {eq:user.attributes.profile} },
                    { sellerTransactionsId: {eq:user.attributes.profile} }]
                };
                const result = await API.graphql(graphqlOperation(listTransactions, { filter: filter}));
                const notifications = [];            
                result.data.listTransactions.items.forEach((data) => {
                    notifications.push(data)
                } )
                setNotif(notifications);
                setLoading(false);            
            }  
            loadUser().then(() => getChats());
        
        },[]);

        useEffect(() => {
            setLoading(true);
            async function loadUser(){            
                const user = await Auth.currentAuthenticatedUser();            
                setUserIn(user);            
                let filter = {                
                    // } CHECK NOTIFICATIONS WHERE YOU ARE A BUYER OR SELLER
                    or: [{ clientTransactionsId: {eq:user.attributes.profile} },
                        { sellerTransactionsId: {eq:user.attributes.profile} }]
                    };
                    const result = await API.graphql(graphqlOperation(listTransactions, { filter: filter}));
                    const notifications = [];            
                    result.data.listTransactions.items.forEach((data) => {
                        notifications.push(data)
                    } )
                    setNotif(notifications);
                    setLoading(false);            
                }  
                loadUser().then(() => getChats());
            
            },[reloadCards]);
    

    chats && console.log('CHATS: ', chats);
    // console.log(notif);
    
  return (
    <Wrapper>        
        <SafeAreaView> 
            <TouchableOpacity onPress={() => setAscending(!ascending)} style={{alignSelf:'flex-end', flexDirection:'row', marginRight:20, alignItems:'center'}} >
                <Text style={styles.clock} >{ascending ? 'Ancienne Première' : 'Premier Récent'}</Text>
                {
                    ascending? 
                        <MaterialCommunityIcons name='sort-clock-descending' size={38} style={styles.clock}/> 
                        :<MaterialCommunityIcons name='sort-clock-ascending' size={38} style={styles.clock}/>
                }
            </TouchableOpacity>  
            {
                loading && <ActivityIndicator animating={true} color={MD2Colors.lightGreen500} size='large' />
            }           
        <ScrollView style={styles.formContainer} >            
            {
                notif?.sort((a,b) => {
                    if (ascending){
                      return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
                    } else {
                      return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
                    }
                  }).map((item, index) => (                       
                        // <NotificationItem key={index} category={item.category} date={item.createdAt} description={item.description} isConfirmed={item.isConfirmed} />
                        <NotificationItem key={index} item={item} 
                            isSeller={item.sellerTransactionsId === userIn?.attributes?.profile } 
                            reloadCards={reloadCards}
                        />
                    
                ))
            }            
        </ScrollView> 
        <ScrollView style={styles.formContainer} >            
            {
                chats?.sort((a,b) => {
                    if (ascending){
                      return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
                    } else {
                      return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
                    }
                  }).map((item, index) => (                       
                        // <NotificationItem key={index} category={item.category} date={item.createdAt} description={item.description} isConfirmed={item.isConfirmed} />
                        <ChatItem key={index} item={item} isSeller={item.sellerChatsId === userIn?.attributes?.profile}  />
                    
                ))
            }            
        </ScrollView>            
        </SafeAreaView>
    </Wrapper>
  )
}

export default Notifications

const styles = StyleSheet.create({
    title:{
        fontSize:30,
        marginLeft:10,
        marginTop:0,
        color:MD2Colors.blueGrey50,
    },
    subtitle:{
        fontSize:30,
        marginLeft:10,
        color:MD2Colors.green900,
        fontWeight:'700'
    },
    header:{
        marginTop:10,
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginTop:40,
        marginBottom:60,
    },
    button:{
        height:50,
        width:150,
        //backgroundColor:MD2Colors.green900,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:30
    },
    buttonText:{
        color:MD2Colors.blueGrey50,
        fontSize:20,
        fontWeight:'bold'
    },
    formContainer:{
        paddingHorizontal:20,        
    },
    textInput:{
        backgroundColor:'transparent',
        marginTop:20,
    },
    texto:{
        fontSize:18,
        color: '#000000',
        fontWeight:'bold'
    },
    notifContainer:{
        marginVertical:8,
        borderBottomWidth:0.5,
        borderBottomColor:'#F7F3F5',
    },
    clock:{
        color:'black',
        marginLeft:10,
        fontWeight:'500'
        
    }
})