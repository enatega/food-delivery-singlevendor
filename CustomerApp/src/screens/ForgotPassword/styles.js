import { useTheme } from '@react-navigation/native'
import { Dimensions, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { alignment } from '../../utils/alignment'
import { moderateScale, scale, verticalScale } from '../../utils/scaling'
import { textStyles } from '../../utils/textStyles'
const { height } = Dimensions.get('window')

const useStyle = () => {
  const { colors } = useTheme()
  const inset = useSafeAreaInsets()
  return StyleSheet.create({
    flex: {
      flex: 1
    },
    width100: {
      width: '100%'
    },
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      paddingTop: verticalScale(20) + inset.top
    },
    subContainer: {
      flex: 1,
      width: '80%',
      alignItems: 'center',
      ...alignment.PBmedium
    },
    imgResponsive: {
      width: scale(135),
      height: scale(125),
      backgroundColor: 'transparent'
    },
    loadingView: {
      backgroundColor: colors.background,
      width: '100%',
      height: '100%'
    },
    upperContainer: {
      marginTop: verticalScale(60)
    },
    actionBtn: {
      height: height * 0.06,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: moderateScale(18),
      backgroundColor: colors.buttonBackground,
      ...alignment.MTlarge
    },
    labelStyle: {
      ...textStyles.Medium,
      marginTop: 3,
      paddingLeft: 5,
      paddingTop: scale(1)
    },
    textContainer: {
      borderRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: colors.buttonBackgroundLight,
      overflow: 'hidden',
      ...alignment.MTlarge
    }
  })
}
export default useStyle
