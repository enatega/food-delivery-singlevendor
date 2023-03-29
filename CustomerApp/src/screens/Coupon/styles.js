import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'
import { moderateScale, verticalScale } from '../../utils/scaling'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    flex: {
      flex: 1
    },
    mB10: {
      ...alignment.MBsmall
    },
    mainContainer: {
      backgroundColor: colors.background,
      ...alignment.PRsmall,
      ...alignment.PLsmall
    },
    container: {
      width: '90%',
      alignSelf: 'center'
    },
    upperContainer: {
      width: '100%',
      height: verticalScale(60),
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    buttonContainer: {
      width: '25%',
      height: '70%',
      borderRadius: moderateScale(10),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.blueColor
    }
  })
}
export default useStyle
