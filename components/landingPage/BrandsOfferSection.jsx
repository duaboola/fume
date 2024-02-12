import React, { useState } from "react";
import ReactPlayer from "react-player";
import Typist from "react-typist";
import Image from "next/image";
import ARROW_IMG from "../../public/images/landingPage/arrow.png";
import dynamic from "next/dynamic";

const DynamicReactPlayer = dynamic(() => import("react-player"));

const BrandsOfferSection = () => {
  const [changeBrand, setChangeBrand] = useState(0);

  const handleReady = () => {
    setTimeout(() => {
      setChangeBrand((prevBrand) => (prevBrand === 0 ? 1 : 0));
    }, 3000); // 3000 milliseconds (3 seconds)
  };
  return (
    <div className="brands-offer-section">
      <Typist avgTypingDelay={100}>
        <h1>Brands we offer</h1>
      </Typist>
      <div
        className="brand-section"
        data-aos="fade-right"
        // data-aos-delay="750"
        data-aos-duration="2000"
        key={changeBrand}
      >
        <div className="a-side">
          {typeof window !== "undefined" && (
            <DynamicReactPlayer
              url={
                changeBrand === 0
                  ? "https://fumestorage.blob.core.windows.net/fume-shop/brand-video-1.mp4"
                  : "https://fumestorage.blob.core.windows.net/fume-shop/brand-video-2.mp4"
              }
              playing
              muted
              width="100%"
              height="100%"
              onReady={handleReady}
              onEnded={() =>
                setChangeBrand((prevBrand) => (prevBrand === 0 ? 1 : 0))
              }
            />
          )}
        </div>
        <div className="b-side">
          <div>
            <h2>{changeBrand === 0 ? "FUMO" : "FUMARI"}</h2>
            <h3>
              Elevate your hookah experience with the
              <br />
              luxurious craftsmanship of {changeBrand === 0 ? "Fumo" : "Fumari"}
              ,
              <br />
              offering high-end hookahs.
            </h3>
          </div>
          <h4
            onClick={() =>
              setChangeBrand((prevBrand) => (prevBrand === 0 ? 1 : 0))
            }
          >
            SHOW MORE
            <img src={ARROW_IMG.src} alt="arrow-img" className="img-fluid" />
            {/* <Image
              src={IMAGES.ARROW_IMG}
              alt="arrow-img"
              className="img-fluid"
            /> */}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default BrandsOfferSection;
