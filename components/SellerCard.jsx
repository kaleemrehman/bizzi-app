import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Button, MD2Colors, Surface } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const SellerCard = ({seller}) => {
    const navigation = useNavigation();
    console.log('Item : ',seller?.seller?.image);
  return (
    <Surface style={styles.infoContainer} elevation={3} >
            <View style={{flexDirection:'row',}} >
                <Avatar.Image size={80} source={seller?.seller?.image? {uri: seller?.seller?.image}: require('../assets/noimage.png')} />
                <View style={styles.textContainer} >
                    <Text style={styles.text} >Nom: {seller?.seller?.name}</Text>
                    <Text style={styles.text} >Catégorie: {seller?.category}</Text>
                    <Text style={styles.text} >Adresse: {seller?.seller?.address}</Text>
                    <Text style={styles.text} >Description: {seller?.description}</Text>                                       
                </View>
            </View>
            <Button buttonColor={MD2Colors.lightBlueA700} style={styles.button} mode='contained' 
            onPress={() => navigation.navigate('SellerProfile',{seller})}>
                Voir le profil
            </Button>
            {/* <Button buttonColor={MD2Colors.lightBlueA700} style={styles.button} mode='contained' onPress={() => console.log('hola')}>Book</Button> */}
        </Surface>
  )
}

export default SellerCard

const styles = StyleSheet.create({
    infoContainer:{
        width:340,
        borderRadius:15,
        padding:10,
        alignSelf:'center',
        marginVertical:10,
        
    },
    button:{
        width:200,
        marginVertical:10,
        alignSelf:'center'
    },
    textContainer:{
        marginLeft:10,
        flexShrink: 1,
        // flexDirection:'row',
        // flex:1,
        // flexWrap:'wrap',
    },
    text:{
        fontSize:16,
        fontWeight:'300',
        
    }
})