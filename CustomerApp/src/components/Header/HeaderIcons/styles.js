import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../../utils/alignment'
import { scale, verticalScale } from '../../../utils/scaling'

const useStyle = () => {
  const { colors } = useTheme()

  return StyleSheet.create({
    leftIconPadding: {
      ...alignment.PLsmall,
      ...alignment.PRlarge
    },
    rightContainer: {
      position: 'relative',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      ...alignment.PLsmall,
      ...alignment.PRsmall
    },
    imgContainer: {
      width: verticalScale(20),
      height: verticalScale(20)
    },
    absoluteContainer: {
      width: verticalScale(10),
      height: verticalScale(10),
      backgroundColor: colors.cardContainer,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: verticalScale(5),
      position: 'absolute',
      right: scale(8),
      top: scale(8)
    },
    touchAreaPassword: {
      width: '40%',
      height: '70%',
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    titlePasswordText: {
      backgroundColor: colors.cardContainer,
      height: '75%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: scale(7),
      ...alignment.PLxSmall,
      ...alignment.PRxSmall
    },
    btnContainer: {
      backgroundColor: 'rgba(255, 255, 255,0.01)',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      width: 80
    },
    cartCount: {
      backgroundColor: colors.blueColor,
      top: scale(11),
      right: scale(-5),
      width: scale(15),
      height: scale(15),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      position: 'absolute'
    }
  })
}

export default useStyle
