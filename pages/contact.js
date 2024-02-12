import React from 'react'
import classes from '../styles/contact.module.css'
import phone from './../public/images/phonecontact.png'
import fax from './../public/images/fax.png'
import mail from './../public/images/mailcontact.png'
import Space from '~/components/Layout/Client/Space'
import dropdownIcon from './../public/images/selectIcon.png'




const Contact = () => {
    return (
        <>
        <Space/>
            <div className="container-fluid contactPageFluid py-5">
                <div className={`custom_container py-5 ${classes.containerBg}`}>
                    <div className="row">
                        <div className="col-xl-7 col-lg-6 col-12 px-0">
                            <div className="row mx-0">
                                <div className="col-12"><div className={classes.heading}>Get in Touch</div></div>
                                <div className="col-12"><div className={classes.subHeading}>Feel free to contact for any complains and  enquirers.  We believe in <br/> customer feedback and suggestions.</div>
                                </div>
                                <div className="col-12 mb-4">
                                    <input className={classes.inp} type ="text" placeholder='Name *' />
                                </div>
                                <div className="col-12 mb-4">
                                    <input className={classes.inp} type ="email" placeholder='Email *' />
                                </div>
                                <div className="col-12 mb-4">
                                    <input className={classes.inp} type ="number" placeholder='Phone number  *' />
                                </div>
                                <div className="col-12 mb-4">
                                    <select className={`form-select  ${classes.formSelect}`} style={{'--bs-form-select-bg-img ': `url(${dropdownIcon.src})`}} aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                                <div className="col-12"><button className={classes.contactBtn}>SEND</button></div>
                                <div className="col-xl-10 col-12 pt-5 px-0">
                                    <div className="row mx-0">
                                        <div className="col-xl-4 col-lg-auto col-sm-4 col-12 px-0">
                                            <div className="row align-items-center mx-0">
                                                <div className="col-auto ">
                                                    <div className={classes.icons}><img src={phone.src}/></div>
                                                </div>
                                                <div className="col ps-0">
                                                    <div className={classes.text}>PHONE</div>
                                                    <div className={classes.number}>03 5432 1234</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-auto col-sm-4 col-12 mt-4 mt-sm-0 px-0">
                                            <div className="row align-items-center mx-0">
                                                <div className="col-auto pe-0">
                                                    <div className={classes.icons}><img src={fax.src}/></div>
                                                </div>
                                                <div className="col ">
                                                    <div className={classes.text}>FAX</div>
                                                    <div className={classes.number}>03 5432 1234</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-4 col-lg-auto col-sm-4 col-12 mt-4 mt-sm-0 px-0">
                                            <div className="row align-items-center mx-0">
                                                <div className="col-auto">
                                                    <div className={classes.icons}><img src={mail.src}/></div>
                                                </div>
                                                <div className="col px-0">
                                                    <div className={classes.text}>EMAIL</div>
                                                    <div className={classes.number}>info@elkhair.com.bh</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-6 col-12 mt-md-5 mt-0 mt-lg-0 px-0">
                            <div className="row mx-0 h-100">
                                <div className="col-12 h-100">
                                    <div className={classes.map}>
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2965.0824050173574!2d-93.63905729999999!3d41.998507000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sWebFilings%2C+University+Boulevard%2C+Ames%2C+IA!5e0!3m2!1sen!2sus!4v1390839289319" width="100%" height="100%" frameborder="0" style={{border: '0'}}></iframe>
                                    </div>
                                    <div className={classes.mapTxt}>MASTHAN BULIDING, OFFICE 21, BLDG 2415, ROAD 2831, BLOCK 428, SEEF DISTRICT
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact