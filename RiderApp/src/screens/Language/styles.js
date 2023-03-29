import colors from '../../utilities/colors'
import { verticalScale, scale } from '../../utilities/scaling'
import { alignment } from '../../utilities/alignment'
import { StyleSheet } from 'react-native'

export default {
  flex: {
    flex: 1
  },
  mainView: {
    justifyContent: 'space-between',
    backgroundColor: colors.cartContainer
  },
  headingLanguage: {
    width: '85%',
    justifyContent: 'center'
  },
  languageContainer: {
    width: '80%',
    alignSelf: 'center',
    ...alignment.PRmedium,
    ...alignment.PTsmall,
    ...alignment.PBlarge,
    ...alignment.PLmedium,
    ...alignment.MTmedium
  },
  shadow: {
    shadowOffset: { width: 0, height: scale(2) },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: scale(1),
    elevation: 2,
    borderWidth: 0.4,
    borderColor: '#e1e1e1'
  },
  changeLanguage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: verticalScale(40)
  },
  button: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    width: '100%',
    backgroundColor: colors.cartContainer,
    borderRadius: verticalScale(4),
    ...alignment.Plarge
  },
  radioContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.horizontalLine,
    alignItems: 'center',
    ...alignment.PTxSmall,
    ...alignment.PBmedium,
    ...alignment.MBmedium
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  modalButtons: {
    ...alignment.Msmall,
    marginBottom: 0
  }
}
