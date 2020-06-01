import React from 'react';
import { 
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import TextButton from './components/TextButton';

import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files'; 

import { styles } from './styles/styles.js'
import logo from './assets/logo.png'

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    if (Platform.OS === 'web') {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    } 

  };

  let clearImageAsync = async() =>  {
    setSelectedImage(null)
  };
  
  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
      return;
    }

    Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TextButton onPress={openShareDialogAsync} text="Share this photo"/>
        <TextButton onPress={clearImageAsync} text="Clear Image" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={ styles.logo } />
      <Text style={ styles.instructions }> 
        To share a photo from your phone with a friend, just press the button below!
      </Text>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}
