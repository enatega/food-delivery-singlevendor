import { useTheme } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Spinner from '../../../components/Spinner/Spinner'
import TextDefault from '../../../components/Text/TextDefault/TextDefault'
import { COLORS } from '../../../Theme'
import { alignment } from '../../../utils/alignment'
import { ICONS_NAME } from '../../../utils/constant'
import { scale } from '../../../utils/scaling'
import { CustomIcon } from '../../CustomIcon'
import useStyle from './styles'
import i18n from '../../../../i18n'

const FdEmailBtn = props => {
  const styles = useStyle()
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.mainContainer}
      onPress={props.onPress}>
      {props.loadingIcon ? (
        <Spinner backColor="rgba(0,0,0,0.1)" spinnerColor={colors.tagColor} />
      ) : (
        <>
          <CustomIcon
            style={styles.marginLeft5}
            name={ICONS_NAME.Logo}
            color={COLORS.primary}
            size={scale(19)}
          />
          <TextDefault style={alignment.MLxSmall} bold>
            {i18n.t('signupEmail')}
          </TextDefault>
        </>
      )}
    </TouchableOpacity>
  )
}
FdEmailBtn.propTypes = {
  onPress: PropTypes.func,
  loadingIcon: PropTypes.bool
}
export default FdEmailBtn
