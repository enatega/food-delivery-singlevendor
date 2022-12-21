import { useTheme } from '@react-navigation/native'
import { Dimensions, StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'
import { moderateScale, scale, verticalScale } from '../../utils/scaling'
const { width } = Dimensions.get('window')

const useStyle = () => {
  const { colors } = useTheme()

  return StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      ...alignment.MBmedium,
      backgroundColor: colors.cardContainer,
      elevation: 5,
      padding: 10,
      shadowColor: colors.placeHolderColor,
      shadowOffset: {
        width: verticalScale(2),
        height: verticalScale(1)
      },
      borderRadius: 20,
      height: width * 0.28,
      shadowOpacity: 0.3,
      shadowRadius: verticalScale(10),
      ...alignment.PLsmall,
      ...alignment.PRsmall
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
    textContainer: {
      flex: 1,
      height: '100%',
      justifyContent: 'space-evenly',
      ...alignment.MLsmall
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    actionContainerBtns: {
      width: scale(24),
      aspectRatio: 1,
      backgroundColor: colors.lightBackground,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: scale(8),
      elevation: 3,
      shadowColor: colors.shadowColor,
      shadowOffset: {
        width: 0,
        height: verticalScale(1)
      },
      shadowOpacity: 0.5,
      shadowRadius: verticalScale(1)
    },
    tagbtn: {
      backgroundColor: colors.iconColorPrimary
    },
    actionContainerView: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
}
export default useStyle
