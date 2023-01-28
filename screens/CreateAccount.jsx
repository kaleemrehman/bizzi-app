import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import FormIcon from '../components/FormIcon'
import { Button, MD2Colors, TextInput } from 'react-native-paper'

import { API, Auth, graphqlOperation, Storage } from 'aws-amplify'
import { useNavigation, useRoute } from '@react-navigation/native'
import { createClient, createSeller } from '../src/graphql/mutations'
import BackButton from '../components/BackButton'
import KeyAvoid from '../components/KeyAvoid'
import HideWithKeyboard from 'react-native-hide-with-keyboard';


import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import BuyerOrSeller from '../components/BuyerOrSeller'

const CreateAccount = ({name,email,}) => {
  const navigation = useNavigation();
  const [isSeller, setIsSeller] = useState(false);
  const [selected, setSelected] = useState('Seller');
  const route = useRoute();
  const userInfo = route?.params;
  // console.log('PARAMS: ', route?.params);
  const [data, setData] = useState({
      name:userInfo.name,
      email:userInfo.email,
      image:userInfo.picture
      });

  const addUser = async(userId) => {
    if(selected === 'Seller'){
      try {
        const response = API.graphql(graphqlOperation(createSeller, {
          input: {
            id:userId,
            name:data.name,
            email: data.email,
            image: data.image,
            phone: data.number        
        }
        }))
        console.log('CREATE SELLER',response);
      } catch (error) {
        Alert.alert(error.message);
      }
    }
    else{
      try {
        const response = API.graphql(graphqlOperation(createClient, {
          input: {
            id:userId,
            name:data.name,
            email: data.email, 
            image: data.image,
            phone: data.number       
        }
        }))
        console.log('CREATE CLIENTE',response);
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  }

  const registerHandler = async() => {
    if(data.password === data.confirm){
      const userId = uuid();
      await addUser(userId);
  
      try {
        const { user } = await Auth.signUp({
          username : data.email,
          password: data.password,
          attributes: {
              profile:userId,                           
              // family_name:data.apellido,
              name:data.name,
              email:data.email,              
          },
          autoSignIn: { // optional - enables auto sign in after user is confirmed
              enabled: true,
          }
      });
      console.log(user);
      navigation.navigate('ConfirmEmail', {username: data.email})
        
      } catch (e) {
        Alert.alert(e.message);
      }
    }
    else {
      Alert.alert('Les mots de passe ne correspondent pas')
    }
  }

  
  
 
console.log(data);

  return (
    <Wrapper>
      <BackButton />
      <SafeAreaView> 
        <HideWithKeyboard>
          <FormIcon />                         
        </HideWithKeyboard>
        <BuyerOrSeller selected={selected} setSelected={setSelected} />       
        <TextInput          
                label="Nom"
                defaultValue={data.name}
                value={data}
                onChangeText={text => setData({...data, ['name']:text})} 
                style={{...styles.textInput, marginTop:30,}}
                selectionColor={MD2Colors.lightBlue900}
                activeUnderlineColor={MD2Colors.lightBlue900}
                textColor={MD2Colors.grey200}
                />
        <TextInput  
           
                label="Email"
                defaultValue={data.email}
                value={data}
                onChangeText={text => setData({...data, ['email']:text})} 
                style={styles.textInput}
                selectionColor={MD2Colors.lightBlue900}
                activeUnderlineColor={MD2Colors.lightBlue900}
                textColor={MD2Colors.grey200}
                />
        <TextInput
            keyboardType='number-pad'                
                label="Numéro de téléphone"
                value={data}
                onChangeText={text => setData({...data, ['number']:text})} 
                style={styles.textInput}
                selectionColor={MD2Colors.lightBlue900}
                activeUnderlineColor={MD2Colors.lightBlue900}
                textColor={MD2Colors.grey200}
                />
            <TextInput
                secureTextEntry
                label="Le mot de passe"
                value={data}
                onChangeText={text => setData({...data, ['password']:text})} 
                style={styles.textInput}
                selectionColor={MD2Colors.lightBlue900}
                activeUnderlineColor={MD2Colors.lightBlue900}
                textColor={MD2Colors.grey200}
                /> 

             <TextInput
                secureTextEntry
                error={data.confirm != data.password}
                label="Confirmez le mot de passe"
                value={data}
                onChangeText={text => setData({...data, ['confirm']:text})} 
                style={styles.textInput}
                selectionColor={MD2Colors.lightBlue900}
                activeUnderlineColor={MD2Colors.lightBlue900}
                textColor={MD2Colors.grey200}
                /> 
        {/* <GreenButton text={'Register'} color='gray' style={styles.button} handlePress={registerHandler} />         */}
        <Button onPress={registerHandler} mode='contained' style={styles.buttons} >Enregistrement</Button>
      </SafeAreaView>
    </Wrapper>
  )
}

export default CreateAccount

const styles = StyleSheet.create({  
  textInput:{
      maxHeight:60,
      marginBottom:10,
      backgroundColor:'transparent',
      //color:MD2Colors.red500,      
      width:240,
      alignSelf:'center'
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

  },
  uploadIcon:{
    alignSelf:'center', 
    backgroundColor:MD2Colors.blueGrey300, 
    marginTop:40, 
    marginBottom:20,
  },
  buttons:{
    width:250,
    alignSelf:'center',
    marginTop:20,
    backgroundColor:MD2Colors.lightGreen600
  }
})