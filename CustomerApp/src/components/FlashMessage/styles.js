import { textStyles } from '../../utils/textStyles'
import { alignment } from '../../utils/alignment'

export default {
  text: {
    ...textStyles.Bold,
    ...textStyles.H5,
    ...alignment.PTxSmall
  },
  container: {
    borderRadius: 50
  }
}
