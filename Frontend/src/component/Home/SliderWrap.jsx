import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


import gadgetSale from '../../images/Banner/gadget-sale.jpg';
import kitchenSale from '../../images/Banner/kitchen-sale.jpg';
import poco from '../../images/Banner/poco-m4-pro.webp';
import realme from '../../images/Banner/realme-9-pro.webp';
import fashionSale from '../../images/Banner/fashionsale.jpg';
import oppo from '../../images/Banner/oppo-reno7.webp';


export const PreviousBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon />
    </div>
  )
}

export const NextBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon />
    </div>
  )
}


const SliderWrap = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  const banners = [gadgetSale, kitchenSale, poco, fashionSale, realme, oppo];

  return (
    <>
      <section className="h-44 sm:h-72 w-full rounded-sm shadow relative overflow-hidden">
        <Slider {...settings}>
          {banners.map((el, i) => (
            <img draggable="false" style={{ minHeight: '30rem' }} src={el} alt="banner" key={i} />
          ))}
        </Slider>
      </section>
    </>
  );
};

export default SliderWrap