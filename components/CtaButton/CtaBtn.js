import React from 'react'
import classes from './ctaBtn.module.css';
import arrow from '../../public/images/arrow_forward.svg';

const CtaBtn = () => {
    return (
        <>
            <div className={classes.brandSliderOuterCta}>
                <div className='custom_container'>
                    <div className={classes.ctaWrapper}>
                        <div className='row mb-4'>
                            <div className='col-lg-9 col-12 mb-3 mb-lg-0'><div className={classes.ctaHead}>JOIN OUR LOYALTY PROGRAM & GET EXTRA 15% OFF!</div></div>
                            <div className='col-lg-3 col-12'><div className={classes.ctaSubHead}>Join Loyalty Rewards:</div></div>
                        </div>
                        <div className='row align-items-center'>
                            <div className='col-lg-9 col-md-6 col-12 mb-3 mb-md-0'><div className={classes.ctaSubHead}>On your first order only! Be part of  our community today.</div></div>
                            <div className='col-lg-3 col-md-6 col-12'>
                                <div className={classes.ctaInpWrapper}>
                                    <input className={classes.ctaInp} type="text" placeholder='Email'/>
                                    <div className={classes.arrowImg}><img src={arrow.src}/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CtaBtn