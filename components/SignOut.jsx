import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Auth } from 'aws-amplify';
import FontAwesome from '@expo/vector-icons/FontAwesome'

const SignOut = ({style}) => {

    const logout = async() => {
        
            try {
                await Auth.signOut();
            } catch (error) {
                console.log('error signing out: ', error);
            }      
    }
    
  return (
    <View>
        <TouchableOpacity style={style} onPress={logout} >
            <FontAwesome name='sign-out' size={35} color={'#0149e8'} />
        </TouchableOpacity>
    </View>
  )
}

export default SignOut

const styles = StyleSheet.create({
    button:{
        top:10
    }
})