import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { moderateScale } from '../../../utils/scaling'

const useStyle = () => {
  const { colors } = useTheme()

  return StyleSheet.create({
    flex: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20
    },
    container: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      borderRadius: 20,
      overflow: 'hidden'
    },
    imgResponsive: {
      flex: 1,
      width: undefined,
      height: undefined
    },
    loadingView: {
      backgroundColor: colors.background,
      width: '100%',
      height: '100%'
    },
    imgCard: {
      position: 'relative',
      flex: 1,
      borderRadius: 20,
      width: undefined,
      height: undefined
    },
    blackOverlay: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.black,
      opacity: 0.4,
      borderRadius: 20,
      position: 'absolute'
    },
    textContainer: {
      width: '100%',
      padding: moderateScale(10, 0.2),
      paddingLeft: moderateScale(20),
      alignSelf: 'flex-end',
      bottom: 0,
      position: 'absolute',
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      justifyContent: 'center',
      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20
    }
  })
}

export default useStyle
