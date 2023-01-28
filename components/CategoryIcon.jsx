import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Avatar, MD2Colors } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Entypo from '@expo/vector-icons/Entypo'

const CategoryIcon = ({text, icon, color, backColor, userId, iconImage}) => {
    const navigation = useNavigation();
    
  return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('ByCategory',{category:text, userId:userId})}>
                <Avatar.Icon style={{backgroundColor:backColor, alignSelf:'center'}} color={color} size={64} 
                    icon={icon === ''? () => iconImage : icon}  />
                <Text style={{textAlign:'center', fontWeight:'500', fontSize:13}}>{text}</Text>
            </TouchableOpacity>
        </View>
  )
}

export default CategoryIcon

const styles = StyleSheet.create({
    container:{
        marginHorizontal:5,
        marginTop:10,
        width:83,
    }
})