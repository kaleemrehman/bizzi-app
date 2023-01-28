import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { MD2Colors } from 'react-native-paper'

const orangeButton = ({handlePress, text, style, textStyle, color, disable}) => {

    
  return (
    <TouchableOpacity onPress={handlePress} disabled={disable} style={style ? style : styles.button} >
         <LinearGradient                            
                //colors={[MD2Colors.green900, MD2Colors.green800, MD2Colors.green700, MD2Colors.green800, MD2Colors.green900]}
                colors={
                    color === 'lightBlue'? [MD2Colors.lightBlue900, MD2Colors.lightBlue800, MD2Colors.lightBlue700, MD2Colors.lightBlue800, MD2Colors.lightBlue900]
                    :color === 'blue'? [MD2Colors.blue900, MD2Colors.blue800, MD2Colors.blue700, MD2Colors.blue800, MD2Colors.blue900]
                    :color === 'green'? ['#345847', '#658F47', '#345847']
                    : color === 'gray'? [MD2Colors.blueGrey400, MD2Colors.blueGrey300, MD2Colors.blueGrey300, MD2Colors.blueGrey300, MD2Colors.blueGrey400]
                    : color === 'orange'? ['#000000','#658F47']
                    : [MD2Colors.blueGrey400, MD2Colors.blueGrey300, MD2Colors.blueGrey300, MD2Colors.blueGrey300, MD2Colors.blueGrey400]
                }
                style={style}>

                <Text style={textStyle? textStyle: styles.buttonText } >
                    {text}
                </Text>
                </LinearGradient>
    </TouchableOpacity>
  )
}

export default orangeButton

const styles = StyleSheet.create({
    buttonText:{
        color:MD2Colors.blueGrey50,
        fontSize:20,
        fontWeight:'bold',
        alignContent:'center'
    },
    button:{
      width:200,
      height:50,
      justifyContent:'center',
      alignSelf:'center'
    }
})