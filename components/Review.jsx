import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, Chip, Surface } from 'react-native-paper'

const Review = ({item}) => {
  return (
    <Surface style={styles.container}>
        <View style={styles.header}>
            <Avatar.Image size={50} source={require('../assets/noimage.png')} />
            <Text style={styles.title} >{item?.category}</Text>
            <Chip icon='star'>{item?.buyerStars}</Chip>
        </View>
        <Text style={styles.review} >
            {item?.buyerReview}
        </Text>
        <Text style={styles.date}>{new Date(item?.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</Text>
    </Surface>
  )
}

export default Review

const styles = StyleSheet.create({
    header:{
        flexDirection:'row', 
        justifyContent:'space-between',
        // marginHorizontal:20,
        alignItems:'center'
    },
    container:{
        marginHorizontal:25,
        borderRadius:20,
        padding:10,
        marginVertical:5,
    },
    date:{
        fontSize:12,
        fontWeight:'200',
        textAlign:'center'
    },
    review:{
        fontSize:17,
        fontWeight:'300'
    },
    title:{
        fontSize:17,
    }
})