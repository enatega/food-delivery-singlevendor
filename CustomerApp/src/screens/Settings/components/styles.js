import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../../utils/alignment'
import { moderateScale } from '../../../utils/scaling'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    flex: {
      flex: 1,
      alignItems: 'center'
    },
    width100: {
      width: '100%'
    },
    radioContainer: {
      width: '70%',
      backgroundColor: '#FFF',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...alignment.PTlarge,
      ...alignment.PBsmall
    },
    horizontalLine: {
      width: '70%',
      opacity: 0.3,
      borderBottomColor: colors.placeHolderColor,
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.buttonBackgroundBlue,
      borderRadius: moderateScale(10),
      width: '70%',
      padding: moderateScale(15),
      ...alignment.MTlarge
    },
    modalButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    modalButtons: {
      ...alignment.Msmall,
      marginBottom: 0
    }
  })
}
export default useStyle
