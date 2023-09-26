import { SvgIcon, useTheme } from "@material-ui/core";
import * as React from "react";

function FacebookIcon(props) {
  const theme = useTheme();
  return (
    <SvgIcon
    xmlns="http://www.w3.org/2000/svg" 
    width="9.859" 
    height="19.716" 
    viewBox="0 0 9.859 19.716"
      style={{ color: theme.palette.common.white }}
      {...props}
    >
   <path fill="#1976d2" d="M14.246 3.274h1.8V.139A23.242 23.242 0 0 0 13.424 0c-2.6 0-4.373 1.632-4.373 4.632v2.761H6.187v3.5h2.864v8.818h3.511V10.9h2.748l.436-3.5h-3.185V4.98c0-1.013.274-1.706 1.685-1.706z" transform="translate(-6.187)"/>
    </SvgIcon>

  );
}

export default FacebookIcon;
