import { styled } from "@mui/material/styles";
import ButtonIcon from "../ButtonIcon";
import { ButtonIconExtraProps } from "../ButtonIcon/style";
import {
  CommonThemeProps,
  fontBodyS,
  getColors,
  getIconSizes,
  getSpaces,
  getTypography,
} from "../styles";

export interface BannerExtraProps extends CommonThemeProps {
  sdsType: "primary" | "secondary";
}

export const Centered = styled("div")`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const IconWrapper = styled("div")`
  ${(props: ButtonIconExtraProps) => {
    const iconSizes = getIconSizes(props);
    const spaces = getSpaces(props);

    return `
      height: ${iconSizes?.l.height}px;
      margin-right: ${spaces?.m}px;
    `;
  }}
`;

type ButtonIconType = ButtonIconExtraProps & { bannerType: string };
const doNotForwardPropsButtonIcon = ["bannerType"];

export const StyledButtonIcon = styled(ButtonIcon, {
  shouldForwardProp: (prop: string) =>
    !doNotForwardPropsButtonIcon.includes(prop),
})`
  ${(props: ButtonIconType) => {
    const spaces = getSpaces(props);

    return `
      flex: 0 0 auto;
      margin: ${spaces?.l}px;
    `;
  }}

  ${(props: ButtonIconType) => {
    const { bannerType } = props;
    const colors = getColors(props);

    if (bannerType !== "primary") return "";

    return `
      svg:hover {
        fill: ${colors?.primary[300]};
      }
    `;
  }}
`;

export const Text = styled("div")`
  ${fontBodyS}
  ${(props) => {
    const typography = getTypography(props);

    return `
      font-family: ${typography?.fontFamily};
    `;
  }}
`;

const primary = (props: BannerExtraProps) => {
  const colors = getColors(props);

  return `
    background-color: ${colors?.info[400]};
    color: white;
    svg {
      fill: white;
    }
  `;
};

const secondary = (props: BannerExtraProps) => {
  const colors = getColors(props);

  return `
    background-color: ${colors?.info[100]};
    color: black;
  `;
};

const doNotForwardProps = ["sdsType"];

export const StyledBanner = styled("div", {
  shouldForwardProp: (prop: string) => !doNotForwardProps.includes(prop),
})`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  ${fontBodyS}
  ${(props: BannerExtraProps) => {
    const { sdsType } = props;
    const typography = getTypography(props);

    return `
      ${sdsType === "primary" ? primary(props) : ""}
      ${sdsType === "secondary" ? secondary(props) : ""}
      font-family: ${typography?.fontFamily};
    `;
  }}
`;
