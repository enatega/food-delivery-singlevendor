import { useTheme } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import Spinner from '../../../components/Spinner/Spinner'
import TextDefault from '../../../components/Text/TextDefault/TextDefault'
import { alignment } from '../../../utils/alignment'
import { moderateScale } from '../../../utils/scaling'
import useStyle from './styles'
import i18n from '../../../../i18n'

const FdGoogleBtn = props => {
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
          <Image
            source={{
              uri: 'https://pngimg.com/uploads/google/google_PNG19635.png'
            }}
            style={[
              {
                width: 25,
                height: 25,
                marginLeft: moderateScale(10)
              }
            ]}
          />
          <TextDefault style={alignment.MLlarge} bold>
            {i18n.t('signupGoogle')}
          </TextDefault>
        </>
      )}
    </TouchableOpacity>
  )
}

FdGoogleBtn.propTypes = {
  onPress: PropTypes.func,
  loadingIcon: PropTypes.bool,
  onPressIn: PropTypes.func
}
export default FdGoogleBtn
