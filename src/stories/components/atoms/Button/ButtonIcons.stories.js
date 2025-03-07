import React from "react";
import ButtonIcons from "../../../../components/atoms/Button/ButtonIcons";
import { FaPlus, FaTrash } from "react-icons/fa";

export default {
  title: "components/atoms/button/ButtonIcons",
  component: ButtonIcons,
  tags: ["autodocs"],
  argTypes: {
    icon: { control: "none" },
    onClick: { action: "clicked" },
  },
};

const Template = (args) => <ButtonIcons {...args} />;

export const AddButton = Template.bind({});
AddButton.args = {
  icon: <FaPlus className="text-lg" />, // Icon tambah
};

export const DeleteButton = Template.bind({});
DeleteButton.args = {
  icon: <FaTrash className="text-lg text-red-500" />, // Icon hapus
};
