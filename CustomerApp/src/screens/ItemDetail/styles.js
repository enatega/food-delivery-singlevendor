import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'

const useStyle = () => {
  const { colors } = useTheme()

  return StyleSheet.create({
    flex: {
      flex: 1
    },
    scrollViewContainer: {
      width: '100%',
      height: '100%'
    },
    subContainer: {
      width: '90%',
      height: '100%',
      alignSelf: 'center',
      ...alignment.MTmedium
    },
    line: {
      width: '100%',
      height: StyleSheet.hairlineWidth,
      ...alignment.MBsmall,
      backgroundColor: colors.horizontalLine
    }
  })
}
export default useStyle
