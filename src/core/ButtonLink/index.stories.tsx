import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import ButtonLink from "./index";

export const text = "Click me!";

export const actions = {
  onClick: action("onClick"),
};

storiesOf("ButtonLink", module).add("default", () => (
  <ButtonLink href="/">{text}</ButtonLink>
));
