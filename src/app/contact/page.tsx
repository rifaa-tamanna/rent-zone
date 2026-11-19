"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";

import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  ArrowRight,
  Send,
  MessageCircle,
  Headphones,
  ChevronDown,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Support",
    value: "Send us a message",
    description: "For questions and general inquiries",
  },
  {
    icon: Phone,
    title: "Phone Support",
    value: "Talk to our team",
    description: "Get assistance with your rental journey",
  },
  {
    icon: MapPin,
    title: "Our Platform",
    value: "Online Rental Platform",
    description: "Connect with us from anywhere",
  },
  {
    icon: Clock3,
    title: "Support Hours",
    value: "We're here to help",
    description: "Reach out whenever you need assistance",
  },
];

const faqs = [
  {
    question: "How can I rent an item through RentZone?",
    answer:
      "Browse our available rentals, choose the item you need, review its details, and follow the booking process to get started.",
  },
  {
    question: "Do I need an account to rent something?",
    answer:
      "You may need to create an account or sign in to complete a rental booking and manage your rental activities.",
  },
  {
    question: "How can I become a renter on RentZone?",
    answer:
      "You can explore the Become a Renter option and follow the registration process to get started.",
  },
  {
    question: "What should I do if I face a problem?",
    answer:
      "You can contact our support team through this page. Share your issue and relevant details so we can assist you.",
  },
];

const inputClass =
  "h-12 w-full rounded-xl border border-[#F3DFC2]/15 bg-[#211A15] px-4 text-sm text-[#F3DFC2] outline-none transition-all placeholder:text-[#AFA092] focus:border-[#D99A70] focus:ring-2 focus:ring-[#D99A70]/10 dark:border-[#A6532E]/15 dark:bg-[#F8F4EE] dark:text-[#211A15] dark:placeholder:text-[#AFA092] dark:focus:border-[#A6532E]";

const labelClass =
  "mb-2 block text-sm font-semibold text-[#F3DFC2] dark:text-[#211A15]";

const mutedText = "text-[#C8B9AA] dark:text-[#74665B]";

