import { useTheme } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { alignment } from '../../../utils/alignment'
import EnategaImage from '../../EnategaImage/EnategaImage'
import { TextDefault } from '../../Text'
import useStyle from './styles'
function MenuCard(props) {
  const { colors } = useTheme()
  const styles = useStyle()
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.flex}
      onPress={props.onPress}>
      <View style={styles.container}>
        <EnategaImage
          imgStyle={styles.imgResponsive}
          imgSource={props.image ? { uri: props.image } : undefined}
          spinnerProps={{ style: styles.loadingView }}
        />
        <View style={styles.textContainer}>
          <TextDefault
            numberOfLines={1}
            textColor={colors.fontWhite}
            H4
            bolder
            style={alignment.MBxSmall}>
            {props.title}
          </TextDefault>
          <TextDefault numberOfLines={1} textColor={colors.fontWhite} medium>
            {props.description}
          </TextDefault>
        </View>
      </View>
    </TouchableOpacity>
  )
}
MenuCard.propTypes = {
  onPress: PropTypes.func,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string
}
export default MenuCard
