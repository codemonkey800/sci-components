import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStory } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as snapshotTestStoryFile from "./index.stories";
import Meta, { Test as TestStory } from "./index.stories";

const Test = composeStory(TestStory, Meta);

describe("<button />", () => {
  generateSnapshots(snapshotTestStoryFile);

  it("renders Button component", () => {
    render(<Test />);
    const elements = screen.getAllByTestId("button");
    expect(elements.length).toBeTruthy();
  });
});
