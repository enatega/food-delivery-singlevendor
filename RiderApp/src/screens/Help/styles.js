import { StyleSheet } from 'react-native'
import { alignment } from '../../utilities/alignment'
import colors from '../../utilities/colors'
import { moderateScale, verticalScale } from '../../utilities/scaling'

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.themeBackground
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: colors.themeBackground,
    borderRadius: moderateScale(10),
    elevation: 2,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: verticalScale(2)
    },
    borderColor: 'black',
    shadowOpacity: 0.1,
    ...alignment.PTlarge,
    ...alignment.PBlarge,
    ...alignment.PLlarge,
    ...alignment.PRlarge,
    ...alignment.MBlarge
  }
})
export default styles
