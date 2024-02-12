import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import classes from "~/styles/profile.module.css";
import user from '../../public/images/fumeuser.png'
import mail from '../../public/images/Mail.png'
import eye from '../../public/images/fumeeye.png'
import key from '../../public/images/fumeKey.png'
import invoice from '../../public/images/invoiceIcon.png'
import location from '../../public/images/location.png'
import visa from '../../public/images/visaa.png'
import accordion from '../../public/images/accordion.png'
import productRectangle from '../../public/images/productImgSquare.png'
import phone from '../../public/images/Phone.png'
import arrow from '../../public/images/arrowup.png'
import exclamation from '../../public/images/exclamation.png'
import delivery from '../../public/images/delivery.png'
import returnn from '../../public/images/return.png'
import signout from '../../public/images/logoutIcon.png'
import lock from '../../public/images/lock.png'
import classesWishlist from '~/styles/wishlist.module.css';
import cart from '../../public/images/cartIcon.png';
import like from '../../public/images/wishlistIcon.png';
import productImage from '../../public/images/productImg.png';

// import classes from "~/styles/profile.module.css";



const HeadData = dynamic(() => import("~/components/Head"));
const PurchaseHistory = dynamic(() =>
  import("~/components/Profile/PurchaseHistory")
);
const ManageWishList = dynamic(() => import("~/components/Profile/wishlist"));
const ManageProfile = dynamic(() =>
  import("~/components/Profile/manageProfile")
);
const ManagePassword = dynamic(() =>
  import("~/components/Profile/managePassword")
);

