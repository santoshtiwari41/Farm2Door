import { View, Text ,TextInput} from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const InputComponent = ({ placeholder, value, onChangeText,iconName }) => {
    return (
        <View style={styles.inputContainer}>
            <Ionicons name={iconName} size={22} color="#555555" style={styles.icon} />
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    color="black"
                    placeholderTextColor="#999999"
                />
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        width: 370,
        height: 48,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
    },
    textInputContainer: {
        flex: 1,
    },
    textInput: {
        height: 40,
        paddingHorizontal: 8,
        color: 'white',
        fontSize: 14.5,
       
    },
    icon: {
        padding: 13,
    },

})
export default InputComponent