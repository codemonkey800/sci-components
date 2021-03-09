import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import Button from "./index";

export const text = "Click me!";

export const actions = {
  onClick: action("onClick"),
};

storiesOf("Button", module).add("default", () => (
  <Button onClick={actions.onClick}>{text}</Button>
));

storiesOf("Button", module).add("primary", () => (
  <Button onClick={actions.onClick} color="primary">
    {text}
  </Button>
));

storiesOf("Button", module).add("secondary", () => (
  <Button onClick={actions.onClick} color="secondary">
    {text}
  </Button>
));
