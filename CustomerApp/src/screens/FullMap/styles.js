import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { moderateScale } from '../../utils/scaling'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    flex: {
      flex: 1
    },
    container: {
      height: '92%'
    },
    button: {
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScale(10),
      bottom: 0,
      height: '8%',
      width: '100%',
      backgroundColor: colors.buttonBackgroundBlue
    }
  })
}
export default useStyle
