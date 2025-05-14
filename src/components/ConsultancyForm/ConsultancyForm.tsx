import React, { FormEvent, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from 'react-google-recaptcha';


import SectionTitle from "../SectionTitle/SectionTitle";
import InputEmail from "../InputEmail/InputEmail";
import InputSubmit from "../InputSubmit/InputSubmit";
import InputText from "../InputText/InputText";
import { StaticImage } from "gatsby-plugin-image";

type ConsultancyFormDataType = {
  data: {
    title: string;
  };
};

const ConsultancyForm = (data: ConsultancyFormDataType) => {
  const form = useRef<any>();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [url, setUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [formSubmited, setFormSubmited] = useState(false);

  const reCaptchaRef = useRef<InstanceType<typeof ReCAPTCHA>>(null);

  useEffect(() => {
    if (isEmailValid && isUrlValid) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [isUrlValid, isEmailValid]);

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Get reCAPTCHA token
      const token = await reCaptchaRef.current?.executeAsync();
      reCaptchaRef.current?.reset();

      if (!token) {
        console.error("Failed to get reCAPTCHA token.");
        return;
      }

      // Create a hidden input with the reCAPTCHA response token
      const recaptchaInput = document.createElement("input");
      recaptchaInput.setAttribute("type", "hidden");
      recaptchaInput.setAttribute("name", "g-recaptcha-response");
      recaptchaInput.setAttribute("value", token);
      form.current.appendChild(recaptchaInput);

      // Send email
      await emailjs.sendForm(
        "portfolio-form",
        "consultancy_form",
        form.current,
        "gpnpIfmkzPUYPM3rZ"
      );

      // Successfully submitted
      setFormSubmited(true);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <section className="page-container bg-primary-color">
      {data.data.title && <SectionTitle title={data.data.title} secondary />}
      {formSubmited ? (
        <div className="flex flex-row items-center gap-5">
          <StaticImage
            src="../../images/tick.png"
            alt="green tick"
            className="max-w-60 "
          />
          <p className="text-off-white text-xl lg:text-2xl m-0">
            Thank you for getting in touch. I will get back to you as soon as
            possible!
          </p>
        </div>
      ) : (
        <form
          ref={form}
          onSubmit={sendEmail}
          className="md:max-h-24 gap-5 flex flex-col md:flex-row items-start w-full justify-between"
        >
          <div className="w-full ">
            <InputEmail
              nameFor="user_email"
              setInputValue={setEmail}
              setInputValidity={setIsEmailValid}
            />
          </div>
          <div className="w-full ">
            <InputText
              label="Your website"
              nameFor="user_url"
              setInputValue={setUrl}
              setInputValidity={setIsUrlValid}
            />
          </div>
          <div className="w-full md:w-max self-end">
            <InputSubmit disabledBtn={submitDisabled} />
          </div>
        </form>
      )}
        <ReCAPTCHA
          sitekey={process.env.GATSBY_RECAPTCHA_KEY}
          size="invisible"
          ref={reCaptchaRef}
        />
    </section>
  );
};

export default ConsultancyForm;
