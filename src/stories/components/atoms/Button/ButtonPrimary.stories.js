import { FaSave } from "react-icons/fa";
import ButtonPrimary from "../../../../components/atoms/Button/ButtonPrimary";

export default {
  title: "components/atoms/button/ButtonPrimary",
  components: ButtonPrimary,
  tags: ["autodocs"],
  argTypes: {
    icon: { control: "none" },
    title: { control: "text" },
    onClick: { action: "clicked" },
  },
};

const Template = (args) => <ButtonPrimary {...args} />;
export const Default = Template.bind({});
Default.args = {
  icon: <FaSave />,
  title: "submit",
};
