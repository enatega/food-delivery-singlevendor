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
    headingLanguage: {
      width: '85%',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center'
    },
    shadow: {
      shadowOffset: { width: scale(2), height: scale(5) },
      shadowColor: colors.lightBackground,
      shadowOpacity: 1,
      shadowRadius: scale(2),
      elevation: 0,
      borderWidth: 1,
      borderColor: colors.lightBackground
    },
    mainContainer: {
      ...alignment.PLsmall,
      ...alignment.PRsmall
    },
    languageContainer: {
      width: '100%',
      borderRadius: scale(20),
      backgroundColor: colors.cardContainer,
      ...alignment.PRmedium,
      ...alignment.PTmedium,
      ...alignment.PBmedium,
      ...alignment.PLmedium
    },
    changeLanguage: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: scale(10),
      width: '100%',
      height: verticalScale(18)
    },
    button: {
      width: '15%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    notificationContainer: {
      width: '100%',
      backgroundColor: colors.cardContainer,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: moderateScale(20),
      ...alignment.PTmedium,
      ...alignment.PBmedium,
      ...alignment.PRmedium,
      ...alignment.PLmedium,
      ...alignment.MTmedium
    },
    notificationChekboxContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      ...alignment.MRsmall
    },
    versionContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      ...alignment.MTlarge
    },
    modalContainer: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: verticalScale(4),
      ...alignment.Plarge
    },
    radioContainer: {
      width: '100%',
      backgroundColor: '#FFF',
      flexDirection: 'row',
      alignItems: 'center',
      ...alignment.PTxSmall,
      ...alignment.PBxSmall
    },
    modalButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    modalButtons: {
      ...alignment.Msmall,
      marginBottom: 0
    }
  })
}

export default useStyle
