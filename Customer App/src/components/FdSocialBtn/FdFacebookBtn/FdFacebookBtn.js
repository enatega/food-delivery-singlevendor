import { FontAwesome } from '@expo/vector-icons'
import { useTheme } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Spinner from '../../../components/Spinner/Spinner'
import TextDefault from '../../../components/Text/TextDefault/TextDefault'
import { alignment } from '../../../utils/alignment'
import { scale } from '../../../utils/scaling'
import useStyle from './styles'

const FdFacebookBtn = props => {
  const styles = useStyle()
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.mainContainer}
      onPressIn={props.onPressIn}
      onPress={props.onPress}>
      {props.loadingIcon ? (
        <Spinner backColor="rgba(0,0,0,0.1)" spinnerColor={colors.tagColor} />
      ) : (
        <>
          <FontAwesome
            style={styles.marginLeft5}
            name="facebook"
            size={scale(19)}
            color="#3b5998"
          />
          <TextDefault style={alignment.MLsmall} bold>
            Signup with Facebook
          </TextDefault>
        </>
      )}
    </TouchableOpacity>
  )
}
FdFacebookBtn.propTypes = {
  onPress: PropTypes.func,
  loadingIcon: PropTypes.bool,
  onPressIn: PropTypes.func
}
export default FdFacebookBtn
