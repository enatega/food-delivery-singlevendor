import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'
import { moderateScale, scale, verticalScale } from '../../utils/scaling'

const useStyle = () => {
  const { dark, colors } = useTheme()

  return StyleSheet.create({
    flex: {
      flex: 1
    },
    formContainer: {
      flex: 1,
      width: '100%',
      height: '100%'
    },
    containerInfo: {
      width: '100%',
      marginTop: moderateScale(60),
      ...alignment.PLsmall,
      ...alignment.PLlarge
    },
    changePassword: {
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      backgroundColor: colors.background,
      alignSelf: 'center',
      justifyContent: 'space-between',
      shadowOffset: { width: 2, height: 2 },
      shadowColor: colors.shadowColor,
      shadowOpacity: 0.1,
      shadowRadius: 12,
      borderWidth: dark ? 2 : 0,
      borderRadius: moderateScale(10),
      elevation: 2,
      paddingHorizontal: scale(10),
      height: moderateScale(55),
      marginTop: moderateScale(20)
    },
    formSubContainer: {
      marginTop: moderateScale(100),
      alignItems: 'center',
      width: '85%',
      backgroundColor: colors.background,
      alignSelf: 'center',
      shadowOffset: { width: 2, height: 2 },
      shadowColor: colors.shadowColor,
      shadowOpacity: 0.2,
      shadowRadius: 12,
      borderRadius: moderateScale(20),
      elevation: 2,
      height: moderateScale(450),
      borderWidth: dark ? 2 : 0,
      borderColor: colors.shadowColor,
      ...alignment.MBlarge,
      ...alignment.PRlarge,
      ...alignment.Psmall
    },

    saveContainer: {
      marginTop: scale(40),
      width: '90%',
      height: scale(40),
      backgroundColor: colors.blueColor,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: moderateScale(14)
    },
    // Model for password changing
    modalContainer: {
      backgroundColor: colors.cardContainer,
      borderRadius: verticalScale(8),
      justifyContent: 'center',
      alignItems: 'center',
      ...alignment.PTmedium,
      ...alignment.PBsmall
    },
    modalContent: {
      width: '90%'
    },
    titleContainer: {
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    btnContainer: {
      width: '30%',
      justifyContent: 'center',
      borderRadius: moderateScale(10),
      height: verticalScale(40),
      backgroundColor: colors.blueColor,
      alignItems: 'center',
      alignSelf: 'flex-end',
      ...alignment.MTsmall,
      ...alignment.PxSmall
    },
    imgContainer: {
      width: scale(90),
      height: scale(90),
      justifyContent: 'center',
      marginBottom: moderateScale(10),
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: colors.fontSecondColor
    }
  })
}
export default useStyle
