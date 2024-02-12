import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import HeadData from "~/components/Head";
import { postData } from "~/lib/clientFunctions";
import classes from "~/styles/signin.module.css";
import eyeImg from './../public/images/icon.png';
import redeyeImg from './../public/images/red.png';
import signgoogleimg from './../public/images/signGoogle.png';
import signfacebookimg from './../public/images/signFacebook.png';
import Space from "~/components/Layout/Client/Space";
export default function SignUpPage() {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();
  const { t } = useTranslation();
  const settings = useSelector((state) => state.settings);
  const { facebook, google } = settings.settingsData.login;
  const [isPasswordHidden, setIsPasswordHidden] = useState({
    password: true,
    confirmPassword: true
  })

  const handleForm = async (e) => {
    e.preventDefault();
    console.log({
      name: name.current?.value,
      email: email.current?.value,
      password: password.current?.value,
      passwordConfirm: passwordConfirm.current?.value
    });
    try {
      // if (password.current.value === passwordConfirm.current.value) {
        const data = new FormData();


        data.append("name", name.current.value);
        data.append("email", email.current.value);
        data.append("password", password.current.value);
        const response = await postData(`/api/auth/signup`, data);
        response.success
          ? (toast.success("New account added successfully"),
            document.querySelector("#signup_form").reset())
          : !response.success && response.duplicate
            ? toast.error("User with the given email is already exists")
            : toast.error("Something went Wrong");
      // } else {
      //   toast.error("Both Password Field Value Not Matched");
      //   passwordConfirm.current.focus();
      // }
    } catch (err) {
      console.log(err);
    }
  };

  // return (
  //   <>
  //     <HeadData title="Register" />
  //     <div className={classes.container}>
  //       <div className={classes.card}>
  //         <h1>{t("signup")}</h1>
  //         <form onSubmit={handleForm} id="signup_form" className={classes.form}>
  //           <input
  //             type="text"
  //             ref={name}
  //             required
  //             placeholder={`${t("name")}*`}
  //             className="form-control"
  //           />
  //           <input
  //             type="email"
  //             ref={email}
  //             required
  //             placeholder={`${t("email")}*`}
  //             className="form-control"
  //           />
  //           <input
  //             type="password"
  //             ref={password}
  //             required
  //             placeholder={`${t("new_password")}*`}
  //             className="form-control"
  //           />
  //           <input
  //             type="password"
  //             ref={passwordConfirm}
  //             required
  //             placeholder={`${t("confirm_password")}*`}
  //             className="form-control"
  //           />
  //           <div className={classes.reset_link}>
  //             <Link href="/signin">
  //               {t("already_have_an_account?_sign_in")}
  //             </Link>
  //           </div>
  //           <button type="submit">{t("signup")}</button>
  //         </form>
  //         {(facebook || google) && <span className={classes.hr} />}
  //         <div>
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
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  console.log({ isPasswordHidden }, isPasswordHidden.password ? "password" : "text");

  return (
    <>
      <Space />
      <HeadData title="Sign in" />
      <div className={classes.container}>
        <div className={classes.card}>
          <h1>{t("Create an account")}</h1>
          <div className={classes.cardSubHeading}>Already have an account?
            <Link href="/signin">
              {/* <a href="javascript:;"> */}
              Log in
              {/* </a> */}
            </Link>
          </div>
          {/* <div><button className={`mb-2 ${classes.loginBtn}`}><img src={googleimg.src}/></button></div>
          <div><button className={`mb-5 ${classes.loginBtn}`}><img src={loginimg.src}/></button><img/></div> */}
          {/* <div className="row align-items-center mb-5">
            <div className="col-auto"><div className={classes.divider}></div></div>
            <div className="col d-flex justify-content-center">OR</div>
            <div className="col-auto"><div className={classes.divider}></div></div>
          </div> */}
          <form className={classes.form}
            onSubmit={handleForm}
            id="signup_form"
          >
            <div className="row mb-4">
              <div className="col-12 px-0">
                <label className={classes.lbl}>What should we call you?</label>
              </div>
              <div className="col-12 px-0">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  ref={name}
                  placeholder={t("Enter your profile name")}
                  required
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12 px-0 ">
                <label className={classes.lbl}>What’s your email?</label>
              </div>
              <div className="col-12 px-0">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder={t("Enter your email address")}
                  required
                  ref={email}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 px-0 d-flex justify-content-between">
                <label className={classes.lbl}>Create a password</label>
                {/* <div className={classes.hidee}> */}
                {
                  isPasswordHidden.password ? (
                    <div className={classes.hidee}
                      onClick={() => setIsPasswordHidden((pre) => ({
                        ...pre,
                        password: false
                      }))}
                    >
                      {/* <img src={redeyeImg.src} /> */}
                      Show
                    </div>
                  ) : (
                    <div
                      onClick={() => setIsPasswordHidden((pre) => ({
                        ...pre,
                        password: true
                      }))}
                      className={classes.hidee}
                    >
                      <img src={redeyeImg.src} />Hide
                    </div>
                  )
                }
              </div>
              <div className="col-12 px-0">
                <input
                  type={isPasswordHidden.password ? "password" : "text"}
                  className="form-control"
                  name="password"
                  placeholder={t("Enter your password")}
                  required
                  ref={password}

                />
              </div>
            </div>
            {/* <div className="row mb-2">
              <div className="col-12 px-0 d-flex justify-content-between">
                <label className={classes.lbl}>Confirm password</label>
                {
                  isPasswordHidden.confirmPassword ? (
                    <div className={classes.hidee}
                      onClick={() => setIsPasswordHidden((pre) => ({
                        ...pre,
                        confirmPassword: false
                      }))}
                    >
                      <img src={redeyeImg.src} />
                      Show
                    </div>
                  ) : (
                    <div
                      className={classes.hidee}
                      onClick={() => setIsPasswordHidden((pre) => ({
                        ...pre,
                        confirmPassword: true
                      }))}
                    >
                      <img src={redeyeImg.src} />Hide
                    </div>
                  )
                }
                <div className={classes.hidee}><img src={redeyeImg.src} />Hide</div>
              </div>
              <div className="col-12 px-0">
                <input
                  type={isPasswordHidden.confirmPassword ? "password" : "text"}
                  className="form-control"
                  name="password"
                  placeholder={t("Enter your password")}
                  required
                  ref={passwordConfirm}
                />
              </div>
            </div> */}
            <div className={classes.reset_linkk}>
              <span >{t("Use 8 or more characters with a mix of letters, numbers & symbols")}</span> |
              {/* <Link href="/signup"> {t("create_an_account!")}</Link> */}
            </div>
            <div className={classes.btntext}>By creating an account, you agree to the Terms of use and Privacy Policy. </div>
            <div className=""><button className={` mt-0 ${classes.signBtn}`}>Sign in</button></div>
            {/* <LoadingButton className= {classes.signBtn} text={t("signin")} type="submit" state={state} /> */}

            <div className={classes.txt}>OR Continue with</div>
            <div>
              <button className={`mb-2 me-2 ${classes.signinBtn}`}>
                <img src={signfacebookimg.src} />
              </button>
              <button className={`mb-sm-5 mb-4 ${classes.signinBtn}`}>
                <img src={signgoogleimg.src} />
              </button>
              {/* <img /> */}
            </div>
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
        </div >
      </div >
    </>
  );

}

SignUpPage.footer = false;
