import { View, Text, StyleSheet } from 'react-native';

import { SIZES, FONTS, COLORS } from '../../constants/index.js';

const NewExercise = ({ name, set, rep, weight }) => {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}> {set} x {rep} x {weight} </Text>
      </View>
    </View>
  );
};

export default NewExercise;

const styles = StyleSheet.create({
  rootContainer: {
    // flex: 1,
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: 2,
    paddingVertical: 4,
  },
  nameContainer: {

  },
  nameText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
    textTransform: 'uppercase',
    marginLeft: 16,
  },
  statsText: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginLeft: 16,
  }
});
