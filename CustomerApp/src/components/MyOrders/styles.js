import { scale, verticalScale } from '../../utils/scaling'
import { StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'
import { useTheme } from '@react-navigation/native'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.cardContainer,
      borderRadius: scale(20),
      elevation: 3,
      width: '85%',
      alignSelf: 'center',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: verticalScale(1)
      },
      shadowOpacity: 0.5,
      shadowRadius: verticalScale(1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      ...alignment.Psmall,
      ...alignment.MBmedium
    },
    imgContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      overflow: 'hidden'
    },
    rightContainer: {
      width: '25%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    Vline: {
      borderRightWidth: StyleSheet.hairlineWidth,
      borderColor: colors.placeHolderColor,
      shadowOffset: {
        width: 2,
        height: 2
      },
      shadowRadius: 10,
      shadowColor: colors.lightBackground,
      shadowOpacity: 0.6
    },
    imgResponsive: {
      width: scale(70),
      height: scale(70)
    },
    loadingView: {
      backgroundColor: colors.background,
      width: '100%',
      height: '100%'
    },
    infoContainer: {
      flex: 1,
      justifyContent: 'center',
      ...alignment.PRxSmall,
      ...alignment.PLsmall
    }
  })
}
export default useStyle
