import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { COLORS } from '../../Theme/Colors'
import { alignment } from '../../utils/alignment'
import { moderateScale, scale } from '../../utils/scaling'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    flex: {
      flex: 1
    },
    pT10: {
      ...alignment.PTsmall
    },
    pB10: {
      ...alignment.PBsmall
    },
    pB5: {
      ...alignment.PBxSmall
    },
    mB10: {
      ...alignment.MBsmall
    },
    width100: {
      width: '100%'
    },
    mainContainer: {
      flex: 1,
      ...alignment.PTsmall,
      backgroundColor: 'transparent'
    },
    dealContainer: {
      width: '100%',
      backgroundColor: 'transparent'
    },
    termsContainer: {
      width: '90%',
      alignSelf: 'center',
      backgroundColor: 'transparent',
      borderRadius: scale(5)
    },
    contactContainer: {
      width: '100%',
      alignSelf: 'center',
      backgroundColor: colors.lightBackground,
      borderRadius: 20,
      padding: scale(15)
    },
    itemContainer: {
      width: '100%',
      backgroundColor: 'transparent'
    },
    priceContainer: {
      width: '100%',
      alignSelf: 'center',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: colors.lightBackground,
      borderBottomColor: colors.horizontalLine,
      ...alignment.PLmedium,
      ...alignment.PRmedium,
      ...alignment.PTmedium
    },
    floatView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    floatRight: {
      width: '70%',
      textAlign: 'right'
    },
    horizontalLine: {
      borderBottomColor: COLORS.primaryBlue,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderRadius: 1,
      borderStyle: 'solid',
      width: '100%'
    },
    buttonContainer: {
      width: '90%',
      height: '10%',
      alignSelf: 'center',
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.buttonBackgroundBlue,
      height: '75%',
      maxHeight: scale(50),
      borderRadius: moderateScale(18),
      ...alignment.PLsmall,
      ...alignment.PRsmall
    },

    subContainerImage: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center'
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center'
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
      borderRadius: moderateScale(20),
      ...alignment.MTlarge
    }
  })
}
export default useStyle
