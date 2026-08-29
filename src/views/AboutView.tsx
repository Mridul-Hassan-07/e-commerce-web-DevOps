import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award,
  MessageCircle
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { lang, t, siteSettings } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
          {lang === 'bn' ? 'আমাদের পরিচিতি' : `About ${siteSettings.site_name} BD`}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white">
          {lang === 'bn' ? 'প্রকৃত ফ্যাশন, গ্যাজেট ও লাইফস্টাইল ই-কমার্স অভিজ্ঞতা' : 'Pioneering Authentic Cash on Delivery E-commerce in Bangladesh'}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
          {lang === 'bn'
            ? 'আমরা শতভাগ অরিজিনাল পণ্য, নিরবচ্ছিন্ন কুরিয়ার ট্র্যাকিং এবং ক্যাশ অন ডেলিভারির মাধ্যমে গ্রাহকের আস্থা অর্জন করে আসছি।'
            : `${siteSettings.site_name} BD is built with one core mission: delivering verified authentic fashion, smart gadgets, kitchenware and lifestyle gear directly to your doorstep with zero pre-payment stress.`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs">
          <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-zinc-900 dark:text-white">100% Genuine Quality</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Directly sourced and inspected items with valid manufacturer replacement guarantee.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 w-fit">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-zinc-900 dark:text-white">Steadfast Fast Dispatch</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Same-day packaging and instant consignment tracking creation for 64 districts nationwide.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 w-fit">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-zinc-900 dark:text-white">Customer-First Replacement</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Hassle-free 7 days 1-to-1 replacement support with direct hotline & WhatsApp support.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const { lang, t, siteSettings } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const hasAddress = Boolean(siteSettings.office_address_bn || siteSettings.office_address_en);
  const fbUrl = siteSettings.facebook_url || 'https://www.facebook.com/share/1X14b7NztN/';
  const whatsappNumber = siteSettings.whatsapp_number || '01577686999';
  const whatsappUrl = `https://wa.me/88${whatsappNumber.replace(/[^0-9]/g, '')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <h1 className="text-3xl font-black text-zinc-900 dark:text-white">
          {t('contact_us')}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          {lang === 'bn'
            ? 'যেকোনো জিজ্ঞাসা, বাল্ক অর্ডার বা সহায়তার জন্য আমাদের কল করুন বা WhatsApp/Facebook-এ মেসেজ দিন'
            : 'Have questions about your order or product specifications? We are here to help 24/7.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Info */}
        <div className="p-8 rounded-3xl bg-zinc-900 text-white space-y-6 shadow-xl">
          <h3 className="font-extrabold text-lg">
            {siteSettings.site_name} Customer Care
          </h3>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
            {hasAddress && (
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{lang === 'bn' ? siteSettings.office_address_bn : siteSettings.office_address_en}</span>
              </div>
            )}

            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-indigo-400 shrink-0" />
              <a href={`tel:${siteSettings.hotline}`} className="hover:text-indigo-300 font-mono font-bold transition">
                {siteSettings.hotline}
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300 text-emerald-400 font-mono font-bold transition"
              >
                WhatsApp: {whatsappNumber}
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
              <a href={`mailto:${siteSettings.support_email}`} className="hover:text-white transition">
                {siteSettings.support_email}
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
              <span>Sat - Thu (9:00 AM - 10:00 PM)</span>
            </div>
          </div>

          {/* Social Channels buttons */}
          <div className="pt-2 border-t border-zinc-800 space-y-2.5">
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              {lang === 'bn' ? 'সোশ্যাল মিডিয়া পেজ' : 'Official Social Channels'}
            </p>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={fbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook Page</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Message</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-zinc-900 dark:text-white">
            {lang === 'bn' ? 'সরাসরি মেসেজ পাঠান' : 'Send a Direct Message'}
          </h3>

          {submitted ? (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs space-y-2">
              <div className="flex items-center space-x-2 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Message Received!</span>
              </div>
              <p>Our representative will contact you shortly via phone or WhatsApp.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-zinc-700 dark:text-zinc-300">{t('full_name')} *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-700 dark:text-zinc-300">{t('phone_number')} *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01577686999"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-700 dark:text-zinc-300">Message / Query *</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center justify-center space-x-2 transition shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
