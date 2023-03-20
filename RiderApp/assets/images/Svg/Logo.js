import * as React from 'react'
import Svg, { G, Path, Text, TSpan } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */

function Logo(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={132}
      height={78.635}
      viewBox="0 0 132 78.635"
      {...props}>
      <G id="prefix__Group_371" transform="translate(-122 -367)">
        <Path
          id="prefix__Path_27625"
          fill="#febb2c"
          d="M10 0h122l-10 43H0z"
          transform="translate(122 402.635)"
        />
        <Text
          id="prefix__enatega"
          fill="#0b0b0b"
          fontSize={32}
          fontStyle="italic"
          fontWeight={700}
          className="prefix__cls-2"
          transform="translate(188 394)">
          <TSpan x={-62.4} y={0}>
            {'enatega'}
          </TSpan>
        </Text>
        <Text
          id="prefix__rider"
          fill="#0b0b0b"
          fontSize={32}
          fontStyle="italic"
          fontWeight={700}
          transform="translate(188 435)">
          <TSpan x={-36.752} y={0}>
            {'rider'}
          </TSpan>
        </Text>
      </G>
    </Svg>
  )
}

export default React.memo(Logo)
