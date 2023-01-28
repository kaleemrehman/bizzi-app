import { Image, StyleSheet, View } from 'react-native'
import React from 'react'


const FormIcon = () => {
  return (
    <View style={styles.logoContainer} >            
            <Image source={require('../assets/logo.png')} style={{height:170, width:170, borderRadius:50,}} />
        </View>
  )
}

export default FormIcon

const styles = StyleSheet.create({
    logoContainer:{
        width:100,
        height:100,
        marginTop:50,
        marginBottom:20,        
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center'
    },
})