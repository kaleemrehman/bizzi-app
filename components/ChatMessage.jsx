import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Chip, MD2Colors } from 'react-native-paper'


const ChatMessage = ({isOwner, message}) => {
    const [deleteVisible, setDeleteVisible] = useState(false);

    const handleClose = () => {
        console.log('Close Pressed')
    }
  return (
    <View>
        {
            isOwner?
            <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end',  }}>
                <Chip closeIcon='close' icon="check" 
                    onPress={() => setDeleteVisible(!deleteVisible)}
                    onClose={deleteVisible ? handleClose : null }
                    style={styles.chip}
                    elevation={5}
                    >
                        <Text>{message}</Text>
                </Chip>
                </View>
                    :
                <View style={{flexDirection: 'row', flexWrap:'wrap', }}>
                <Chip closeIcon='close' icon="check" 
                    onPress={() => console.log('Pressed')}
                    onClose={() => console.log('delete')}
                    style={styles.chipReceived}
                    elevation={5}
                    >
                        
                        <Text>{message}</Text>
                        
                </Chip>
                </View>
                    
        }
        
    </View>
  )
}

export default ChatMessage

const styles = StyleSheet.create({
    chip:{
        // width:'55%',
        // alignSelf:'auto',
        marginTop:10,
        backgroundColor:MD2Colors.deepOrange200,
        marginHorizontal:10,
        // marginLeft:10,
        // left:'40%',
        // alignSelf:'flex-end',
        // flexWrap:'wrap'
    },
    chipReceived:{
        // alignSelf:'stretch',        
        backgroundColor:MD2Colors.lightGreen500,
        marginHorizontal:10,
        marginBottom:5,
        flexWrap:'wrap',
        overflow:'scroll',
        
    }
})