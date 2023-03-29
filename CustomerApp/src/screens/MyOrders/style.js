import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'
import { scale, verticalScale } from '../../utils/scaling'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    flex: {
      flex: 1
    },
    safeAreaViewStyles: {
      flex: 1,
      backgroundColor: colors.headerBackground
    },
    container: {
      flex: 1
    },
    contentContainer: {
      flexGrow: 1,
      ...alignment.PBsmall
    },
    subContainerImage: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      ...alignment.PBlarge
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      ...alignment.MBlarge
    },
    image: {
      width: scale(134),
      height: scale(131)
    },
    descriptionEmpty: {
      justifyContent: 'center',
      alignItems: 'center',
      ...alignment.Plarge
    },
    emptyButton: {
      width: '70%',
      height: scale(50),
      backgroundColor: colors.blueColor,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: scale(15),
      ...alignment.MTlarge
    },
    subContainer: {
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
    subContainerLeft: {
      width: '30%',
      justifyContent: 'center',
      alignItems: 'center',
      ...alignment.PRxSmall,
      ...alignment.PLxSmall
    },
    subContainerRight: {
      width: '30%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    subContainerButton: {
      backgroundColor: colors.buttonBackground,
      width: scale(70),
      height: verticalScale(25),
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center'
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
    imgContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      overflow: 'hidden'
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
