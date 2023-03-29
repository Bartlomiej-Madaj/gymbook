import { View, Text, Pressable, StyleSheet } from 'react-native'

import { SIZES, FONTS, COLORS } from '../../constants/index.js';

const NewButton = ({onPress, title, containerStyle, textStyle}) => {
  return (
    <View style={styles.rootContainer}>
        <Pressable style={[styles.button, containerStyle]} android_ripple={{color: 'white'}} onPress={onPress}>
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
        </Pressable>
    </View>
  )
}

export default NewButton

const styles = StyleSheet.create({
    rootContainer: {
        width: '100%',
        alignItems: 'center',
        overflow: 'hidden'
    },
    button: {
        width: '50%',
        // flex: 1,
        backgroundColor: COLORS.secondary,
        // borderColor: COLORS.primary,
        // borderWidth: 2,
        borderRadius: 8,

    },
    buttonText: {
        textAlign: 'center',
        fontFamily: FONTS.medium,
        fontSize: SIZES.medium,
        color: COLORS.text,
        padding: 8,
    }
})