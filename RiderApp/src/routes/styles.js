import { StyleSheet } from 'react-native'
import colors from '../utilities/colors'
import { scale } from '../utilities/scaling'

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -scale(6),
    top: 0,
    borderRadius: scale(9),
    width: scale(18),
    height: scale(18),
    justifyContent: 'center',
    alignItems: 'center'
  },
  outerView: {
    position: 'absolute',
    width: '100%',
    height: '80%',
    top: '10%',
    left: 10,
    bottom: 0,
    backgroundColor: colors.fontMainColor,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10
  },
  innerView: {
    position: 'absolute',
    width: '100%',
    height: '90%',
    top: '5%',
    bottom: 0,
    backgroundColor: colors.fontMainColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 10
  },
  animatedView: {
    flex: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 15
  },
  closeView: {
    position: 'absolute',
    top: 70,
    left: 50
  }
})

export default styles
