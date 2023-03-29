import { useTheme } from '@react-navigation/native'
import { Dimensions, StyleSheet } from 'react-native'
import { alignment } from '../../../utils/alignment'
import { moderateScale, scale, verticalScale } from '../../../utils/scaling'
const { height } = Dimensions.get('window')

const useStyle = () => {
  const { colors } = useTheme()

  return StyleSheet.create({
    flex: {
      flex: 1
    },
    mainContainer: {
      width: '100%',
      height: height * 0.08,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      ...alignment.MBlarge
    },
    subContainer: {
      width: '90%',
      height: '70%',
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row'
    },
    icon: {
      width: '10%',
      height: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
      borderRadius: scale(12),
      elevation: 3,
      shadowColor: colors.shadowColor,
      shadowOffset: {
        width: 0,
        height: verticalScale(1)
      },
      shadowOpacity: 0.5,
      shadowRadius: verticalScale(1)
    },
    btnContainer: {
      width: '50%',
      height: '100%',
      borderRadius: moderateScale(12),
      backgroundColor: colors.horizontalLine,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
}
export default useStyle
