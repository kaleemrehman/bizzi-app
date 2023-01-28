import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Wrapper from '../components/Wrapper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, MD2Colors, TextInput } from 'react-native-paper';
import KeyAvoid from '../components/KeyAvoid'
import { AirbnbRating } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';
import { API, graphqlOperation } from 'aws-amplify';
import { updateTransaction } from '../src/graphql/mutations';


const PostReview = () => {
    const [text, setText] = useState();
    const [rating, setRating] = useState();
    const route = useRoute();
    const navigation = useNavigation();

    const UpdateJob = async() => {
        if(route.params.isSeller){
            try{        
                const update = await API.graphql(graphqlOperation(updateTransaction,{
                  input: {
                      id: route.params.id,
                      sellerReview: text,
                      sellerStars: rating,
                  }
                }))
                console.log('UPDATE JOB: ', update);
                navigation.goBack();
              } catch (error) {
                console.log('ERROR: ', error)
              }
        } else {
            try{        
              const update = await API.graphql(graphqlOperation(updateTransaction,{
                input: {
                    id: route.params.id,
                    buyerReview: text,
                    buyerStars: rating,
                }
              }))
              console.log('UPDATE JOB: ', update);
              navigation.goBack();
            } catch (error) {
              console.log('ERROR: ', error)
            }
        }
      }

    const pressHandler = async() => {
       await UpdateJob();
    }

    console.log('RATING: ',rating)
  return (
    <Wrapper>
        <SafeAreaView style={{flex:1}}>       
        <AirbnbRating
          count={5}
          reviews={[
            'Terrible',
            'Bad',            
            'OK',
            'Good',           
            'Very Good',            
            
          ]}
          defaultRating={route.params.isSeller? route.params.sellerStars :route.params.buyerStars}
          size={20}
          reviewColor={MD2Colors.deepOrange400}
          selectedColor={MD2Colors.deepOrangeA400}
          onFinishRating={(value) => setRating(value)}
          
        />
        <KeyAvoid>
            <View style={styles.formContainer} >
                <TextInput
                    multiline
                    numberOfLines={8}
                    style={styles.textInput}
                    label="Commentaires"
                    value={text}
                    onChangeText={text => setText(text)}
                    defaultValue={route.params.isSeller? route.params.sellerReview :route.params.buyerReview}
                />
                
                <Button onPress={UpdateJob} mode='contained' buttonColor={MD2Colors.lightGreen500} style={styles.buttons} >Post</Button>
            </View>
        </KeyAvoid>
        </SafeAreaView>
    </Wrapper>
  )
}

export default PostReview

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:15
    },
    headerText:{
        fontSize:18,    
    },
    formContainer:{
        flex: 1
    },
    textInput:{
        height:110,
        marginHorizontal:20,
        backgroundColor:'#dadbf3'
    },   
    buttons:{
        width: 200,
        alignSelf:'center',
        marginTop:10,
    }
})