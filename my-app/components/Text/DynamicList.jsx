import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'

const DynamicList = ({data}) => {
  return (
    <FlatList
    style={styles.list}
    data={data}
    renderItem={({ item }) => (
      <NewExercise
        name={item.title}
        // set={item.set}
        // rep={item.rep}
        // weight={item.weight}
      />
    )}
    keyExtractor={() => Math.random().toFixed(6)}
  />
  )
}

export default DynamicList

const styles = StyleSheet.create({
    list:{

    }
})