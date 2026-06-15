"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      orderId: formData.get("order-id"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(json.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Failed to connect to the server. Please try again later.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 bg-green-50 rounded-2xl border border-green-100 min-h-[400px]">
        <CheckCircle2 className="w-16 h-16 text-green-500 animate-in zoom-in duration-300" />
        <h3 className="text-2xl font-bold text-gray-900 font-playfair">Submission Complete!</h3>
        <p className="text-gray-600 max-w-md">
          Thank you for reaching out to us. We have received your message and our team will connect with you as soon as possible.
        </p>
        <p className="text-sm text-gray-500 mt-4">
          A confirmation email has been sent to your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span className="text-sm font-medium">{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input name="first-name" type="text" id="first-name" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" placeholder="John" required disabled={status === "loading"} />
        </div>
        <div>
          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input name="last-name" type="text" id="last-name" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" placeholder="Doe" disabled={status === "loading"} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input name="email" type="email" id="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" placeholder="john@example.com" required disabled={status === "loading"} />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input name="phone" type="tel" id="phone" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" placeholder="+91 7003587996" disabled={status === "loading"} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
        <select name="subject" id="subject" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors bg-white" required disabled={status === "loading"}>
          <option value="Order Inquiry">Order Inquiry</option>
          <option value="Plant Care Question">Plant Care Question</option>
          <option value="Returns & Replacements">Returns & Replacements</option>
          <option value="Feedback / Suggestion">Feedback / Suggestion</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="order-id" className="block text-sm font-medium text-gray-700 mb-2">Order ID (Optional)</label>
        <input name="order-id" type="text" id="order-id" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors" placeholder="e.g. IN-12345" disabled={status === "loading"} />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
        <textarea name="message" id="message" rows={6} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors resize-none" placeholder="How can we help you?" required disabled={status === "loading"}></textarea>
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={status === "loading"} className="w-full md:w-auto px-8 py-3 h-auto bg-primary hover:bg-[#1B4332] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
          {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
          {status === "loading" ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
