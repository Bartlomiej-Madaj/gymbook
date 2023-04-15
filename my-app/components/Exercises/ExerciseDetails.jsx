import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useContext, useState } from 'react';

import { SIZES, FONTS, COLORS } from '../../constants/index';
import AntDesignIcon from '../UI/AntDesignIcon';
import UpdateStatsModal from './UpdateStatsModal';
import { ExerciseContext } from '../../store/exerciseContext';
import { deleteExercise } from '../../util/db/exerciseHelpers';
import { deleteStat } from '../../util/db/statHelper';

const ExerciseDetails = ({
  exercise,
  unit,
  statsIcon,
  onPress,
  exerciseIcon,
}) => {
  const [exerciseModalIsVisible, setExerciseModalIsVisible] = useState(false);
  const [statsId, setStatsId] = useState('');
  const exerciseCtx = useContext(ExerciseContext);

  const { stats } = exercise;

  function showEditStatsModal(statId) {
    setStatsId(statId);
    setExerciseModalIsVisible(true);
  }
  async function removeStat(statId) {
    await deleteStat(statId);
    exerciseCtx.deleteStats(exercise.id, statId);
  }
  async function removeExercise() {
    await deleteExercise(exercise.id);
    exerciseCtx.deleteExercise(exercise.id);
  }

  const styleWithIcon = {
    width: statsIcon ? '25%' : '30%',
  };
  let pressableConfig;
  pressableConfig = !statsIcon && {
    onPress: onPress,
    android_ripple: { color: 'white' },
  };
  return (
    <View style={styles.rootContainer}>
      <UpdateStatsModal
        isVisible={exerciseModalIsVisible}
        exerciseId={exercise.id}
        statsId={statsId}
        changeModalVisibility={() => setExerciseModalIsVisible(false)}
      />
      <Pressable style={{ flex: 1 }} {...pressableConfig}>
        <Text style={styles.title}>{exercise.title}</Text>
        {exerciseIcon && (
          <AntDesignIcon
            name="delete"
            size={24}
            color={'#ff2121'}
            onPress={removeExercise}
            styleIconContainer={{ position: 'absolute', top: 5, right: 10 }}
          />
        )}
        <View style={styles.statsContainer}>
          <Text style={[styles.stats, styleWithIcon]}> Set </Text>
          <Text style={[styles.stats, styleWithIcon]}> Rep </Text>
          <Text style={[styles.stats]}> Weight [{unit}]</Text>
        </View>
        {stats.map((stat) => (
          <View key={stat.id} style={styles.statsContainer}>
            <Text style={[styles.stats, styleWithIcon]}>{stat.set}</Text>
            <Text style={[styles.stats, styleWithIcon]}>{stat.rep}</Text>
            <Text style={[styles.stats, styleWithIcon]}>{stat.weight}</Text>
            {statsIcon && (
              <View style={styles.iconsBox}>
                <AntDesignIcon
                  name="edit"
                  size={24}
                  color={'white'}
                  onPress={showEditStatsModal.bind(this, stat.id)}
                />
                <AntDesignIcon
                  name="delete"
                  size={24}
                  color={'white'}
                  onPress={removeStat.bind(this, stat.id)}
                />
              </View>
            )}
          </View>
        ))}
      </Pressable>
    </View>
  );
};

export default ExerciseDetails;

const styles = StyleSheet.create({
  rootContainer: {
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#ccccccb4',
    overflow: 'hidden',
  },
  statsContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 4,
    borderTopWidth: 2,
    borderColor: COLORS.grey,
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: 8,
    marginLeft: 8,
  },
  stats: {
    width: '30%',
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
    paddingRight: 8,
    textAlign: 'center',
  },
  iconsBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
