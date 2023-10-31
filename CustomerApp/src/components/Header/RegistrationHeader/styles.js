import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { moderateScale, scale } from '../../../utils/scaling'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    headerContainer: {
      paddingHorizontal: moderateScale(20),
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    backBtnWidth: {
      width: scale(40),
      aspectRatio: 1
    },
    backBtn: {
      borderRadius: scale(13),
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
}

export default useStyle
