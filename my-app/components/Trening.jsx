import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

import {COLORS, SIZES, FONTS} from '../constants/index/'
// import { FONTS } from '../constants'

function Trening ({title, date}) {
  return (
    <Pressable style={styles.container}>
        <View style={styles.innerBox} >
          <Text style={styles.title}>{title}</Text>
        </View>
        <View>
            <Text style={styles.date}>{date}</Text>
        </View>
    </Pressable>
  )
}

export default Trening

const styles = StyleSheet.create({
    container: {
        borderColor: COLORS.black,
        borderWidth: 2,
        width: 150,
        height: 150,
        // flex: 1,
        padding: 16,
        margin: 8,
        borderRadius: 16,
        // elevation: 4,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.grey,
        opacity: 0.6,
        
    },
    innerBox: {
        // borderColor: 'grey',
        // borderWidth: 2,
        // flex: 1,
        // textAlign: 'center'
        // elevation: 4,
    },
    title: {
        textAlign: 'center',
        fontFamily: FONTS.bold,
        fontSize: SIZES.medium,
        color: COLORS.text
        // fontWeight: 'bold'

        // textAlign: 'center'
    },
    date: {
        textAlign: 'center',
        fontFamily: FONTS.regular,
        fontSize: SIZES.font,
        color: COLORS.text
    }
})