import { StyleSheet } from 'react-native'
import { alignment } from '../../../utils/alignment'
const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    flexDirection: 'row',
    ...alignment.PTsmall,
    ...alignment.PBxSmall
  },
  titleContainer: {
    width: '70%',
    ...alignment.PRxSmall,
    justifyContent: 'center'
  },
  priceContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  descContainer: {
    width: '100%',
    ...alignment.MBsmall
  }
})
export default styles
