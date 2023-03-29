import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styles from './styles.js'
import TextDefault from '../../Text/TextDefault/TextDefault.js'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { scale } from '../../../utilities/scaling.js'
import colors from '../../../utilities/colors.js'
import PropTypes from 'prop-types'

const NavItem = props => (
  <View style={styles.Flex}>
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={props.onPress}>
      <View style={styles.leftContainer}>
        {props.icon === 'shopping-bag' ? (
          <Entypo
            name={props.icon}
            size={scale(20)}
            color={colors.fontSecondColor}
          />
        ) : (
          <FontAwesome
            name={props.icon}
            size={scale(20)}
            color={colors.fontSecondColor}
          />
        )}
      </View>
      <View style={styles.rightContainer}>
        <TextDefault bolder H5 textColor={colors.fontSecondColor}>
          {props.title}
        </TextDefault>
      </View>
    </TouchableOpacity>
  </View>
)
NavItem.propTypes = {
  onPress: PropTypes.func,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired
}
export default NavItem
