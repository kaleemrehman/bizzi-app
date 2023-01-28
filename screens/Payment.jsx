import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from "react";
import { WebView } from 'react-native-webview';
import base64 from "react-native-base64";
import { Button, MD2Colors } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Wrapper from '../components/Wrapper';
import PlanItem from '../components/PlanItem';
import BackButton from '../components/BackButton';

const plans = [
  {
    title:'1 Semaine',
    price:2500,
  },
  {
    title:'1 Mois',
    price:5000
  },
  {
    title:'1 An',
    price: 450000
  },
]

const Payment = () => {
    const [showWebview, setShowWebview] = useState(false);
    const [selected, setSelected] = useState();
    const [pressed, setPressed] = useState();

    const paymentData = {
        amount: selected?.price,
        key: '3ad2112057c611edb8ac138e4aec3a64',
        sandbox: true,
        callback: "kkiapay.callback"
    };

    const paymentUrl =
        "https://widget-v2.kkiapay.me/?=" +
        base64.encode(JSON.stringify(paymentData));

    function onNavigationStateChange({ url }) {
        console.log(">>>", url);
    }

    const handlePress = () => {
      setPressed(true);
      setShowWebview(true)
    }

    console.log('showWebview',selected);
  return (
    <Wrapper style={{flex:1, padding:30}}>
        <View style={{marginTop:50,}}>
          <View style={{flexDirection:'row'}} >
            <BackButton style={{marginTop:0, marginRight:60, marginLeft:10,}} />
            <Text style={styles.title}>Choisissez votre forfait</Text>

          </View>
            <View style={{flexDirection:'row', marginTop:25,}} >
              {
                plans.map((item,index) => (
                  <PlanItem key={index} item={item} selected={selected} setSelected={setSelected} />
                ))
              }
            </View>
          
        </View>  
            <Button disabled={selected === undefined} mode='contained' buttonColor={MD2Colors.lightGreen500} 
              style={!pressed ? styles.button : {display:'none'} } 
              onPress={handlePress}>
                Pay with Kkiapay
            </Button>
            {showWebview && (
                <WebView
                style={styles.webview}
                //   originWhitelist={["*"]}
                source={{ uri: paymentUrl }}
                  onNavigationStateChange={onNavigationStateChange}
                  onMessage={(event) => {
                    switch (event.nativeEvent.type) {
                      case "test":
                        console.log("hello");
                        break;
                      default:
                        console.log(event.nativeEvent.type);
                    }
                  }}
                />
            )}      
    </Wrapper>
  )
}

export default Payment

const styles = StyleSheet.create({
    webview:{
        borderWidth:1,
        marginTop:15,
    },
    title:{
      fontSize:20,
      fontWeight:'bold',
      textAlign:'center'
    },
    button:{
      marginTop:20, 
      width:200, 
      alignSelf:'center',
    }
})