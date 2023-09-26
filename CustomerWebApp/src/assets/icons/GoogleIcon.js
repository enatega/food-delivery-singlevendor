import { SvgIcon, useTheme } from "@material-ui/core";
import * as React from "react";

function GoogleIcon(props) {
  const theme = useTheme();
  return (
    <SvgIcon
    xmlns="http://www.w3.org/2000/svg" 
    width="17.606" 
    height="17.606" 
    viewBox="0 0 17.606 17.606"
      style={{ color: theme.palette.common.white }}
      {...props}
    >
    <path fill="#fbbb00" d="M3.9 144.153l-.613 2.288-2.24.047a8.819 8.819 0 0 1-.065-8.22l1.994.366.874 1.982a5.254 5.254 0 0 0 .049 3.537z" transform="translate(0 -133.513)"/>
    <path fill="#518ef8" d="M270.084 208.176a8.8 8.8 0 0 1-3.138 8.51l-2.512-.128-.356-2.219a5.247 5.247 0 0 0 2.257-2.679h-4.707v-3.483h8.456z" transform="translate(-252.631 -201.017)"/>
    <path fill="#28b446" d="M43.774 314.437a8.806 8.806 0 0 1-13.265-2.693l2.853-2.335a5.236 5.236 0 0 0 7.545 2.681z" transform="translate(-29.46 -298.769)"/>
    <path fill="#f14336" d="M42.062 2.027L39.21 4.361A5.235 5.235 0 0 0 31.492 7.1l-2.868-2.345a8.805 8.805 0 0 1 13.438-2.728z" transform="translate(-27.64)"/>
    </SvgIcon>
  );
}

export default GoogleIcon;
