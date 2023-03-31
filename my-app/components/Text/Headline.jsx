import { View, Text, StyleSheet } from 'react-native'

import { SIZES, FONTS, COLORS } from '../../constants/index.js';

const Headline = ({children}) => {
  return (
    <View>
      <Text style={styles.headerList}>{children}</Text>
    </View>
  )
}

export default Headline

const styles = StyleSheet.create({
  headerList: {
    paddingVertical: 8,
    fontFamily: FONTS.bold,
    fontSize: SIZES.large,
    textAlign: 'center',
    color: COLORS.text,
    textTransform: 'uppercase',
  },
})