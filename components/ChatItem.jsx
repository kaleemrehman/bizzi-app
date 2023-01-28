import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Button, MD2Colors, Surface } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const ChatItem = ({selected, setSelected, item, isSeller}) => {

    const navigation = useNavigation();

    const handlePress = () => {
        if(selected === true){
            setSelected('');
        } else {
            setSelected(title);
        }
    }
     console.log('ISSELLER: ',isSeller)
  return (    
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Chat', {identification:item.id, name:item.client.name})} >
          
            <Surface style={styles.walletItem} elevation={selected? 5: 2}>
              <LinearGradient                
                colors={item.selected?['#E49F47', '#FD9313']: ['#FEF6EC', '#FEF6EC']}
                style={{borderRadius:25}}
                >                
                <View style={styles.walletItem} >
                    {/* {!isSeller && item.seller.image && <Avatar.Image size={25} source={{uri: item.seller.image}} style={{marginLeft:10,}} />}                    
                    {isSeller && item.client.image && <Avatar.Image size={25} source={{uri: item.client.image}} style={{marginLeft:10,}} />}                     */}
                    {
                      isSeller ?
                        <Avatar.Image size={25} source={{uri: item?.client?.image}} style={{marginLeft:10,}} />:
                        <Avatar.Image size={25} source={{uri: item?.seller?.image}} style={{marginLeft:10,}} />
                    }
                    {isSeller? 
                      <Text style={styles.text} >{item?.client?.name}</Text>:
                      <Text style={styles.text} >{item?.seller?.name}</Text>
                    }
                    {
                        item.isConfirmed ?
                        <Text style={{...styles.price, color:MD2Colors.lightGreen800}}>Accepté</Text>
                        : isSeller && item.isConfirmed?
                        <Button style={{...styles.price, marginTop:20,}} mode='outlined' onPress={() => navigation.navigate('ConfirmJob', item) } >Confirmer</Button>
                        : <Text style={{...styles.price, color:MD2Colors.deepOrange900}}>Chat</Text>
                    }
                </View>
                <View style={{...styles.walletItem, height:30}} >
                  
                  <Text style={styles.description} >{new Date(item.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</Text>
                  {/* <Text style={styles.price} >{new Date(item.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</Text> */}
                </View>
              </LinearGradient>
            </Surface>
        </TouchableOpacity>
  )
}

export default ChatItem

const styles = StyleSheet.create({
    walletItem:{
        flexDirection:'row',
        width:350,
        alignSelf:'center',
        alignItems:'center',    
        height:45,
        borderRadius:16,        
    
      },
      text:{
        fontSize:15,
        marginLeft:10,
        fontWeight:'800',
      },
      price:{
        position:'absolute',
        right:0,
        fontSize:15,
        fontWeight:'600',
        marginRight:10,

      },
      description:{
        marginLeft:10,
        marginBottom:12,
        fontWeight:'300',
        // color:'white'
      },
      container:{
        margin:30,
      }
})