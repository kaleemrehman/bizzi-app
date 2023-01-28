import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button, MD2Colors, Surface } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const NotificationItem = ({selected, setSelected, item, isSeller}) => {

    const navigation = useNavigation();

    const handlePress = () => {
        if(selected === true){
            setSelected('');
        } else {
            setSelected(title);
        }
    }
    // console.log(item)
  return (    
        <TouchableOpacity style={styles.container} onPress={() => console.log('presss')} >
            <Surface style={styles.walletItem} elevation={selected? 5: 2}>
              <LinearGradient                
                colors={item.selected?['#E49F47', '#FD9313']: ['#FEF6EC', '#FEF6EC']}
                style={{borderRadius:12}}
                >
                {/* <Fontisto name='history' size={30} style={{position:'absolute' ,left:5}}  /> */}
                <View style={styles.walletItem} >
                    <Text style={styles.text} >{item.category}</Text>
                    {/* <Text style={styles.price}>{item.isConfirmed ? 'Accepté' : 'À confirmer'}</Text> */}
                    {
                        item.isConfirmed ?
                        (<>
                          <Text style={{...styles.price, color:MD2Colors.lightGreen800}}>Accepté</Text>
                        </>)
                        : isSeller?
                        <Button compact style={{...styles.price, marginTop:20,}} mode='outlined' onPress={() => navigation.navigate('ConfirmJob', item) } >Confirmer</Button>
                        : <Text style={{...styles.price, color:MD2Colors.deepOrange900}}>Confirmation en attente</Text>
                      }
                        </View>
                        <View style={{...styles.walletItem, height:40}} >
                            <Text style={styles.description} >{new Date(item.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</Text>
                            {item.isConfirmed && <Button compact style={{...styles.price,}} onPress={() => navigation.navigate('PostReview', {...item, isSeller})} mode='text'>Qualifier</Button>}

                        </View>
              </LinearGradient>
            </Surface>
        </TouchableOpacity>
  )
}

export default NotificationItem

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
        marginBottom:10,

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