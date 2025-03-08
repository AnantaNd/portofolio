import React from "react";
import About from "../../../../components/molecules/container/About";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "components/molecules/container/About",
  component: About,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text", description: "Title" },
    onClose: { action: "clicked" },
  },
};

const Template = (args) => (
  <MemoryRouter>
    <About {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  title: "About Me",
};
