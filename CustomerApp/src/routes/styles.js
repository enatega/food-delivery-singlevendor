import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  outerView: {
    position: 'absolute',
    width: '100%',
    height: '80%',
    top: '10%',
    left: 10,
    bottom: 0,
    backgroundColor: 'rgba(243, 244, 245, 0.8)',
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
    backgroundColor: 'rgba(251, 251, 252, 0.95)',
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
