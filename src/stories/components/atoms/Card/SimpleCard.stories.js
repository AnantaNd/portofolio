import SimpleCard from "../../../../components/atoms/Card/SimpleCard";

export default {
  title: "components/atoms/card/SimpleCard",
  component: SimpleCard,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "Content inside the Card component",
      table: { type: { summary: "ReactNode" } },
      control: false,
    },
  },
};

const Template = (args) => <SimpleCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <p className="text-text">This is a card content.</p>,
};
