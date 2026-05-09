"use client";

import { useState } from "react";
import { Faq } from "@/types/types";

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul className="flex flex-col divide-y" style={{ borderColor: "var(--color-primary)" }}>
      {faqs.map((item, index) => (
        <li key={index} style={{ borderColor: "var(--color-primary)" }}>
          <button
            onClick={() => setOpen(open === index ? null : index)}
            className="w-full flex items-center justify-between gap-2 py-2 text-left"
          >
            <span
              className="font-heading"
              style={{ fontSize: "var(--text-lg)", color: "var(--color-primary)" }}
            >
              {item.question}
            </span>
            <span
              className="shrink-0 transition-transform duration-300 font-body"
              style={{
                color: "var(--color-primary)",
                fontSize: "var(--text-xl)",
                transform: open === index ? "rotate(45deg)" : "rotate(0deg)",
                display: "inline-block",
              }}
            >
              +
            </span>
          </button>

          {open === index && (
            <p
              className="font-body p-3 text-left"
              style={{
                fontSize: "var(--text-ms)",
                color: "var(--color-primary)",
              }}
            >
              {item.answer}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}