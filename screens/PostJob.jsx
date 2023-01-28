import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, MD2Colors, TextInput } from 'react-native-paper';
import CategoriesSelector from '../components/CategoriesSelector'
import KeyAvoid from '../components/KeyAvoid'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { createListings } from '../src/graphql/mutations';
import { useNavigation } from '@react-navigation/native';
// import { v4 as uuid } from 'uuid';

const PostJob = () => {
    const [text, setText] = useState();
    const [userIn, setUserIn] = useState();
    const [data, setData] = useState({})
    const [selectedCategory, setSelectedCategory] = useState();

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({title:'Créer un avis'})
    },[])

    const addJob = async() => {
        // const cardId = uuid();
        try {
            const response = API.graphql(graphqlOperation(createListings, {
                input: {...data, listingsSellerId:userIn.attributes.profile, category:selectedCategory }}))
            console.log(response);
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
    console.log(data);
    console.log(selectedCategory);
  return (
    <Wrapper>
        <SafeAreaView style={{flex:1}}>       
        <CategoriesSelector selectedCategory={selectedCategory}  setSelectedCategory={setSelectedCategory} />
        <KeyAvoid>
            <View style={styles.formContainer} >
                <TextInput
                    multiline
                    numberOfLines={8}
                    style={styles.textInput}
                    label="La description"
                    value={text}
                    onChangeText={text => setData({...data, ['description']:text})}            
                />
                
                <Button 
                    onPress={addJob} mode='contained' buttonColor={MD2Colors.lightGreen500} style={styles.buttons} >
                        Créer un avis
                </Button>
            </View>
        </KeyAvoid>
        </SafeAreaView>
    </Wrapper>
  )
}

export default PostJob

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
        flex: 1,
        // borderWidth:1,
        borderRadius:20,
    },
    textInput:{
        height:110,
        // marginHorizontal:0,
        backgroundColor:'#dadbf3',
        // borderRadius:20,
    },   
    buttons:{
        width: 200,
        alignSelf:'center',
        marginTop:10,
    }
})