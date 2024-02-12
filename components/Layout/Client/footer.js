import {
  Facebook,
  Instagram,
  PinterestAlt,
  Twitter,
  Youtube,
} from "@styled-icons/boxicons-logos";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import ImageLoader from "~/components/Image";
import classes from "./footer.module.css";
import Newsletter from "./newsletter";
import { Headset, ShieldCheck, Truck } from "@styled-icons/bootstrap";
import { useTranslation } from "react-i18next";
import visa from '../../../public/images/visa.svg';
import master from '../../../public/images/master.svg';
import paypal from '../../../public/images/paypal.svg';

const Footer = (props) => {
  // Selecting settings from global state
  const settings = useSelector((state) => state.settings);
  const { t } = useTranslation();
  const footer_link = {
    company: [
      {
        name: t("about_us"),
        link: "/about",
      },
    ],
    shop: [
      {
        name: t("faq"),
        link: "/faq",
      },
      {
        name: t("privacy_policy"),
        link: "/privacy",
      },
      {
        name: t("terms_and_conditions"),
        link: "/terms",
      },
      {
        name: t("return_policy"),
        link: "/return",
      },
    ],
    account: [
      {
        name: t("signin"),
        link: "/signin",
      },
      {
        name: t("profile"),
        link: "/profile",
      },
      {
        name: t("track_order"),
        link: "/order-track",
      },
    ],
  };

  if (props.visibility)
    return (
      <>
        <footer className={classes.footerWrapper}>
          <div className={`custom_container ${classes.footer}`}>

            {/* <div className="row m-0">
              <div className="col-md-4 px-0 py-4">
                <div className={classes.icon_container}>
                  <ShieldCheck className={classes.icon} />
                </div>
                <div className={classes.content}>
                  <h6>{settings.settingsData.footerBanner.security.title}</h6>
                  <p>
                    {settings.settingsData.footerBanner.security.description}
                  </p>
                </div>
              </div>
              <div className="col-md-4 px-0 py-4">
                <div className={classes.icon_container}>
                  <Headset className={classes.icon} />
                </div>
                <div className={classes.content}>
                  <h6>{settings.settingsData.footerBanner.support.title}</h6>
                  <p>
                    {settings.settingsData.footerBanner.support.description}
                  </p>
                </div>
              </div>
              <div className="col-md-4 px-0 py-4">
                <div className={classes.icon_container}>
                  <Truck className={classes.icon} />
                </div>
                <div className={classes.content}>
                  <h6>{settings.settingsData.footerBanner.delivery.title}</h6>
                  <p>
                    {settings.settingsData.footerBanner.delivery.description}
                  </p>
                </div>
              </div>
            </div>
            <hr className="mx-0" />
            <Newsletter /> */}
            <div className="row align-items-end pb-lg-5 pb-3">
              <div className="col-xl-4 col-lg-12 mb-5 mb-xl-0 px-0">
                <div className="row mx-0">
                  <div className="col-12">
                  <div className={classes.footerInpWrapper}>
                    <input className={classes.footerInp} placeholder="Enter Your Email....."/>
                    <button className={classes.inpBtn}>Subscribe</button>
                  </div>
                  </div>
                </div>
                {/* <Link href="/">
                  <div className={classes.logo}>
                    {settings.settingsData.logo[0] && (
                      <ImageLoader
                        src={settings.settingsData.logo[0]?.url}
                        width={145}
                        height={45}
                        alt={settings.settingsData.name}
                      />
                    )}
                  </div>
                </Link> */}
                {/* <div className={classes.address}>
                  <h1>{settings.settingsData.description}</h1>
                </div> */}
              </div>
              <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-12  d-flex align-items-xl-center align-items-start justify-content-center flex-column">
              <h3 className={classes.footerHeading}>{t("Company")}</h3>
                <ul className={classes.footerLinksUl}>
                  <li className={classes.footerLinksLi}><a href="javascript:;">About Us</a></li>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Careers</a></li>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Store Locator</a></li>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Contact Us</a></li>
                </ul>
                {/* <h3 className={classes.footer_heading}>{t("Company")}</h3>
                <div className={classes.address}>
                  <div>
                    <label>{t("About Us")}</label>
                    <label>{t("Careers")}</label>
                    <label>{t("Store Locator")}</label>
                    <label>{t("Contact Us")}</label>
                  </div>
                </div> */}
              </div>
              <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-12  d-flex align-items-xl-center align-items-start justify-content-center flex-column">
                <h3 className={classes.footerHeading}>{t("Customer Care")}</h3>
                <ul className={classes.footerLinksUl}>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Guide</a></li>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Help & FAQs</a></li>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Return My Order</a></li>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Refer a Friend</a></li>
                </ul>
                {/* <ul className={classes.list}>
                  {footer_link.shop.map((link) => (
                    <li className={classes.list_item} key={link.name}>
                      <Link href={link.link}>{link.name}</Link>
                    </li>
                  ))}
                </ul> */}
              </div>
              <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-12 mt-4 mt-md-0 d-flex align-items-xl-center align-items-start justify-content-center flex-column">
              <h3 className={classes.footerHeading}>{t("Terms & Policies")}</h3>
                <ul className={classes.footerLinksUl}>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Duties & Taxes</a></li>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Shipping Info</a></li>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Privacy Policy</a></li>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Terms & Conditions</a></li>
                </ul>
                {/* <h3 className={classes.footer_heading}>{t("my_account")}</h3>
                <ul className={classes.list}>
                  {footer_link.account.map((link) => (
                    <li className={classes.list_item} key={link.name}>
                      <Link href={link.link}>{link.name}</Link>
                    </li>
                  ))}
                </ul> */}
              </div>
              <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-12 mt-4 mt-md-0 d-flex align-items-xl-center align-items-start justify-content-center flex-column">
              <h3 className={classes.footerHeading}>{t("Follow Us")}</h3>
                <ul className={classes.footerLinksUl}>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Instagram</a></li>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Facebook</a></li>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Pinterest</a></li>
                  <li className={classes.footerLinksLi}><a href="javascript:;">Tiktok</a></li>
                </ul>
                {/* <h3 className={classes.footer_heading}>{t("my_account")}</h3>
                <ul className={classes.list}>
                  {footer_link.account.map((link) => (
                    <li className={classes.list_item} key={link.name}>
                      <Link href={link.link}>{link.name}</Link>
                    </li>
                  ))}
                </ul> */}
              </div>
            </div>
            {/* <hr className={classes.footerDivider}/> */}
            <div className="row m-0 pt-3 pt-md-5">
              <div className="col-md-6 col-12 p-2 d-flex align-items-center">
              <div className={classes.bottomFooterTxt}>
                Fume
              </div>
              <div className={classes.bottomFooterTxtd}>2024 - Fume.co. All Right Reserved. 
              </div>
                {/* <p className={classes.copyright}>
                  {settings.settingsData.copyright}
                </p> */}
              </div>
              {/* <div className="col-md-6 p-2">
                <div className={classes.gateway}>
                  {settings.settingsData.gatewayImage[0] && (
                    <ImageLoader
                      src={settings.settingsData.gatewayImage[0]?.url}
                      alt={settings.settingsData.gatewayImage[0]?.name}
                      width={565}
                      height={37}
                      style={{
                        width: "auto",
                        height: "100%",
                      }}
                    />
                  )}
                </div>
              </div> */}
              <div className="col-md-6 col-12 p-2 d-flex justify-content-md-end justify-content-start">
                <div className= "row">
                  <div className="col-auto">
                    <div className="{classes.socialImg}"><img className='w-100 h-100' src={`..${visa.src}`} alt=""/></div>
                  </div>
                  <div className="col-auto px-0">
                    <div className="{classes.socialImg}">
                        <img className='w-100 h-100' src={`..${master.src}`} alt=""/>
                        </div>
                  </div>
                  <div className="col-auto">
                    <div className="{classes.socialImg}">
                      <img className='w-100 h-100' src={`..${paypal.src}`} alt=""/>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>
    );

  return null;
};

export default React.memo(Footer);
