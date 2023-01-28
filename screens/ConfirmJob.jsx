import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Wrapper from '../components/Wrapper'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Surface } from 'react-native-paper';
import { API, graphqlOperation } from 'aws-amplify';
import { updateTransaction } from '../src/graphql/mutations';

const ConfirmJob = () => {
    const route = useRoute();
    const navigation = useNavigation();
    console.log('DESDE RUTA: ',route?.params);
    const job = route.params;

    const UpdateJob = async() => {
        try{        
          const update = await API.graphql(graphqlOperation(updateTransaction,{
            input: {
              id: job.id,
              isConfirmed: true
            }
          }))
          console.log('UPDATE: ', update);
          // navigation.goBack();
          navigation.navigate('Notifications', {msg:'added'})
        } catch (error) {
          console.log('ERROR: ', error)
        }
      }

    const pressHandler = async() => {
       await UpdateJob();
    }

  return (
    <Wrapper>
        <Surface elevation={3} style={styles.surface}>
      <View style={styles.container}>
        <Text style={styles.text} >{new Date(job.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</Text>
        <Text style={styles.text} >{job.category}</Text>
        <Text style={styles.text} >Description: {job.description}</Text>
        <Button style={styles.button} onPress={pressHandler} mode='contained'>Confirmer le travail</Button>

      </View>
      </Surface>              
    </Wrapper>
  )
}

export default ConfirmJob

const styles = StyleSheet.create({
    container:{
        margin:20,
        alignSelf:'center'
    },
    text:{
        fontSize:17,
        fontWeight:'500',
        marginVertical:5,
    },
    button:{
        marginTop:30,
        width:220,
        alignSelf:'center'
    },
    surface:{
        marginTop:30,
        width:'99%',
        alignSelf:'center',
        borderRadius:15,
        justifyContent:'center'
    }
})