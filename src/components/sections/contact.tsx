"use client";

import React, { useState } from "react";
import { BentoCard } from "../ui/bento-card";
import { Mail, ArrowRight, CheckCircle2, Send } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function Contact() {
  const [emailState, setEmailState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailState.name || !emailState.email || !emailState.message) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setIsSent(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailState),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSent(true);
        setEmailState({ name: "", email: "", message: "" });
        setTimeout(() => setIsSent(false), 5000);
      } else {
        setErrorMessage(data.error || "Failed to dispatch message.");
      }
    } catch (error: unknown) {
      console.error("Contact form submission error:", error);
      setErrorMessage("Network error: Failed to connect to secure dispatcher.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden border-t border-zinc-100 dark:border-zinc-900/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center md:text-left mb-16">
          <p className="font-mono text-xs text-emerald-500 dark:text-cyan-400 uppercase tracking-widest mb-2">
            {"// 06. Communication Channels"}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            Get In Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Info Card Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <BentoCard className="flex-1 flex flex-col justify-between" hoverGlow="green">
              <div>
                <h3 className="font-display text-2xl font-bold mb-4">
                  {"Let's collaborate on premium web products."}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                  I am always open to discussing fullstack roles, software engineering contracts, 
                  freelance work, or database setups. Drop me an email or find me on professional networks.
                </p>

                {/* Main Email Action Card */}
                <a 
                  href="mailto:shashankvermahsst@gmail.com"
                  className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/10 hover:border-emerald-500/30 dark:hover:border-cyan-500/30 hover:bg-zinc-100 dark:hover:bg-zinc-900/30 transition-all group mb-8"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="p-2.5 rounded bg-emerald-500/10 text-emerald-500 dark:text-cyan-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">direct_email</p>
                      <p className="font-mono text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        shashankvermahsst@gmail.com
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 group-hover:text-emerald-500 dark:group-hover:text-cyan-450 transition-all" />
                </a>
              </div>

              {/* Social Channels Link Row */}
              <div>
                <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3">
                  {"// external_nodes"}
                </p>
                <div className="flex items-center space-x-4">
                  <a
                    href="https://www.linkedin.com/in/shashank-verma-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-xs font-mono text-zinc-500 hover:text-cyan-500 transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>linkedin</span>
                  </a>
                  <a
                    href="https://github.com/Shashankverma-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-xs font-mono text-zinc-500 hover:text-emerald-500 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>github</span>
                  </a>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Form Card Column */}
          <div className="lg:col-span-7">
            <BentoCard hoverGlow="cyan">
              <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-900 pb-3 mb-6">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Secure Dispatcher</span>
                <span className="font-mono text-[10px] text-zinc-500">status: listening</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    sender_name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-transparent text-sm text-zinc-900 dark:border-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50 dark:focus:border-cyan-500/50 transition-colors font-mono"
                    value={emailState.name}
                    onChange={(e) => setEmailState((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Identify yourself..."
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    sender_email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-transparent text-sm text-zinc-900 dark:border-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50 dark:focus:border-cyan-500/50 transition-colors font-mono"
                    value={emailState.email}
                    onChange={(e) => setEmailState((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase text-zinc-400 mb-2">
                    payload_message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 bg-transparent text-sm text-zinc-900 dark:border-zinc-800 dark:text-zinc-100 focus:outline-none focus:border-emerald-500/50 dark:focus:border-cyan-500/50 transition-colors font-mono resize-none"
                    value={emailState.message}
                    onChange={(e) => setEmailState((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="Write your brief message here..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || isSent}
                    className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-lg bg-zinc-950 hover:bg-zinc-850 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-sm font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                        <span>transmitting...</span>
                      </>
                    ) : isSent ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>transmission_complete</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>send_message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Status Banner */}
              {isSent && (
                <div className="mt-4 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Message delivered successfully. I will get back to you shortly!</span>
                </div>
              )}

              {errorMessage && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-650 dark:text-red-400 text-xs font-mono flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 animate-ping"></span>
                    <span className="absolute inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span>{errorMessage}</span>
                </div>
              )}
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
}

