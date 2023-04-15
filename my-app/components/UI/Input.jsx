import { View, Text, StyleSheet, TextInput } from 'react-native';

import { SIZES, FONTS, COLORS } from '../../constants/index.js';

const Input = ({
  label,
  placeholder,
  rootStyle,
  containerInputStyle,
  textInputStyle,
  labelTextStyle,
  config,
  value,
  setEnteredValueHandler,
}) => {
  function addEnteredValueHandler(inputText) {
    setEnteredValueHandler(inputText);
  }

  return (
    <View style={rootStyle}>
      <Text style={[styles.labelText, labelTextStyle]}> {label} </Text>
      <View style={[styles.textInputContainer, containerInputStyle]}>
        <TextInput
          onChangeText={(text) => addEnteredValueHandler(text)}
          placeholder={placeholder}
          style={textInputStyle}
          value={value}
          autoCorrect={false}
          autoCapitalize="sentences"
          {...config}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  textInputContainer: {
    borderColor: COLORS.grey,
    borderWidth: 2,
    padding: 8,
    marginHorizontal: 8,
  },
  labelText: {
    fontFamily: FONTS.medium,
    padding: 8,
    textTransform: 'uppercase',
  },
});
