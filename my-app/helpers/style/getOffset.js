import { useWindowDimensions } from "react-native";


export function getOffset(widthFactor) {
    const { width } = useWindowDimensions();

    const leftOffset = (width * (1 - widthFactor)) / 2;
    const widthComponent = width - 2 * leftOffset

    return [leftOffset, widthComponent]
  }