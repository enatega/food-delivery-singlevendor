import { useNavigation, useTheme } from '@react-navigation/native'
import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { CustomIcon } from '../../CustomIcon'
import PropTypes from 'prop-types'
import { TextDefault } from '../../Text'
import useStyle from './styles'
import { scale } from '../../../utils/scaling'
import { ICONS_NAME } from '../../../utils/constant'

function RegistrationHeader({ title, back = false }) {
  const styles = useStyle()
  const navigation = useNavigation()
  const { colors } = useTheme()

  return (
    <View style={styles.headerContainer}>
      {back ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.backBtnWidth, styles.backBtn]}>
          <CustomIcon
            name={ICONS_NAME.Back}
            size={scale(20)}
            color={colors.iconColor}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.backBtnWidth} />
      )}
      <TextDefault center H4 bold>
        {title || ''}
      </TextDefault>
      <View style={styles.backBtnWidth} />
    </View>
  )
}

RegistrationHeader.propTypes = {
  title: PropTypes.string.isRequired,
  back: PropTypes.bool
}

export default React.memo(RegistrationHeader)
