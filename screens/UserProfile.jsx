import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import { SafeAreaView } from 'react-native-safe-area-context'
import PhotoSelector from '../components/PhotoSelector'
import SignOut from '../components/SignOut'
import { Avatar, Button, MD2Colors, TextInput } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { Alert } from 'react-native'
import { updateClient, updateSeller } from '../src/graphql/mutations'
import { getClient } from '../src/graphql/queries'

const UserProfile = () => {    
    // const [client, setClient] = useState();
    const [imageURL, setImageURL] = useState();
    const [data, setData] = useState({})
    const [form, setForm] = useState({})
    const [disabled, setDisabled] = useState('');
    const navigation = useNavigation();
    const route = useRoute();

    const userIn = route.params.userIn;
    const client = route.params;
  console.log(route.params)
    // const updateUser = async() => {
    //   try {        
    //     const update = await API.graphql(graphqlOperation(updateClient,{
    //       input: {
    //         id: userIn?.attributes.profile,
    //         image: imageURL
    //       }
    //     }))
    //     // console.log('UPDATE: ', update);
    //   } catch (error) {
    //     console.log('ERRORs: ', error)
    //   }
    // }       
    
    useLayoutEffect(() => {
      navigation.setOptions({title:'Mon Profil', 
      headerRight: () => (        
            <SignOut />        
      )})
    }, [])

    useEffect(() => {
      if(client.isSeller){
        UpdateImageSeller();
      } else{
        UpdateImage();
      }    
    },[imageURL])    

    const UpdateClient = async() => {
      try{        
        const update = await API.graphql(graphqlOperation(updateClient,{
          input: {
            id: client.id,
            ...form
          }
        }))
        console.log('UPDATE: ', update);
        navigation.goBack();
      } catch (error) {
        console.log('ERROR: ', error)
      }
    }
    const UpdateSeller = async() => {
      try{        
        const update = await API.graphql(graphqlOperation(updateSeller,{
          input: {
            id: client.id,
            ...form
          }
        }))
        console.log('UPDATE SELLER: ', update);
        navigation.goBack();
      } catch (error) {
        console.log('ERROR: ', error)
      }
    }

    const UpdateImage = async() => {
      if(imageURL){
        try{        
          const update = await API.graphql(graphqlOperation(updateClient,{
            input: {
              id: client.id,
              image: imageURL,

            }
          }))
          console.log('UPDATE: ', update);          
          Alert.alert('SUBIDA! =)');
        } catch (error) {
          console.log('ERROR: ', error)
        }
      }
    }
    const UpdateImageSeller = async() => {
      if(imageURL){
        try{        
          const update = await API.graphql(graphqlOperation(updateSeller,{
            input: {
              id: client.id,
              image: imageURL,
              
            }
          }))
          console.log('UPDATE SELLER: ', update);
          Alert.alert('SUBIDA! =)');
        } catch (error) {
          console.log('ERROR: ', error)
        }
      }
    }  
    
    // UPDATE CLIENTE TO COGNITO
    // const UpdateProfile = async() => {
    //     try {
    //         switch(disabled){
    //             case 'name':                    
    //                 await Auth.updateUserAttributes(data, { name: form.name });
    //                 break;
    //             case 'family_name':
    //                 await Auth.updateUserAttributes(data, { family_name: form.family_name });
    //                 break;
    //             case 'email':
    //                 await Auth.updateUserAttributes(data, { email: form.email });
    
    //         }
            
    //         navigation.navigate('Profile',{msg:'success'})
    //     } catch (error) {
    //         console.log(error);
    //     }        
    // }

    const handlePress = (field) => {
        // if(disabled === ''){
        //     setDisabled(field)
        // } else{
        //     Alert.alert('Atención','Sólo puedes cambiar 1 a la vez')
        // }
        setDisabled(field);
    }
    console.log('phone: ', route.params.phone)
    // console.log()
  return (
    <Wrapper>
        <SafeAreaView style={{flex:1, paddingHorizontal:10,}}>
          {/* <Avatar.Image size={90} source={{uri:client?.image}} />                         */}
            <PhotoSelector fileName={client.id} setImageURL={setImageURL} preImage={client?.image} />
            {/* <Button mode='outlined' onPress={() => navigation.navigate('CreateJob')}>Post a Job</Button> */}
            
            <TextInput
                defaultValue={client.name}
                style={{marginTop:20,}}
                disabled={disabled != 'name'}
                onPressIn={() => handlePress('name')}
                label="Nombre"
                placeholder={client?.name}
                // value={form.name === undefined && client?.name}
                onChangeText={text => setForm({...form, ['name']:text})}            
            />            

             <TextInput
                keyboardType='number-pad'
                defaultValue={client?.phone?.toString()}
                disabled={disabled != 'family_name'}
                onPressIn={() => handlePress('family_name')}
                label="Phone"
                placeholder={client?.phone}
                // value={form.phone === undefined  && client?.phone?.toString()}
                onChangeText={text => setForm({...form, ['phone']:parseInt(text)})}            
            />
             <TextInput
                disabled={disabled != 'email'}
                onPressIn={() => handlePress('email')}
                label="Email"
                placeholder={client?.email}
                value={form.email === undefined && client?.email}
                onChangeText={text => setForm({...form, ['email']:text})}            
            />
            {
              client.isSeller &&
              <TextInput
                disabled={disabled != 'address'}
                onPressIn={() => handlePress('address')}
                label="Address"
                placeholder={client?.address}
                value={form.address === undefined && client?.address}
                onChangeText={text => setForm({...form, ['address']:text})}            
            />
            }
            <Button mode='contained' disabled={Object.keys(form) == ''}  buttonColor={MD2Colors.lightGreen500} style={styles.button} onPress={client.isSeller? UpdateSeller : UpdateClient}>Mettre à jour le profil</Button>
            {
              client.isSeller &&
              <>
              <Button mode='contained' buttonColor={MD2Colors.lightGreen500} onPress={() => navigation.navigate('Payment')} 
                style={styles.button}
              >
                Payer un abonnement
              </Button>
              <Button mode='contained' style={styles.button} buttonColor={MD2Colors.lightGreen500} onPress={() => navigation.navigate('PostJob')}>Créer un avis</Button>
              </>
            }
        </SafeAreaView>

    </Wrapper>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  button:{
    width:250, 
    alignSelf:'center', 
    marginTop:20,

  }
})