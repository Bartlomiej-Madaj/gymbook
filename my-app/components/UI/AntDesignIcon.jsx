import { View, Text, Pressable } from 'react-native'

import { AntDesign } from '@expo/vector-icons'

const AntDesignIcon = ({name, size, color, onPress}) => {
    return (
       <View style={{ alignItems: 'center', borderRadius: 16, overflow: 'hidden'}}>
          <Pressable  onPress={onPress} android_ripple={{color: 'white'}}  >
            <AntDesign name={name} size={size} color={color} />
          </Pressable>
       </View>
      )
}

//style={ ({pressed}) => pressed && {borderRadius: size, backgroundColor: '#d6d6d6', opacity: 0.5}} 

export default AntDesignIcon