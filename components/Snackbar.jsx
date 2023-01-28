import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, MD2Colors, Snackbar } from 'react-native-paper';

const Snackb = ({visible, setVisible, text}) => {
    

    const onToggleSnackBar = () => setVisible(!visible);
  
    const onDismissSnackBar = () => setVisible(false);
  
    return (
      <View style={styles.container}>        
        <Snackbar  
        style={styles.snack}          
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Fermer',
            onPress: () => {
                onDismissSnackBar
            },
          }}>
            <Text  >
              {text}
            </Text>
        </Snackbar>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,      
    },
    snack:{        
        bottom:20,
        backgroundColor:MD2Colors.lightGreen500
    }
  });
  
  export default Snackb;