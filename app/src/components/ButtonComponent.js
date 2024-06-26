import { View, Text,StyleSheet,TouchableHighlight } from 'react-native'
import React from 'react'

const ButtonComponent = ({title,onPress,disabled}) => {
  return (
    <TouchableHighlight
          style={styles.button}
          underlayColor="#6a1b9a"
          onPress={onPress}
          disabled={disabled}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableHighlight>
  )
}
const styles=StyleSheet.create({
    button: {
        backgroundColor: "#8b2ff5",
        padding: 10,
        borderRadius: 5,
        marginLeft:22,
        marginRight:30,
        width: 370,
        height: 47.5,
        marginTop:10
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
})

export default ButtonComponent