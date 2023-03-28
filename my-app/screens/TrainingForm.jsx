import { View, Text, Button, TextInput, StyleSheet, Pi } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SIZES, FONTS, COLORS } from '../constants/index.js';
import Input from '../components/Input.jsx';

const TrainingForm = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.rootConatiner}>
      <Input placeholder="Your training title" label='Training Title' />
      <Input placeholder="Put your unite" label='Unite' containerStyle={{marginBottom: 16 }} />
      
      <Button
        title="Add exercise"
        onPress={() => navigation.navigate('ExerciseForm')}
      />
    </View>
  );
};

export default TrainingForm;

const styles = StyleSheet.create({
  rootConatiner: {
    marginTop: 16,
  },
});
