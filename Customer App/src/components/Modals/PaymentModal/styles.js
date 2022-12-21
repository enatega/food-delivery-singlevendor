import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../../utils/alignment'
import { moderateScale, scale } from '../../../utils/scaling'

const useStyles = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    flex: {
      flex: 1,
      alignItems: 'center'
    },
    mainContainer: {
      backgroundColor: colors.background,
      ...alignment.PTlarge,
      ...alignment.PBlarge,
      ...alignment.PLsmall,
      ...alignment.PRsmall
    },
    radioContainer: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    radioGroup: {
      width: '80%',
      flexDirection: 'row',
      alignItems: 'center',
      ...alignment.PRsmall,
      ...alignment.PLxSmall
    },
    button: {
      width: '80%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.buttonBackgroundBlue,
      borderRadius: moderateScale(18),
      height: moderateScale(50),
      ...alignment.MTlarge
    },
    horizontalLine: {
      width: '80%',
      opacity: 0.5,
      borderBottomColor: colors.placeHolderColor,
      borderBottomWidth: StyleSheet.hairlineWidth,
      ...alignment.MBsmall,
      ...alignment.MTsmall
    },
    iconContainer: {
      width: scale(30)
    },
    width100: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
}
export default useStyles
