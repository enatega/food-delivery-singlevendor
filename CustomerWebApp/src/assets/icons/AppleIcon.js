import { SvgIcon, useTheme } from "@material-ui/core";
import * as React from "react";

function AppleIcon(props) {
  const theme = useTheme();
  return (
    <SvgIcon
    xmlns="http://www.w3.org/2000/svg" 
    width="17.607" 
    height="20.613" 
    viewBox="0 0 17.607 20.613"
      style={{ color: theme.palette.common.black }}
      {...props}
    >
   <defs>
        <style>
            .cls-1{"#0b0b0b"}
        </style>
    </defs>
    <g id="apple" transform="translate(-37.336)">
        <g id="Group_223" transform="translate(45.798)">
            <g id="Group_222" transform="translate(0)">
                <path id="Path_27560" d="M251.727 0a4.837 4.837 0 0 0-3.127 1.7 4.2 4.2 0 0 0-1.03 3.26 4.082 4.082 0 0 0 3.16-1.614A4.535 4.535 0 0 0 251.727 0z" class="cls-1" transform="translate(-247.522)"/>
            </g>
        </g>
        <g id="Group_225" transform="translate(37.336 4.825)">
            <g id="Group_224" transform="translate(0)">
                <path id="Path_27561" d="M54.346 121.931a5.218 5.218 0 0 0-3.938-2.091c-1.849 0-2.631.885-3.915.885-1.324 0-2.331-.882-3.929-.882a5.347 5.347 0 0 0-4.3 2.6c-1.491 2.311-1.235 6.657 1.18 10.358.864 1.324 2.019 2.814 3.529 2.827 1.344.013 1.722-.862 3.543-.871s2.166.883 3.507.868c1.511-.012 2.729-1.662 3.593-2.986a14.853 14.853 0 0 0 1.331-2.5 4.544 4.544 0 0 1-.601-8.208z" class="cls-1" transform="translate(-37.336 -119.84)"/>
            </g>
        </g>
    </g>
    </SvgIcon>

  );
}

export default AppleIcon;
