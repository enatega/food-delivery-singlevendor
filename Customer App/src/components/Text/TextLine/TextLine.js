import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import TextDefault from '../TextDefault/TextDefault'
import useStyle from './styles'

const TextLine = props => {
  const styles = useStyle()
  return (
    <View style={styles.headingContainer}>
      <View style={[styles.line, { width: props.lineWidth }]} />
      <TextDefault style={{ width: props.textWidth }} H5 bold center uppercase>
        {props.headerName}
      </TextDefault>
      <View style={[styles.line, { width: props.lineWidth }]} />
    </View>
  )
}

TextLine.propTypes = {
  headerName: PropTypes.string.isRequired,
  lineWidth: PropTypes.string.isRequired,
  textWidth: PropTypes.string.isRequired
}
export default TextLine
