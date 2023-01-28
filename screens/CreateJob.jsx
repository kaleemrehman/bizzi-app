import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, MD2Colors, TextInput } from 'react-native-paper';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createTransaction } from '../src/graphql/mutations';

const CreateJob = () => {
  const [data, setData] = useState()
  const [userIn, setUserIn] = useState();
  const route = useRoute();
  const navigation = useNavigation();
  
  const category = route?.params?.seller?.category;
  
    useLayoutEffect(() => {
        navigation.setOptions({title:'Demander un service'})
    },[])

  const addJob = async() => {
    // const cardId = uuid();
    try {
        const response = API.graphql(graphqlOperation(createTransaction, {
            input: {...data, 
              sellerTransactionsId:route.params.seller.seller.id, 
              clientTransactionsId:userIn.attributes.profile, 
              category:category 
            }}))
        console.log('RESPONSE: ',response);
        navigation.navigate('Home', {msg:'added'});        
    } catch (error) {
        Alert.alert(error.message);
    }        
  }

  useEffect(() => {
    async function loadUser(){            
        const user = await Auth.currentAuthenticatedUser();            
        setUserIn(user);
    }
    loadUser();
},[]);

  return (
    <Wrapper>
      <Text style={styles.title}>Rédigez votre demande de {category}</Text>
      <View style={styles.formContainer} >
                <TextInput
                    multiline
                    numberOfLines={8}
                    maxLength={400}
                    style={styles.textInput}
                    label="La description"
                    value={data}
                    onChangeText={text => setData({...data, ['description']:text})}            
                />
                
                <Button onPress={addJob}
                     mode='contained' buttonColor={MD2Colors.lightGreen500} style={styles.buttons} >
                        Demander
                </Button>
            </View>
    </Wrapper>
  )
}

export default CreateJob

const styles = StyleSheet.create({
  textInput:{    
    backgroundColor:'#dadbf3',
    
},
buttons:{
  width: 200,
  alignSelf:'center',
  marginTop:30,
},
title:{
  fontSize:17,
  alignSelf:'center',
  textAlign:'center',
  fontWeight:'500',
  marginVertical:15,
}
})