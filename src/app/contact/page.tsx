"use client";

import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-gray-950 text-gray-50 flex flex-col">
      <div className="max-w-3xl mx-auto w-full px-6 py-12 flex-1">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Roulette
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Contact Us
          </h1>
        </div>

        <article className="space-y-6 text-gray-300 leading-relaxed mb-10">
          <p>
            We would love to hear from you! Whether you have feedback, a feature request, a bug report, or just want to say hi — feel free to reach out.
          </p>
        </article>

        {submitted ? (
          <div className="bg-green-900/30 border border-green-700 rounded-2xl p-8 text-center">
            <MessageSquare className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-green-300 mb-2">Message Sent!</h2>
            <p className="text-gray-400">Thank you for reaching out. We will get back to you as soon as possible.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1.5">Name</label>
              <input
                id="name"
                type="text"
                required
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                required
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1.5">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-b from-yellow-400 to-orange-500 text-gray-900 font-bold py-3 rounded-xl hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all shadow-xl"
            >
              Send Message
            </button>
          </form>
        )}

        <div className="mt-10 bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-200 mb-3">Other Ways to Reach Us</h2>
          <div className="space-y-2 text-gray-400 text-sm">
            <p><strong className="text-gray-300">Email:</strong> fcsfcs007@gmail.com</p>
            <p><strong className="text-gray-300">GitHub:</strong> github.com/Adrian1028/What-to-eat</p>
          </div>
        </div>
      </div>

      <footer className="w-full bg-gray-900 border-t border-gray-800 py-6 px-6">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-6 text-sm">
          <Link href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">About Us</Link>
          <Link href="/contact" className="text-yellow-400 font-medium">Contact Us</Link>
          <Link href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors">Privacy Policy</Link>
        </div>
        <p className="text-gray-600 text-xs text-center mt-4">&copy; {new Date().getFullYear()} What to eat tonight? All rights reserved.</p>
      </footer>
    </div>
  );
}
