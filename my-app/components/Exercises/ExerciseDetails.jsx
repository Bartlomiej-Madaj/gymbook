import { View, Text, StyleSheet, Pressable } from "react-native";

import { SIZES, FONTS, COLORS } from "../../constants/index";
import AntDesignIcon from "../UI/AntDesignIcon";
import { useState } from "react";
import UpdateExerciseModal from "./UpdateExerciseModal";

const ExerciseDetails = ({ exercise, unit, isIcon, onPress }) => {

  const [exerciseModalIsVisible, setExerciseModalIsVisible ] = useState(false)
  const [statsId, setStatsId] = useState('')
  // console.log(exercise)

  const { stats, title, id } = exercise;
  const styleWithIcon = {
    width: isIcon ? '25%' : '30%'
  }
  let pressableConfig
   pressableConfig = !isIcon && {
    onPress: onPress,
    android_ripple: {color: 'white'}
  }
  function showEditStatsModal(statId){
    setStatsId(statId)
    setExerciseModalIsVisible(true)
    
  }
  return (
    <View style={styles.rootContainer}>
      <UpdateExerciseModal isVisible={exerciseModalIsVisible} exerciseId={id} statsId ={statsId} changeIsVisible = {() => setExerciseModalIsVisible(false)} />
      <Pressable style={{flex: 1}}  {...pressableConfig} >
        <Text style={styles.title}>{title}</Text>
        <View style={styles.statsContainer}>
          <Text style={[styles.stats, styleWithIcon]}> Set</Text>
          <Text style={[styles.stats, styleWithIcon]}> Rep </Text>
          <Text style={[styles.stats]}> Weight [{unit}]</Text>
        </View>
        {stats.map((stat) => (
          <View key={stat.id} style={styles.statsContainer}>
            <Text style={[styles.stats, styleWithIcon]}> {stat.set} </Text>
            <Text style={[styles.stats, styleWithIcon]}> {stat.rep} </Text>
            <Text style={[styles.stats, styleWithIcon]}> {stat.weight}</Text>
            {isIcon && <View style={styles.iconsBox}>
              <AntDesignIcon name='edit' size={24} color={'white'} onPress={showEditStatsModal.bind(this, stat.id)} />
              <AntDesignIcon name='delete' size={24} color={'white'} />
            </View>}
          </View>
        ))}
      </Pressable>
    </View >
  );
};

export default ExerciseDetails;

const styles = StyleSheet.create({
  rootContainer: {
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#ccccccb4',
    overflow: 'hidden'
  },
  statsContainer: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 4 ,
    borderTopWidth: 2,
    borderColor: COLORS.grey,
  },
  title: {
    textTransform: "capitalize",
    fontFamily: FONTS.medium,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: 8,
    marginLeft: 8,
  },
  stats: {
    width: "30%",
    fontFamily: FONTS.medium,
    fontSize: SIZES.medium,
    color: COLORS.text,
    paddingRight: 8,
    textAlign: "center",
  },
  iconsBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
