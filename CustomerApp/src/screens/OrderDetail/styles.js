import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    flex: {
      flex: 1
    },
    container: {
      ...alignment.PLmedium,
      ...alignment.PRmedium,
      ...alignment.PTlarge,
      ...alignment.PBlarge
    },
    marginBottom20: {
      ...alignment.MBlarge
    },
    marginBottom10: {
      ...alignment.MBsmall
    },
    orderReceipt: {
      ...alignment.PLmedium,
      ...alignment.PRmedium,
      ...alignment.PBlarge
    },
    horizontalLine: {
      borderBottomColor: colors.horizontalLine,
      borderBottomWidth: StyleSheet.hairlineWidth
    },
    floatView: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center'
    }
  })
}
export default useStyle
