import Card from "../../../../components/atoms/Card/Card";

export default {
  title: "components/atoms/card/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    hide: { control: "boolean" },
    onClose: { action: "clicked" },
    children: {
      description: "Content inside the Card component",
      table: { type: { summary: "ReactNode" } },
      control: false, // Matikan kontrol untuk JSX agar lebih fleksibel
    },
  },
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Card Title",
  hide: false,
  children: <p>This is a default card content.</p>, // Pastikan children bisa dikontrol
};

export const HiddenTitle = Template.bind({});
HiddenTitle.args = {
  title: "Hidden Title",
  hide: true,
  children: <p>This card has a hidden title.</p>,
};
