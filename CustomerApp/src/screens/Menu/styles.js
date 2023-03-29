import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'
import { verticalScale } from '../../utils/scaling'

const useStyle = () => {
  const { colors } = useTheme()

  return StyleSheet.create({
    flex: {
      flex: 1
    },
    backgroundColor: {
      backgroundColor: colors.background
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    mainContentContainer: {
      width: '100%',
      ...alignment.PLsmall,
      ...alignment.PRsmall,
      alignSelf: 'center'
    },
    cardViewContainer: {
      width: '95%',
      alignSelf: 'center',
      height: verticalScale(165),
      elevation: 7,
      borderRadius: 30,
      shadowColor: colors.shadowColor,
      shadowOffset: {
        width: 0,
        height: verticalScale(3)
      },
      shadowOpacity: 1,
      shadowRadius: verticalScale(4),
      borderWidth: 0,
      borderColor: colors.white,
      ...alignment.MTxSmall,
      ...alignment.MBsmall
    },
    contentContainer: {
      flexGrow: 1,
      ...alignment.MTxSmall,
      ...alignment.PBlarge
    }
  })
}

export default useStyle
