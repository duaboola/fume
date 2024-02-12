import { Basket3 } from "@styled-icons/bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postData } from "~/lib/clientFunctions";
import {
  applyCoupon,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "~/redux/cart.slice";
import ImageLoader from "../Image";
import product from "../../public/images/productImg.png";
import calender from "../../public/images/calender.svg";
import classes from "./cartPage.module.css";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const couponCode = useRef("");
  const cart = useSelector((state) => state.cart);
  console.log("cart------>>>", { cart });

  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const router = useRouter();
  const { session } = useSelector((state) => state.localSession);
  const { t } = useTranslation();
  const decimalBalance = (num) => Math.round(num * 10) / 10;
  const getTotalPrice = decimalBalance(
    cart.items.reduce(
      (accumulator, item) => accumulator + item.qty * item.price,
      0
    )
  );

  const discountPrice = decimalBalance(
    getTotalPrice - (cart.coupon.discount / 100) * getTotalPrice
  );

  const checkMaxQty = (uid) => {
    const product = cart.items.find((item) => item.uid === uid);
    if (product && product.quantity === -1) {
      return true;
    }
    return product && product.quantity >= product.qty + 1;
  };

  const increaseQty = (uid) => {
    if (checkMaxQty(uid)) {
      dispatch(incrementQuantity(uid));
    } else {
      toast.error("This item is out of stock!");
    }
  };

  const decreaseQty = (uid) => {
    dispatch(decrementQuantity(uid));
  };

  const validateCoupon = (data) => {
    const coupon = {
      code: data.code,
      discount: data.discount,
    };
    dispatch(applyCoupon(coupon));
  };

  const checkCoupon = async () => {
    try {
      const data = await postData("/api/order/coupon", {
        code: couponCode.current.value.trim(),
      });
      data && data.success
        ? (toast.success(data.message), validateCoupon(data))
        : toast.error(data.message);
    } catch (err) {
      console.log(err);
      toast.error("Something Went Wrong!");
    }
  };

  const checkoutProcess = () => {
    if (settings.settingsData.security.loginForPurchase && !session) {
      toast.info("Please Login To Continue");
      router.push("/signin");
    } else {
      router.push("/checkout");
    }
  };
  // uncomment this ---->>
  if (cart.items.length === 0) {
    return (
      <div className={classes.empty}>
        <Basket3 width={50} height={50} />
        <h1>{t("your_cart_is_empty")}</h1>
        <Link href="/gallery">{t("back_to_shopping")}</Link>
      </div>
    );
  }
  return (
    <div className={classes.cardOuter}>
      <div className="custom_container py-5">
        <div className="row justify-content-center my-4">
          <div className="col-xl-10">
            <div className={classes.container}>
              <h1 className={classes.cartHead}>{t("Your shopping cart")}</h1>
              <div className={classes.header}>
                <p className={classes.cartSubHead}>{t("Product")}</p>
                <p className={`text-center ${classes.cartSubHead}`}>{t("Quantity")}</p>
                <p className={`text-end ${classes.cartSubHead}`}>{t("total")}</p>
              </div>
              {cart.items.map((item, index) => (
                // {[1, 2, 3, 4, 5].map((item, index) => (
                <div key={index} className={classes.body}>
                  <div className={classes.productWrapper}>
                    <div className="row">
                      <div className="col-auto">
                        <div className={classes.productImg}>
                          <img src={product.src} />
                        </div>
                      </div>
                      <div className="col">
                        <div className="row">
                          <div className="col-12"><div className={classes.product}>{item?.name}</div></div>
                          <div className="col-12">
                            {/* <div className={classes.des}>A timeless glass pod with a tri color grey glaze.</div> */}
                          </div>
                          <div className="col-12"><div className={classes.number}>BD{item?.price}</div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`text-center ${classes.buttons}`} data-name="Actions">
                    <button className={classes.minus} onClick={() => decreaseQty(item.uid)}>-</button>
                    <button className={classes.qtyNum} onClick={() => decreaseQty(item.uid)}>{item?.qty}</button>
                    <button className={classes.plus} onClick={() => increaseQty(item.uid)}>+</button>
                  </div>
                  <div className={`text-end ${classes.total}`} data-name="Total Price">
                    BD{item?.qty * item?.price}
                  </div>
                </div>
              ))}
              {/* <div className={classes.card_container}>
                  <div className={classes.card}>
                    <p>{t("delivery")}</p>
                    <b>{settings.settingsData.currency.symbol}0</b>
                  </div>
                  <div className={classes.card}>
                    <p>{t("sub_total")}</p>
                    <b>
                      {settings.settingsData.currency.symbol}
                      {getTotalPrice}
                    </b>
                  </div>
                  <div className={classes.card}>
                    <p>{t("discount")}</p>
                    <b>
                      {settings.settingsData.currency.symbol}
                      {decimalBalance(getTotalPrice - discountPrice)}
                    </b>
                  </div>
                  <div className={classes.card}>
                    <p>{t("total_incl_vat")}</p>
                    <b>
                      {settings.settingsData.currency.symbol}
                      {discountPrice}
                    </b>
                  </div>
                </div>
                <div className={classes.checkout_container}>
                  <div className={classes.coupon}>
                    <input
                      type="text"
                      ref={couponCode}
                      defaultValue={cart.coupon.code}
                      placeholder={t("please_enter_promo_code")}
                    />
                    <button onClick={checkCoupon}>{t("apply_discount")}</button>
                  </div>
                  <div className={classes.checkout}>
                    <button onClick={checkoutProcess}>{t("checkout")}</button>
                    <Link href="/gallery">{t("back_to_shopping")}</Link>
                  </div>
                </div> */}
            </div>
            <div className={` mt-md-3 ${classes.container}`}>
              <div className="row justify-content-end text-center">
                <div className="col-md-auto">
                  <div className="row flex-column align-items-center">
                    <div className="col-auto d-flex justify-content-end">
                      <div className={classes.slot}>
                        Choose Pick Up Slot
                        <img src={calender.src} /></div>
                    </div>
                    <div className="col-auto d-flex justify-content-end">
                      <div className={classes.slott}>
                        Subtotal
                        <span>
                          BD{getTotalPrice}
                        </span>
                      </div>
                    </div>
                    <div className="col-auto d-flex justify-content-end">
                      <div className={classes.slotDes}>
                        Taxes and shipping are calculated at checkout
                      </div>
                    </div>
                    <div className="col-auto d-flex justify-content-end">
                      <div className={classes.slotBtn} onClick={() => router.push('/checkout')}>
                        Go to checkout
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
  );
};

export default CartPage;
