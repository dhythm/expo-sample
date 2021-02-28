import { Button } from "@core/Button";
import { styles } from "@core/styles";
import uploadToAnonymousFilesAsync from "anonymous-files";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import React from "react";
import { Image, Platform, Text, View } from "react-native";

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState<{
    localUri: string;
    remoteUri: string | null;
  } | null>(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    if (Platform.OS === "web") {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    }
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(
        `The image is available for sharing at: ${selectedImage?.remoteUri}`
      );
      return;
    }
    if (!selectedImage?.localUri) {
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <Button onPress={openShareDialogAsync} text="Share this photo" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://i.imgur.com/TkIrScD.png" }}
        style={styles.logo}
      />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>

      <Button onPress={openImagePickerAsync} text="Pick a photo" />
    </View>
  );
}
