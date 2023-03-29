import { scale } from '../../utils/scaling'
import { StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const useStyle = () => {
  const { colors } = useTheme()

  return StyleSheet.create({
    mainContainer: {
      borderColor: colors.horizontalLine,
      borderWidth: StyleSheet.hairlineWidth,
      width: scale(20),
      height: scale(20),
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
}
export default useStyle
