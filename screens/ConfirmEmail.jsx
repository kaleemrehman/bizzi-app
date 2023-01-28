import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import FormIcon from '../components/FormIcon'
import { Button, MD2Colors, TextInput } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import GreenButton from '../components/GreenButton'
import { Auth } from 'aws-amplify'
import { useNavigation, useRoute } from '@react-navigation/native'
import Snackb from '../components/Snackbar'
import BackButton from '../components/BackButton'


const ConfirmEmail = () => {
    const [data, setData] = useState([]);
    const [visibleSnack, setVisibleSnack] = useState(false);
    const [snackText, setSnackText] = useState('');

    const route = useRoute();
    const navigation = useNavigation();
    const username = route?.params?.username;

    console.log('USERNAME: ', username)

    const confirmHandler = async() => {

    try {
        //username added here!!
        const response =  await Auth.confirmSignUp(username, data.code);
        console.log('RESPONSE: ', response);        
      } catch (error) {
          //console.log('error confirming sign up', error);        
          setSnackText('Mauvais code')
          setVisibleSnack(true);
      }
  }

  const resendHandler = async() => {
    try {
        const response =  await Auth.resendSignUp(username);
        setSnackText('Code transmis')
        setVisibleSnack(true);        
      } catch (error) {
        setSnackText('Utilisateur déjà confirmé')
        setVisibleSnack(true);
      }
  }

 
console.log(data);

  return (
    <Wrapper>
      <BackButton/>
      <SafeAreaView>
        <FormIcon />
        <TextInput          
                label="Código"
                value={data}
                onChangeText={text => setData({...data, ['code']:text})} 
                style={styles.textInput}
                selectionColor={MD2Colors.lightBlue900}
                activeUnderlineColor={MD2Colors.lightBlue900}
                textColor={MD2Colors.grey200}
                />
       
        <GreenButton text={'Confirmer le code'} color='lightBlue' style={styles.button} handlePress={confirmHandler} />
        {/* <Button mode='contained'>Confirmar código</Button> */}
        <GreenButton text={'Renvoyer le code'} color='gray' style={styles.button} handlePress={resendHandler} />
        {/* <Button mode='contained'>Reenviar código</Button> */}
      </SafeAreaView>
        <Snackb visible={visibleSnack} setVisible={setVisibleSnack} text={snackText} />
    </Wrapper>
  )
}

export default ConfirmEmail

const styles = StyleSheet.create({  
  textInput:{
      maxHeight:60,
      marginBottom:10,
      backgroundColor:'transparent',
      //color:MD2Colors.red500,      
      width:240,
      alignSelf:'center',
      marginTop:20,
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