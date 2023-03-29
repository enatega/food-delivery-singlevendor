import { useTheme } from '@react-navigation/native'
import { Dimensions, StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'
import { moderateScale, verticalScale } from '../../utils/scaling'
const { width, height } = Dimensions.get('window')

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    flex: {
      flex: 1
    },
    contentContaienr: {
      flexGrow: 1,
      ...alignment.PBlarge
    },
    whiteFont: {
      color: colors.fontWhite
    },
    lightColor: {
      color: colors.fontSecondColor
    },
    tagColor: {
      color: colors.tagColor
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    shadeContainer: {
      width: '100%',
      height: '100%',
      borderRadius: moderateScale(20),
      backgroundColor: colors.fontMainColor,
      opacity: 0.3,
      position: 'absolute'
    },
    backgroundImageContainer: {
      height: height * 0.2,
      width: '88%',
      borderRadius: moderateScale(20),
      alignSelf: 'center',
      ...alignment.MTmedium,
      ...alignment.MBlarge
    },
    backgroundImage: {
      width: '100%',
      height: '100%',
      borderRadius: moderateScale(20),
      alignSelf: 'center',
      justifyContent: 'flex-end'
    },
    backgroundImageTextContainer: {
      width: '100%',
      borderRadius: moderateScale(20),
      backgroundColor: '#21262d99',
      justifyContent: 'flex-end',
      ...alignment.PRxSmall,
      ...alignment.PLlarge,
      ...alignment.PTsmall,
      ...alignment.PBsmall
    },

    filter: {
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      ...alignment.PLmedium,
      ...alignment.PRmedium
    },

    cardContainer: {
      width: '90%',
      flexDirection: 'row',
      height: width * 0.28,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.white,
      backgroundColor: colors.cardContainer,
      elevation: 5,
      shadowColor: colors.placeHolderColor,
      shadowOffset: {
        width: verticalScale(2),
        height: verticalScale(1)
      },
      borderRadius: moderateScale(20),
      alignSelf: 'center',
      shadowOpacity: 0.2,
      shadowRadius: verticalScale(10),
      ...alignment.MBxSmall,
      ...alignment.MTmedium,
      ...alignment.PLsmall,
      ...alignment.PRsmall
    },
    cardImageContainer: {
      width: moderateScale(75),
      height: moderateScale(75),
      borderRadius: moderateScale(20)
    },
    imgResponsive: {
      width: moderateScale(75),
      height: moderateScale(75),
      borderRadius: moderateScale(20)
    },
    loadingView: {
      backgroundColor: colors.background,
      width: '100%',
      height: '100%'
    },
    emtpyStockLabel: {
      position: 'absolute',
      top: 0,
      right: -10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.tagColor,
      ...alignment.PLxSmall,
      ...alignment.PRxSmall
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
      ...alignment.MLlarge
    }
  })
}
export default useStyle
