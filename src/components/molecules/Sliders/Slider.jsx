import React from "react";
import ButtonIcons from "../../atoms/Button/ButtonIcons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Progress } from "@material-tailwind/react";
export default function Sliders({ data }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    centerMode: true, // Menjadikan slider di tengah
    centerPadding: "10px", // Tambahkan padding di sisi kiri dan kanan
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          centerMode: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "30px",
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {data?.map((data, index) => (
        <div key={index} className="px-2 ">
          <div className=" mx-auto p-4 bg-primary/10  border border-primary/20 rounded-[1.8rem]">
            <div className="flex flex-row items-center gap-6">
              <div>
                <ButtonIcons icon={data.icon} />
              </div>
              <div className="w-full ">
                <h1 className=" text-xl text-accent-2">{data.name}</h1>
                {data.progress && (
                  <Progress
                    value={data.progress}
                    color="light-blue"
                    size="sm"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
