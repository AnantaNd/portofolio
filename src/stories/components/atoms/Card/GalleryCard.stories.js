import GalleryCard from "../../../../components/atoms/Card/GalleryCard";

export default {
  title: "components/atoms/card/GalleryCard",
  component: GalleryCard,
  tags: ["autodocs"],
  argTypes: {
    imageSrc: { control: "text", description: "URL gambar dalam kartu" },
    title: { control: "text", description: "Judul kartu" },
    desc: { control: "text", description: "Deskripsi kartu" },
    data: {
      control: "object",
      description: "Array objek untuk chip",
    },
  },
};

const Template = (args) => <GalleryCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  imageSrc: "/netcontrol.svg",
  title: "Gallery Title",
  desc: "This is a sample description for the gallery card.",
  data: [{ name: "Tag 1" }, { name: "Tag 2" }, { name: "Tag 3" }],
};
