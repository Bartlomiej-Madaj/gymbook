import { View, Pressable } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

const AntDesignIcon = ({ name, size, color, onPress, styleIconContainer }) => {
  return (
    <View
      style={[
        { alignItems: 'center', borderRadius: 16, overflow: 'hidden' },
        styleIconContainer,
      ]}
    >
      <Pressable onPress={onPress} android_ripple={{ color: 'white' }}>
        <AntDesign name={name} size={size} color={color} />
      </Pressable>
    </View>
  );
};

export default AntDesignIcon;
