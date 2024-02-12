import React from "react";
import Image from "next/image";
import ABOUT_US_IMG_1 from "../../public/images/landingPage//about-us-img-1.png";
import ABOUT_US_IMG_2 from "../../public/images/landingPage//about-us-img-2.png";
import ABOUT_US_IMG_3 from "../../public/images/landingPage//about-us-img-3.png";
import ARROW_2_IMG from "../../public/images/landingPage//arrow-2.png";

const AboutUsSection = () => {
  return (
    <div className="about-us-section">
      <div className="position-relative img-section">
        <img
          src={ABOUT_US_IMG_1.src}
          className="img-fluid gradient-set-1"
          data-aos="fade-up"
          data-aos-delay="1000"
          data-aos-duration="1000"
          alt="about-us-img-1"
        />
        <img
          src={ABOUT_US_IMG_2.src}
          className="img-fluid gradient-set-2"
          data-aos="fade-up"
          data-aos-delay="1000"
          data-aos-duration="1000"
          alt="about-us-img-2"
        />
        <img
          src={ABOUT_US_IMG_3.src}
          className="img-fluid gradient-set-3"
          data-aos="fade-up"
          data-aos-delay="1000"
          data-aos-duration="1000"
          alt="about-us-img-3"
        />

        {/* <Image
          src={IMAGES.ABOUT_US_IMG_1}
          className="img-fluid gradient-set-1"
          data-aos="fade-up"
          data-aos-delay="1000"
          data-aos-duration="1000"
          alt="about-us-img-1"
        /> */}
        {/* <Image
          src={IMAGES.ABOUT_US_IMG_2}
          className="img-fluid gradient-set-2"
          data-aos="fade-up"
          data-aos-delay="1000"
          data-aos-duration="1000"
          alt="about-us-img-2"
        /> */}
        {/* <Image
          src={IMAGES.ABOUT_US_IMG_3}
          className="img-fluid gradient-set-3"
          data-aos="fade-up"
          data-aos-delay="1000"
          data-aos-duration="1000"
          alt="about-us-img-3"
        /> */}
        <h2 data-aos="fade-up" data-aos-delay="2000" data-aos-duration="2000">
          LEARN MORE
          <img src={ARROW_2_IMG.src} className="img-fluid" alt="arrow-2-img" />
          {/* <Image
            src={IMAGES.ARROW_2_IMG}
            className="img-fluid"
            alt="arrow-2-img"
          /> */}
        </h2>
      </div>
      <div
        className="content-section"
        data-aos="fade-up"
        data-aos-delay="1500"
        data-aos-duration="1500"
      >
        <h1>About Us</h1>
        <h3>
          At FUME, we are dedicated to crafting
          <br />
          unparalleled hookah experiences, blending
          <br />
          tradition with innovation for discerning
          <br />
          enthusiasts worldwide.
        </h3>
      </div>
    </div>
  );
};

export default AboutUsSection;
