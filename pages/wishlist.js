/* eslint-disable react-hooks/rules-of-hooks */

import { useRouter } from "next/router";
import classes from '../styles/wishlist.module.css';
import grid from './../public/images/grid.png';
import list from './../public/images/list.png';
import cart from './../public/images/cartIcon.png';
import like from './../public/images/wishlistIcon.png';
import emptyWishlist from '../public/images/emptyWishlist.png'
import Space from '~/components/Layout/Client/Space';
import { useEffect, useState } from 'react';
import { deleteData, fetchData } from '~/lib/clientFunctions';
import { useSelector, useDispatch } from 'react-redux';
import customId from "custom-id-new";
import useSWR from "swr";
import { toast } from "react-toastify";
import { addToCart } from '~/redux/cart.slice';
import { updateWishlist } from "~/redux/cart.slice";
import Error403 from "~/components/error/403";

const wishlist = () => {
    const [gridView, setGridView] = useState(false)
    const { session } = useSelector((state) => state.localSession);
    const url = `/api/profile?id=${session?.user?.id}`;
    const { data, error, mutate } = useSWR(session?.user?.id ? url : null, fetchData);
    const [wishlist, setWishlist] = useState([]);
    const { wishlist: wishlistState } = useSelector((state) => state.cart);
    const cartData = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (data && data.user) {
        setWishlist(data.user.favorite);
      }
    }, [data]);
  
  
    function updateWishlistCount() {
      const __data = wishlistState && wishlistState > 0 ? wishlistState - 1 : 0;
      dispatch(updateWishlist(__data));
    }
  
    const removeFromWishlist = async (pid) => {
      try {
        const data = {
          pid,
          id: session.user.id,
        };
        const response = await deleteData(`/api/wishlist`, data);
        response.success
          ? (toast.success("Item has been removed from your wishlist"),
            mutate(),
            updateWishlistCount())
          : toast.error("Something went wrong (500)");
      } catch (err) {
        toast.error(err.message);
      }
    };


    const addItemToCart = (item) => {
        const qty = 1;
        simpleProductCart(qty, item);
    };

    const simpleProductCart = (qty, productData) => {
        const { _id, name, image, quantity, price } = productData;
        const existed = cartData.items.find((item) => item._id === _id);
        const totalQty = existed ? existed.qty + qty : qty;
        console.log({quantity,totalQty});
        
        if (quantity === -1 || quantity >= totalQty) {
          const cartItem = {
            _id,
            uid: customId({ randomLength: 6 }),
            name,
            image,
            price: Number(price),
            qty,
            quantity,
            color: { name: null, value: null },
            attribute: { name: null, value: null, for: null },
          };
          dispatch(addToCart(cartItem));
          toast.success("Added to Cart");
        } else {
          toast.error("This item is out of stock!");
        }
    };

    if(!session){
        return <Error403/>
    }
    return (
        <>
            <Space/>
            <div className={`container-fluid ${classes.wishlistPageFluid}`}>
                <div className={`custom_container ${classes.container}`}>
                    <div className='row pt-sm-5 pt-3 pb-2'>
                        <div className='col-sm col-12 mb-3 mb-sm-0'><div className={classes.wishListHeading}>Wish List item </div></div>
                        <div className='col-sm-auto col-12 d-flex align-items-center justify-content-between'>
                            <div className={`d-flex align-items-center ${classes.sort}`}>Sort By :
                            <div className={classes.sortAfter}>
                                <select class={`form-select ${classes.formSelect}`} aria-label="Default select example">
                                    <option selected>Best Match</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            </div>
                            <div className={`d-flex align-items-center ${classes.view}`}>View :
                                <div onClick={()=>setGridView(true)} className={`mx-1 ${classes.viewImg}  ${gridView ? classes.viewActive : ''}`}>
                                    <img src={grid.src}/>
                                </div>
                                <div onClick={()=>setGridView(false)} className={`${classes.viewImg} ${!gridView ? classes.viewActive : ''}`}>
                                    <img src={list.src}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !gridView ? <>
                        <div className={`custom_container ${classes.container}`}>
                            <div className='row pb-5 pt-4 pt-md-5 gap-3'>
                                {wishlist?.length ?
                                    wishlist?.map((item)=> (
                                        <>
                                        <div className='col-12'>
                                            <div className={classes.wishlistCard}>
                                                <div className='row align-items-cente'>
                                                    <div className='col-md-auto col-4'>
                                                        <div className={classes.product}>
                                                            <img src={item?.image[0]?.url} alt={item?.name}/>
                                                        </div>
                                                    </div>
                                                    <div className='col-md col-8'>
                                                        <div className='row'>
                                                            <div className='col-12'><div className={classes.productHeading}>{item?.name}</div></div>
                                                            <div className='col-12'>
                                                                <div className={classes.productCode}>
                                                                    {/* {settings.settingsData.currency.symbol} */}
                                                                    BD
                                                                    {item?.price}
                                                                </div>
                                                            </div>
                                                            <div className='col-12'>
                                                                <div className={classes.productDes}>
                                                                    {item?.shortDescription}
                                                                </div>
                                                            </div>
                                                            <div className='col-12 d-flex align-items-center'>
                                                                <div className={classes.cart} 
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        if (!session) {
                                                                            toast.error("Please login to add in cart")
                                                                        } else {
                                                                            addItemToCart(item)
                                                                        }
                                                                    }}>
                                                                    <img src={cart.src}/>
                                                                </div>
                                                                <div className={classes.like} onClick={() => removeFromWishlist(item?._id)}>
                                                                    <img src={like.src}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </>
                                    )) : 
                                    <>
                                        <div className="col-12 py-5">
                                            <div className="row">
                                                <div className="col-12 text-center">
                                                    <img className={classes.emptyWishlistImg} src={emptyWishlist.src} alt="" />
                                                </div>
                                                <div className={`col-12 text-center ${classes.emptyTxt}`}>
                                                    You have no items in your wishlist
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </>: 
                    <>
                        <div className={`custom_container ${classes.container}`}>
                        <div className='row pb-5 pt-4 pt-md-5 g-3'>
                            {wishlist?.length ?
                                wishlist?.map((item)=> (
                                <>
                                    <div className='col-xl-4 col-md-6 col-12'>
                                        <div className={classes.wishlistCard}>
                                            <div className='row align-items-center p-2'>
                                                <div className='col-12 d-flex justify-content-center mb-4'>
                                                    <div className={classes.product2}>
                                                        <img src={item?.image[0]?.url} alt={item?.name}/>
                                                    </div>
                                                </div>
                                                <div className='col-12'>
                                                    <div className='row'>
                                                        <div className='col-12'><div className={classes.productHeading}>{item?.name}</div></div>
                                                        <div className='col-12'><div className={classes.productCode}>BD {item?.price}</div></div>
                                                        <div className='col-12'><div className={classes.productDes}>{item?.shortDescription}</div></div>
                                                        <div className='col-12 d-flex align-items-center'>
                                                            <div className={classes.cart}
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    if (!session) {
                                                                        toast.error("Please login to add in cart")
                                                                    } else {
                                                                        addItemToCart(item)
                                                                    }
                                                                }}>
                                                                <img src={cart.src}/>
                                                            </div>
                                                            <div className={classes.like} onClick={() => removeFromWishlist(item?._id)}>
                                                                <img src={like.src}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )) :
                            <>
                            <div className="col-12 py-5">
                                <div className="row">
                                    <div className="col-12 text-center">
                                        <img className={classes.emptyWishlistImg} src={emptyWishlist.src} alt="" />
                                    </div>
                                    <div className={`col-12 text-center ${classes.emptyTxt}`}>
                                        You have no items in your wishlist
                                    </div>
                                </div>
                            </div>
                        </>
                            }
                        </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default wishlist