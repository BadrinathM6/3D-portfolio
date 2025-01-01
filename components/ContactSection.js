import React, { useRef, useEffect, useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import useAlert from "./Constants/useAlert.js";
import Alert from "./Alert.js";
import { motion, useAnimation, useInView } from "framer-motion";

// Separate RevealText into its own component
const RevealText = React.memo(({ children, delay = 0, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    threshold: 0.2,
  });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
        className={className}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="absolute top-0 left-0 w-full h-full bg-textcolor pointer-events-none"
      />
    </div>
  );
});

// Memoize the Input component to prevent unnecessary re-renders
const Input = React.memo(
  ({ label, type = "text", name, value, onChange, placeholder, rows }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-anothertextcolor">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required
          rows={rows}
          className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-textcolor focus:border-transparent transition-all duration-300 resize-none"
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-textcolor focus:border-transparent transition-all duration-300"
          placeholder={placeholder}
        />
      )}
    </div>
  )
);

const Contact = () => {
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // Memoize the handleChange function
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Badrinath",
          from_email: form.email,
          to_email: "nathb6382@gmail.com",
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setLoading(false);
      showAlert({
        show: true,
        text: "Thank you for your message 😃",
        type: "success",
      });

      setTimeout(() => {
        hideAlert(false);
        setForm({
          name: "",
          email: "",
          message: "",
        });
      }, 3000);
    } catch (error) {
      setLoading(false);
      console.error(error);
      showAlert({
        show: true,
        text: "I didn't receive your message 😢",
        type: "danger",
      });
    }
  };

  return (
    <section
      className="relative min-h-screen bg-background p-8 md:ml-20 lg:ml-28 lg:pt-[4.25rem] md:pt-[2.25rem]"
      id="contact"
    >
      <div className="max-w-6xl mx-auto">
        <RevealText
          className="text-4xl md:text-5xl font-heading font-bold text-anothertextcolor mb-16"
          delay={0.2}
        >
          <div className="flex items-center gap-4">
            <motion.img
              src="/right arrow.svg"
              alt="Arrow Animation"
              initial={{ y: -10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-6 h-6 md:w-8 md:h-8"
            />
            <h3 className="text-4xl md:text-4xl font-heading font-bold text-anothertextcolor">
              Contact
            </h3>
            <div className="h-px bg-lighttextcolor flex-1 max-w-[300px] hidden md:flex" />
          </div>
        </RevealText>
      </div>

      {alert.show && <Alert {...alert} />}

      <div className="container mx-auto">
        <div className="flex justify-center items-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-xl bg-[#252a31] rounded-xl p-8 shadow-[10px_10px_20px_#15171b,-10px_-10px_20px_#15171b]"
          >
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-4xl font-bold bg-textcolor bg-clip-text text-transparent">
                  Let's talk
                </h3>
                <p className="mt-4 text-anothertextcolor">
                  Whether you're looking to build a new website, improve your
                  existing platform, or bring a unique project to life, I'm here
                  to help.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                autoComplete="off"
              >
                <Input
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="ex., John Doe"
                />

                <Input
                  label="Email address"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ex., johndoe@gmail.com"
                />

                <Input
                  label="Your message"
                  type="textarea"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Share your thoughts or inquiries..."
                />

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "#ccd6f6",
                    color: "#ffffff",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-full bg-gradient-to-r from-textcolor to-submitcolor text-white rounded px-4 py-3 font-sans flex items-center justify-center gap-2"
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23.828"
                      height="23.66"
                      fill="#ffffff"
                    >
                      <path d="m11.817 18.021-6.161-6.083 6.179-6.262 1.579 1.579 2.828-2.828L11.817 0 0 11.976 11.835 23.66l4.405-4.405-2.828-2.828-1.595 1.594z" />
                      <path d="M21.811 9.841h-.099l-2.884-2.884v2.884h-7.017v4h7.017v3.116l5-5-2.017-2.018v-.098z" />
                    </svg>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
