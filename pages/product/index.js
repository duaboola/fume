import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BrandSlider from "~/components/BrandSlider/BrandSlider";
import CtaBtn from "~/components/CtaButton/CtaBtn";
import HeadData from "~/components/Head";
import Space from "~/components/Layout/Client/Space";
import ProductListing from "~/components/productListing/ProductListing";
import SortingComp from "~/components/productListing/SortingComp";
import { fetchData, setSettingsData } from "~/lib/clientFunctions";
import homePageData from "~/lib/dataLoader/home";
import { wrapper } from "~/redux/store";

const Error500 = dynamic(() => import("~/components/error/500"));
const Header = dynamic(() => import("~/components/Header/header"));
const Banner = dynamic(() => import("~/components/Banner/banner"));
const CategoryList = dynamic(() =>
  import("~/components/Categories/categoriesList")
);
const Collection = dynamic(() => import("~/components/Collection/collection"));
const BrandCardList = dynamic(() => import("~/components/Brand/brandList"));
const ProductDetails = dynamic(() =>
  import("~/components/Shop/Product/productDetails")
);
const ProductList = dynamic(() => import("~/components/ProductListView"));
const GlobalModal = dynamic(() => import("~/components/Ui/Modal/modal"));


export const priceOption = [{
  sortBy: "Highest to lowest",
  id: "1",
  symbol: "1"
},
{
  sortBy: "Lowest to highest",
  id: "2",
  symbol: "2"
}
]

function ProductPage({ data, error, productList }) {
  console.log("------>>>>>>>", { data, productList });

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [selectedCate, setSelectedCate] = useState("")
  const [selectedPrice, setSelectedPrice] = useState('')
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  const handleCloseModal = () => {
    router.push("/", undefined, { scroll: false });
    setIsOpen(false);
  };

  useEffect(() => {
    if (router.query.slug) {
      setIsOpen(true);
    }
  }, [router.query.slug]);

  return (
    <>
      {error ? (
        <Error500 />
      ) : (
        <>
          <HeadData />
          {/* <Header
            carousel={data.additional && data.additional.homePage.carousel}
          /> */}
          <Space />
          <BrandSlider brandData={data.brand} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand}/>
          <SortingComp
            sorting={true}
            data={data}
            selectedCate={selectedCate}
            setSelectedCate={setSelectedCate}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            // selectedDate={selectedDate}
            // setSelectedDate={setSelectedDate}

          />
          <ProductListing
            selectedCate={selectedCate}
            selectedPrice={selectedPrice}
            selectedBrand={selectedBrand}
            selectedDate={selectedDate}
            setSelectedCate={setSelectedCate}
            setSelectedPrice={setSelectedPrice}
            setSelectedBrand={setSelectedBrand}
            setSelectedDate={setSelectedDate}
            productList={data?.trending}
            data={data}
            sectionTitle={"Trending"}
            moreButton={false}
            sorting={true}
          />
          <ProductListing
            selectedCate={selectedCate}
            selectedPrice={selectedPrice}
            selectedBrand={selectedBrand}
            selectedDate={selectedDate}
            productList={data?.bestSelling}
            data={data}
            sectionTitle={"Best selling"}
            moreButton={false}
            sorting={false}
          />
          <CtaBtn />
          <ProductListing
            selectedCate={selectedCate}
            selectedPrice={selectedPrice}
            selectedBrand={selectedBrand}
            selectedDate={selectedDate}
            productList={data?.newProduct}
            data={data}
            sectionTitle={"New Product"}
            moreButton={false}
            sorting={false}
          />
          {/* <CategoryList categoryList={data.category} /> */}
          {/* <ProductList title={t("new_products")} type="new" /> */}
          {/* <div className="content_spacing" /> */}
          {/* <Banner banner={data.additional && data.additional.homePage.banner} /> */}
          {/* <ProductList title={t("trending_products")} type="trending" /> */}
          {/* <div className="content_spacing" /> */}
          {/* <Collection
            data={data.additional && data.additional.homePage.collection}
          />
          <ProductList title={t("best_selling")} type="bestselling" />
          <BrandCardList items={data.brand || []} />
          <div className="content_spacing" /> */}
        </>
      )}
      <GlobalModal
        small={false}
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
      >
        {router.query.slug && (
          <ProductDetails productSlug={router.query.slug} />
        )}
      </GlobalModal>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, locale, ...etc }) => {
      if (res) {
        res.setHeader(
          "Cache-Control",
          "public, s-maxage=10800, stale-while-revalidate=59"
        );
      }
      const _data = await homePageData();
      const data = JSON.parse(JSON.stringify(_data));
      if (data.success) {
        setSettingsData(store, data);
      }
      const baseUrl = process.env.NEXTAUTH_URL
      const response = await fetchData(`${baseUrl}/api/product`)
      // console.log("///---------response---------->>>>>",{baseUrl,response:response});

      return {
        props: {
          data,
          error: !data.success,
          productList: response
        },
      };
    }
);

export default ProductPage;
