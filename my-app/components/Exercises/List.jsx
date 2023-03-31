import { View, StyleSheet } from 'react-native'

import { SIZES, FONTS, COLORS } from '../../constants/index.js';

import Headline from '../Text/Headline'
import DynamicList from '../Text/DynamicList'

const List = ({title, data}) => {
  return (
    <View style={styles.listContainer}>
    <Headline >{title}</Headline>
    <DynamicList data={data} />
  </View>
  )
}

export default List

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        // borderWidth: 4,
        borderTopColor: COLORS.secondary,
        borderTopWidth: 4,
    }
})