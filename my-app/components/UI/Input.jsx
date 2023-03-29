import { View, Text, StyleSheet, TextInput } from 'react-native';

import { SIZES, FONTS, COLORS } from '../../constants/index.js';

const Input = ({ label, placeholder, rootStyle, containerInputStyle, textInputStyle, labelTextStyle, config }) => {
  return (
    <View style={[styles.conatiner, rootStyle]}>
      <Text style={[styles.labelText, labelTextStyle]}> {label} </Text>
      <View style={[styles.textInputContainer, containerInputStyle]}>
        <TextInput {...config} placeholder={placeholder} style={textInputStyle} />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  conatiner: {
    // marginVertical: 16,
  },
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
  }
});
