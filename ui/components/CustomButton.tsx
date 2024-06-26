import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";

const CustomButton = ({ title, onPress, disabled }: any) => {
  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor="#6a1b9a"
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableHighlight>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8b2ff5",
    padding: 10,
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 30,
    width: 370,
    height: 47.5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CustomButton;
