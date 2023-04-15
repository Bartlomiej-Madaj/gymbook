import { View, Text, Pressable, StyleSheet } from 'react-native';

import { SIZES, FONTS, COLORS } from '../../constants/index.js';

const NewButton = ({
  onPress,
  title,
  containerStyle,
  textStyle,
  rootContainerStyle,
  disabled = false,
}) => {
  return (
    <View style={[styles.rootContainer, rootContainerStyle]}>
      <Pressable
        style={[styles.button, containerStyle]}
        android_ripple={{ color: 'white' }}
        disabled={disabled}
        onPress={onPress}
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default NewButton;

const styles = StyleSheet.create({
  rootContainer: {
    minWidth: '40%',
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  button: {
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
    padding: 8,
  },
});
