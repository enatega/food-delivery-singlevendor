import { Dimensions, StyleSheet } from 'react-native'
import { moderateScale } from '../../../utils/scaling'
const { height } = Dimensions.get('window')

export const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    // borderTopEndRadius:moderateScale(20),
    // borderTopStartRadius:moderateScale(20),
    height: height * 0.22
  }
})
