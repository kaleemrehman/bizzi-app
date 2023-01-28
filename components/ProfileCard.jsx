import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, MD2Colors, Paragraph, Surface } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { Auth } from 'aws-amplify'
 


const ProfileCard = ({seller, experience}) => {
    const navigation = useNavigation();
    const [identification, setIdentification] = useState();
    const [clientId, setClientId] = useState();

    // console.log('SELLER: ', seller );
    // console.log()
    useEffect(() => {
        async function loadUser(){            
            const user = await Auth.currentAuthenticatedUser();                        
            const client = user.attributes.profile;
            const sellerId = seller.seller.seller.id;
            setClientId(client);
            setIdentification(client > sellerId ? client + sellerId : sellerId + client)
        }                               
        loadUser();                
    },[]);
    console.log(identification);
  return (
    <Surface style={styles.infoContainer} elevation={2} >
            <View style={{flexDirection:'row'}} >
                <Avatar.Image size={100} source={seller.seller.seller.image? {uri: seller.seller.seller.image}: require('../assets/noimage.png')} />
                <View style={styles.textContainer} >
                    <Text style={styles.text} >Nom: {seller.seller.seller.name}</Text>
                    <Text style={styles.text} >Catégorie: {seller.seller.category}</Text>
                    <Text style={styles.text} >Adresse: {seller.seller.seller.address}</Text>
                    <Text style={styles.text} >Expérience: {experience}</Text>                                        
                </View>
            </View>
            {/* <Text>Additional description of the service</Text> */}
            <View style={styles.buttonContainer} >
                <Button buttonColor={MD2Colors.lightBlueA700} style={styles.button} mode='contained'
                     onPress={() => navigation.navigate('Chat', {
                        identification:identification, 
                        name:seller.seller.seller.name, 
                        sellerId:seller.seller.seller.id, 
                        client:clientId 
                        })}>
                        Chat
                </Button>
                <Button buttonColor={MD2Colors.lightBlueA700} style={styles.button} mode='contained'
                     onPress={() => navigation.navigate('CreateJob', seller)}>
                        Demander
                </Button>               
            </View>
            
        </Surface>
  )
}

export default ProfileCard

const styles = StyleSheet.create({
    infoContainer:{
        width:340,
        borderRadius:15,
        padding:10,
        alignSelf:'center',
        marginBottom:10
    },
    button:{
        width:120,
        marginVertical:10,
        alignSelf:'center',
    },
    textContainer:{
        marginLeft:20,
    },
    text:{
        fontSize:16,
        fontWeight:'300'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around'
    }
})