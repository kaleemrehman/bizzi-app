import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator, Avatar, MD2Colors } from 'react-native-paper';
import { Storage } from 'aws-amplify';

const PhotoSelector = ({text, fileName, textStyle, setImageURL, preImage}) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadImage = async() => {
      // Upload theimage
      setLoading(true);
        try {
          const response = await fetch(image);
          const blob = await response.blob();
          const res = await Storage.put(fileName, blob, {
            contentType: 'image/jpeg',
            // acl:'public-read',
            // level:'public'
             // contentType is optional
          });
          console.log(res);
        } catch (err) {
          console.log('Error uploading file:', err);
        }

        // Get the url of the uploaded image 
        try {
          const file = await Storage.get(fileName, {
            level: "public"
          });
          console.log('File:', file);
          setImageURL(file.split('?')[0]);
        } catch (error) {
          console.log('Error: ', error)
        }
        setLoading(false);
      }

    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    console.log('Picked image',result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      result.assets[0].uri && uploadImage();
    }
  };
  // console.log('Image ', image); 

  return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} >
            {
                preImage? <Avatar.Image size={120} source={{uri: preImage}} style={styles.uploadIcon } />:
                image?
                <Avatar.Image size={120} source={{uri: image}} style={styles.uploadIcon } />:
                <Avatar.Icon color={'#000000'} size={120} icon="upload" style={styles.uploadIcon } />
            }
            </TouchableOpacity>
            <TouchableOpacity onPress={uploadImage}>
              {
                loading ? <ActivityIndicator animating={true} color='#F7F3F5' />
                :
                <Text style={textStyle? textStyle : styles.text} >
                    {image? 'Image téléchargée': text}
                </Text>
              }
            </TouchableOpacity>
        </View>
  )
}

export default PhotoSelector

const styles = StyleSheet.create({
    uploadIcon:{
        // alignSelf:'center', 
        backgroundColor:'#F7F3F5', 
        marginTop:10, 
        marginBottom:20,
      },
      container:{
        justifyContent:'center',
        alignItems:'center',
        
      },
      text:{
        fontSize:20,
        color:MD2Colors.blueGrey50
      }
})