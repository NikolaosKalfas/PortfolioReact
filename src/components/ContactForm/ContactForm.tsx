import React, { FormEvent, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from 'react-google-recaptcha';

import InputEmail from "../InputEmail/InputEmail";
import InputMessage from "../InputMessage/InputMessage";
import InputPhone from "../InputPhone/InputPhone";
import InputSubmit from "../InputSubmit/InputSubmit";
import InputText from "../InputText/InputText";
import SectionTitle from "../SectionTitle/SectionTitle";
import { StaticImage } from "gatsby-plugin-image";
import InputCheckbox from "../InputCheckbox/InputCheckbox";

type ContactFormDataType = {
  data: {
    title: string;
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    message?: boolean;
  };
};

const ContactForm = ({ data }: ContactFormDataType) => {
  const form = useRef<any>();

  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [message, setMessage] = useState("");
  const [isMessageValid, setIsMessageValid] = useState(false);
  const [tickValue, setTickValue] = useState("");
  const [isTickValid, setIsTickValid] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [formSubmited, setFormSubmited] = useState(false);

  const reCaptchaRef = useRef<InstanceType<typeof ReCAPTCHA>>(null);

  useEffect(() => {
    if (!data.name) {
      setIsNameValid(true);
    }
    if (!data.email) {
      setIsEmailValid(true);
    }
    if (!data.phone) {
      setIsPhoneValid(true);
    }
    if (!data.message) {
      setIsMessageValid(true);
    }
  }, []);

  useEffect(() => {
    if (
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isMessageValid &&
      isTickValid
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [isNameValid, isEmailValid, isPhoneValid, isMessageValid, isTickValid]);

const sendEmail = async (e: FormEvent) => {
  e.preventDefault();

  try {
    // Get the token from reCAPTCHA
    const token = await reCaptchaRef.current?.executeAsync();
    reCaptchaRef.current?.reset();

    if (!token) {
      console.error("Failed to get reCAPTCHA token.");
      return;
    }

    // Create a hidden input with the token
    const recaptchaInput = document.createElement("input");
    recaptchaInput.setAttribute("type", "hidden");
    recaptchaInput.setAttribute("name", "g-recaptcha-response");
    recaptchaInput.setAttribute("value", token);
    form.current.appendChild(recaptchaInput);

    // Try sending the email with emailjs
    await emailjs.sendForm(
      "portfolio-form",
      "contact_form",
      form.current,
      "gpnpIfmkzPUYPM3rZ"
    );

    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'manual_event_SUBMIT_LEAD_FORM', {
        event_category: 'lead_form',
        event_label: 'Contact form submitted'
      });

    }

    // Success - set form submission state
    setFormSubmited(true);

  } catch (error) {
    console.error("Error during form submission:", error);

    // You can also handle specific error messages or retries here
    // Optionally, show a user-friendly message or retry submission
  }
};



  return (
    <>
      {data.title && (
        <section className="page-container bg-primary-color">
          <SectionTitle title={data.title} secondary />
          {formSubmited ? (
            <div className="m-auto max-w-sm text-center">
              <StaticImage
                src="../../images/tick.png"
                alt="green tick"
                className="max-w-200 "
              />
              <p className="text-off-white mb-5 text-xl lg:text-2xl">
                Thank you for getting in touch. I will get back to you as soon
                as possible!
              </p>
            </div>
          ) : (
            <form className="max-w-xs m-auto" ref={form} onSubmit={sendEmail}>
              {data.name && (
                <InputText
                  label="Your name"
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
              <InputCheckbox
                setInputValue={setTickValue}
                nameFor="user_tick"
                setInputValidity={setIsTickValid}
              />
              <InputSubmit disabledBtn={submitDisabled} />
            </form>
          )}
          <ReCAPTCHA 
            className={'g-recaptcha'}
            sitekey={process.env.GATSBY_RECAPTCHA_KEY}
            size="invisible"
            ref={reCaptchaRef}
          />
        </section>
      )}
    </>
  );
};

export default ContactForm;
