import { Pressable } from 'react-native'

import Ionicons from '@expo/vector-icons/Ionicons';

const Ionicon = ({name, size, color, onPress}) => {
  return (
    <Pressable onPress={onPress} android_ripple={{ color: 'white' }} >
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  )
}

export default Ionicon