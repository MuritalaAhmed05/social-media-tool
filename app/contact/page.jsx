"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSend, FiMessageCircle, FiMail, FiUser } from "react-icons/fi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const whatsappMessage = `Hello! My name is ${name}.\nEmail: ${email}\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/2349020507509?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-16 px-4 sm:px-6 max-w-xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Contact Us</h1>
        <p className="text-base text-muted-foreground">
          Have feedback or need assistance? Reach out to us directly via WhatsApp or message below.
        </p>
      </div>

      <div className="border border-border/50 bg-card/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <FiUser className="w-3.5 h-3.5" /> Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="h-11 bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <FiMail className="w-3.5 h-3.5" /> Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="h-11 bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <FiMessageCircle className="w-3.5 h-3.5" /> Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="How can we help you?"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 rounded-xl border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <Button type="submit" className="w-full h-12 text-sm font-semibold">
            <FiSend className="w-4 h-4 mr-2" /> Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
