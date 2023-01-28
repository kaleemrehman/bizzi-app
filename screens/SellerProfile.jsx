import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, Button, MD2Colors, Surface, TextInput } from 'react-native-paper'
import SellerCard from '../components/SellerCard'
import ProfileCard from '../components/ProfileCard'
import Review from '../components/Review'
import BackButton from '../components/BackButton'
import { useRoute } from '@react-navigation/native'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { listTransactions } from '../src/graphql/queries'

const SellerProfile = () => {
  const [loading, setLoading] = useState();
  const [date, setDate] = useState(new Date());
  const [reviews, setReviews] = useState();
  const route = useRoute();


  useEffect(() => {
    setLoading(true);
    async function loadUser(){                        
        let filter = {
          sellerTransactionsId: {
              eq: route.params.seller.seller.id
              }
          };
            const result = await API.graphql(graphqlOperation(listTransactions, { filter: filter}));
            const transactions = [];            
            result.data.listTransactions.items.forEach((data) => {
              transactions.push(data)
            } )
            setReviews(transactions);
            setLoading(false);  
            console.log('listTransactions',result.data.listTransactions)          
        }  
        loadUser();        
    },[]);    
  
  return (
    <Wrapper>
      <BackButton />   
      <View style={{flex:1, marginTop:15,}}>   
          <ProfileCard seller={route?.params} experience={reviews?.length}  />          
          <ScrollView>
            {
              reviews?.map((item,index) => (
                <Review key={index} item={item}  />

              ))
            }            
          </ScrollView>          
      </View>
    </Wrapper>
  )
}

export default SellerProfile

const styles = StyleSheet.create({
    infoContainer:{
        width:340,
        borderRadius:15,
        padding:10,
        alignSelf:'center'
    },
    button:{
        width:200,
        marginVertical:10,
        alignSelf:'center'
    },
    textContainer:{
        marginLeft:20,
    },
    text:{
        fontSize:16,
        fontWeight:'300'
    },
    textInput:{
      // bottom:20, 
      // position:'absolute',
      width:'90%',
      backgroundColor: 'transparent',    
      alignSelf:'center'
      
    },
    
})