import { useTheme } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { alignment } from '../../../utils/alignment'
import { scale } from '../../../utils/scaling'

const useStyle = () => {
  const { colors } = useTheme()

  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.headerBackground
    },
    logInContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
      ...alignment.PBlarge,
      ...alignment.PLmedium
    },
    whiteFont: {
      color: colors.fontWhite
    },
    loggedInContainer: {
      flex: 1,
      justifyContent: 'center',
      ...alignment.Plarge
    },
    imgContainer: {
      width: scale(70),
      height: scale(70),
      borderRadius: scale(15),
      borderStyle: 'dashed',
      borderColor: colors.cardContainer,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: 'transparent',
      padding: 2,
      ...alignment.MBsmall
    },
    imgResponsive: {
      width: '100%',
      height: '100%',
      borderRadius: scale(15)
    },
    loadingView: {
      backgroundColor: 'transparent',
      width: '100%',
      height: '100%'
    }
  })
}
export default useStyle
