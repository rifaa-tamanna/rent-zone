"use client";

import { useState } from "react";
import Link from "next/link";

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

export default function ContactUsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Frontend demo only. Connect an API or email service to send messages.
    setSubmitted(true);
    e.currentTarget.reset();
  };

  return (
    <main className="overflow-hidden bg-white text-[#211A15] transition-colors duration-500 dark:bg-[#171310] dark:text-[#F3DFC2]">
      {/* ================= SECTION 01: CONTACT HERO ================= */}
      <section className="relative bg-[#F8F4EE] py-16 transition-colors duration-500 dark:bg-[#211A15] md:py-24">
        <div className="absolute -left-24 top-10 size-64 rounded-full bg-[#A6532E]/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-72 rounded-full bg-[#A6532E]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-[5%]">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#A6532E]/20 bg-[#A6532E]/5 px-4 py-2 text-xs font-bold uppercase tracking-[1.5px] text-[#A6532E]">
              <MessageCircle size={15} />
              Get In Touch
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Let's Start a
              <span className="block text-[#A6532E]">Conversation.</span>
            </h1>

            <p
              className={`mx-auto mt-6 max-w-2xl text-sm leading-8 ${mutedText} md:text-base`}
            >
              Have a question, need assistance, or want to know more about
              RentZone? We're here to help. Reach out to us and let's make your
              rental experience better.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#B56D43,#914321)] px-6 py-3.5 text-sm font-bold text-[#F3DFC2] shadow-lg shadow-[#A6532E]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Send a Message
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/rentals"
                className="inline-flex items-center gap-2 rounded-xl border border-[#A6532E]/25 px-6 py-3.5 text-sm font-bold text-[#A6532E] transition-all duration-300 hover:bg-[#A6532E] hover:text-white"
              >
                Explore Rentals
              </Link>
            </div>
          </div>

          {/* Contact Highlights */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#A6532E]/10 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#F3DFC2]/10 dark:bg-[#2B211B]"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#A6532E]/10 text-[#A6532E]">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-base font-bold">{item.title}</h3>

                  <p className="mt-2 text-sm font-semibold text-[#A6532E]">
                    {item.value}
                  </p>

                  <p className={`mt-2 text-xs leading-6 ${softText}`}>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SECTION 02: CONTACT FORM ================= */}
      <section className="bg-[#211A15] py-16 text-[#F3DFC2] transition-colors duration-500 dark:bg-[#F8F4EE] dark:text-[#211A15] md:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-[5%] lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D99A70]/25 bg-[#A6532E]/10 px-4 py-2 text-xs font-bold uppercase tracking-[1.5px] text-[#D99A70] dark:border-[#A6532E]/20 dark:text-[#A6532E]">
              <Headphones size={15} />
              We're Listening
            </span>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              We'd Love to
              <span className="block text-[#D99A70] dark:text-[#A6532E]">
                Hear From You.
              </span>
            </h2>

            <p className={`mt-6 text-sm leading-8 ${mutedText} md:text-base`}>
              Your questions, feedback, and suggestions help us make RentZone
              better. Send us a message and tell us how we can help you.
            </p>

            <div className="mt-9 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#A6532E]/15 text-[#D99A70] dark:text-[#A6532E]">
                  <CheckCircle2 size={21} />
                </div>

                <div>
                  <h3 className="font-bold">We're Here to Help</h3>
                  <p className={`mt-1 text-sm leading-6 ${mutedText}`}>
                    Get assistance with your questions and concerns.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#A6532E]/15 text-[#D99A70] dark:text-[#A6532E]">
                  <MessageCircle size={21} />
                </div>

                <div>
                  <h3 className="font-bold">Your Feedback Matters</h3>
                  <p className={`mt-1 text-sm leading-6 ${mutedText}`}>
                    Share your ideas and help us improve your experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#A6532E]/15 text-[#D99A70] dark:text-[#A6532E]">
                  <Sparkles size={21} />
                </div>

                <div>
                  <h3 className="font-bold">Customer First</h3>
                  <p className={`mt-1 text-sm leading-6 ${mutedText}`}>
                    Your satisfaction is important to us.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            id="contact-form"
            className="rounded-[26px] border border-[#F3DFC2]/10 bg-[#2B211B] p-6 shadow-[0_15px_50px_rgba(0,0,0,0.15)] transition-colors duration-500 dark:border-[#A6532E]/10 dark:bg-white sm:p-8 md:p-10"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-extrabold text-[#F3DFC2] dark:text-[#211A15]">
                Send Us a Message
              </h3>

              <p className={`mt-2 text-sm leading-6 ${mutedText}`}>
                Fill out the form below and tell us what's on your mind.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
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
              </div>

              <div>
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
              </div>

              <div>
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
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#B56D43,#914321)] px-6 py-3.5 text-sm font-bold text-[#F3DFC2] shadow-lg shadow-[#A6532E]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Send Message
                <Send size={17} />
              </button>

              {submitted && (
                <p
                  role="status"
                  className="rounded-xl border border-[#A6532E]/20 bg-[#A6532E]/10 p-3 text-sm text-[#D99A70] dark:text-[#A6532E]"
                >
                  Form UI is ready! Connect your backend or email service to
                  deliver messages.
                </p>
              )}

              <p className={`text-center text-xs leading-6 ${softText}`}>
                Your information will be handled with care.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ================= SECTION 03: FAQ ================= */}
      <section className="bg-[#F8F4EE] py-16 transition-colors duration-500 dark:bg-[#211A15] md:py-24">
        <div className="mx-auto max-w-[900px] px-[5%]">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#A6532E]/20 bg-[#A6532E]/5 px-4 py-2 text-xs font-bold uppercase tracking-[1.5px] text-[#A6532E]">
              <Sparkles size={15} />
              Need Answers?
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className={`mt-4 text-sm leading-7 ${mutedText} md:text-base`}>
              Find quick answers to some of the questions you might have.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-[#A6532E]/10 bg-white transition-all duration-300 dark:border-[#F3DFC2]/10 dark:bg-[#2B211B]"
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

                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-[#A6532E]/10 text-[#A6532E] transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`px-5 pb-6 text-sm leading-7 ${mutedText} sm:px-6`}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 rounded-2xl border border-[#A6532E]/10 bg-white p-6 text-center dark:border-[#F3DFC2]/10 dark:bg-[#2B211B] sm:p-8">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#A6532E]/10 text-[#A6532E]">
              <MessageCircle size={23} />
            </div>

            <h3 className="mt-5 text-xl font-bold">Still Have Questions?</h3>

            <p className={`mt-2 text-sm leading-7 ${softText}`}>
              We're always happy to help you with your rental journey.
            </p>

            <Link
              href="#contact-form"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#A6532E] transition-colors hover:text-[#914321]"
            >
              Get in Touch
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
