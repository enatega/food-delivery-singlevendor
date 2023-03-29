import { useTheme } from '@react-navigation/native'
import { Dimensions, StyleSheet } from 'react-native'
import { alignment } from '../../../utils/alignment'
import { moderateScale } from '../../../utils/scaling'
const { height } = Dimensions.get('window')

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    mainContainer: {
      width: '100%',
      height: height * 0.07,
      backgroundColor: colors.buttonBackgroundLight,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: moderateScale(20)
    },
    marginLeft5: {
      ...alignment.Pmedium
    },
    marginLeft10: {
      ...alignment.MLmedium
    }
  })
}

export default useStyle
