import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button } from 'react-native-paper';




WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});
//client secret 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

export const AuthProvider = ({ children }) => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
          clientId: '811579807029-phjl6qi9k7af0v3rq4ff7kcosh7ve8ug.apps.googleusercontent.com',
          },
      );
    const [error, setError] = useState(null)
    const [user, setUser] = useState(true) //not being exported
    const [loadingInitial, setLoadingInitial] = useState(false)
    
      useEffect(() => {
        if (response?.type === 'success') {
          const { id_token } = response.params;
          
          const auth = getAuth();
          const credential = GoogleAuthProvider.credential(id_token);
          signInWithCredential(auth, credential);
        }
      }, [response]);

      /*useEffect(() => {
        if (user){
            //logged in
            setUser(user);
        } else {
            //not logged in
            setUser(null);
        }

        setLoadingInitial(false);
      }, [])*/
    
  return (
    <AuthContext.Provider 
        value={{
            user: true,
            promptAsync,
            }} >
        
      {children}
      
    </AuthContext.Provider>
  )
}

export default function useAuth() {
    return useContext(AuthContext)
}