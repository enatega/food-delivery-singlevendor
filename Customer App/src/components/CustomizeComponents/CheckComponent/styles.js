import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../../utils/alignment'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    flex: {
      flex: 1
    },
    mainContainer: {
      width: '100%',
      flexDirection: 'row',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.horizontalLine,
      ...alignment.PBsmall,
      ...alignment.MBsmall
    },
    leftContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    rightContainer: {
      justifyContent: 'center'
    }
  })
}
export default useStyle
