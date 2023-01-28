import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Wrapper from '../components/Wrapper'
import FormIcon from '../components/FormIcon'
import { MD2Colors, TextInput } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import GreenButton from '../components/GreenButton'
import { Auth } from 'aws-amplify'
import { useNavigation, useRoute } from '@react-navigation/native'
import Snackb from '../components/Snackbar'


const NewPassword = () => {
  const [data, setData] = useState([]);
  const [visibleSnack, setVisibleSnack] = useState(false);
  const [snackText, setSnackText] = useState('');

  const route = useRoute();
  const navigation = useNavigation();
    const username = route?.params;

  const confirmHandler = async() => {

    try {
        //username added here!!
        const response =  await Auth.forgotPasswordSubmit(username,data.code,data.password)
        console.log(response);
        navigation.navigate('Login', username)
      } catch (error) {
          //console.log('error confirming sign up', error);        
          setSnackText('Code incorrect')
          setVisibleSnack(true);
      }
  }
  

//console.log(username) 
console.log(data);

  return (
    <Wrapper>
      <SafeAreaView>
        <FormIcon />
        <TextInput          
                label="Code"
                value={data}
                onChangeText={text => setData({...data, ['code']:text})} 
                style={styles.textInput}
                selectionColor={MD2Colors.lightBlue900}
                activeUnderlineColor={MD2Colors.lightBlue900}
                textColor={MD2Colors.grey200}
                />
        <TextInput          
                label="Nouveau mot de passe"
                value={data}
                onChangeText={text => setData({...data, ['password']:text})} 
                style={styles.textInput}
                selectionColor={MD2Colors.lightBlue900}
                activeUnderlineColor={MD2Colors.lightBlue900}
                textColor={MD2Colors.grey200}
                />
       
        {/* <GreenButton text={'Cambiar Password'} color='orange' style={styles.button} handlePress={confirmHandler} /> */}
        <Button onPress={confirmHandler} style={{width:250, alignSelf:'center', marginTop:50,}} buttonColor={MD2Colors.lightGreen500} >
            Changer le mot de passe
        </Button>                
      </SafeAreaView>
        <Snackb visible={visibleSnack} setVisible={setVisibleSnack} text={snackText} />
    </Wrapper>
  )
}

export default NewPassword

const styles = StyleSheet.create({  
  textInput:{
      maxHeight:60,
      marginBottom:10,
      backgroundColor:'transparent',           
      width:240,
      alignSelf:'center'
  },
  button:{
      marginTop:20,
      height:50,      
      borderRadius:'50%',
      alignItems:'center',
      width: 200,
      alignSelf:'center',
      justifyContent:'center'

  }
})