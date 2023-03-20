import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'
import { scale } from '../../utils/scaling'

const useStyle = () => {
  const { colors } = useTheme()

  return StyleSheet.create({
    flex: {
      flex: 1
    },
    scrollContent: {
      flexGrow: 1,
      backgroundColor: 'transparent'
    },
    whiteFont: {
      color: colors.fontWhite
    },
    textView: {
      marginHorizontal: -25,
      ...alignment.PLxSmall
    },
    headerContainer: {
      height: '25%',
      minHeight: scale(200),
      justifyContent: 'center',
      backgroundColor: 'transparent'
    },
    menuContainer: {
      flexGrow: 1,
      backgroundColor: 'transparent',
      justifyContent: 'space-between',
      ...alignment.PTlarge
    },
    drawerItem: {
      marginVertical: 0
    }
  })
}
export default useStyle
