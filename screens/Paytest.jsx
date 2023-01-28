import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { WebView } from "react-native-web-webview"; // use react-native-webview for android or ios
import base64 from "react-native-base64";

function KkiaPay(props) {
  const [showWebview, setShowWebview] = useState(false);
  const paymentData = {
    amount: props.amount || 1,
    key: props.publicKey,
    sandbox: props.sandbox || false,
    callback: "kkiapay.callback"
  };

  const paymentUrl =
    "https://widget-v2.kkiapay.me/?=" +
    base64.encode(JSON.stringify(paymentData));

  function onNavigationStateChange({ url }) {
    console.log(">>>", url);
  }

  return (
    <View>
      <Button
        onPress={() => {
          setShowWebview(true);
        }}
        title="Pay with kkiapay"
      />
      {showWebview && (
        <WebView
          style={styles.webview}
          originWhitelist={["*"]}
          source={{
            uri: paymentUrl
          }}
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
    </View>
  );
}

function App() {
  return (
    <View style={styles.app}>
      <KkiaPay
        amount={1}
        sandbox={true}
        publicKey="f1e7270098f811e99eae1f0cfc677927"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500,
    paddingTop: 50
  },
  code: {
    fontFamily: "monospace, monospace"
  },
  webview: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%"
  }
});

export default App;
