import { useHeaderHeight } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scale, verticalScale } from '../../utilities/scaling'

const useStyle = () => {
  const inset = useSafeAreaInsets()
  const headerHeight = useHeaderHeight()

  return StyleSheet.create({
    flex: {
      flex: 1
    },
    bottom: {
      paddingBottom: inset.bottom
    },
    imageContainer: {
      width: '100%',
      paddingTop: headerHeight,
      height: verticalScale(270)
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '65%',
      padding: '5%'
    },
    toggleContainer: {
      width: '65%',
      borderRadius: scale(10),
      justifyContent: 'space-between',
      height: verticalScale(50),
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: scale(10),
      backgroundColor: 'white',
      marginTop: verticalScale(20),
      alignSelf: 'center'
    },
    toggleBtn: {
      justifyContent: 'center',
      height: '70%',
      alignItems: 'center',
      width: '47%',
      borderRadius: scale(10)
    }
  })
}

export default useStyle
