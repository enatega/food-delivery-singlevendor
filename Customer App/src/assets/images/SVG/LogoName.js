import * as React from 'react'
import Svg, { Text, TSpan } from 'react-native-svg'

function LogoName(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={125}
      height={32}
      viewBox="0 0 125 32"
      {...props}>
      <Text
        fill="#0b0b0b"
        fontFamily="AmsiPro-BoldItalic"
        fontSize={32}
        fontStyle="italic"
        fontWeight={700}
        transform="translate(0 27)">
        <TSpan x={0} y={0}>
          {'enatega'}
        </TSpan>
      </Text>
    </Svg>
  )
}

export default React.memo(LogoName)
