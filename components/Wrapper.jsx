import {  StyleSheet, View } from 'react-native'
import React from 'react'
import { MD2Colors } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient';


const Wrapper = ({children}) => {    

  return (    
    <View style={styles.container}>
        <LinearGradient                
        colors={['#dadbf3', '#7c9cf4', '#0149e8']}
        style={styles.container}
        >       
       {children}
        </LinearGradient>
    </View>    
  )
}

export default Wrapper

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flex:1,        
        //alignItems:'center',
        
    },
    logoContainer:{
        width:100,
        height:100,        
        marginTop:100,        
        alignItems:'center',
        justifyContent:'center'
    },
    formContainer:{
        width:250,
        marginTop: 60,
    },
    textInput:{
        marginBottom:10,
        backgroundColor:MD2Colors.blueGrey100,
        color:MD2Colors.red500,        
    },
    button:{
        marginTop:20,
        height:50,        
        borderRadius:'50%',
        alignItems:'center'

    }
})