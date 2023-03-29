import colors from '../../../utilities/colors'
import { scale } from '../../../utilities/scaling'
import { alignment } from '../../../utilities/alignment'

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: '10%',
    borderColor: colors.horizontalLine
  },
  leftContainer: {
    justifyContent: 'center',
    ...alignment.MRsmall
  },
  imgContainer: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.tagColor
  },
  rightContainer: {
    justifyContent: 'center',
    ...alignment.MTmedium
  }
}
