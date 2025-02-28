import { CheckCircleOutline } from "@mui/icons-material";
import { Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Args, Story } from "@storybook/react";
import React from "react";
import Button from "../Button";
import { defaultTheme } from "../styles/common/defaultTheme";
import Alert from "./index";

const DismissButton = styled(Button)`
  margin-left: -${defaultTheme.spacing(3)}px;
  padding-bottom: 0;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 1px;
  font-weight: 600;
  &:hover {
    background: none;
  }
`;

const Demo = (props: Args): JSX.Element => {
  const { text } = props;
  return (
    <Alert icon={<CheckCircleOutline />} onClose={() => {}} {...props}>
      {text}
    </Alert>
  );
};

export default {
  argTypes: {
    text: {
      control: { type: "text" },
      required: true,
    },
  },
  component: Demo,
  title: "Alert - To Be Depreciated",
};

const Template: Story = (args) => <Demo {...args} />;

export const Default = Template.bind({});
Default.parameters = {
  snapshot: {
    skip: true,
  },
};

Default.args = {
  text: "This is an alert!",
};

export const SnackbarAlert = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button sdsType="primary" sdsStyle="square" onClick={handleOpen}>
        Open alert
      </Button>
      <Snackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        open={open}
        autoHideDuration={6000}
      >
        <div>
          <Alert className="elevated" severity="info">
            <div>This is a snackbar alert!</div>
            <DismissButton onClick={handleClose}>DISMISS</DismissButton>
          </Alert>
        </div>
      </Snackbar>
    </div>
  );
};

const TestTemplate: Story = (args) => <Demo {...args} />;

export const Test = TestTemplate.bind({});
Test.args = {
  text: "Test Alert!",
};
