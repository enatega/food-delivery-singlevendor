import { Platform, StyleSheet } from 'react-native'
import { alignment } from '../../utilities/alignment'
import colors from '../../utilities/colors'
import { scale } from '../../utilities/scaling'

const useStyle = () => {
  return StyleSheet.create({
    flex: {
      flex: 1
    },
    mainContainer: {
      marginTop: 30,
      backgroundColor: colors.cartContainer,
      borderTopEndRadius: scale(20),
      borderTopStartRadius: scale(20),
      shadowColor: colors.shadowColor,
      shadowOffset: {
        width: 0,
        height: -5
      },
      shadowOpacity: 0.4,
      shadowRadius: 10,
      elevation: 5,
      ...alignment.Plarge
    },
    header: {
      //   backgroundColor: 'blue',
      flexDirection: 'row',
      alignItems: 'center',
      ...alignment.PBmedium,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.horizontalLine
    },
    rightBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.buttonBackground,
      width: scale(30),
      aspectRatio: 1,
      borderRadius: scale(10)
    },
    sendBtn: {
      justifyContent: 'center'
    },
    inputContainer: {
      backgroundColor: colors.lightBackground,
      borderTopWidth: 0,
      minHeight: scale(48),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: scale(25),
      ...alignment.PRsmall,
      ...alignment.PLxSmall
    },
    inputStyle: {
      paddingTop: Platform.OS === 'ios' ? 8 : -8,
      paddingBottom: 0,
      textAlignVertical: 'center'
    }
  })
}

export default useStyle
