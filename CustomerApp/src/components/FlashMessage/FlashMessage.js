import PropTypes from 'prop-types'
import { showMessage } from 'react-native-flash-message'
import { scale } from '../../utils/scaling'
import { textStyles } from '../../utils/textStyles'

export const FlashMessage = props => {
  showMessage({
    backgroundColor: '#323232',
    message: props.message,
    type: 'info',
    position: 'bottom',
    titleStyle: {
      fontSize: scale(12),
      ...textStyles.Medium
    }
  })
}
FlashMessage.propTypes = {
  message: PropTypes.string.isRequired
}
