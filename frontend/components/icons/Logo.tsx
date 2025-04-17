import React from "react";

const LogoIcon = ({ size }: { readonly size?: number }) => {
  if (!size) size = 24;
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
    >
      
    </svg>
  );
};

export default LogoIcon;