const softText = "text-[#B8A99A] dark:text-[#887B70]";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ContactUsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const reduceMotion = !!useReducedMotion();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Frontend demo only. Connect an API or email service to send messages.
    setSubmitted(true);
    e.currentTarget.reset();
  };

  const offset = reduceMotion ? 0 : 24;
  const dur = reduceMotion ? 0 : 0.6;
  const spring = { type: "spring", stiffness: 400, damping: 20 } as const;

  const stagger = (child = 0.1, delay = 0.05): Variants => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : child,
        delayChildren: reduceMotion ? 0 : delay,
      },
    },
  });

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: offset },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur, ease: EASE },
    },
  };

  const cardUp: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur, ease: EASE },
    },
  };

  const featureItem: Variants = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: reduceMotion ? 0 : 0.55, ease: EASE },
    },
  };

  const popIn: Variants = {
    hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.6 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 18 },
    },
  };

  const formCard: Variants = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : 40,
      scale: reduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.8,
        ease: EASE,
        when: "beforeChildren",
        staggerChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  const formField: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.45, ease: EASE },
    },
  };

  return (
    <main className="overflow-hidden bg-white text-[#211A15] transition-colors duration-500 dark:bg-[#171310] dark:text-[#F3DFC2]">
      {/* ================= SECTION 01: CONTACT HERO ================= */}
      <section className="relative bg-[#F8F4EE] py-16 transition-colors duration-500 dark:bg-[#211A15] md:py-24">
        {/* Floating glows */}
        <motion.div
          aria-hidden="true"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 28, 0], y: [0, 20, 0], opacity: [0.7, 1, 0.7] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-10 size-64 rounded-full bg-[#A6532E]/10 blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -26, 0], y: [0, -18, 0], opacity: [0.7, 1, 0.7] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 bottom-0 size-72 rounded-full bg-[#A6532E]/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-[1440px] px-[5%]">
          <motion.div
            variants={stagger(0.12, 0.05)}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#A6532E]/20 bg-[#A6532E]/5 px-4 py-2 text-xs font-bold uppercase tracking-[1.5px] text-[#A6532E]"
            >
              <motion.span
                aria-hidden="true"
                animate={
                  reduceMotion
                    ? undefined
                    : { rotate: [0, 12, -8, 0], scale: [1, 1.2, 1] }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeInOut",
                }}
                className="inline-flex"
              >
                <MessageCircle size={15} />
              </motion.span>
              Get In Touch
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl"
            >
              Let's Start a
              <span className="block text-[#A6532E]">Conversation.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className={`mx-auto mt-6 max-w-2xl text-sm leading-8 ${mutedText} md:text-base`}
            >
              Have a question, need assistance, or want to know more about
              RentZone? We're here to help. Reach out to us and let's make your
              rental experience better.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                <Link
                  href="#contact-form"
                  className="group/btn inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#B56D43,#914321)] px-6 py-3.5 text-sm font-bold text-[#F3DFC2] shadow-lg shadow-[#A6532E]/20 transition-shadow duration-300 hover:shadow-xl"
                >
                  Send a Message
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={reduceMotion ? undefined : { y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                <Link
                  href="/rentals"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#A6532E]/25 px-6 py-3.5 text-sm font-bold text-[#A6532E] transition-colors duration-300 hover:bg-[#A6532E] hover:text-white"
                >
                  Explore Rentals
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Highlights */}
          <motion.div
            variants={stagger(0.12, 0.45)}
            initial="hidden"
            animate="visible"
            className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={cardUp}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  className="rounded-2xl border border-[#A6532E]/10 bg-white/80 p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-[#F3DFC2]/10 dark:bg-[#2B211B]"
                >
                  <motion.div
                    whileHover={
                      reduceMotion ? undefined : { rotate: -8, scale: 1.08 }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="flex size-12 items-center justify-center rounded-xl bg-[#A6532E]/10 text-[#A6532E]"
                  >
                    <Icon size={23} />
                  </motion.div>

                  <h3 className="mt-5 text-base font-bold">{item.title}</h3>

                  <p className="mt-2 text-sm font-semibold text-[#A6532E]">
                    {item.value}
                  </p>

                  <p className={`mt-2 text-xs leading-6 ${softText}`}>
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= SECTION 02: CONTACT FORM ================= */}
      <section className="bg-[#211A15] py-16 text-[#F3DFC2] transition-colors duration-500 dark:bg-[#F8F4EE] dark:text-[#211A15] md:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-[5%] lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Left Content */}
          <motion.div
            variants={stagger(0.11, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col justify-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D99A70]/25 bg-[#A6532E]/10 px-4 py-2 text-xs font-bold uppercase tracking-[1.5px] text-[#D99A70] dark:border-[#A6532E]/20 dark:text-[#A6532E]"
            >
              <Headphones size={15} />
              We're Listening
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-6 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl"
            >
              We'd Love to
              <span className="block text-[#D99A70] dark:text-[#A6532E]">
                Hear From You.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className={`mt-6 text-sm leading-8 ${mutedText} md:text-base`}
            >
              Your questions, feedback, and suggestions help us make RentZone
              better. Send us a message and tell us how we can help you.
            </motion.p>

            <motion.div
              variants={stagger(0.14, 0.05)}
              className="mt-9 space-y-5"
            >
              {[
                {
                  icon: CheckCircle2,
                  title: "We're Here to Help",
                  text: "Get assistance with your questions and concerns.",
                },
                {
                  icon: MessageCircle,
                  title: "Your Feedback Matters",
                  text: "Share your ideas and help us improve your experience.",
                },
                {
                  icon: Sparkles,
                  title: "Customer First",
                  text: "Your satisfaction is important to us.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    variants={featureItem}
                    className="flex items-start gap-4"
                  >
                    <motion.div
                      variants={popIn}
                      whileHover={
                        reduceMotion ? undefined : { rotate: -8, scale: 1.08 }
                      }
                      className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#A6532E]/15 text-[#D99A70] dark:text-[#A6532E]"
                    >
                      <Icon size={21} />
                    </motion.div>

                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className={`mt-1 text-sm leading-6 ${mutedText}`}>
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            id="contact-form"
            variants={formCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="scroll-mt-24 rounded-[26px] border border-[#F3DFC2]/10 bg-[#2B211B] p-6 shadow-[0_15px_50px_rgba(0,0,0,0.15)] transition-colors duration-500 dark:border-[#A6532E]/10 dark:bg-white sm:p-8 md:p-10"
          >
            <motion.div variants={formField} className="mb-8">
              <h3 className="text-2xl font-extrabold text-[#F3DFC2] dark:text-[#211A15]">
                Send Us a Message
              </h3>

              <p className={`mt-2 text-sm leading-6 ${mutedText}`}>
                Fill out the form below and tell us what's on your mind.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div
                variants={formField}
                className="grid gap-5 sm:grid-cols-2"
              >
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Your Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </motion.div>

              <motion.div variants={formField}>
                <label htmlFor="subject" className={labelClass}>
                  Subject *
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="What is this about?"
                  className={inputClass}
                />
              </motion.div>

              <motion.div variants={formField}>
                <label htmlFor="message" className={labelClass}>
                  Your Message *
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  className={`${inputClass} h-auto resize-none py-4`}
                />
              </motion.div>

              <motion.div variants={formField}>
                <motion.button
                  type="submit"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={spring}
                  className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#B56D43,#914321)] px-6 py-3.5 text-sm font-bold text-[#F3DFC2] shadow-lg shadow-[#A6532E]/20 transition-shadow duration-300 hover:shadow-xl"
                >
                  Send Message
                  <Send
                    size={17}
                    className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-1"
                  />
                </motion.button>
              </motion.div>

              <AnimatePresence>
                {submitted && (
                  <motion.p
                    role="status"
                    initial={
                      reduceMotion ? false : { opacity: 0, y: 10, scale: 0.97 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="rounded-xl border border-[#A6532E]/20 bg-[#A6532E]/10 p-3 text-sm text-[#D99A70] dark:text-[#A6532E]"
                  >
                    Form UI is ready! Connect your backend or email service to
                    deliver messages.
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.p
                variants={formField}
                className={`text-center text-xs leading-6 ${softText}`}
              >
                Your information will be handled with care.
              </motion.p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ================= SECTION 03: FAQ ================= */}
      <section className="bg-[#F8F4EE] py-16 transition-colors duration-500 dark:bg-[#211A15] md:py-24">
        <div className="mx-auto max-w-[900px] px-[5%]">
          <motion.div
            variants={stagger(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-12 text-center"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#A6532E]/20 bg-[#A6532E]/5 px-4 py-2 text-xs font-bold uppercase tracking-[1.5px] text-[#A6532E]"
            >
              <Sparkles size={15} />
              Need Answers?
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl"
            >
              Frequently Asked Questions
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className={`mt-4 text-sm leading-7 ${mutedText} md:text-base`}
            >
              Find quick answers to some of the questions you might have.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger(0.1, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-4"
          >
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <motion.div
                  key={faq.question}
                  variants={cardUp}
                  className="overflow-hidden rounded-2xl border border-[#A6532E]/10 bg-white transition-colors duration-300 hover:border-[#A6532E]/30 dark:border-[#F3DFC2]/10 dark:bg-[#2B211B] dark:hover:border-[#A6532E]/40"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="text-sm font-bold sm:text-base">
                      {faq.question}
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.35,
                        ease: EASE,
                      }}
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#A6532E]/10 text-[#A6532E]"
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.35,
                          ease: EASE,
                        }}
                        className="overflow-hidden"
                      >
                        <p
                          className={`px-5 pb-6 text-sm leading-7 ${mutedText} sm:px-6`}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            variants={stagger(0.1, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-12 rounded-2xl border border-[#A6532E]/10 bg-white p-6 text-center dark:border-[#F3DFC2]/10 dark:bg-[#2B211B] sm:p-8"
          >
            <motion.div
              variants={popIn}
              className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#A6532E]/10 text-[#A6532E]"
            >
              <motion.span
                aria-hidden="true"
                animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex"
              >
                <MessageCircle size={23} />
              </motion.span>
            </motion.div>

            <motion.h3 variants={fadeUp} className="mt-5 text-xl font-bold">
              Still Have Questions?
            </motion.h3>

            <motion.p
              variants={fadeUp}
              className={`mt-2 text-sm leading-7 ${softText}`}
            >
              We're always happy to help you with your rental journey.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href="#contact-form"
                className="group/link mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#A6532E] transition-colors hover:text-[#914321]"
              >
                Get in Touch
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/link:translate-x-1"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}