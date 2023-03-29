import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../../utils/alignment'

const useStyle = () => {
  const { colors } = useTheme()

  return StyleSheet.create({
    headingContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      ...alignment.PTlarge,
      ...alignment.PBlarge
    },
    line: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.text,
      opacity: 0.6
    }
  })
}

export default useStyle
