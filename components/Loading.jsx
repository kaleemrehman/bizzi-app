import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={MD2Colors.lightGreen700} size={'large'} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})