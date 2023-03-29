import { useTheme } from '@react-navigation/native'
import { Dimensions, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { alignment } from '../../utils/alignment'
import { moderateScale, scale, verticalScale } from '../../utils/scaling'
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
      alignItems: 'center',
      paddingTop: verticalScale(20) + inset.top
    },
    subContainer: {
      flex: 1,
      width: '80%',
      alignItems: 'center',
      ...alignment.PBmedium
    },
    whiteColor: {
      backgroundColor: colors.buttonText
    },
    crossIcon: {
      width: scale(14),
      height: scale(14),
      ...alignment.MTlarge,
      ...alignment.MLlarge
    },
    upperContainer: {
      marginTop: verticalScale(60)
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
    marginTop3: {
      ...alignment.MTxSmall
    },
    marginTop5: {
      ...alignment.MTsmall
    },
    marginTop: {
      marginTop: moderateScale(50)
    },
    marginTop10: {
      ...alignment.MTmedium
    },
    alignItemsCenter: {
      alignItems: 'center'
    },
    buttonBackground: {
      width: '100%',
      height: height * 0.09,
      alignItems: 'center'
    },
    appleBtn: {
      width: '100%',
      height: height * 0.07,
      borderRadius: moderateScale(20),
      backgroundColor: colors.lightBackground,
      flexDirection: 'row',
      alignItems: 'center'
    },
    alreadyBtn: {
      marginTop: verticalScale(35),
      width: '100%',
      height: height * 0.06,
      borderRadius: moderateScale(20),
      backgroundColor: colors.buttonBackground,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    signupText: {
      fontSize: moderateScale(17)
    },
    marginLeft5: {
      ...alignment.Pmedium
    }
  })
}
export default useStyle
