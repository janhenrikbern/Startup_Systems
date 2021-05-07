import * as React from "react";
function SvgGlobe(props) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 372 194"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path
        transform="rotate(-180 375 194)"
        fill="url(#globe_svg__pattern0)"
        d="M375 194h375v389H375z"
      />
      <defs>
        <pattern
          id="globe_svg__pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use
            xlinkHref="#globe_svg__image0"
            transform="matrix(.00075 0 0 .00075 -.031 0)"
          />
        </pattern>
        <image
          id="globe_svg__image0"
          width={1414}
          height={1397}
        />
      </defs>
    </svg>
  );
}
export default SvgGlobe;