import React from "react";
import Button, { ButtonProps } from "../Button";

const ButtonLink = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref): JSX.Element => {
    return <Button {...props} color="primary" component="a" ref={ref} />;
    l;
  }
);

export default ButtonLink;
