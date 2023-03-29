import { StyleSheet } from 'react-native'

const useStyle = () => {
  return StyleSheet.create({
    imgContainer: {
      width: 50,
      height: 50,
      borderRadius: 8,
      overflow: 'hidden'
    },
    imgResponsive: {
      flex: 1,
      backgroundColor: 'white',
      height: undefined,
      width: undefined
    }
  })
}

export default useStyle
