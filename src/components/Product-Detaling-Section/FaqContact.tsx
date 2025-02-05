import React, { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqsData: FaqItem[] = [
  {
    question: "What warranty do you offer?",
    answer: "We provide a 2-year warranty covering manufacturing defects.",
  },
  {
    question: "How can I track my order?",
    answer: "Once shipped, you'll receive a tracking link via email.",
  },
  {
    question: "Do you offer free shipping?",
    answer: "Free shipping is available for orders over $50.",
  },
  {
    question: "Can I exchange a product?",
    answer:
      "Yes, exchanges are accepted within 30 days if the product is unused and in original condition.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact support via our website's live chat, email, or phone during business hours.",
  },
  {
    question: "Do you offer gift wrapping services?",
    answer:
      "Yes, gift wrapping is available for a small additional fee at checkout.",
  },
];

const FaqContent = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section>
      <h3
        className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6"
        style={{ fontFamily: "Roboto, sans-serif" }}
      >
        Frequently Asked Questions
      </h3>
      <div className="faq-container">
        {faqsData.map((faq, idx) => (
          <div key={idx} className="faq-item mb-4">
            <button
              aria-expanded={activeIndex === idx}
              className="faq-question w-full text-left cursor-pointer flex justify-between items-center p-4 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              onClick={() => handleToggle(idx)}
            >
              <h4 className="text-lg font-medium">{faq.question}</h4>
              <span className="text-xl">{activeIndex === idx ? "−" : "+"}</span>
            </button>
            {activeIndex === idx && (
              <div className="faq-answer p-4 bg-gray-50 rounded-md mt-2">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqContent;
