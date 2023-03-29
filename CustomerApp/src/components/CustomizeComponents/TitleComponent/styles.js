import { StyleSheet } from 'react-native'
import { alignment } from '../../../utils/alignment'

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    ...alignment.MBmedium,
    ...alignment.MTsmall
  },
  leftContainer: {
    // width: '70%'
  },
  rightContainer: {
    width: '30%'
  }
})
export default styles
