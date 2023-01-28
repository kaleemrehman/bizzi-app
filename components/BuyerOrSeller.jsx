import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { MD2Colors, SegmentedButtons } from 'react-native-paper';

const BuyerOrSeller = ({selected, setSelected}) => {
  

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons      
        value={selected}
        onValueChange={setSelected}
        buttons={[
          {
            value: 'Client',
            label: 'Utilisateurs',
            style: selected === 'Client' && {backgroundColor:MD2Colors.deepOrange300} 
          },
          {
            value: 'Seller',
            label: 'Prestations',
            style: selected === 'Seller' && {backgroundColor:MD2Colors.deepOrange300} 
          },        
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width:250,
    alignItems: 'center',
    alignSelf:'center',
    marginTop:30,
    // backgroundColor:MD2Colors.lightGreen500
    // height:50,
  },
});

export default BuyerOrSeller;