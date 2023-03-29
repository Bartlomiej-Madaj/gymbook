import { View, Text, Button, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SIZES, FONTS, COLORS } from '../constants/index.js';
import Input from '../components/UI/Input.jsx';
import NewButton from '../components/UI/NewButton.jsx';

const TrainingForm = () => {
  const navigation = useNavigation();

  function goToExerciseForm(){
    navigation.navigate('ExerciseForm')
  }
  return (
    <ImageBackground style={styles.imageContainer} source={require('../assets/images/background.jpg')}>
    <View style={styles.rootConatiner}>
      <Input config={{autoCorrect: false, maxLength: 20 }} containerInputStyle={styles.input}labelTextStyle={styles.labelText}  placeholder="Your training title" label='Training Title' />
      <Input config={{autoCorrect: false, maxLength: 3 }} containerInputStyle={styles.input} labelTextStyle={styles.labelText} placeholder="Put your unite" label='Unite'  />
      <NewButton title='Add exercise' onPress={goToExerciseForm} />
    </View>
    </ImageBackground>
  );
};

export default TrainingForm;

const styles = StyleSheet.create({
  rootConatiner: {
    marginTop: 16,
    // flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  input: {
    backgroundColor: '#ffffff7e',
    borderColor: COLORS.secondary,
    marginBottom: 16 ,
  },
  labelText: {
    color: 'white'
  }
});
