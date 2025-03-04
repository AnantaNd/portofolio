import React from "react";
import ButtonIcons from "../../atoms/Button/ButtonIcons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
        <div key={index} className="px-2">
          <div className="mx-auto p-4 bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-[2rem] shadow-md shadow-primary/40">
            <div className="flex flex-row items-center gap-2">
              <ButtonIcons icon={data.icon} />
              <h1 className="uppercase text-xl text-accent-2">{data.name}</h1>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
