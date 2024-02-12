import { CardText, ChatLeftDots, StarHalf } from "@styled-icons/bootstrap";
import customId from "custom-id-new";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { useDispatch, useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import Error404 from "~/components/error/404";
import Error500 from "~/components/error/500";
import HeadData from "~/components/Head";
import ImageLoader from "~/components/Image";
import Question from "~/components/question";
import Review from "~/components/Review";
import Product from "~/components/Shop/Product/product";
import classes from "~/components/Shop/Product/productDetails.module.css";
import { postData, setSettingsData, stockInfo } from "~/lib/clientFunctions";
import productDetailsData from "~/lib/dataLoader/productDetails";
import { addToCart, addVariableProductToCart } from "~/redux/cart.slice";
import { wrapper } from "~/redux/store";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Thumbs } from 'swiper/modules';
import ProductListing from "~/components/productListing/ProductListing";
import Space from "~/components/Layout/Client/Space";

import Hose1 from "../../public/images/p1.png";
import Hose2 from "../../public/images/p.png";

const Carousel = dynamic(() =>
  import("react-responsive-carousel").then((com) => com.Carousel)
);

function ProductDetailsPage({ data, error }) {
  const [selectedColor, setSelectedColor] = useState({
    name: null,
    value: null,
  });
  const [selectedAttribute, setSelectedAttribute] = useState({
    name: null,
    value: null,
    for: null,
  });
  const { session } = useSelector((state) => state.localSession);
  const [price, setPrice] = useState(0);
  const [tabId, setTabId] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useDispatch();
  const quantityAmount = useRef();
  const question = useRef();
  const cartData = useSelector((state) => state.cart);
  const settings = useSelector((state) => state.settings);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const router = useRouter();
  const relatedItem =
    data.related &&
    data.related.filter((obj) => {
      return obj._id !== data.product._id;
    });
  console.log("data---->>>", { data });

  const { t } = useTranslation();
  useEffect(() => {
    if (data && data.product) {
      setPrice(data.product.discount);
      if (data.product.type !== "variable") {
        return;
      }
      if (data.product.colors && data.product.colors.length > 0) {
        setSelectedColor({
          name: data.product.colors[0]?.label,
          value: data.product.colors[0]?.value,
        });
      }
      if (data.product.attributes && data.product.attributes.length > 0) {
        setSelectedAttribute({
          name: data.product.attributes[0]?.label,
          value: data.product.attributes[0]?.value,
          for: data.product.attributes[0]?.for,
        });
      }
    }
  }, [data]);

  const checkVariantInfo = (color, attr) => {
    const colorName = color || selectedColor.name;
    const attrName = attr || selectedAttribute.name;
    return data.product.variants.find(
      (item) => item.color === colorName && item.attr === attrName
    );
  };

  const stepUpQty = () => {
    quantityAmount.current.stepUp();
  };

  const stepDownQty = () => {
    quantityAmount.current.stepDown();
  };

  const selectPreviewImage = (vd) => {
    if (vd.imageIndex && vd.imageIndex > 0) {
      setSelectedImage(vd.imageIndex - 1);
    }
  };

  const updatePrice = (color, attr) => {
    const variantData = checkVariantInfo(color, attr);
    if (variantData && variantData.price) {
      const itemPrice = data.product.discount + Number(variantData.price);
      setPrice(itemPrice);
      selectPreviewImage(variantData);
    }
  };

  const changeColor = (e) => {
    try {
      const value = {
        name: e.label,
        value: e.value,
      };
      setSelectedColor(value);
      updatePrice(value.name, null);
    } catch (err) {
      console.log(err);
    }
  };

  const changeVariant = (e) => {
    try {
      const value = {
        name: e.label,
        value: e.value,
        for: e.for,
      };
      setSelectedAttribute(value);
      updatePrice(null, value.name);
    } catch (err) {
      console.log(err);
    }
  };

  const simpleProductCart = (qty) => {
    const { _id, name, image, quantity } = data.product;
    const existed = cartData.items.find((item) => item._id === _id);
    const totalQty = existed ? existed.qty + qty : qty;
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

  const checkQty = (prevQty, currentQty, availableQty) => {
    const avQty = Number(availableQty);
    if (avQty === -1) {
      return true;
    } else {
      return prevQty + currentQty <= avQty;
    }
  };

  const variableProductCart = (qty) => {
    try {
      const { _id, name, image, colors, attributes } = data.product;
      if (colors.length && !selectedColor.name) {
        toast.warning("Please Select Color!");
      } else if (attributes.length && !selectedAttribute.name) {
        toast.warning(`Please Select ${attributes[0]?.for}!`);
      } else {
        const existedProduct = cartData.items.find(
          (item) =>
            item._id === _id &&
            item.color.name == selectedColor.name &&
            item.attribute.name == selectedAttribute.name
        );
        const existedQty = existedProduct ? existedProduct.qty : 0;
        const variantData = checkVariantInfo(
          selectedColor.name,
          selectedAttribute.name
        );
        const qtyAvailable =
          variantData && checkQty(existedQty, qty, variantData.qty);
        if (qtyAvailable) {
          const cartItem = {
            _id,
            uid: customId({ randomLength: 6 }),
            name,
            image,
            price: Number(price),
            qty,
            quantity: Number(variantData.qty),
            sku: variantData.sku,
            color: selectedColor.name
              ? { name: selectedColor.name, value: selectedColor.value }
              : { name: null, value: null },
            attribute: selectedAttribute.name
              ? {
                name: selectedAttribute.name,
                value: selectedAttribute.value,
                for: attributes[0]?.for,
              }
              : { name: null, value: null, for: null },
          };
          dispatch(addVariableProductToCart(cartItem));
          toast.success("Added to Cart");
        } else {
          toast.error("This item is out of stock!");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong");
    }
  };

  const addItemToCart = () => {
    const qty = Number(quantityAmount.current.value);
    if (data.product.type === "simple") {
      simpleProductCart(qty);
    } else {
      variableProductCart(qty);
    }
  };

  const thumbs = () => {
    const thumbList = data.product.gallery.map((item, index) => (
      <ImageLoader
        key={item.name + index}
        src={item.url}
        alt={data.product.name}
        width={67}
        height={67}
        style={{ width: "100%", height: "auto" }}
      />
    ));
    return thumbList;
  };

  const _showTab = (i) => {
    setTabId(i);
  };

  const refreshData = () => router.replace(router.asPath);

  // Define a function to remove <p> tags from a string
function removePTags(description) {
  return description.replace(/<p>/g, '').replace(/<\/p>/g, '');
}


  async function postQuestion(e) {
    try {
      e.preventDefault();
      const _data = {
        pid: data.product._id,
        question: question.current.value.trim(),
      };
      const _r = await postData("/api/question", _data);
      _r.success
        ? (toast.success("Question Added Successfully"), refreshData())
        : toast.error("Something Went Wrong 500");
    } catch (err) {
      console.log(err);
      toast.error(`Something Went Wrong - ${err.message}`);
    }
  }

  useEffect(() => {
    if (data.product) {
      const cl = data.product.colors?.length || 0;
      const al = data.product.attributes?.length || 0;
      if (cl > 0 && al > 0) {
        updatePrice(selectedColor.name, selectedAttribute.name);
      }
      if (cl > 0 && al === 0) {
        updatePrice(selectedColor.name, null);
      }
      if (cl === 0 && al > 0) {
        updatePrice(null, selectedAttribute.name);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor, selectedAttribute]);

  if (error) return <Error500 />;
  if (!data.product) return <Error404 />;

  console.log(data, "aaa");

  return (
    <>
      <Space />
      <HeadData
        title={data.product.name}
        seo={data.product.seo}
        url={`product/${data.product.slug}`}
      />
      <div className={`py-1 ${classes.productDetailOuter}`}>
        <div className="custom_container">
          <div className="px-md-2 py-3">
            <div className={classes.container}>
              <div className="row gx-lg-4 gx-xl-5 justify-content-between">
                <div className="col-lg-6 col-xl-5">
                  <div className={`productViewSwiper ${classes.productSlider}`}>
                    <Swiper
                      loop={true}
                      spaceBetween={10}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Thumbs]}
                      className={classes.parentSlider}
                    >
                    {/* { <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                      </SwiperSlide>
                    } */}
                   
                        {data && data?.product?.gallery?.map((item) => (
                          <SwiperSlide key={`${Math.floor(Math.random() * 1000)}`}>
                            <img src={item?.url} />
                          </SwiperSlide>
                        ))}
               

                    </Swiper>
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      loop={true}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Thumbs]}
                      className={classes.chlidSwiper}
                    >
                    
                       {data && data?.product?.gallery?.map((item) => (
                          <SwiperSlide className={classes.childSliders}
                            key={`${Math.floor(Math.random() * 1000)}`}
                          >
                            <div className={classes.childSlide}>
                              <img src={item?.url} />
                            </div>
                          </SwiperSlide>
                        ))}
                   
                      {/* {
                      <SwiperSlide className={classes.childSliders}>
                        <div className={classes.childSlide}>
                          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className={classes.childSliders}>
                        <div className={classes.childSlide}>
                          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className={classes.childSliders}>
                        <div className={classes.childSlide}>
                          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className={classes.childSliders}>
                        <div className={classes.childSlide}>
                          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                        </div>
                      </SwiperSlide>
                    } */}
                    </Swiper>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className={classes.details}>
                    <h1 className={classes.heading}>{data?.product?.name}</h1>
                    <h6 className={classes.heading} style={{ fontSize: '20px' }}>BD {data?.product?.price}</h6>
                    <div className={classes.descriptionTitle}>Description</div>
                    <div className={classes.description}>
                      <div className="mb-3">
                        {/* A timeless design, with premium materials features as one of our most popular and iconic pieces. The Pod is perfect for any stylish living space with beech legs . */}
                        {data?.product?.shortDescription}
                        {/* {data?.product?.description} */}

                      </div>
                      {/*  <ul>
                          <li>Premium material</li>
                          <li>Top Notch Pod</li>
                          <li>Quality timeless classic</li>
                        </ul>
                        
                      */}
                    
                    </div>
                    <div className={classes.descriptionTitle}>WHATS IN THE PACKAGE</div>
                    <div>
                      <ul>
         {/* Remove <p> tags from the description and split it into an array of items */}
{removePTags(data?.product?.description)
  .split('<br>')
  .filter(item => item.trim() !== '') // Filter out empty strings
  .map((item, index) => (
    <li key={index} style={{ color: 'white' }}>{item}</li>
))}

                        {/* <li style={{ color: 'white' }}>
                        COMPLETE HOOKAH SYSTEM</li>
<li style={{ color: 'white' }}>CRYSTAL CIRCULOS BASE</li>
<li style={{ color: 'white' }}>STAINLESS STEEL CENTER SECTION</li>
<li style={{ color: 'white' }}>HEAT MANAGEMENT</li>
<li style={{ color: 'white' }}>DOWNSTEM CRYSTAL CIRCULOS BASE</li>
<li style={{ color: 'white' }}>PORCELAIN BOWL</li>
<li style={{ color: 'white' }}>PRO HOSE SET</li> */}
                        
                      </ul>
                      {/* <table className={classes.desTable}>
                        <thead>
                          <tr>
                            <th>Height</th>
                            <th>Width</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>110cm</td>
                            <td>75cm</td>
                          </tr>
                        </tbody>
                      </table> */}
                    </div>
                    <div className={classes.descriptionTitle}>HOSE OPTIONS</div>
                    <div className="hose">
                      <div className="row">
                        <div className="col-md-6" style={{ textAlign: 'center' }}>
                          <img src={Hose1.src}></img>
                          <p style={{ color: 'white' }}><br></br>Circulos Pro Hose Set</p>
                          <p style={{ color: 'white' }}> + BD 50 </p>
                          
                        </div>
                        <div className="col-md-6" style={{ textAlign: 'center' }}>
                        <img src={Hose2.src}></img>
                          <p style={{ color: 'white' }}><br></br>Circulos Pro Leather Hose Set</p>
                          
                        </div>
                      </div>
                    </div>
                    <div className={classes.cart_section}>
                      <div className="d-flex align-items-center">
                        <p className={classes.section_heading}>Amount:</p>
                        <div className={classes.number_input}>
                          <button
                            onClick={stepDownQty}
                            className={classes.minus}
                          ></button>
                          <input
                            className={classes.quantity}
                            ref={quantityAmount}
                            min="1"
                            max={
                              data.product.quantity === -1
                                ? 100000
                                : data.product.quantity
                            }
                            defaultValue="1"
                            type="number"
                            disabled
                          />
                          <button
                            onClick={stepUpQty}
                            className={classes.plus}
                          ></button>
                        </div>
                      </div>
                      <div className={` ${classes.button_container}`}>
                        {stockInfo(data.product) ? (
                          <button
                            className={classes.cart_button}
                            onClick={() => addItemToCart()}
                          >
                            {t("add_to_cart")}
                          </button>
                        ) : (
                          <button className={classes.cart_button} disabled>
                            {t("out_of_stock")}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {relatedItem?.length ? (
        <ProductListing sectionTitle={"You May also like"} productList={relatedItem} />
      ) : (
        <></>
      )}
    </>
  );
}

function EmptyContent({ icon, text }) {
  return (
    <div className={classes.empty_content}>
      <div className={classes.empty_icon}>{icon}</div>
      <div className={classes.empty_text}>{text}</div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, query }) => {
      if (res) {
        res.setHeader(
          "Cache-Control",
          "public, s-maxage=10800, stale-while-revalidate=59"
        );
      }
      const _data = await productDetailsData(query.name);
      const data = JSON.parse(JSON.stringify(_data));
      if (data.success) {
        setSettingsData(store, data);
      }
      return {
        props: {
          data,
          error: !data.success,
        },
      };
    }
);

export default ProductDetailsPage;
