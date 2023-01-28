import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';

const BackButton = ({style}) => {
    const navigation = useNavigation();
    
  return (
    <View>
        <TouchableOpacity style={style? style: styles.button} onPress={() => navigation.goBack()} >
            <MaterialIcons onPress={() => navigation.goBack()} name='arrow-back' size={30}  />
        </TouchableOpacity>
    </View>
  )
}

export default BackButton

const styles = StyleSheet.create({
    button:{
        marginTop:50,
        marginLeft:30,
    }
})