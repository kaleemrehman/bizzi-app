import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Wrapper from '../components/Wrapper'
import FormIcon from '../components/FormIcon'
import { Button, MD2Colors, TextInput } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import GreenButton from '../components/GreenButton'
import { Auth } from 'aws-amplify'
import { useNavigation, useRoute } from '@react-navigation/native'
import Snackb from '../components/Snackbar'
import BackButton from '../components/BackButton'


const ForgotPassword = () => {
  const [data, setData] = useState([]);
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackText, setSnackText] = useState('');

  const route = useRoute();
  const navigation = useNavigation();
    const username = route?.params;

  console.log(username);

  const confirmHandler = async() => {

    try {
        //username added here!!
        const response =  await Auth.forgotPassword(data.email ? data.email : username)
        console.log(response);
        navigation.navigate('NewPassword', username)
      } catch (error) {
          //console.log('error confirming sign up', error);        
          setSnackText(`Il n'y a pas d'utilisateur avec cet e-mail`)
          setVisibleSnack(true);
      }
  }
  
console.log(data);

  return (
    <Wrapper>
        <BackButton  />
      <SafeAreaView>
        <FormIcon />
        <TextInput
                defaultValue={username}          
                label="Email"
                value={data}
                onChangeText={text => setData({...data, ['email']:text})} 
                style={styles.textInput}
                selectionColor={MD2Colors.lightBlue900}
                activeUnderlineColor={MD2Colors.lightBlue900}
                textColor={MD2Colors.grey200}
                />
       <Button onPress={confirmHandler} style={{width:250, alignSelf:'center', marginTop:50,}} buttonColor={MD2Colors.lightGreen500} >Réinitialiser le mot de passe</Button>        
      </SafeAreaView>
        <Snackb visible={visibleSnack} setVisible={setVisibleSnack} text={snackText} />
    </Wrapper>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({  
  textInput:{
      maxHeight:60,
      marginBottom:10,
      backgroundColor:'transparent',      
      width:240,
      alignSelf:'center',
      marginTop:30,
  },
  button:{
      marginTop:20,
      height:50,
      //backgroundColor:'red',
      borderRadius:'50%',
      alignItems:'center',
      width: 200,
      alignSelf:'center',
      justifyContent:'center'

  }
})