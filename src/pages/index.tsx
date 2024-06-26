import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";

const emailSchema = z.string().email();

export default function Home() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function validateEmail(email: string) {
    try {
      emailSchema.parse(email);
      return true;
    } catch (error) {
      return false;
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (formSubmitted) {
      const isValidEmail = validateEmail(e.target.value);
      setEmailError(!isValidEmail);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidEmail = validateEmail(email);
    setFormSubmitted(true);
    if (isValidEmail) {
      setEmailError(false);
      setShowSuccess(true);
    } else {
      setEmailError(true);
      setShowSuccess(false);
    }
  };

  return (
    <>
      {/* Success Container */}
      {showSuccess ? (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-slate-800 font-roboto">
          <div className="flex h-full w-full flex-col items-start gap-4 rounded-lg bg-white p-6 shadow-2xl md:h-[460px] md:w-[420px] md:rounded-2xl md:px-10 md:py-10 md:shadow-2xl">
            <div className="flex h-full w-full flex-col justify-center gap-8 md:justify-center">
              <Image
                className="w-16"
                src={"/images/icon-success.svg"}
                width={100}
                height={100}
                alt="Success Icon"
              />
              <h1 className="text-4xl font-bold">Thanks for subscribing!</h1>
              <p>
                A confirmation email has been sent to <strong>${email}</strong>.
                Please open it and click the button inside to confirm your
                subscription
              </p>
            </div>
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                setFormSubmitted(false);
                setShowSuccess(false);
                setEmail("");
              }}
            >
              <button
                type="submit"
                className="h-14 w-full rounded-xl bg-slate-800 font-bold text-white hover:cursor-pointer active:bg-gradient-to-r active:from-red-400 active:to-orange-400 active:shadow-2xl active:shadow-red-400"
              >
                Dismiss message
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <Head>
            <title>Newsletter SignUp</title>
            <meta name="description" content="newsletter-sign-up-form" />
            <link rel="icon" href="/images/favicon-32x32.png" />
          </Head>
          <main className="flex min-h-screen flex-col items-center justify-center bg-slate-800 font-roboto">
            {/* Form Container */}
            <div className="flex h-screen w-full max-w-[500px] flex-col overflow-hidden bg-white md:h-[90%] md:rounded-2xl lg:max-w-[80%] lg:flex-row-reverse lg:items-center lg:justify-center lg:gap-14 lg:p-6">
              {/* Illustration Container */}
              <div className="h-1/3 w-full content-stretch items-stretch lg:h-full lg:w-2/3">
                <Image
                  src={"/images/illustration-sign-up-mobile.svg"}
                  width={100}
                  height={100}
                  alt="Sign Up Illustration"
                  className="block h-full w-full rounded-b-2xl object-cover lg:hidden"
                />
                <Image
                  src={"/images/illustration-sign-up-desktop.svg"}
                  width={100}
                  height={100}
                  alt="Sign Up Illustration"
                  className="hidden h-full w-full object-cover lg:block"
                />
              </div>
              {/* Content Container */}
              <div className="flex h-2/3 w-full flex-col justify-center gap-6 px-6 py-8 lg:h-full lg:p-0">
                <h1 className="text-4xl font-bold lg:text-5xl">
                  Stay updated!
                </h1>
                <p>
                  Join 60,000+ product managers receiving monthly updates on:
                </p>
                {/* Styled List */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    <Image
                      src={"/images/icon-list.svg"}
                      width={20}
                      height={20}
                      alt="List Icon"
                    />
                    <p>Product discovery and building what matters</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Image
                      src={"/images/icon-list.svg"}
                      width={20}
                      height={20}
                      alt="List Icon"
                    />
                    <p>Measuring to ensure updates are a success</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <Image
                      src={"/images/icon-list.svg"}
                      width={20}
                      height={20}
                      alt="List Icon"
                    />
                    <p>And much more!</p>
                  </div>
                </div>
                <form
                  onSubmit={handleFormSubmit}
                  className="my-2 flex flex-col"
                  noValidate
                >
                  <div className="flex justify-between">
                    <label htmlFor="email" className="mb-2 text-sm font-bold">
                      Email address
                    </label>
                    {formSubmitted && emailError && (
                      <p className="text-sm text-red-500">
                        Valid email required
                      </p>
                    )}
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleEmailChange}
                    placeholder="email@company.com"
                    className={`mb-4 ${emailError ? "border-red-400 bg-red-300/30 text-red-400 placeholder:text-red-400/80" : ""} h-14 rounded-lg border-2 border-slate-200 px-4 text-lg hover:cursor-pointer focus:border-slate-900 active:border-slate-900`}
                  />
                  <button
                    type="submit"
                    className="h-14 rounded-lg bg-slate-900 font-bold text-white hover:cursor-pointer active:bg-gradient-to-r active:from-red-400 active:to-orange-400 active:shadow-2xl active:shadow-red-400"
                  >
                    Subscribe to monthly newsletter
                  </button>
                </form>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}
