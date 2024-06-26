import api from "@/api";
import { useAuth } from "@/context/useAuth";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Community = () => {
  const { token } = useAuth();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [price, setPrice] = useState<number | string>("");
  const [category, setCategory] = useState<string>("");
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(
    null
  );

  const pickImage = async () => {
    let result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

    if (!result.canceled) {
      setImage(result);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      return;
    }

    if (!image.assets || image.assets.length === 0) {
      return;
    }

    const asset = image.assets[0];

    if (!asset.uri) {
      return;
    }

    console.log(asset, "asset");

    const formData = new FormData();
    // @ts-ignore
    formData.append("images", {
      uri: asset.uri,
      type: mime.getType(asset?.type),
      name: asset.fileName || "image.jpg",
    });

    formData.append("name", name);
    formData.append("description", description);
    formData.append("quantity", String(quantity));
    formData.append("price", String(price));
    formData.append("category", "65a156ce9daf2e3a2283502c");

    try {
      console.log(formData, "formdata");
      const res = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (error: any) {
      console.log(error);
      console.error(
        "Error uploading image:",
        error.response?.data || error.message
      );
    } finally {
      // setName("");
      // setDescription("");
      // setQuantity("");
      // setPrice("");
      // setCategory("");
      // setImage(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={String(quantity)}
          onChangeText={(text) => setQuantity(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={String(price)}
          onChangeText={(text) => setPrice(text)}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={(text) => setCategory(text)}
        />

        <TouchableOpacity style={styles.submitButton} onPress={uploadImage}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {image?.assets?.length && (
        <Image
          source={{ uri: image.assets[0].uri }}
          style={styles.imagePreview}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  uploadButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  submitButton: {
    backgroundColor: "#27ae60",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default Community;
