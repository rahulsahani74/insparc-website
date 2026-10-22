/**
 * FAQ data for the /faq page and FaqSection component.
 * Replace [PLACEHOLDER] answers with real content before launch.
 */

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    id: "what-is-insparc",
    question: "What does Insparc Technology do?",
    answer:
      "Insparc Technology builds AI automation systems for small and mid-size businesses. We create workflows using n8n, AI models, and integrations that handle repetitive tasks like lead follow-up, WhatsApp replies, document processing, and more — automatically.",
  },
  {
    id: "who-is-it-for",
    question: "Who is this for?",
    answer:
      "Our services are best suited for clinics, real estate agencies, coaching businesses, e-commerce stores, and operations teams that want to save time, reduce manual work, and never miss a customer inquiry.",
  },
  {
    id: "how-long",
    question: "How long does it take to build an automation?",
    answer:
      "[YOUR_TIMELINE_ANSWER] — Timeline varies by project complexity. Simple automations can be ready in days; complex multi-step AI workflows may take 2–4 weeks. We will give you a clear estimate in our discovery call.",
  },
  {
    id: "pricing",
    question: "How much does it cost?",
    answer:
      "We do not publish fixed prices because every project is different. We offer Starter, Growth, and Custom packages. Contact us for a free consultation and quote tailored to your needs.",
  },
  {
    id: "no-code",
    question: "Do I need technical knowledge to use the automations you build?",
    answer:
      "No. We design automations so they run silently in the background. You interact with your existing apps (WhatsApp, email, CRM) as usual — the automation happens behind the scenes.",
  },
  {
    id: "maintenance",
    question: "Do you provide ongoing support?",
    answer:
      "[YOUR_SUPPORT_ANSWER] — Yes. We offer maintenance and monitoring plans to keep your automations running smoothly and adapt them as your business grows.",
  },
  {
    id: "data-security",
    question: "Is my business data safe?",
    answer:
      "Yes. We follow security best practices: all data is handled over encrypted connections, we never store sensitive customer data without your permission, and we can deploy automations on your own infrastructure if required.",
  },
];
