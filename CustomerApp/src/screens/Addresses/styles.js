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
      width: '100%',
      alignItems: 'center'
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
    image: {
      justifyContent: 'center',
      alignItems: 'center',
      ...alignment.MBlarge
    },
    descriptionEmpty: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    width100: {
      width: '100%'
    },
    titleAddress: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    iconButton: {
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
    adressBtn: {
      backgroundColor: colors.blueColor,
      height: scale(50),
      borderRadius: 10,
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      ...alignment.MTlarge
    },
    addressDetail: {
      width: '100%',
      alignSelf: 'center',
      ...alignment.PTsmall
    },
    line: {
      width: '100%',
      alignSelf: 'center',
      borderBottomColor: colors.horizontalLine,
      borderBottomWidth: StyleSheet.hairlineWidth,
      ...alignment.MTsmall,
      ...alignment.MBmedium
    }
  })
}
export default useStyle
