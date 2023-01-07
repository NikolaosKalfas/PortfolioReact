import React, { FormEvent, useEffect, useRef, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import emailjs from "@emailjs/browser";
import InputEmail from "../InputEmail/InputEmail";
import InputSubmit from "../InputSubmit/InputSubmit";
import InputText from "../InputText/InputText";
import { StaticImage } from "gatsby-plugin-image";

const ConsultancyForm = (data: any) => {
  const form = useRef<any>();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [url, setUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [formSubmited, setFormSubmited] = useState(false);

  useEffect(() => {
    if (isEmailValid && isUrlValid) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [isUrlValid, isEmailValid]);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    emailjs.sendForm(
      "portfolio-form",
      "consultancy_form",
      form.current,
      "gpnpIfmkzPUYPM3rZ"
    );

    setFormSubmited(true);
  };

  return (
    <div className="page-container bg-secondary-color">
      {data.data.title && <SectionTitle title={data.data.title} secondary />}
      {formSubmited ? (
        <div className="flex flex-row items-center gap-5">
          <StaticImage
            src="../../images/tick.png"
            alt="green tick"
            className="max-w-60 "
          />
          <p className="text-white text-xl lg:text-2xl m-0">
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
    </div>
  );
};

export default ConsultancyForm;
