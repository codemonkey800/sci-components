import { TooltipClassKey } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { forwardRef } from "react";
import Tooltip, { TooltipProps } from "../Tooltip";
import { condensedCSS, TooltipCondensedExtraProps } from "./style";

export type TooltipCondensedProps = TooltipProps & TooltipCondensedExtraProps;

/**
 * @see https://v4.mui.com/components/tooltips/
 *
 * @warning If the tooltip wraps a disabled component, please make sure to
 * wrap the children in a `<span>` tag.
 * https://mui.com/components/tooltips/#disabled-elements
 */
const TooltipCondensed = forwardRef(function TooltipCondensed(
  props: TooltipCondensedProps,
  ref
): JSX.Element {
  const { children, title, indicator, indicatorColor } = props;

  const theme = useTheme();

  const extraProps = {
    /* stylelint-disable property-no-unknown -- false positive */
    indicator,
    indicatorColor,
    theme,
    /* stylelint-enable property-no-unknown -- false positive */
  };

  const tooltip = mergeClass({
    className: condensedCSS(extraProps),
    key: "tooltip",
    props,
  });

  return (
    <Tooltip
      followCursor
      placement="right-end"
      enterDelay={50}
      leaveDelay={50}
      title={title}
      ref={ref}
      classes={{ tooltip }}
    >
      {children}
    </Tooltip>
  );
});

function mergeClass({
  props,
  className,
  key,
}: {
  props: TooltipProps;
  className: string;
  key: TooltipClassKey;
}) {
  const { classes } = props;

  if (!classes) return className;

  const propClassName = classes[key];

  return propClassName ? `${propClassName} ${className}` : className;
}

export default TooltipCondensed;
