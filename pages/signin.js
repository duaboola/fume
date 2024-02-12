import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import HeadData from "~/components/Head";
import Footer from "~/components/Layout/Client/footer";
import LoadingButton from "~/components/Ui/Button";
import { formField } from "~/lib/clientFunctions";
import classes from "~/styles/signin.module.css";
import googleimg from './../public/images/facebookImg.png';
import loginimg from './../public/images/login.png';
import signgoogleimg from './../public/images/signGoogle.png';
import signfacebookimg from './../public/images/signFacebook.png';
import eyeImg from './../public/images/icon.png';
import redeyeImg from './../public/images/red.png';
import Space from "~/components/Layout/Client/Space";
export default function SignIn() {
  const [state, setState] = useState("");
  const router = useRouter();
  const settings = useSelector((state) => state.settings);
  const { t } = useTranslation();
  const { session } = useSelector(state => state.localSession)
  const [isHidden, setIsHidden] = useState(true)

  const errors = {
    Signin: "Try signing with a different account.",
    OAuthSignin: "Try signing with a different account.",
    OAuthCallback: "Try signing with a different account.",
    OAuthCreateAccount: "Try signing with a different account.",
    EmailCreateAccount: "Try signing with a different account.",
    Callback: "Try signing with a different account.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "Check your email address.",
    CredentialsSignin:
      "Sign in failed. Check the details you provided are correct.",
    default: "Unable to sign in.",
  };

  const { facebook, google } = settings.settingsData.login;

  async function signinProcess(e) {
    setState("loading");
    try {
      e.preventDefault();
      const { username, password } = formField(e.target.elements);
      const res = await signIn("credentials", {
        redirect: false,
        password,
        username,
      });
      console.log("res--->>>>>", { res });

      if (res.error) {
        const errorMessage = res.error && (errors[res.error] ?? errors.default);
        toast.error(errorMessage);
      }
      if (res.ok) {
        toast.success("Login successful");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
    setState("");
  }
  if (session) {
    router.push('/')
    console.log("session", { session });

    return <></>
  }
  // return (
  //   <>
  //     <HeadData title="Sign in" />
  //     <div className={classes.container}>
  //       <div className={classes.card}>
  //         <h1>{t("Create an account")}</h1>
  //         <div className={classes.cardSubHeading}>Already have an ccount?    <a href="javascript:;">Log in</a></div>
  //         {/* <div><button className={`mb-2 ${classes.loginBtn}`}><img src={googleimg.src}/></button></div>
  //         <div><button className={`mb-5 ${classes.loginBtn}`}><img src={loginimg.src}/></button><img/></div> */}
  //         {/* <div className="row align-items-center mb-5">
  //           <div className="col-auto"><div className={classes.divider}></div></div>
  //           <div className="col d-flex justify-content-center">OR</div>
  //           <div className="col-auto"><div className={classes.divider}></div></div>
  //         </div> */}
  //         <form className={classes.form} onSubmit={signinProcess}>
  //         <div className="row mb-4">
  //           <div className=".col-12 px-0">
  //             <label className={classes.lbl}>What should we call you?</label>
  //           </div>
  //           <div className="col-12 px-0">
  //             <input
  //               type="email"
  //               className="form-control"
  //               name="username"
  //               placeholder={t("Enter your profile name")}
  //               required
  //             />
  //           </div>
  //         </div> 
  //         <div className="row mb-4">
  //           <div className=".col-12 px-0 ">
  //             <label className={classes.lbl}>What’s your email?</label>
  //           </div>
  //           <div className="col-12 px-0">
  //             <input
  //               type="email"
  //               className="form-control"
  //               name="username"
  //               placeholder={t("Enter your email address")}
  //               required
  //             />
  //           </div>
  //         </div>
  //         <div className="row mb-2">
  //           <div className=".col-12 px-0 d-flex justify-content-between">
  //             <label className={classes.lbl}>Create a password</label>
  //             <div className={classes.hidee}><img src={redeyeImg.src}/>Hide</div>
  //           </div>
  //           <div className="col-12 px-0">
  //             <input
  //               type="email"
  //               className="form-control"
  //               name="username"
  //               placeholder={t("Enter your password")}
  //               required
  //             />
  //           </div>
  //         </div>
  //           <div className={classes.reset_linkk}>
  //             <Link href="/reset">{t("Use 8 or more characters with a mix of letters, numbers & symbols")}</Link> |
  //             {/* <Link href="/signup"> {t("create_an_account!")}</Link> */}
  //           </div>
  //           <div className={classes.btntext}>By creating an account, you agree to the Terms of use and Privacy Policy. </div>
  //           <div className=""><button className={` mt-0 ${classes.signBtn}`}>Sign in</button></div>
  //           {/* <LoadingButton className= {classes.signBtn} text={t("signin")} type="submit" state={state} /> */}

  //           <div className={classes.txt}>OR Continue with</div>
  //         <div><button className={`mb-2 me-2 ${classes.signinBtn}`}><img src={signfacebookimg.src}/></button><button className={`mb-sm-5 mb-4 ${classes.signinBtn}`}><img src={signgoogleimg.src}/></button><img/></div>
  //         </form>
  //         {/* {(facebook || google) && <span className={classes.hr} />} */}
  //         {/* <div>
  //           {facebook && (
  //             <button
  //               variant="outline"
  //               onClick={async () => await signIn("facebook")}
  //               className={classes.facebook}
  //             >
  //               {t("signin_with_facebook")}
  //             </button>
  //           )}
  //           {google && (
  //             <button
  //               variant="outline"
  //               onClick={async () => await signIn("google")}
  //               className={classes.google}
  //             >
  //               {t("signin_with_google")}
  //             </button>
  //           )}
  //         </div> */}
  //       </div>
  //     </div>
  //   </>
  // );

  console.log({ facebook });

  return (
    <>
      <Space />
      <HeadData title="Sign in" />
      <div className={classes.container}>
        <div className={classes.card}>
          <h1>{t("Log in")}</h1>
          <div className={classes.cardSubHeading}>Don’t have an account?
            {/* <a href="javascript:;"> */}
            <Link href="/signup" >
             {" "} Sign up
            </Link>
            {/* </a> */}
          </div>
          {
            // facebook ? (
              <div>
                <button
                  onClick={async () => await signIn("facebook")}
                  className={`mb-0 mb-sm-2 ${classes.loginBtn}`}
                >
                  <img src={googleimg.src} />
                </button>
              </div>
            // ) : (
              // <></>
            // )
          }
          {
            // google ? (
              <div>
                <button
                  className={`mb-sm-5 mb-4 ${classes.loginBtn}`}
                  onClick={async () => await signIn("google")}
                >
                  <img src={loginimg.src} />
                </button>
              </div>
            // ) : (
              // <></>
            // )
          }
          {
            google && facebook ? (
              <div className="row align-items-center mb-sm-5 mb-4">
                <div className="col-auto">
                  <div className={classes.divider}>
                  </div>
                </div>
                <div className="col d-flex justify-content-center">OR</div>
                <div className="col-auto">
                  <div className={classes.divider}>
                  </div>
                </div>
              </div>
            ) : (
              <></>)
          }

          <form className={classes.form} onSubmit={signinProcess}>
            <div className="row mb-4">
              <div className=".col-12 px-0">
                <label className={classes.lbl}>Your email</label>
              </div>
              <div className="col-12 px-0">
                <input
                  type="email"
                  className="form-control"
                  name="username"
                  placeholder={t("")}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 px-0 d-flex justify-content-between">
                <label className={classes.lbl}>Your password</label>
                {
                  isHidden ? (
                    <div
                      onClick={() => setIsHidden(false)}
                      className={classes.hide}>Show</div>
                  ) : (
                    <div
                      className={classes.hide}
                      onClick={() => setIsHidden(true)}
                    ><img src={eyeImg.src} />Hide</div>
                  )
                }

              </div>
              <div className="col-12 px-0">
                <input
                  type={isHidden ? "password" : "text"}
                  className="form-control"
                  name="password"
                  placeholder={t("")}
                  required
                />
              </div>
            </div>
            <div className={classes.reset_link}>
              <Link href="/reset">{t("Forget your password")}</Link>
              {/* <Link href="/signup"> {t("create_an_account!")}</Link> */}
            </div>
            <div className=""><button className={classes.signBtn}>Log in</button></div>
            {/* <LoadingButton className= {classes.signBtn} text={t("signin")} type="submit" state={state} /> */}
          </form>
          {/* {(facebook || google) && <span className={classes.hr} />} */}
          {/* <div>
            {facebook && (
              <button
                variant="outline"
                onClick={async () => await signIn("facebook")}
                className={classes.facebook}
              >
                {t("signin_with_facebook")}
              </button>
            )}
            {google && (
              <button
                variant="outline"
                onClick={async () => await signIn("google")}
                className={classes.google}
              >
                {t("signin_with_google")}
              </button>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}

{/* SignIn.footer = false; */ }
