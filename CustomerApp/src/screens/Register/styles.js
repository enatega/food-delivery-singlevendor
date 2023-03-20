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
    mainContainer: {
      flex: 1,
      alignItems: 'center'
    },
    upperContainer: {
      marginTop: verticalScale(60)
    },
    subContainer: {
      flex: 1,
      width: '80%',
      alignItems: 'center',
      ...alignment.PBmedium
    },
    imgResponsive: {
      width: scale(135),
      height: scale(125)
    },
    loadingView: {
      backgroundColor: colors.background,
      width: '100%',
      height: '100%'
    },
    marginTop5: {
      ...alignment.MTsmall
    },
    alignItemCenter: {
      alignItems: 'center'
    },
    joinBtn: {
      width: '100%',
      height: height * 0.06,
      backgroundColor: colors.buttonBackground,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: moderateScale(20)
    },
    textContainer: {
      borderRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: colors.buttonBackgroundLight,
      overflow: 'hidden'
    },
    labelStyle: {
      ...textStyles.Medium,
      marginTop: 3,
      paddingLeft: 5,
      paddingTop: scale(1)
    },
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
      backgroundColor: colors.white,
      borderRadius: scale(13),
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
}

export default useStyle
