import React, { useState, useEffect } from "react";

import dynamic from "next/dynamic";

const DynamicReactPlayer = dynamic(() => import("react-player"));

import Header from "./Header";
import NewArrivalSection from "./NewArrivalSection";
import BrandsOfferSection from "./BrandsOfferSection";
// import ReactPlayer from "react-player";
import Typist from "react-typist";
import ShopSection from "./ShopSection";
import AboutUsSection from "./AboutUsSection";
import Footer from "./Footer";
import DisclaimerPopup from "./DisclaimerPopup";
import LoadingScreen from './LoadingScreen';

export default function LandingPage({data}) {
  const [showInnerSection, setShowInnerSection] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  console.log("data--->>",{data});
  
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);

  //   return () => clearTimeout(timeout);
  // }, []);

  const handleReady = () => {
    setTimeout(() => {
      setShowInnerSection(true);
    }, 7000); // 7000 milliseconds (7 seconds)
  };

  useEffect(() => {
    const disclaimerConfirmed = localStorage.getItem('disclaimerConfirmed');
    if (!disclaimerConfirmed) {
      setShowDisclaimer(true);
    }
  }, []);

  const handleDisclaimerConfirm = () => {
    localStorage.setItem('disclaimerConfirmed', 'true');
    setShowDisclaimer(false);
  };

  return (
    <React.Fragment>
     

{showDisclaimer && <DisclaimerPopup onConfirm={handleDisclaimerConfirm} />}
      
      
      <div className="header-section">
        {/* <Header /> */}
        {typeof window !== "undefined" && (
          <DynamicReactPlayer
            url="https://fumestorage.blob.core.windows.net/fume-shop/header-mini-bg-video.mp4"
            playing
            loop
            muted
            width="100%"
            height="100%"
            onReady={handleReady}
          />
        )}
        {showInnerSection && (
          <div className="inner-section">
            <div
              className="text-content"
              data-aos="fade-right"
              data-aos-duration="3000"
            >
              <Typist avgTypingDelay={200} startDelay={1000}>
                <h1>Experience</h1>
              </Typist>

              <h2>
                <span
                  data-aos="fade-up"
                  data-aos-duration="3000"
                  data-aos-delay="1500"
                >
                  THE ART OF HOOKAH
                </span>
                <br />
                <span
                  data-aos="fade-up"
                  data-aos-duration="3000"
                  data-aos-delay="1500"
                >
                  with our
                </span>
                <b>
                  <Typist avgTypingDelay={200} startDelay={1000}>
                    <span>PODS </span>
                    <Typist.Backspace count={8} delay={2000} />
                    <span> FLAVORS</span>
                  </Typist>
                </b>
              </h2>
            </div>
          </div>
        )}
      </div>
     {/*  <NewArrivalSection data={data}/> */}
      <NewArrivalSection />
      <BrandsOfferSection />
      <ShopSection />
      <AboutUsSection />
      {/* <Footer /> */}

      
    </React.Fragment>
   
  );
}
