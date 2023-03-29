import { View, Text, FlatList, SafeAreaView, StyleSheet, ImageBackground  } from 'react-native'
import React from 'react'
import Input from '../components/UI/Input'

import { SIZES, FONTS, COLORS } from '../constants/index.js';

const inputConfig = {maxLength: 3, keyboardType: 'numeric'}

const ExerciseForm = () => {
  return (
    <ImageBackground style={styles.imageContainer} source={require('../assets/images/background.jpg')} >
      <View style={styles.container}>
        <Input containerInputStyle={styles.input} labelTextStyle={styles.labelText} label='Exercise name' placeholder='Put some name' />
        <View style={styles.inputContainer} >
          <Input rootStyle={styles.inputBox} labelTextStyle={styles.labelText} containerInputStyle={styles.input} label='SET' config={inputConfig} placeholder='Set...' />
          <Input rootStyle={styles.inputBox} labelTextStyle={styles.labelText} containerInputStyle={styles.input} label='REP' config={inputConfig} placeholder='Rep..' />
          <Input rootStyle={styles.inputBox} labelTextStyle={styles.labelText} containerInputStyle={styles.input} label='Weight' config={inputConfig} placeholder='How many?' />
        </View>
    </View>
    </ImageBackground >
  )
}

export default ExerciseForm

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputBox: {
    width: '30%'
  },
  input: {
    backgroundColor: '#ffffff7e',
    borderColor: COLORS.secondary,
  },
  labelText: {
    color: 'white'
  }
})

