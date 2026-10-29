'use client';

import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import {
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.body.setAttribute('theme', 'black');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-animate-in',
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/rubbasyarkhan007@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          _captcha: 'false',
          _template: 'table',
          _subject: `New Contact Form Message from ${formData.firstName} ${formData.lastName}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          service: '',
          message: '',
        });
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        throw new Error('Server returned an error');
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'Could not send message automatically. Please reach out directly at rubbasyarkhan007@gmail.com.'
      );
    }
  };

  return (
    <section
      data-color="black"
      className="min-h-screen bg-[#0B0D10] text-white py-24 sm:py-28 md:py-36 px-5 sm:px-8 md:px-16 lg:px-20 font-sans"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="contact-animate-in flex flex-col md:flex-row justify-between items-start mb-14 md:mb-18 gap-6 md:gap-8 pt-6">
          <h1 className="text-[clamp(3.5rem,8.5vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-tighter font-sans text-white">
            Let&apos;s Work <br /> Together
          </h1>
          <div className="text-left md:text-right">
            <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1 font-mono">
              [ Fill the form below ]
            </p>
            <p className="text-sm md:text-base text-zinc-300 font-sans">
              Let&apos;s carve your idea into <br className="hidden md:inline" /> something amazing
            </p>
          </div>
        </div>

        {/* Feedback Messages */}
        {status === 'success' && (
          <div className="contact-animate-in mb-8 p-4 rounded-sm bg-emerald-950/80 border border-emerald-500/80 text-emerald-200 text-sm font-semibold flex items-center justify-center gap-2 text-center">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>
              Message sent successfully! Thank you for reaching out, I will be in touch shortly.
            </span>
          </div>
        )}

        {status === 'error' && (
          <div className="contact-animate-in mb-8 p-4 rounded-sm bg-red-950/80 border border-red-500/80 text-red-200 text-sm font-semibold flex items-center justify-center gap-2 text-center">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="contact-animate-in space-y-8 sm:space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 sm:gap-y-8">
            {/* First Name */}
            <div className="space-y-3">
              <label
                htmlFor="firstName"
                className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer text-white"
              >
                <span className="w-2 h-2 bg-[#ef9d71] rounded-full inline-block" />
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="RUBBAS"
                required
                className="w-full bg-[#1A1A1A] border-2 border-transparent focus:border-[#ef9d71] rounded-sm p-3.5 sm:p-4 text-sm sm:text-base text-zinc-200 placeholder:text-zinc-600 outline-none transition-all"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-3">
              <label
                htmlFor="lastName"
                className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer text-white"
              >
                <span className="w-2 h-2 bg-[#ef9d71] rounded-full inline-block" />
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="YAR KHAN"
                required
                className="w-full bg-[#1A1A1A] border-2 border-transparent focus:border-[#ef9d71] rounded-sm p-3.5 sm:p-4 text-sm sm:text-base text-zinc-200 placeholder:text-zinc-600 outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-3 md:col-span-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer text-white"
              >
                <span className="w-2 h-2 bg-[#ef9d71] rounded-full inline-block" />
                How can we reach you
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="rubbasyarkhan007@gmail.com"
                required
                className="w-full bg-[#1A1A1A] border-2 border-transparent focus:border-[#ef9d71] rounded-sm p-3.5 sm:p-4 text-sm sm:text-base text-zinc-200 placeholder:text-zinc-600 outline-none transition-all"
              />
            </div>

            {/* Service Required */}
            <div className="space-y-3 md:col-span-2">
              <label
                htmlFor="service"
                className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer text-white"
              >
                <span className="w-2 h-2 bg-[#ef9d71] rounded-full inline-block" />
                Service Required
              </label>
              <div className="relative group">
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1A1A1A] border-2 border-transparent focus:border-[#ef9d71] rounded-sm p-3.5 sm:p-4 text-sm sm:text-base text-zinc-200 outline-none appearance-none cursor-pointer pr-12 transition-all"
                >
                  <option value="" disabled className="bg-[#1A1A1A] text-zinc-500">
                    Select a service
                  </option>
                  <option value="web-design" className="bg-[#1A1A1A] text-zinc-200">
                    Web &amp; App Designing
                  </option>
                  <option value="web-dev" className="bg-[#1A1A1A] text-zinc-200">
                    Web Development
                  </option>
                  <option value="app-dev" className="bg-[#1A1A1A] text-zinc-200">
                    App Development
                  </option>
                  <option value="bookkeeping" className="bg-[#1A1A1A] text-zinc-200">
                    Bookkeeping
                  </option>
                  <option value="commercial" className="bg-[#1A1A1A] text-zinc-200">
                    Commercial Projects
                  </option>
                  <option value="other" className="bg-[#1A1A1A] text-zinc-200">
                    Other Services
                  </option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-[#ef9d71] transition-colors">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-3 md:col-span-2">
              <label
                htmlFor="message"
                className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider cursor-pointer text-white"
              >
                <span className="w-2 h-2 bg-[#ef9d71] rounded-full inline-block" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Give us an idea of what you need."
                required
                className="w-full bg-[#1A1A1A] border-2 border-transparent focus:border-[#ef9d71] rounded-sm p-3.5 sm:p-4 text-sm sm:text-base text-zinc-200 placeholder:text-zinc-600 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="submit-btn"
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-[#E5E5E5] text-black font-bold uppercase py-4 mt-6 hover:bg-[#ef9d71] transition-colors duration-300 tracking-wider text-base sm:text-lg rounded-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-xl"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : status === 'success' ? (
              <span>Message Sent ✓</span>
            ) : (
              <span>Submit Now</span>
            )}
          </button>
        </form>

        {/* Quick Contact Info Strip */}
        <div className="contact-animate-in mt-16 sm:mt-20 pt-10 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#ef9d71] flex-shrink-0 mt-0.5">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-semibold">
                Direct Email
              </p>
              <a
                href="mailto:rubbasyarkhan007@gmail.com"
                className="text-xs sm:text-sm font-medium text-zinc-200 hover:text-[#ef9d71] transition-colors break-all"
              >
                rubbasyarkhan007@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#ef9d71] flex-shrink-0 mt-0.5">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-semibold">
                Phone / WhatsApp
              </p>
              <a
                href="tel:+923710290861"
                className="text-xs sm:text-sm font-medium text-zinc-200 hover:text-[#ef9d71] transition-colors"
              >
                (+92) 371-029-0861
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#ef9d71] flex-shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-semibold">
                Location
              </p>
              <p className="text-xs sm:text-sm font-medium text-zinc-200">
                Karachi, Pakistan <br />
                <span className="text-[11px] text-zinc-500">Available Worldwide</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
