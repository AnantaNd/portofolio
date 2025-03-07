import { FaSave } from "react-icons/fa";
import ButtonPrimary from "../../../../components/atoms/Button/ButtonPrimary";

import { MdCancel } from "react-icons/md";

export default {
  title: "components/atoms/Button/ButtonPrimary",
  components: ButtonPrimary,
  tags: ["autodocs"],
  argTypes: {
    icon: { control: "none" },
    title: { control: "none" },
    onClick: { action: "clicked" },
  },
};

const Template = (args) => <ButtonPrimary {...args} />;
export const SubmitButtons = Template.bind({});
SubmitButtons.args = {
  icon: <FaSave />,
  title: "submit",
};
export const CancelButtons = Template.bind({});
CancelButtons.args = {
  icon: <MdCancel />,
  title: "cancel",
};
