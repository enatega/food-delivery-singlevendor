import { StyleSheet } from 'react-native'
import { scale } from '../../utils/scaling'

const useStyle = () => {
  return StyleSheet.create({
    mainContainer: {
      width: scale(20),
      height: scale(20),
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
}
export default useStyle
