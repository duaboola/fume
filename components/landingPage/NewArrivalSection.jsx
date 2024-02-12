import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import "swiper/css/navigation";
import "swiper/css";
import { Swiper as SwiperComponent } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Article1 from "../../public/images/landingPage/article-1.png";
import Article2 from "../../public/images/landingPage/article-2.png";
import Article3 from "../../public/images/landingPage/article-3.png";
import plusIcon from "../../public/images/landingPage/plus-icon.png";
// import "../../public/css/style.css";

const NewArrivalSection = ({data}) => {
  const swiperRef = useRef();
  const isDefault = useMediaQuery({
    query: "(max-width: 2400px) and (min-width: 1161px)",
  });
  const isLargeLaptop = useMediaQuery({
    query: "(max-width: 1160px) and (min-width: 1026px)",
  });
  const isLaptop = useMediaQuery({
    query: "(max-width: 1025px) and (min-width: 770px)",
  });
  const isMedium = useMediaQuery({ query: "(max-width: 769px)" });

  const [previousBtn, setPreviousBtn] = useState("190");
  const [nextBtn, setNextBtn] = useState("72");
  const [activeIndex, setActiveIndex] = useState(0);
  const articlesList = [
    {
      img: Article1,
      class: "article1",
      price: " BD 79.999",
    },
    {
      img: Article2,
      class: "article2",
      price: " BD 79.999",
    },
    {
      img: Article3,
      class: "article3",
      price: " BD 79.999",
    },
    {
      img: Article2,
      class: "article2",
      price: "BD 79.999",
    },
    {
      img: Article3,
      class: "article3",
      price: " BD 79.999",
    },
    {
      img: Article3,
      class: "article3",
      price: " BD 79.999",
    }
  ];

  useEffect(() => {
    if (isLargeLaptop) {
      setNextBtn("60");
      setPreviousBtn("173");
    }
    if (isLaptop) {
      setNextBtn("52");
      if (activeIndex === 2) {
        setPreviousBtn("54");
      } else {
        setPreviousBtn("155");
      }
    }
    if (isMedium) {
      setNextBtn("48");
      setPreviousBtn("148");
    }

    if (isDefault) {
      if (activeIndex === 2) {
        setPreviousBtn("72");
      } else {
        setPreviousBtn("190");
      }
      setNextBtn("72");
    }
  }, [isDefault, isLargeLaptop, isLaptop, isMedium, activeIndex]);

  return (
    <div className="new-arrival-section">
      <div className="a-side">
        <h3 data-aos="fade-down-right" data-aos-duration="1000">
          NEW
        </h3>
        <h1 data-aos="fade-right" data-aos-duration="1000">
          Arrivals
        </h1>
        <h4 data-aos="fade-up" data-aos-duration="500">
          Discover our exquisite collection
          <br />
          of luxury hookahs, featuring
          <br />
          the finest craftsmanship.
        </h4>
      </div>
      <div className="b-side">
         {/* <SwiperComponent
          slidesPerView={3.5}
          spaceBetween={0}
          centeredSlides={false}
          speed={1500}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next-button",
            prevEl: ".custom-prev-button",
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper?.activeIndex);
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.25,
            },
            540: {
              slidesPerView: 1.25,
            },
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 3.5,
            },
            1440: {
              slidesPerView: 3.5,
            },
          }}
        >
          {data && data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  className="product-card"
                  data-aos="fade-left"
                  data-aos-duration="1500"
                  data-aos-delay="300"
                  key={item?._id}
                >
                  <img
                    src={item?.image?.[0]?.src}
                    alt={index}
                    className={`${item?.class} img-fluid`}
                  />

                  <div className="price-section">
                    <h4>{item?.price}</h4>
                    <h4>
                      <img
                        src={plusIcon.src}
                        alt="plus-icon"
                        className="img-fluid"
                      />
                    </h4>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
          <button
            className="custom-prev-button previous-btn"
            hidden={activeIndex !== 0 ? false : true}
            style={{
              left: previousBtn + "px",
            }}
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            Previous
          </button>
          <button
            className="custom-next-button next-btn"
            hidden={activeIndex !== 2 ? false : true}
            style={{
              right: nextBtn + "px",
            }}
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            Next
          </button>
        </SwiperComponent> */}

        {/* ---static---- */}
         <SwiperComponent
          slidesPerView={3.5}
          spaceBetween={0}
          centeredSlides={false}
          speed={1500}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          navigation={{
            nextEl: ".custom-next-button",
            prevEl: ".custom-prev-button",
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper?.activeIndex);
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.25,
            },
            540: {
              slidesPerView: 1.25,
            },
            768: {
              slidesPerView: 2.5,
            },
            1024: {
              slidesPerView: 3.5,
            },
            1440: {
              slidesPerView: 3.5,
            },
          }}
        >
          {articlesList?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
  <div className="product-card" data-aos="fade-left" data-aos-duration="1500" data-aos-delay="300" key={index}>
    <img src={item?.img?.src} alt={index} className={`${item?.class} img-fluid`} />
    <div className="price-section">
      <h4 className="itemprice">{item?.price}</h4>
      <h4>
        <img src={plusIcon.src} alt="plus-icon" className="img-fluid" />
      </h4>
    </div>
  </div>
</SwiperSlide>

              // <SwiperSlide key={index}>
              //   <div
              //     className="product-card"
              //     data-aos="fade-left"
              //     data-aos-duration="1500"
              //     data-aos-delay="300"
              //     key={index}
              //   >
              //     <img
              //       src={item?.img?.src}
              //       alt={index}
              //       className={`${item?.class} img-fluid`}
              //     />

              //     {/* <div className="price-section">
              //       <h4>{item?.price}</h4>
              //       <h4>
              //         <img
              //           src={plusIcon.src}
              //           alt="plus-icon"
              //           className="img-fluid"
              //         />
              //       </h4>
              //     </div> */}
              //     <div className="price-section">
              //     <h4>{item?.price}</h4>
              //     <button className="price-button">
              //       <img
              //         src={plusIcon.src}
              //         alt="plus-icon"
              //         className="img-fluid"
              //       />
              //     </button>
              //   </div>
              //   </div>
                
                  
              // </SwiperSlide>
            );
          })}
          <button
            className="custom-prev-button previous-btn"
            hidden={activeIndex !== 0 ? false : true}
            style={{
              left: previousBtn + "px",
            }}
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            PREVIOUS
          </button>
          <button
            className="custom-next-button next-btn"
            hidden={activeIndex !== 2 ? false : true}
            style={{
              right: nextBtn + "px",
            }}
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            NEXT
          </button>
        </SwiperComponent> 
      </div>
    </div>
  );
};

export default NewArrivalSection;
