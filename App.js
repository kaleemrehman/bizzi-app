import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ByCategory from './screens/ByCategory';
import Chat from './screens/Chat';
import CreateAccount from './screens/CreateAccount';
import Home from './screens/Home';
import Login from './screens/Login';
import PostJob from './screens/PostJob';
import PostReview from './screens/PostReview';
import SellerProfile from './screens/SellerProfile';
import { Amplify, Auth, Logger, Hub } from 'aws-amplify'
import awsconfig from './src/aws-exports'
import ConfirmEmail from './screens/ConfirmEmail';
import { useEffect, useState } from 'react';
import Loading from './components/Loading';
import UserProfile from './screens/UserProfile';
import CreateJob from './screens/CreateJob';
import Notifications from './screens/Notifications';
import ConfirmJob from './screens/ConfirmJob';
import Payment from './screens/Payment';
import ForgotPassword from './screens/ForgotPassword';
import NewPassword from './screens/NewPassword';

Amplify.configure(awsconfig)

export default function App() {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState(undefined);
  const logger = new Logger('My-Logger');


  const checkUser = async() => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser); 
    } catch (error) {
      setUser(null);      
    } 
  }

  useEffect(() => {
    checkUser();
  },[])

  useEffect(() => {
    const listener = (data) => {
      switch (data.payload.event) {
          case 'signIn':
              logger.info('user signed in');
              checkUser();
              break;
          case 'signUp':
              logger.info('user signed up');
              break;
          case 'signOut':
              logger.info('user signed out');
              checkUser();
              break;
          case 'signIn_failure':
              logger.error('user sign in failed');
              break;
          case 'tokenRefresh':
              logger.info('token refresh succeeded');
              break;
          case 'tokenRefresh_failure':
              logger.error('token refresh failed');
              break;
          case 'autoSignIn':
              logger.info('Auto Sign In after Sign Up succeeded');
              break;
          case 'autoSignIn_failure':
              logger.error('Auto Sign In after Sign Up failed');
              break;
          case 'configured':
              logger.info('the Auth module is configured');
      }
  }
  
  Hub.listen('auth', listener);

  return () => Hub.remove('auth',listener);
  },[]);

  if(user === undefined){
    return <Loading />
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerBackTitle:'Derrière'}} >
        {
          user ? (
            <>
              <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
              <Stack.Screen name="PostJob" component={PostJob} options={{headerShown:true, headerStyle:{backgroundColor: '#dadbf3',}}} />
              <Stack.Screen name="PostReview" component={PostReview} options={{headerShown:true, headerStyle:{backgroundColor: '#dadbf3'} }} />
              <Stack.Screen name="ByCategory" component={ByCategory} options={{headerShown:false}} />
              <Stack.Screen name="SellerProfile" component={SellerProfile} options={{headerShown:false}} />
              <Stack.Screen name="Chat" component={Chat} options={{headerShown:true, headerStyle:{backgroundColor: '#dadbf3'},}} />
              <Stack.Screen name="UserProfile" component={UserProfile} options={{headerShown:true, headerStyle:{backgroundColor: '#dadbf3'},}} />
              <Stack.Screen name="CreateJob" component={CreateJob} options={{headerShown:true, headerStyle:{backgroundColor: '#dadbf3'},}} />
              <Stack.Screen name="Notifications" component={Notifications} options={{headerShown:true, headerStyle:{backgroundColor: '#dadbf3'},}} />
              <Stack.Screen name="ConfirmJob" component={ConfirmJob} options={{headerShown:true, headerStyle:{backgroundColor: '#dadbf3'},}} />
              <Stack.Screen name="Payment" component={Payment} options={{headerShown:false}} />
            </>

          ):(
            <>              
              <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
              <Stack.Screen name="CreateAccount" component={CreateAccount} options={{headerShown:false}} />
              <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} options={{headerShown:false}} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown:false}} />
              <Stack.Screen name="NewPassword" component={NewPassword} options={{headerShown:false}} />
            </>
          )
        }
       

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
