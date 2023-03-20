import * as React from 'react'
import Svg, { Defs, G, Path, Circle } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: style */

function EmptyAddress(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={103.104}
      height={206.775}
      viewBox="0 0 103.104 206.775"
      {...props}>
      <Defs></Defs>
      <G id="prefix__Group_451" transform="translate(-103.265 -315.494)">
        <Path
          id="prefix__Path_27770"
          fill="#3f3d56"
          d="M188.794 49.138h-1.136V18.014A18.014 18.014 0 00169.645 0H103.7a18.014 18.014 0 00-18.009 18.014v170.748a18.014 18.014 0 0018.009 18.013h65.94a18.014 18.014 0 0018.014-18.014V71.292h1.136z"
          transform="translate(17.574 315.494)"
        />
        <Path
          id="prefix__Path_27771"
          d="M195.973 29.6v170.5a13.441 13.441 0 01-13.429 13.453h-66.28a13.443 13.443 0 01-13.453-13.434V29.6a13.443 13.443 0 0113.434-13.453h8.055a6.39 6.39 0 005.918 8.8H168a6.39 6.39 0 005.918-8.8h8.607a13.441 13.441 0 0113.453 13.429z"
          fill="#fff"
          transform="translate(5.425 304.038)"
        />
        <Path
          id="prefix__Path_27772"
          fill="#e5e5e5"
          d="M195.973 54.82v-5.807h-8.79v-32.04a13.411 13.411 0 00-4.663-.83h-1.144v32.87h-30.488V24.947h-5.808v24.066h-25.552v-32.87h-3.264a13.325 13.325 0 00-2.544.241v32.629h-10.909v5.807h10.909v13.433l-10.909 6.3v6.708l10.909-6.3v39.966h-10.909v5.807h10.909v57.784h-10.909v5.807h10.909V213.3a13.328 13.328 0 002.544.241h3.264v-29.22h25.552v29.22h5.807v-29.22h30.489v29.22h1.144a13.412 13.412 0 004.663-.83v-28.386h8.79v-5.807h-8.79v-25.262h8.711v-5.807h-8.711v-26.715h8.79v-5.807h-8.79V79.5h8.79v-5.806h-8.79V54.82zm-58.986 0L119.528 64.9V54.82zm-17.46 16.786l25.553-14.753v58.074h-25.552zm0 106.911v-57.783h25.553v57.784zm61.849 0h-30.488v-25.262h30.489zm0-31.07h-30.488v-26.713h30.489zm0-32.522h-30.488V79.5h30.489zm0-41.233h-30.488V54.82h30.489z"
          transform="translate(5.425 304.038)"
        />
        <Path
          id="prefix__Path_27773"
          d="M277.166 133.105c0 18.442-33.393 59.526-33.393 59.526s-33.393-41.084-33.393-59.526a33.393 33.393 0 1166.785 0z"
          fill="#febb2c"
          transform="translate(-70.909 244.735)"
        />
        <Path
          id="prefix__Path_27774"
          d="M296.873 161.458a19.745 19.745 0 11-19.745-19.745 19.736 19.736 0 0119.745 19.727z"
          fill="#fff"
          transform="translate(-104.262 214.931)"
        />
        <Circle
          id="prefix__Ellipse_321"
          cx={7.356}
          cy={7.356}
          r={7.356}
          fill="#febb2c"
          transform="translate(165.44 369.471)"
        />
        <Path
          id="prefix__Path_27775"
          d="M310.059 249.527a19.766 19.766 0 01-21.217 0 11.034 11.034 0 0121.217 0z"
          fill="#febb2c"
          transform="translate(-126.588 144.1)"
        />
        <Circle
          id="prefix__Ellipse_322"
          cx={9.001}
          cy={9.001}
          r={9.001}
          fill="#febb2c"
          transform="translate(163.863 443.464)"
        />
      </G>
    </Svg>
  )
}

export default React.memo(EmptyAddress)
