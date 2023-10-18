import { useTheme } from '@react-navigation/native'
import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import { alignment } from '../../../utils/alignment'
import TextDefault from '../../Text'
import styles from './styles'

function TitleComponent(props) {
  const { colors } = useTheme()

  return (
    <View style={styles.mainContainer}>
      <View style={styles.leftContainer}>
        <TextDefault numberOfLines={1} H5 bold>
          {props.title}
        </TextDefault>
        <TextDefault
          numberOfLines={1}
          textColor={colors.fontSecondColor}
          H5
          bold>
          {props.subTitle}
        </TextDefault>
      </View>
      <TextDefault
        style={[alignment.PLxSmall, alignment.PRxSmall]}
        textColor={
          props.error === true ? colors.errorColor : colors.placeHolderColor
        }
        H5
        medium
        center>
        ({props.status})
      </TextDefault>
    </View>
  )
}
TitleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  error: PropTypes.bool,
  status: PropTypes.string
}

export default TitleComponent
