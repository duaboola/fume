import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BrandSlider from "~/components/BrandSlider/BrandSlider";
import CtaBtn from "~/components/CtaButton/CtaBtn";
import HeadData from "~/components/Head";
import ProductListing from "~/components/productListing/ProductListing";
import { fetchData, setSettingsData } from "~/lib/clientFunctions";
import homePageData from "~/lib/dataLoader/home";
import { wrapper } from "~/redux/store";

const LandingPage = dynamic(() => import("~/components/landingPage"));
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

function HomePage({ data, error ,productList}) {
  // console.log({data ,productList});
  
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
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
          <LandingPage data={data.newProduct} />
          {/* <HeadData />
          <Header
            carousel={data.additional && data.additional.homePage.carousel}
          /> */}
          {/* <BrandSlider/> */}
          {/* <ProductListing productList={productList?.product} data={data} sectionTitle={false} sorting={true}/> */}
          {/* <CtaBtn/> */}
          {/* <ProductListing productList={productList?.product} data={data} sectionTitle={false}/> */}
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
      {/* <GlobalModal
        small={false}
        isOpen={isOpen}
        handleCloseModal={handleCloseModal}
      >
        {router.query.slug && (
          <ProductDetails productSlug={router.query.slug} />
        )}
      </GlobalModal> */}
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
      // const baseUrl = process.env.NEXTAUTH_URL
      // const response = await fetchData(`${baseUrl}/api/product`) 
      // console.log("response------------------------------>>>>>",{baseUrl,response:response});
      
      return {
        props: {
          data,
          error: !data.success,
          // productList:response
        },
      };
    }
);

export default HomePage;
