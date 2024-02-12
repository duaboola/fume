import React, { useEffect, useState } from 'react'
import cartIcon from './../../public/images/cartIcon.png'
import wishlistIcon from './../../public/images/wishlistIcon.png'
import productImg from './../../public/images/productImg.png'
import classes from "./product.module.css";
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchData, postData } from '~/lib/clientFunctions';
import { useRouter } from 'next/router';
import customId from "custom-id-new";
import { addToCart } from '~/redux/cart.slice';
import { priceOption } from '~/pages/product';



const ProductListing = ({
  data,
  sectionTitle,
  productList,
  sorting,
  moreButton,
  selectedCate,
  selectedPrice,
  selectedBrand,
  selectedDate,
  setSelectedCate,
  setSelectedPrice,
  setSelectedBrand
}) => {
  const { session } = useSelector((state) => state.localSession);
  const dataList = [1, 1, 1, 1, 1, 1, 1, 1];
  const [productData, setProductData] = useState(productList ? productList : [])
  const router = useRouter()
  console.log("productDataList", { sectionTitle, productDataList: productData, productList });


  const filterHandler = () => {
    // console.log("-productDataList------------------>>>>");

    if (!!selectedCate || !!selectedBrand || !!selectedDate || !!selectedPrice) {
      // console.log("productDataList", "inside", { selectedBrand, selectedCate });
      let sortedData = []
      if (!!selectedPrice) {
        sortedData = productList.sort((a, b) => {
          if (selectedPrice === "1") {
            // return a.price - b.price
            return b.price - a.price
          } else if (selectedPrice === "2") {
            // return b.price - a.price
            return a.price - b.price
          }
        })
      } else {
        sortedData = productList
      }

      const filterData = sortedData.filter(item => {
        // console.log("productDataList--->>>", item?.brand, selectedCate, selectedBrand);
        if (!selectedCate && !selectedBrand) return item
        if (item?.categories?.includes(selectedCate?.toLowerCase())) {

          if (!selectedBrand) return item
          else if (selectedBrand?.toLowerCase() === item?.brand?.toLowerCase()) return item

        } else if (selectedBrand?.toLowerCase() === item?.brand?.toLowerCase()) {

          if (!selectedCate) return item
          else if (item?.categories?.includes(selectedCate?.toLowerCase())) return item

        }


      })
      console.log("productDataList--->>>", { filterData, sortedData });

      setProductData(filterData)
    } else {
      setProductData(productList)
    }
  }

  const sortingHandler = () => {
    if (!!selectedPrice) {

      const sortedData = productList.sort((a, b) => {
        if (selectedPrice === "1") {
          return a.price - b.price
        } else if (selectedPrice === "2") {
          return b.price - a.price
        }
      })
      console.log("productDataList", { productList, sortedData });

      setProductData(sortedData)

    } else {
      setProductData(productList)
    }
  }
  useEffect(() => {
    filterHandler()
  }, [selectedCate, selectedPrice, selectedBrand, selectedDate])


  return (
    <div className={`container-fluid py-5 ${classes.sectionWrapper}`}>
      <div className='custom_container'>
        {
          sectionTitle ?
            <div className="row">
              <div className="col-12">
                <div className={classes?.sectionTitle}>{sectionTitle}</div>
              </div>
            </div>
            : ''
        }
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xxl-5 g-4">
          {
            Array.isArray(productData) && productData.length === 0 ? (
              <div className="text-light d-flex justify-content-center w-100">
                No Data Available
              </div>
            ) : productData?.map((item) => (
              <React.Fragment key={item.id}>
                <ProductCard productData={item} />
              </React.Fragment>
            ))
          }
        </div>
        {
          moreButton ?
            <div className="row justify-content-center">
              <div className="col-auto">
                <button className={classes?.viewCollectionBtn}>View collection</button>
              </div>
            </div>
            : ''
        }
      </div>
    </div>
  )
}

export default ProductListing

const ProductCard = ({ productData }) => {
  const router = useRouter()
  const { session } = useSelector((state) => state.localSession);
  const [selectedAttribute, setSelectedAttribute] = useState({
    name: null,
    value: null,
    for: null,
  });
  // console.log({ productData }, productData.attributes);
  const cartData = useSelector((state) => state.cart);
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch()
  useEffect(() => {
    if (!!productData) {
      setPrice(productData?.discount);
    }
    // if (productData.attributes && productData.attributes.length > 0) {
    //   setSelectedAttribute({
    //     name: productData.attributes[0]?.label,
    //     value: productData.attributes[0]?.value,
    //     for: productData.attributes[0]?.for,
    //   });
    // }
  }, [])
  // console.log({ session });

  const addWishlist = async (pid) => {
    console.log("session--->>>", { session });

    try {
      const res = await postData(`/api/wishlist`, JSON.stringify({ id: session.user.id, pid: pid }))
      console.log("res--->>>>>>>", { res });
      if (res.success) {
        toast.success("Product added in wishlist")
      } else {
        toast.error("Product already in wishlist!")
      }
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }
  const simpleProductCart = (qty) => {
    const { _id, name, image, quantity } = productData;
    const existed = cartData.items.find((item) => item._id === _id);
    const totalQty = existed ? existed.qty + qty : qty;
    console.log({ quantity, totalQty });

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

  const variableProductCart = (qty) => {
    try {
      const { _id, name, image, colors, attributes } = productData;
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
    const qty = 1;
    simpleProductCart(qty);

    // if (productData.type === "simple") {
    //   simpleProductCart(qty);
    // } else {
    //   variableProductCart(qty);
    // }
  };
  return (
    <div className="col"
      onClick={(e) => {
        router.push(`/product/${productData.slug}`)
      }}>
      <div className={classes.productCard}>
        <div className={classes.productCardInner}>
          <div className={classes.productImg}>
            <img className='w-100 h-100' src={`${productData?.image?.[0]?.url}`} alt="" />
            {/* <img className='w-100 h-100' src={`..${productImg?.src}`} alt="" /> */}

          </div>
          <div className={classes.productDetailSec}>
            <div className={classes.productDetailUpper}>
              <div className={classes.proName}>{productData?.name}</div>
              <div className={classes.proActions}>
                <button className={classes.actionBtn}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!session) {
                      toast.error("Please login to add in cart")
                    } else {
                      addItemToCart()
                    }
                  }}
                >
                  <img
                    src={`..${cartIcon.src}`}
                    width={100}
                    height={50}
                    alt="Sslcommerz"
                  />
                </button>
                <button className={classes.actionBtn}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!session) {
                      toast.error("Please login to add wishlist")
                    } else {
                      console.log("productData-->>>>>", { productData });

                      addWishlist(productData?._id)
                    }
                  }}
                >
                  <img
                    src={`..${wishlistIcon.src}`}
                    width={100}
                    height={50}
                    alt="Sslcommerz"
                  />
                </button>
              </div>
            </div>
            <div className={classes?.proPrice}>BD{productData?.price}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
