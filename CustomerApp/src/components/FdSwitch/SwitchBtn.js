import { useTheme } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React from 'react'
import { Switch, TouchableOpacity } from 'react-native'
import useStyle from './styles'

function SwitchBtn(props) {
  const styles = useStyle()
  const { colors } = useTheme()
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={[
        styles.mainContainer,
        props.checked
          ? { backgroundColor: colors.selected }
          : { backgroundColor: colors.fontWhite }
      ]}>
      <Switch
        trackColor={{
          false: colors.iconColor,
          true: colors.selected
        }}
        thumbColor={colors.fontWhite}
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.onPress}
        value={props.isEnabled}
      />
    </TouchableOpacity>
  )
}
SwitchBtn.propTypes = {
  onPress: PropTypes.func,
  checked: PropTypes.bool,
  isEnabled: PropTypes.bool
}
export default SwitchBtn
