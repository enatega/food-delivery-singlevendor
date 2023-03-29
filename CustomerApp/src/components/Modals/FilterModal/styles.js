import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../../utils/alignment'
import { moderateScale, scale, verticalScale } from '../../../utils/scaling'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    width100: {
      width: '100%'
    },
    line: {
      width: '100%',
      alignSelf: 'center',
      borderBottomColor: colors.horizontalLine,
      borderBottomWidth: StyleSheet.hairlineWidth,
      ...alignment.MTmedium,
      ...alignment.MBmedium
    },
    sotRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      alignSelf: 'center',
      justifyContent: 'space-between',
      borderBottomColor: colors.horizontalLine,
      borderBottomWidth: StyleSheet.hairlineWidth,
      ...alignment.PTmedium,
      ...alignment.PBmedium
    },
    priceRangeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: verticalScale(10),
      paddingBottom: verticalScale(10),
      ...alignment.PRlarge
    },
    trackStyle: {
      height: 10,
      borderRadius: 10,
      backgroundColor: colors.horizontalLine,
      borderStyle: 'solid',
      borderWidth: 0,
      borderColor: 'lightgray'
    },
    selectedMarker: {
      width: scale(15),
      height: scale(30)
    },
    markerStyle: {
      width: scale(12),
      height: scale(25),
      backgroundColor: colors.tagColor,
      shadowColor: 'rgba(0, 0, 0, 0.15)',
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowRadius: 9,
      shadowOpacity: 1,
      elevation: 3,
      marginTop: 8
    },
    applyBtn: {
      width: '100%',
      maxHeight: scale(50),
      backgroundColor: colors.buttonBackgroundBlue,
      alignSelf: 'center',
      alignItems: 'center',
      padding: moderateScale(14),
      borderRadius: 20,
      ...alignment.MTmedium
    }
  })
}
export default useStyle
