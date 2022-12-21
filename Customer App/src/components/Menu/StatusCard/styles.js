import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../../utils/alignment'
import { moderateScale, scale } from '../../../utils/scaling'

const useStyle = () => {
  const { colors } = useTheme()
  return StyleSheet.create({
    mainContainer: {
      flexGrow: 1,
      marginLeft: scale(5),
      ...alignment.PBmedium
    },
    lightText: {
      color: colors.fontSecondColor
    },
    statusContainer: {
      marginTop: 20,
      width: scale(275),
      padding: moderateScale(15),
      backgroundColor: '#f7f7fb',
      borderRadius: 10,
      borderStyle: 'dashed',
      borderColor: '#a5a5a5',
      borderWidth: 2
      // shadowOpacity: 1,
      // shadowRadius: verticalScale(4),
      // borderWidth: 1,
      // borderColor: '#FFF',
      // ...alignment.PBmedium,
      // ...alignment.MBsmall,
      // ...alignment.MTxSmall,
      // ...alignment.MLmedium
    },
    textContainer: {},
    statusCircleContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      ...alignment.MTsmall,
      ...alignment.MBsmall
    },
    statusCircle: {
      ...alignment.MTxSmall,
      ...alignment.MBxSmall,
      ...alignment.MRxSmall
    }
  })
}
export default useStyle
