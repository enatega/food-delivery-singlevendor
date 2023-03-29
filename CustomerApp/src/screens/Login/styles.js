import { useTheme } from '@react-navigation/native'
import { Dimensions, StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'
import { moderateScale, scale, verticalScale } from '../../utils/scaling'
import { textStyles } from '../../utils/textStyles'
const { height } = Dimensions.get('window')

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    flex: {
      flex: 1
    },
    width100: {
      width: '100%'
    },
    safeAreaViewStyles: {
      flex: 1,
      backgroundColor: colors.cardContainer
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
    mainContainer: {
      flex: 1,
      alignItems: 'center'
    },
    subContainer: {
      flex: 1,
      width: '80%',
      alignItems: 'center',
      ...alignment.PBmedium
    },

    marginTop3: {
      ...alignment.MTmedium
    },
    lgnText: {
      fontSize: moderateScale(20)
    },
    textContainer: {
      borderRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: colors.buttonBackgroundLight,
      alignItems: 'center',
      overflow: 'hidden'
    },
    labelStyle: {
      ...textStyles.Medium,
      marginTop: 3,
      paddingLeft: 5,
      paddingTop: scale(1)
    },
    loginBtn: {
      width: '100%',
      borderRadius: moderateScale(18),
      height: height * 0.06,
      backgroundColor: colors.buttonBackground,
      justifyContent: 'center',
      alignItems: 'center'
    },
    whiteBtn: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.fontSecondColor
    },
    appleBtn: {
      width: '100%',
      height: height * 0.06
    }
  })
}
export default useStyle