const ProfilePage = () => {
  const { session } = useSelector((state) => state.localSession);
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const { t } = useTranslation();
  const updateTab = (tabId) => setActiveTab(tabId);

  useEffect(() => {
    if (router.query.tab === "1") {
      setActiveTab(1);
    }
  }, [router.query]);
  console.log({ productImage });

  // return (
  //   <>
  //     <HeadData title="User Profile" />
  //     <div className="layout_top">
  //       <div className="custom_container py-5">
  //         <div className="row m-0">
  //           <div className="col-md-3">
  //             <div className={classes.menu}>
  //               <div className={classes.user_info}>
  //                 <h4>{session && session.user.name}</h4>
  //                 <span>{session && session.user.email}</span>
  //               </div>
  //               <div className={classes.menu_list}>
  //                 <div className={classes.menu_item}>
  //                   <button
  //                     className={activeTab === 0 ? classes.active : null}
  //                     onClick={() => updateTab(0)}
  //                   >
  //                     {t("purchase_history")}
  //                   </button>
  //                 </div>
  //                 <div className={classes.menu_item}>
  //                   <button
  //                     className={activeTab === 1 ? classes.active : null}
  //                     onClick={() => updateTab(1)}
  //                   >
  //                     {t("wishlist")}
  //                   </button>
  //                 </div>
  //                 <div className={classes.menu_item}>
  //                   <button
  //                     className={activeTab === 2 ? classes.active : null}
  //                     onClick={() => updateTab(2)}
  //                   >
  //                     {t("manage_profile")}
  //                   </button>
  //                 </div>
  //                 <div className={classes.menu_item}>
  //                   <button
  //                     className={activeTab === 3 ? classes.active : null}
  //                     onClick={() => updateTab(3)}
  //                   >
  //                     {t("manage_password")}
  //                   </button>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="col-md-9">
  //             <div className={classes.viewer}>
  //               {activeTab === 0 && (
  //                 <PurchaseHistory id={session && session.user.id} />
  //               )}
  //               {activeTab === 1 && (
  //                 <ManageWishList id={session && session.user.id} />
  //               )}
  //               {activeTab === 2 && (
  //                 <ManageProfile id={session && session.user.id} />
  //               )}
  //               {activeTab === 3 && (
  //                 <ManagePassword id={session && session.user.id} />
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <div className={`container-fluid pt-5 ${classes.profileFluid}`}>
        <div className="container pt-md-5 px-0">
          <div className="row mx-0 pt-5 pb-3 align-items-center">
            <div className="col-sm col-12">
              <div className="row align-items-end mx-0">
                <div className="col-auto ps-0">
                  <div className={classes.profileUser}>
                    <img src={user.src} />
                  </div>
                </div>
                <div className="col ps-1 mb-3">
                  <div className="row mx-0">
                    <div className="col-12 px-0"><div className={classes.userName}>Alaa Mohamed</div></div>
                    <div className="col-12 px-0"><div className={classes.userLevel}>Loyalty level: Bronze</div></div>
                    <div className="col-12 col-md-8 col-lg-5 col-xl-4 px-0 mt-4">
                      <div className={`position-relative ${classes.topProgressBar}`}>
                        <div className={`progress ${classes.progress}`} role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                          <div className={classes.progress_bar} style={{ width: "25%" }}></div>
                        </div>
                        <div className={`position-absolute d-flex align-items-center justify-content-between ${classes.progressSteps}`}>
                          <div className={classes.progressStep}> 0</div>
                          <div className={classes.progressStep}> &nbsp;</div>
                          <div className={classes.progressStep}> &nbsp;</div>
                          <div className={classes.progressStep}> 3</div>
                          <div className={classes.progressStep}> &nbsp;</div>
                          <div className={classes.progressStep}> 5</div>
                          <div className={classes.progressStep}> &nbsp;</div>
                          <div className={classes.progressStep}> &nbsp;</div>
                          <div className={classes.progressStep}> 8</div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-auto col-12 mt-4 mt-sm-0">
              <input type="file" id="uploadPic" className={'d-none'} />
              <label htmlFor="uploadPic" className={classes.userBtn}>Upload New Photo </label>
            </div>
          </div>
          <div className="row mx-0">
            <div className="col-12 py-4">
              <div className={`accordion ${classes.accordionWrapper}`} id="userProfileAccordian">
                <div className={`accordion-item ${classes.accordionItem}`} >
                  <div className={`accordion-header ${classes.accordionHeader}`} >
                    <div className="row align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#userProfile" aria-expanded="true" aria-controls="userProfile">
                      <div className="col">
                        <div className={`accordion-button ${classes.accordionBtn}`}>
                          User Profile
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className={classes.accordionClose}><img src={accordion.src} /></div>
                      </div>
                    </div>
                  </div>
                  <div id="userProfile" className={`accordion-collapse collapse show ${classes.accordionCollapse}`} data-bs-parent="#userProfileAccordian">
                    <div className={`accordion-body ${classes.accordionBody}`}>
                      <div className="row g-3 g-lg-4 gx-lg-5">
                        <div className="col-sm-6 col-12">
                          <div className={classes.inputGroup}>
                            <label className={classes.lbl}>First Name</label>
                            <input className={`${classes.inp} ${classes.inp2}`} type="text" placeholder="eg. Alaa" />
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className={classes.inputGroup}>
                            <label className={classes.lbl}>Last Name</label>
                            <input className={`${classes.inp} ${classes.inp2}`} type="text" placeholder="eg. Mohamed" />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className={classes.inputGroup}>
                            <label className={classes.lbl}>User Name</label>
                            <input className={`${classes.inp} ${classes.inp2}`} type="text" placeholder="eg. alaa.mohamed" />
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className={classes.inputGroup}>
                            <label className={classes.lbl}>Email Address</label>
                            <input className={classes.inp} type="email" placeholder="" />
                            <div className={classes.icon}><img src={mail.src} /></div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className={classes.inputGroup}>
                            <label className={classes.lbl}>Phone Number</label>
                            <input className={classes.inp} type="email" placeholder="" />
                            <div className={classes.icon}><img src={phone.src} /></div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className={classes.inputGroup}>
                            <label className={classes.lbl}>Current Password</label>
                            <input className={classes.inp} type="email" placeholder="" />
                            <div className={classes.icon}><img src={key.src} /></div>
                            <div className={classes.icontwo}><img src={eye.src} /></div>
                          </div>
                        </div>
                        <div className="col-sm-6 col-12">
                          <div className={classes.inputGroup}>
                            <label className={classes.lbl}>New Password</label>
                            <input className={classes.inp} type="email" placeholder="" />
                            <div className={classes.icon}><img src={key.src} /></div>
                            <div className={classes.icontwo}><img src={eye.src} /></div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className={classes.inputGroup}>
                            <label className={classes.lbl}>Confirm New Password</label>
                            <input className={classes.inp} type="email" placeholder="" />
                            <div className={classes.icon}><img src={key.src} /></div>
                            <div className={classes.icontwo}><img src={eye.src} /></div>
                          </div>
                        </div>
                        <div className="col-12 d-flex justify-content-center pt-4">
                          <button className={classes.saveBtn}>SAVE</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`accordion-item ${classes.accordionItem}`} >
                  <div className={`accordion-header ${classes.accordionHeader}`} >
                    <div className="row align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#orderTraking" aria-expanded="true" aria-controls="orderTraking">
                      <div className="col">
                        <div className={`accordion-button ${classes.accordionBtn}`}>
                          Order Tracking
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className={classes.accordionClose}><img src={accordion.src} /></div>
                      </div>
                    </div>
                  </div>
                  <div id="orderTraking" className={`accordion-collapse collapse ${classes.accordionCollapse}`} data-bs-parent="#userProfileAccordian">
                    <div className={`accordion-body ${classes.accordionBody}`}>
                      <div className="row g-2 g-md-4">
                        <div className="col-12">
                          <div className={classes.breadcrumb}>
                            <ol className="breadcrumb mb-0">
                              <li className={`breadcrumb-item ${classes.breadcrumbItemm}`}><a className={`${classes.breadcrumbItem}`} href="#">Orders</a></li>
                              <li className={`breadcrumb-item ${classes.breadcrumbItemm}`}><a className={`${classes.breadcrumbItem}`} href="#">ID 3352655445</a></li>
                            </ol>
                          </div>
                        </div>
                        <div className="col-12 px-0 px-sm-5 px-0">
                          <div className="row mx-0">
                            <div className="col ps-0">
                              <div className={classes.head}>Order ID: 3354654654526</div>
                            </div>
                            <div className="col-auto px-0 mt-md-0 mt-2">
                              <div className={classes.headBtns}>
                                <button className={classes.invoiceBtn}><img className='me-2' src={invoice.src} />Invoice</button>
                                <button className={classes.trackBtn}>Track Order<img className="ms-1" src={location.src} /></button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 px-0 px-md-5 px-0 pt-3 pb-4">
                          <div className="row flex-column-reverse flex-lg-row-reverse mx-0">
                            <div className={`col-lg-3 col-12 px-0 ${classes.colAfter}`}>
                              <div className="row flex-lg-column mx-0 align-items-center">
                                <div className="col-lg-12 col order-2 order-lg-1"><div className={classes.trackupper}>Delivered </div></div>
                                <div className="col-lg-12 order-1 order-lg-2  col-auto d-flex justify-content-center py-2 active"><span className={classes.trackspan}></span></div>
                                <div className="col-12 order-3">
                                  <div className={classes.trackbottom}>Wed, 1 lth Jan</div>
                                </div>
                              </div>
                            </div>
                            <div className={`col-lg-3 col-12 px-0 ${classes.colAfter} `}>
                              <div className="row flex-lg-column mx-0 align-items-center">
                                <div className="col-lg-12 col order-2 order-lg-1"><div className={classes.trackupper}>Out Foe Delivery</div></div>
                                <div className="col-lg-12 order-1 order-lg-2  col-auto d-flex justify-content-center py-2 active"><span className={classes.trackspan}></span></div>
                                <div className="col-12 order-3">
                                  <div className={classes.trackbottom}>Wed, 1 lth Jan</div>
                                </div>
                              </div>
                            </div>
                            <div className={`col-lg-3 col-12 px-0 ${classes.colAfter}`}>
                              <div className="row flex-lg-column mx-0 align-items-center">
                                <div className="col-lg-12 col order-2 order-lg-1"><div className={classes.trackupper}>Shipped</div></div>
                                <div className="col-lg-12 order-1 order-lg-2  col-auto d-flex justify-content-center py-2 active"><span className={classes.trackspan}></span></div>
                                <div className="col-12 order-3">
                                  <div className={classes.trackbottom}>Wed, 1 lth Jan</div>
                                </div>
                              </div>
                            </div>
                            <div className={`col-lg-3 col-12 px-0 ${classes.colAfter} ${classes.colAfterActive}`}>
                              <div className="row flex-lg-column mx-0 align-items-center">
                                <div className="col-lg-12 col order-2 order-lg-1"><div className={classes.trackupper}>Order Confirmed</div></div>
                                <div className="col-lg-12 order-1 order-lg-2 col-auto d-flex justify-content-center py-2 active"><span className={classes.trackspan}></span></div>
                                <div className="col-12 order-3">
                                  <div className={classes.trackbottom}>Wed, 1 lth Jan</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 px-0 px-sm-5 px-0">
                          <div className="row mx-0 align-items-center mb-4">
                            <div className="col-sm col-12 px-0">
                              <div className="row mx-0 align-items-md-center">
                                <div className="col-auto"><div className={classes.productImgg}><img src={productRectangle.src} /></div></div>
                                <div className="col">
                                  <div className={`mb-md-2 ${classes.orderHead}`}>The Fumo</div>
                                  <div className={`d-flex flex-column flex-md-row ${classes.orderMeasurment}`}>
                                    <span className={classes.orderMeasurmenttxt}>Height: 110cm</span>
                                    <span className={`d-none d-md-block ${classes.orderMeasurmentdivider}`}></span>
                                    <span className={classes.orderMeasurmenttxt}>Width: 75cm</span>
                                    <span className={`d-md-none ${classes.orderMeasurmenttxt}`}>BD 120.000</span>
                                    <span className={`d-md-none ${classes.orderMeasurmenttxt}`}>Oty: 1</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-auto col-12 d-none d-md-block">
                              <div className="row mx-0 align-items-center">
                                <div className="col-md-12 col"><div className={classes.ordertext1}>BD 120.000</div></div>
                                <div className="col-md-12 col-auto"><div className={classes.ordertext2}>Oty: 1</div></div>
                              </div>
                            </div>
                          </div>
                          <div className="row mx-0 align-items-center mb-4">
                            <div className="col-sm col-12 px-0">
                              <div className="row mx-0 align-items-md-center">
                                <div className="col-auto"><div className={classes.productImgg}><img src={productRectangle.src} /></div></div>
                                <div className="col">
                                  <div className={`mb-md-2 ${classes.orderHead}`}>The Fumo</div>
                                  <div className={`d-flex flex-column flex-md-row ${classes.orderMeasurment}`}>
                                    <span className={classes.orderMeasurmenttxt}>Height: 110cm</span>
                                    <span className={`d-none d-md-block ${classes.orderMeasurmentdivider}`}></span>
                                    <span className={classes.orderMeasurmenttxt}>Width: 75cm</span>
                                    <span className={`d-md-none ${classes.orderMeasurmenttxt}`}>BD 120.000</span>
                                    <span className={`d-md-none ${classes.orderMeasurmenttxt}`}>Oty: 1</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-auto col-12 d-none d-md-block">
                              <div className="row mx-0 align-items-center">
                                <div className="col-md-12 col"><div className={classes.ordertext1}>BD 120.000</div></div>
                                <div className="col-md-12 col-auto"><div className={classes.ordertext2}>Oty: 1</div></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 px-0 px-sm-5 px-0">
                          <div className="row border-top pt-4 border-bottom pb-4 mx-0" style={{ borderColor: '#D0D5DD' }}>
                            <div className="col-sm-6 col-12">
                              <div className={classes.paymentHead}>Payment</div>
                              <div className={classes.payment}>Visa **56 <img src={visa.src} /></div>
                            </div>
                            <div className="col-sm-6 col-12 mt-3 mt-sm-0">
                              <div className={classes.paymentHead}>Delivery</div>
                              <div className={classes.paymentSubHead}>Address</div>
                              <div className={`mb-0 ${classes.paymentAddress}`}>847  Bridge Apt. 174
                                Manama, Bahrain
                                474-769-3919
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 px-0 px-sm-5 px-0">
                          <div className="row  mx-0">
                            <div className="col-sm-6 col-12 d-flex flex-column">
                              <div className={` mb-3 ${classes.paymentHead}`}>Need Help</div>
                              <div className={classes.paymentttt}><img className="nextimage" src={exclamation.src} /> Order Issues <img src={arrow.src} /></div>
                              <div className={classes.paymentttt}><img className="nextimage" src={delivery.src} /> Delivery Info <img className="arrowimg" src={arrow.src} /></div>
                              <div className={classes.paymentttt}><img className="nextimage" src={returnn.src} /> Return <img className="arrowimg" src={arrow.src} /></div>
                            </div>
                            <div className="col-sm-6 col-12 ">
                              <div className={` mb-3 mt-3 mt-sm-0 ${classes.paymentHead}`}>Order Summary</div>
                              <div className='d-flex justify-content-between'>
                                <div className={classes.paymentAddress}>Discount</div>
                                <div className={classes.paymentAddress}>BD 0.00</div>
                              </div>
                              <div className='d-flex justify-content-between'>
                                <div className={classes.paymentAddress}>Delivery</div>
                                <div className={classes.paymentAddress}>BD 0.00</div>
                              </div>
                              <div className='d-flex justify-content-between'>
                                <div className={classes.paymentAddress}>Tax</div>
                                <div className={classes.paymentAddress}>BD 0.00</div>
                              </div>
                              <div className='d-flex justify-content-between pt-2 pt-md-4 mt-1'>
                                <div className={classes.paymentAddress}>Total</div>
                                <div className={classes.paymentAddress} style={{ fontWeight: 700 }}>BD 0.00</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`accordion-item ${classes.accordionItem}`} >
                  <div className={`accordion-header ${classes.accordionHeader}`} >
                    <div className="row align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#orderHistory" aria-expanded="true" aria-controls="orderHistory">
                      <div className="col">
                        <div className={`accordion-button ${classes.accordionBtn}`}>
                          Order History
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className={classes.accordionClose}><img src={accordion.src} /></div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="orderHistory"
                    className={`accordion-collapse collapse ${classes.accordionCollapse}`}
                    data-bs-parent="#userProfileAccordian"
                  >
                    <div className={`accordion-body ${classes.accordionBody}`}>
                      <div className="row g-4">
                        <div className={`container-fluid ${classesWishlist.wishlistPageFluid}`}>
                          <div className={`custom_container ${classesWishlist.container}`}>
                            <div className='row pb-5 pt-4 pt-md-5 g-3'>
                              <div className='col-12'>
                                <div className={classesWishlist.wishlistCard}>
                                  <div className='row align-items-center'>
                                    <div className='col-md-auto col-4'>
                                      <div className={classesWishlist.product}>
                                        <img src={`..${productImage?.src}`} alt={"The Fumo Design"} />
                                      </div>
                                    </div>
                                    <div className='col-md col-8'>
                                      <div className='row'>
                                        <div className='col-12'>
                                          <div className={classesWishlist.productHeading}>
                                            The Fumo Design
                                          </div></div>
                                        <div className='col-12'>
                                          <div className={classesWishlist.productCode}>
                                            BD 62
                                          </div>
                                        </div>
                                        <div className='col-12'>
                                          <div className={classesWishlist.productDes}>

                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
                                          </div>
                                        </div>
                                        {/* <div className='col-12 d-flex align-items-center'>
                                          <div className={classesWishlist.cart}
                                          >
                                            <img src={cart.src} />
                                          </div>
                                          <div className={classesWishlist.like}
                                          >
                                            <img src={like.src} />
                                          </div>
                                        </div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-12'>
                                <div className={classesWishlist.wishlistCard}>
                                  <div className='row align-items-center'>
                                    <div className='col-md-auto col-4'>
                                      <div className={classesWishlist.product}>
                                        <img src={`..${productImage?.src}`} alt={"The Fumo Design"} />
                                      </div>
                                    </div>
                                    <div className='col-md col-8'>
                                      <div className='row'>
                                        <div className='col-12'>
                                          <div className={classesWishlist.productHeading}>
                                            The Fumo Design
                                          </div></div>
                                        <div className='col-12'>
                                          <div className={classesWishlist.productCode}>
                                            BD 62
                                          </div>
                                        </div>
                                        <div className='col-12'>
                                          <div className={classesWishlist.productDes}>

                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
                                          </div>
                                        </div>
                                        {/* <div className='col-12 d-flex align-items-center'>
                                          <div className={classesWishlist.cart}
                                          >
                                            <img src={cart.src} />
                                          </div>
                                          <div className={classesWishlist.like}
                                          >
                                            <img src={like.src} />
                                          </div>
                                        </div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-12'>
                                <div className={classesWishlist.wishlistCard}>
                                  <div className='row align-items-center'>
                                    <div className='col-md-auto col-4'>
                                      <div className={classesWishlist.product}>
                                        <img src={`..${productImage?.src}`} alt={"The Fumo Design"} />
                                      </div>
                                    </div>
                                    <div className='col-md col-8'>
                                      <div className='row'>
                                        <div className='col-12'>
                                          <div className={classesWishlist.productHeading}>
                                            The Fumo Design
                                          </div></div>
                                        <div className='col-12'>
                                          <div className={classesWishlist.productCode}>
                                            BD 62
                                          </div>
                                        </div>
                                        <div className='col-12'>
                                          <div className={classesWishlist.productDes}>

                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.
                                          </div>
                                        </div>
                                        {/* <div className='col-12 d-flex align-items-center'>
                                          <div className={classesWishlist.cart}
                                          >
                                            <img src={cart.src} />
                                          </div>
                                          <div className={classesWishlist.like}
                                          >
                                            <img src={like.src} />
                                          </div>
                                        </div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`accordion-item ${classes.accordionItem}`} >
                  <div className={`accordion-header ${classes.accordionHeader}`} >
                    <div className="row align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#loyality" aria-expanded="true" aria-controls="loyality">
                      <div className="col">
                        <div className={`accordion-button ${classes.accordionBtn}`} >
                          Loyalty Rewards
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className={classes.accordionClose}><img src={accordion.src} /></div>
                      </div>
                    </div>
                  </div>
                  <div id="loyality" className={`accordion-collapse collapse ${classes.accordionCollapse}`} data-bs-parent="#userProfileAccordian">
                    <div className={`accordion-body ${classes.accordionBody}`}>
                      <div className="row g-2 g-md-4 pb-md-5 pt-md-4 pb-3 pt-1 px-sm-5 px-0">
                        <div className="col-auto">
                          <div className={classes.level}><strong>LOYALTY LEVELS</strong></div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-start">
                          <div className={`me-2 me-sm-3 ${classes.lock}`}><img src={lock.src} /></div>
                          <div className={`me-3 me-sm-4 ${classes.leveltxt}`}>BRONZE</div>
                          <div className={`me-2 me-sm-3 ${classes.lock}`}><img src={lock.src} /></div>
                          <div className={`me-3 me-sm-4 ${classes.leveltxt}`}>SILVER</div>
                          <div className={`me-2 me-sm-3 ${classes.lock}`}><img src={lock.src} /></div>
                          <div className={`me-3 me-sm-4 ${classes.leveltxt}`}>GOLD</div>
                        </div>
                      </div>
                      <div className="row mx-0 ">
                        <div className="col-12 px-sm-5 px-0 mt-4">
                          <div className="position-relative">
                            <div className={`progress ${classes.bigProgress}`} role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                              <div className={classes.progress_bar} style={{ width: "25%" }}></div>
                            </div>
                            <div className={`position-absolute d-flex align-items-center justify-content-between ${classes.progressSteps}`}>
                              <div className={classes.progressStep}> 0</div>
                              <div className={classes.progressStep}> &nbsp;</div>
                              <div className={classes.progressStep}> &nbsp;</div>
                              <div className={classes.progressStep}> 3</div>
                              <div className={classes.progressStep}> &nbsp;</div>
                              <div className={classes.progressStep}> 5</div>
                              <div className={classes.progressStep}> &nbsp;</div>
                              <div className={classes.progressStep}> &nbsp;</div>
                              <div className={classes.progressStep}> 8</div>
                            </div>
                          </div>
                        </div>
                        <div className='col-12 px-sm-5 px-0 mt-4'><div className={classes.progressTxt}>You have 200 points Get 100 more points to become a Bronze member</div></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`accordion-item ${classes.accordionItem}`} >
                  <div className={`accordion-header ${classes.accordionHeader}`} >
                    <div className="row align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#savedAddress" aria-expanded="true" aria-controls="savedAddress">
                      <div className="col">
                        <div className={`accordion-button ${classes.accordionBtn}`} >
                          Saved Address
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className={classes.accordionClose}><img src={accordion.src} /></div>
                      </div>
                    </div>
                  </div>
                  <div id="savedAddress" className={`accordion-collapse collapse ${classes.accordionCollapse}`} data-bs-parent="#userProfileAccordian">
                    <div className={`accordion-body ${classes.accordionBody}`}>
                      <div className="row g-4">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 my-5"><button className={classes.signoutBtn}>Sign Out <img src={signout.src} /></button></div>
          </div>
        </div>
      </div>
    </>
  )
};

ProfilePage.requireAuth = true;

export default ProfilePage;
