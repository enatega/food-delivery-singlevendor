import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../utils/alignment'
import { moderateScale, scale, verticalScale } from '../../utils/scaling'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    flex: {
      flex: 1
    },
    containerInfo: {
      flex: 1,
      alignItems: 'center',
      position: 'relative'
    },
    contentContainer: {
      flexGrow: 1,
      backgroundColor: colors.cardContainer,
      shadowOffset: { width: 2, height: 2 },
      shadowColor: colors.white,
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 3,
      borderRadius: moderateScale(18),
      ...alignment.Mlarge,
      ...alignment.Plarge
    },
    editButton: {
      width: scale(28),
      aspectRatio: 1,
      backgroundColor: colors.lightBackground,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: scale(8),
      elevation: 3,
      shadowColor: colors.shadowColor,
      shadowOffset: {
        width: 0,
        height: verticalScale(1)
      },
      shadowOpacity: 0.5,
      shadowRadius: verticalScale(1)
    },
    width100: {
      width: '100%'
    },
    titleAddress: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    homeIcon: {
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    addressDetail: {
      width: '80%',
      alignSelf: 'flex-end'
    },
    line: {
      width: '80%',
      alignSelf: 'flex-end',
      borderBottomColor: 'lightgrey',
      borderBottomWidth: StyleSheet.hairlineWidth,
      ...alignment.MTmedium,
      ...alignment.MBmedium
    }
  })
}
export default useStyle
