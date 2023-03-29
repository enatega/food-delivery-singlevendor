import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../../utils/alignment'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    mainContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
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
