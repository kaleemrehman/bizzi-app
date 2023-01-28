import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, IconButton, MD2Colors, TextInput } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient';
// import FormIcon from '../components/FormIcon';
import Wrapper from '../components/Wrapper';
import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import Snackb from '../components/Snackbar';
import FormIcon from '../components/FormIcon';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Entypo from '@expo/vector-icons/Entypo'
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import AntDesign from '@expo/vector-icons/AntDesign'


WebBrowser.maybeCompleteAuthSession();


const Login = () => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [visibleSnack, setVisibleSnack] = useState(false)
    const [snackText, setSnackText] = useState('');
    const [loading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState();
    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '564505468428-kbdva6k2l44kkac1ufqnik0isv5e5qj3.apps.googleusercontent.com',
        iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
      });
      const [userInfo, setUserInfo] = useState(null);
      const [accessTokenFacebook, setAccessTokenFacebook] = useState();
      const [faceRequest, faceResponse, facePromptAsync] = Facebook.useAuthRequest({
        clientId: '1182104065766107',
        responseType: ResponseType.Code,
      });
    
      useEffect(() => {
        if (faceResponse?.type === 'success') {
          const { code } = faceResponse?.params;
          console.log('setAccessTokenFacebook: ', code);
          setAccessTokenFacebook(code);
        }
      }, [faceResponse]);
    const navigation = useNavigation();
    
    useEffect(() => {
        setCount(count => count+1)
        if (response?.type === 'success') {
            console.log('inside response EFFECT')
            const { authentication } = response;
            setAccessToken(response.authentication.accessToken )                    
        }
      }, [response]); 

      useEffect(() => {
        console.log('inside access token EFFECT')
        if(count > 0){
            getUserData();
        }
      }, [accessToken]);

      useEffect(() => {
        console.log('inside access token EFFECT FACEBOOK')
        if(count > 0){
            getUserDataFacebook();
        }
      }, [accessTokenFacebook]);
      
    useEffect(()=>{        
        console.log('USERINFO: ', userInfo)
        // navigation.navigate('CreateAccount', userInfo)
    },[userInfo])

    // console.log(response)
    async function getUserData(){
        console.log('Executing getuserdata')
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me",
        {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
        userInfoResponse.json().then(data => {
            // setUserInfo(data) 
            navigation.navigate('CreateAccount', data)
        })
        // setUserInfo(userInfoResponse);
    }
    async function getUserDataFacebook(){
        let userInfoResponse = await fetch(`https://graph.facebook.com/me?access_token=${accessTokenFacebook}&fields=id,name,email`)
        userInfoResponse.json().then(data => {
            // setUserInfo(data) 
            navigation.navigate('CreateAccount', data)
        })        
    }    

    const loginHandler = async() => {
        console.log('Login press');
        if (loading){
            return;
        }
        try {
            setLoading(true);
            const user = await Auth.signIn(data.email, data.password);
            console.log(user);
            console.log('Logueado');                    
            // navigation.navigate('Home');
        } catch (error) {
            setLoading(false);
            console.log('error signing in', error);
            setSnackText(`Erreur: Le nom d'utilisateur ou le mot de passe n'existe pas`)
            setVisibleSnack(true)
        }
        setLoading(false);
    }
    // console.log('COUNT: ',count)
    // console.log('Access Token: ', accessToken);
    // console.log('USERINFO:', userInfo) 
  return (
    
    <View style={styles.container}>
        <Wrapper
        // Background Linear Gradient
        colors={[MD2Colors.lightBlue500, MD2Colors.lightBlue700, MD2Colors.lightBlue900]}
        style={styles.container}
      >
        <SafeAreaView>
        <FormIcon />        
        <View style={styles.formContainer} >
            
            <TextInput
            keyboardType='email-address'  
            testID='emaildata'              
                label="Email"
                value={data}
                onChangeText={text => setData({...data, ['email']:text})} 
                style={styles.textInput}
                selectionColor='#000000'
                activeUnderlineColor='#000000'
                textColor='#000000'
                />
            <TextInput
            secureTextEntry
                label="Le mot de passe"
                value={data}
                onChangeText={text => setData({...data, ['password']:text})} 
                style={styles.textInput}
                selectionColor='#000000'
                activeUnderlineColor='#000000'
                textColor='#000000'
                /> 

            {/* <TouchableOpacity style={styles.button} onPress={loginHandler} disabled={loading} >
            <LinearGradient                            
                colors={[ '#dadbf3', '#7c9cf4']}
                style={{borderRadius:20, height:50, width:230}}>
                    <Text style={{color:'#0d38a4', alignSelf:'center', marginTop:10, fontSize:22, fontWeight:'500'}} >
                        {loading?'Cargando...':'S\'identifier'}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>             */}
            <Button style={{width:230, marginTop:20}} buttonColor={MD2Colors.lightGreen500}
                onPress={loginHandler} disabled={loading}
            >{loading?'Chargement en cours...':'S\'identifier'}</Button>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around', marginBottom:130 }}>
        <View style={styles.foot} >           
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword', data.email)} >                 
                    <MaterialCommunityIcons name='key' size={25} color='#000000' />
            </TouchableOpacity>
        </View>
        <View style={styles.foot } >            
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')} >                 
                    <Entypo name='add-user' size={20} color='#000000' />
            </TouchableOpacity>
        </View>

        </View>
        <View >
            <Text style={{alignSelf:'center', color:'#dabf3'}}>Inscrivez-vous avec:</Text>
            <View style={{flexDirection:'row', justifyContent:'space-around', marginHorizontal:20, }}>
                <AntDesign color={'#dadbf3'} name='google' size={40} onPress={() => promptAsync()} />
                <AntDesign color={'#dadbf3'} name='facebook-square' size={40} onPress={() => facePromptAsync()} />
                {/* <Button disabled={!request} onPress={() => promptAsync()} >Register with Google</Button> */}
                {/* <Button onPress={() => facePromptAsync()}  >Register with Facebook</Button> */}
            </View>
        </View>
        </SafeAreaView>
        <Snackb visible={visibleSnack} setVisible={setVisibleSnack} text={snackText} />
        </Wrapper>
    </View>
    
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flex:1,        
        alignItems:'center',
        
    },
    logoContainer:{
        width:100,
        height:100,
        //backgroundColor: MD2Colors.blueGrey400,
        marginTop:100,
        //borderRadius:50,
        alignItems:'center',
        justifyContent:'center'
    },
    formContainer:{
        width:250,
        marginTop: 60,
        alignSelf:'center'
    },
    textInput:{
        maxHeight:60,
        marginBottom:10,
        backgroundColor:'transparent',
        //color:MD2Colors.red500,      
        width:240,
        alignSelf:'center'
    },
    button:{
        marginTop:20,
        height:50,
        //backgroundColor:'red',
        borderRadius:'50%',
        alignItems:'center'

    },
    foot:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        marginTop:30,
        // marginRight:30,
        justifyContent:'center'
    }
})