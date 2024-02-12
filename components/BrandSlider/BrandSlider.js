import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import swiperImg from '../../public/images/Rectangle.png';
import classes from './brandSlider.module.css';
// Import Swiper styles
import 'swiper/css';


const BrandSlider = ({
    brandData,
    selectedBrand,
    setSelectedBrand,
}) => {
    const [filteredBrandData, setFilteredBrandData] = useState([]);

    useEffect(() => {
        // Filter brandData based on selectedBrand
        const filteredData = brandData.filter(item => {
            return selectedBrand ? item.name === selectedBrand : true;
        });
        setFilteredBrandData(filteredData);
    }, [brandData, selectedBrand]);


    return (
    <>
    <div className={classes.brandSliderOuter}>
        <div className='custom_container'>
            <Swiper
                slidesPerView={6}
                spaceBetween={26}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    360: {
                        slidesPerView: 1.9,
                    },
                    576: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    992: {
                        slidesPerView: 5,
                    },
                    1200: {
                        slidesPerView: 6,
                    },
                    1400: {
                        slidesPerView: 6,
                    },
                }}
                className="mySwiper"
            >
                {brandData.map(item => (
                    <SwiperSlide key={item?._id}>
                        <div className={classes.brandImg} onClick={() => setSelectedBrand(item.name)}>
                            <img src={item?.image?.[0]?.url} alt={item.name} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
</>
);
};

export default BrandSlider;