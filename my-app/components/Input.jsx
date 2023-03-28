import { View, Text, StyleSheet, TextInput } from 'react-native';

import { SIZES, FONTS, COLORS } from '../constants/index.js';

const Input = ({ label, placeholder, containerStyle }) => {
  return (
    <View style={[styles.conatiner, containerStyle]}>
      <Text style={styles.labelText}> {label} </Text>
      <View style={styles.textInputContainer}>
        <TextInput  placeholder={placeholder} />
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
    // flex: 1,
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
