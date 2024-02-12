import React, { useState } from "react";
import Image from "next/image";
import { IMAGES } from "../../public/images/landingPage";

import VISA_IMG from "../../public/images/landingPage/visa-img.png";
import MASTER_IMG from "../../public/images/landingPage/master-img.png";
import PAY_PAL_IMG from "../../public/images/landingPage/paypal-img.png";
import { postData } from "~/lib/clientFunctions";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("")
  const subscribeHandler = async () => {
    try {
      const res = await postData(`/api/subscribers/new`, JSON.stringify({ email }))
      // const res  = await postData(``)
      console.log("from subscribe", { res });
      if(res.success){
        toast.success("Subscribed successfully!")
        setEmail("")
      }
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }
  return (
    <div
      className="footer-section"
      data-aos="zoom-in-up"
      data-aos-duration="2000"
    >
      <div className="upper-section">
        <div className="field-section a-side">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Your Email...."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="button"
            onClick={subscribeHandler}
          >
            Subscribe
          </button>
        </div>
        <div className="b-side row">
          <div className="col-lg-3 col-md-6 col-sm-6 col-6">
            <h2>Company</h2>
            <h3>About Us</h3>
            <h3>Careers</h3>
            <h3>Store Locator</h3>
            <h3>Contact Us</h3>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-6">
            <h2>Customer Care</h2>
            <h3>Guide</h3>
            <h3>Help & FAQs</h3>
            <h3>Return My Order</h3>
            <h3>Refer a Friend</h3>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-6">
            <h2>Terms & Policies</h2>
            <h3>Duties & Taxes</h3>
            <h3>Shipping Info</h3>
            <h3>Privacy Policy</h3>
            <h3>Terms & Conditions</h3>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-6 col-6">
            <h2>Follow Us</h2>
            <h3>Instagram</h3>
            <h3>Facebook</h3>
            <h3>Pinterest</h3>
            <h3>Tiktok</h3>
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <div className="a-side">
          <h2>Fume</h2>
          <p className="d-none d-lg-block">2024 - Fume.co. All Right Reserved. </p>
        </div>
        <div className="b-side">
          <img src={VISA_IMG.src} className="img-fluid" alt="visa-img" />
          <img src={MASTER_IMG.src} className="img-fluid" alt="master-img" />
          <img src={PAY_PAL_IMG.src} className="img-fluid" alt="payPal-img" />
        </div>
        <div className="c-sideeeee d-lg-none">2024 - Fume.co. All Right Reserved.</div>
      </div>
    </div>
  );
};

export default Footer;
