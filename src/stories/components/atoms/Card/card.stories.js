import Card from "../../../../components/atoms/Card/Card";

export default {
  title: "components/atoms/card/Card",
  components: Card,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    hide: { control: "boolean" },
    onClose: { action: "clicked" },
  },
};

const Template = (args) => {
  return (
    <Card {...args}>
      <div className="text-text">This is a card content.</div>
    </Card>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Card Title",
  hide: false,
};

export const HiddenTitle = Template.bind({});
HiddenTitle.args = {
  title: "Hidden Title",
  hide: true,
};
