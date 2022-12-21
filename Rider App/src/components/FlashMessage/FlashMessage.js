import { showMessage } from 'react-native-flash-message'
import PropTypes from 'prop-types'
import { scale } from '../../utilities/scaling'
import { textStyles } from '../../utilities/textStyles'

export const FlashMessage = props => {
  showMessage({
    backgroundColor: '#323232',
    message: props.message,
    type: 'info',
    position: 'bottom',
    titleStyle: {
      fontSize: scale(12),
      ...textStyles.Bold
    }
  })
}
FlashMessage.propTypes = {
  message: PropTypes.string.isRequired
}
