/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { IMAGES } from "../../public/images/landingPage";

import IMG_1_HALF from "../../public/images/landingPage/img-1-half.png";
import IMG_1_FULL from "../../public/images/landingPage/img-1-full.png";
import IMG_2_HALF from "../../public/images/landingPage/img-2-half.png";
import IMG_2_FULL from "../../public/images/landingPage/img-2-full.png";
import IMG_3_HALF from "../../public/images/landingPage/img-3-half.png";
import IMG_3_FULL from "../../public/images/landingPage/img-3-full.png";
import IMG_4_HALF from "../../public/images/landingPage/img-4-half.png";
import IMG_4_FULL from "../../public/images/landingPage/img-4-full.png";

import { useEffect } from "react";
import Typist from "react-typist";
import Image from "next/image";

const ShopSection = () => {
  const [activeIndex, setActiveIndex] = useState(4);
  const [fadeUpState, setFadeUpState] = useState(false);

  const itemsList = [
    {
      imgHalf: IMG_1_HALF,
      imgFull: IMG_1_FULL,
      title: "PODS",
      id: 1,
    },
    {
      imgHalf: IMG_2_HALF,
      imgFull: IMG_2_FULL,
      title: "ACCESSORIES",
      id: 2,
    },
    {
      imgHalf: IMG_3_HALF,
      imgFull: IMG_3_FULL,
      title: "FLAVORS",
      id: 3,
    },
    {
      imgHalf: IMG_4_HALF,
      imgFull: IMG_4_FULL,
      title: "COLLECTION",
      id: 4,
    },
  ];
  const handleCardClick = (index) => {
    setActiveIndex(index);
    setFadeUpState(true);
  };

  useEffect(() => {
    setActiveIndex(4);
  }, []);
  return (
    <div className="shop-section">
      <div className="title-part" onClick={() => setActiveIndex(4)}>
        <Typist avgTypingDelay={100}>
          <h2>Categories</h2>
        </Typist>
      </div>
      <div className="category-section">
        {itemsList?.map((item, index) => {
          return (
            <ListBody
              item={item}
              key={item.id}
              index={index}
              activeIndex={activeIndex}
              handleCardClick={handleCardClick}
              fadeUpState={fadeUpState}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShopSection;

const ListBody = ({
  item,
  index,
  activeIndex,
  handleCardClick,
  fadeUpState,
}) => {
  const isActive = index === activeIndex;

  return (
    <div
      className={`${isActive ? "active-state" : "inActive-state"}`}
      onClick={() => handleCardClick(index)}
      data-aos={`${!isActive && !fadeUpState ? "fade-up" : ""}`}
      data-aos-delay={`${
        index === 0
          ? "1000"
          : index === 1
          ? "1500"
          : index === 2
          ? "2000"
          : "2500"
      }`}
      data-aos-duration={`${
        index === 0
          ? "1000"
          : index === 1
          ? "1500"
          : index === 2
          ? "2000"
          : "2500"
      }`}
      key={item?.id}
    >
      <h1
        className={`${"title" + index} ${
          isActive === true ? "" : activeIndex === 4 ? "" : "title-reset"
        }`}
      >
        {item?.title}
      </h1>

      {/* <img
        src={isActive ? item?.imgFull?.src : item?.imgHalf?.src}
        alt={index}
        className={`img-fluid ${
          isActive === true ? "d-block" : activeIndex === 4 ? "" : "d-none"
        }`}
      /> */}

      {/* <Image
        src={isActive ? item?.imgFull?.src : item?.imgHalf?.src}
        alt={index}
        className={`img-fluid ${
          isActive === true ? "d-block" : activeIndex === 4 ? "" : "d-none"
        }`}
      /> */}
    </div>
  );
};
