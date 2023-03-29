import { useHeaderHeight } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from '../../utilities/colors'
import { verticalScale } from '../../utilities/scaling'

const useStyle = () => {
  const inset = useSafeAreaInsets()
  const headerHeight = useHeaderHeight()

  return StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: colors.cartContainer
    },
    wrapperView: {
      backgroundColor: colors.themeBackground,
      paddingTop: headerHeight,
      paddingBottom: inset.bottom
    },
    imageContainer: {
      backgroundColor: colors.cartContainer,
      width: '100%',
      height: verticalScale(130),
      alignSelf: 'center'
    }
  })
}

export default useStyle
