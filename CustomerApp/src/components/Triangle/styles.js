import { scale } from '../../utils/scaling'
import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: scale(7),
      borderRightWidth: scale(7),
      borderBottomWidth: scale(8),
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderBottomColor: colors.background
    }
  })
}
export default useStyle
