import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import Aos from "aos";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appearance from "~/components/Appearance";
import CheckAuth from "~/components/Auth/authCheck";
import CookieContest from "~/components/cookieContest";
import GlobalLayout from "~/components/Layout/GlobalLayout";
import "~/public/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { wrapper } from "~/redux/store";
import "~/styles/globals.css";
import "./../styles/landingPage.css";
import "aos/dist/aos.css";
import { Roboto } from "@next/font/google";
import { appWithI18Next } from "ni18n";
import { ni18nConfig } from "../ni18n.config";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const NextNProgress = dynamic(() => import("nextjs-progressbar"), {
  ssr: false,
});

const ThirdPartyScript = dynamic(() => import("~/components/ThirdParty"));

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("../public/js/jquery.min.js");
    import("../public/js/bootstrap.bundle.min.js");
  }, []);

  console.log("Component--->>>",{Component:Component.requireAuth});


  useEffect(() => {
    Aos.init({
      easing: "ease-out-quad",
      duration: 250,
    });
  }, []);

  return (
    <SessionProvider session={pageProps.session} refetchInterval={10 * 60}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,300;6..12,400;6..12,500;6..12,600;6..12,700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
      </Head>
      <style jsx global>{`
        html,
        body {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <ThirdPartyScript />
      <NextNProgress color="var(--primary)" options={{ showSpinner: false }} />
      <Appearance />
      <CookieContest />
      <CheckAuth
        auth={Component.requireAuth}
        authAdmin={Component.requireAuthAdmin}
      >
        <GlobalLayout
          dashboard={Component.dashboard}
          footer={Component.footer}
          error={Component.hasError}
        >
        <Component {...pageProps} />
        </GlobalLayout>
      </CheckAuth>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={true}
        closeOnClick
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
    </SessionProvider>
  );
}

export default wrapper.withRedux(appWithI18Next(MyApp, ni18nConfig));
