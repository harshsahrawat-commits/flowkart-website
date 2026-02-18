"use client";

import Accordion from "@/components/ui/Accordion";

const FAQ_ITEMS = [
  {
    question: "I don't have a technical team. Can I still work with you?",
    answer:
      "That's exactly who we build for. Our systems are designed so you and your team can use them without writing a line of code. And our monthly training sessions make sure everyone's confident with the tools.",
  },
  {
    question: "How is this different from just using ChatGPT or Zapier?",
    answer:
      "Those are consumer tools. We build production infrastructure. ChatGPT is a conversation. What we build is a system that integrates with your data, your processes, and your business logic — and runs autonomously.",
  },
  {
    question: "What if AI changes next month? Will my system become outdated?",
    answer:
      "That's why continuous iteration is built into every engagement. We don't build and disappear. We update your systems as the technology evolves — which is exactly why the weekly intelligence brief and monthly training exist.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Most systems are scoped, built, and deployed within 2\u20136 weeks depending on complexity. You'll see working prototypes within the first week.",
  },
  {
    question: "I'm not sure what I need. Can I still book a call?",
    answer:
      "Absolutely. Most clients don't know exactly what they need — that's literally what the discovery call is for. We'll map out the opportunities together.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative bg-void py-[var(--section-padding-y)] px-[var(--section-padding-x)]"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12">Questions we hear.</h2>
        <Accordion items={FAQ_ITEMS} />
      </div>
    </section>
  );
}
