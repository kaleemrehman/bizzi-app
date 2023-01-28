import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button, MD2Colors, Surface } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const PlanItem = ({setSelected, selected, item,}) => {

    const navigation = useNavigation();
        
  return (    
        <TouchableOpacity style={styles.container} onPress={() => setSelected(item)} >
            <Surface style={styles.walletItem} elevation={selected === item? 5: 2}>
              <LinearGradient                
                colors={selected === item? ['#E49F47', '#FD9313'] : ['#FEF6EC', '#FEF6EC'] }
                style={{borderRadius:25}}
                >                
                <View style={styles.walletItem} >
                    <Text style={styles.text} >{item?.title}</Text>                                        
                </View>
                <View style={{...styles.walletItem, height:30}} >
                  <Text style={styles.description} >{item?.price} FCFA</Text>
                  {/* <Text style={styles.price} >{new Date(item.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</Text> */}
                </View>
              </LinearGradient>
            </Surface>
        </TouchableOpacity>
  )
}

export default PlanItem

const styles = StyleSheet.create({
    walletItem:{
        flexDirection:'row',
        width:120,
        alignSelf:'center',
        alignItems:'center',    
        height:25,
        borderRadius:16,  
        justifyContent:'center'      
    
      },
      text:{
        fontSize:15,
        // marginLeft:10,
        fontWeight:'800',
        // textAlign:'center'
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
        // marginBottom:12,
        fontWeight:'300',
        // color:'white'
      },
      container:{
        
        padding:5,
      }
})