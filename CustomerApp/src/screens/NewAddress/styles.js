import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'
import { moderateScale, scale } from '../../utils/scaling'
import { textStyles } from '../../utils/textStyles'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    flex: {
      flex: 1
    },
    subContainer: {
      flex: 1,
      alignItems: 'center',
      borderWidth: scale(0.3),
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderColor: 'grey',
      justifyContent: 'space-around',
      backgroundColor: colors.background
    },
    upperContainer: {
      width: '90%',
      alignItems: 'center'
    },
    addressContainer: {
      paddingTop: 0,
      width: '100%',
      ...alignment.Psmall
    },
    labelButtonContainer: {
      width: '100%',
      ...alignment.MBlarge,
      ...alignment.Plarge
    },
    labelTitleContainer: {
      ...alignment.PBsmall
    },
    buttonInline: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    labelButton: {
      width: '30%',
      height: moderateScale(40),
      borderWidth: 1,
      borderColor: colors.placeHolderColor,
      borderRadius: 30,
      justifyContent: 'center',
      ...alignment.PxSmall
    },
    activeLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '30%',
      borderWidth: 1,
      borderRadius: 30,
      backgroundColor: colors.tagColor,
      justifyContent: 'space-evenly',
      color: colors.fontWhite,
      borderColor: colors.tagColor,
      ...alignment.PxSmall
    },
    saveBtnContainer: {
      width: '80%',
      height: scale(45),
      borderRadius: scale(10),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.buttonBackgroundBlue
    },
    mapContainer: {
      height: '40%',
      backgroundColor: 'transparent'
    },
    spinnerView: {
      width: '100%',
      height: '100%'
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
      ...textStyles.Bold,
      marginTop: 3,
      paddingLeft: 5,
      paddingTop: scale(1)
    }
  })
}
export default useStyle
