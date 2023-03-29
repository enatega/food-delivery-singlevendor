import { useTheme } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React, { useContext, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import ConfigurationContext from '../../../context/Configuration'
import { alignment } from '../../../utils/alignment'
import RadioButton from '../../FdRadioBtn/RadioBtn'
import TextDefault from '../../Text/TextDefault/TextDefault'
import useStyle from './styles'

function RadioComponent(props) {
  const styles = useStyle()
  const { colors } = useTheme()
  const [options] = useState(props.options)
  const [selected, setSelected] = useState(props.selected || null)
  const configuration = useContext(ConfigurationContext)

  function onPress(option) {
    setSelected(option)
    props.onPress(option)
  }
  return (
    <>
      {options.map(option => {
        const isChecked = selected._id === option._id
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress.bind(this, option)}
            key={option._id}
            style={styles.mainContainer}>
            <View style={styles.leftContainer}>
              <RadioButton
                size={13}
                outerColor={colors.radioOuterColor}
                innerColor={colors.radioColor}
                animation={'bounceIn'}
                isSelected={isChecked}
                onPress={onPress.bind(this, option)}
              />
              <TextDefault
                textColor={
                  isChecked ? colors.fontMainColor : colors.fontSecondColor
                }
                style={alignment.MLsmall}
                H5>
                {option.title}
              </TextDefault>
            </View>
            <View style={styles.rightContainer}>
              <TextDefault
                textColor={
                  isChecked ? colors.fontMainColor : colors.fontSecondColor
                }
                H5
                medium>{`${configuration.currency_symbol} ${option.price}`}</TextDefault>
            </View>
          </TouchableOpacity>
        )
      })}
    </>
  )
}

RadioComponent.propTypes = {
  selected: PropTypes.any,
  options: PropTypes.arrayOf(PropTypes.object),
  onPress: PropTypes.func
}
export default RadioComponent
