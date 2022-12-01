import React, { FormEvent, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import InputEmail from "../InputEmail/InputEmail";
import InputMessage from "../InputMessage/InputMessage";
import InputPhone from "../InputPhone/InputPhone";
import InputSubmit from "../InputSubmit/InputSubmit";
import InputText from "../InputText/InputText";
import SectionTitle from "../SectionTitle/SectionTitle";
import { StaticImage } from "gatsby-plugin-image";

const ContactForm = ({ data }: any) => {
  const form = useRef<any>();

  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessageValid, setIsMessageValid] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [formSubmited, setFormSubmited] = useState(false);

  useEffect(() => {
    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [isNameValid, isEmailValid, isPhoneValid, isMessageValid]);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    emailjs.sendForm(
      "portfolio-form",
      "contact_form",
      form.current,
      "gpnpIfmkzPUYPM3rZ"
    );

    setFormSubmited(true);
  };

  return (
    <div className="page-container bg-secondary-color">
      <SectionTitle title={data.title} secondary />
      {formSubmited ? (
        <div className="m-auto max-w-sm text-center">
          <StaticImage
            src="../../images/tick.png"
            alt="green tick"
            className="max-w-200 "
          />
          <p className="text-white mb-5 text-xl lg:text-2xl">
            Thank you for getting in touch. I will get back to you as soon as
            possible!
          </p>
        </div>
      ) : (
        <form className="max-w-xs m-auto" ref={form} onSubmit={sendEmail}>
          {data.name && (
            <InputText
              nameFor="user_name"
              setInputValue={setName}
              setInputValidity={setIsNameValid}
            />
          )}
          {data.email && (
            <InputEmail
              nameFor="user_email"
              setInputValue={setEmail}
              setInputValidity={setIsEmailValid}
            />
          )}{" "}
          {data.phone && (
            <InputPhone
              nameFor="user_phone"
              setInputValue={setPhone}
              setInputValidity={setIsPhoneValid}
            />
          )}
          {data.message && (
            <InputMessage
              nameFor="message"
              setInputValue={setMessage}
              setInputValidity={setIsMessageValid}
            />
          )}
          <InputSubmit disabledBtn={submitDisabled} />
        </form>
      )}
    </div>
  );
};

export default ContactForm;
