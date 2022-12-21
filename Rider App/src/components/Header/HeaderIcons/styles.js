import { StyleSheet } from 'react-native'
import { alignment } from '../../../utilities/alignment'

const styles = StyleSheet.create({
  leftIconPadding: {
    ...alignment.PLsmall,
    ...alignment.PRlarge
  },
  btnContainer: {
    backgroundColor: 'rgba(255, 255, 255,0.01)',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80
  }
})

export default styles
