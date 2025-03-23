import React from "react";
import Svg, { Path } from "react-native-svg";

export const EyeIconOpen = ({ size = 24, color = "black" }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    />
    <Path
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </Svg>
);

export const EyeIconClosed = ({ size = 24, color = "black" }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-5"
    width={size}
    height={size}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </Svg>
);

export const HomeIconSolid = ({ size = 24, color = "black" }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill={color}
    width={size}
    height={size}
  >
    <Path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" />
  </Svg>
);

export const HomeIconOutline = ({ size = 24, color = "black" }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    fill={color}
    width={size}
    height={size}
  >
    <Path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
  </Svg>
);

export const SearchIconSolid = ({ size = 24, color = "black" }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth={3}
    fill="none"
    width={size}
    height={size}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </Svg>
);

export const SearchIconOutline = ({ size = 24, color = "black" }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    width={size}
    height={size}
    color={color}
    fill="none"
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </Svg>
);
