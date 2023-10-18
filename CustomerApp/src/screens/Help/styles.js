import { StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'
import { moderateScale, verticalScale } from '../../utils/scaling'
import { useTheme } from '@react-navigation/native'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    flex: {
      flex: 1
    },
    itemContainer: {
      backgroundColor: colors.buttonBackgroundLight,
      marginHorizontal: moderateScale(20),
      borderRadius: moderateScale(10),
      elevation: 2,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: verticalScale(1)
      },
      shadowOpacity: 0.5,
      shadowRadius: verticalScale(1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderColor: colors.horizontalLine,
      ...alignment.Pmedium,
      ...alignment.Pmedium,
      ...alignment.PLlarge,
      ...alignment.PRsmall,
      ...alignment.MTsmall
    }
  })
}
export default useStyle
