import React from 'react';
import { useApp } from '../context/AppContext';
import { Truck, ShieldCheck, Phone, Mail, MapPin, Heart, Clock, Lock, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteSettings, navigate, lang, t } = useApp();

  const hasAddress = Boolean(siteSettings.office_address_bn || siteSettings.office_address_en);
  const fbUrl = siteSettings.facebook_url || 'https://www.facebook.com/share/1X14b7NztN/';
  const whatsappNumber = siteSettings.whatsapp_number || '01577686999';
  const whatsappUrl = `https://wa.me/88${whatsappNumber.replace(/[^0-9]/g, '')}`;

  return (
    <footer className="bg-zinc-950 text-zinc-400 text-sm border-t border-zinc-800 transition-colors">
      {/* Top Value Assurance Grid */}
      <div className="border-b border-zinc-900 bg-zinc-900/40 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3.5">
            <div className="p-3 rounded-2xl bg-indigo-950/60 text-indigo-400 border border-indigo-900/50">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-100 text-xs sm:text-sm">{t('prop_cod_title')}</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">{t('prop_cod_desc')}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3.5">
            <div className="p-3 rounded-2xl bg-emerald-950/60 text-emerald-400 border border-emerald-900/50">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-100 text-xs sm:text-sm">{t('prop_courier_title')}</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">{t('prop_courier_desc')}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3.5">
            <div className="p-3 rounded-2xl bg-amber-950/60 text-amber-400 border border-amber-900/50">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-100 text-xs sm:text-sm">{t('prop_warranty_title')}</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">{t('prop_warranty_desc')}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3.5">
            <div className="p-3 rounded-2xl bg-rose-950/60 text-rose-400 border border-rose-900/50">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-zinc-100 text-xs sm:text-sm">{t('prop_support_title')}</h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">{t('prop_support_desc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Social Contacts */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                MehnajMart <span className="text-indigo-400">BD</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              {lang === 'bn'
                ? 'বাংলাদেশের নির্ভরযোগ্য পোশাক, গ্যাজেট ও লাইফস্টাইল ই-কমার্স প্ল্যাটফর্ম। ক্যাশ অন ডেলিভারি এবং দ্রুততম কুরিয়ার সার্ভিসের নিশ্চয়তা।'
                : 'Bangladesh\'s trusted destination for genuine clothing, smart gadgets, kitchenware & lifestyle essentials with nationwide Cash on Delivery.'}
            </p>

            <div className="space-y-2.5 text-xs text-zinc-300 pt-1">
              {hasAddress && (
                <p className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{lang === 'bn' ? siteSettings.office_address_bn : siteSettings.office_address_en}</span>
                </p>
              )}

              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`tel:${siteSettings.hotline}`} className="hover:text-white transition font-mono font-medium">
                  {siteSettings.hotline}
                </a>
              </p>

              <p className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 text-emerald-400 transition font-mono font-semibold"
                >
                  WhatsApp: {whatsappNumber}
                </a>
              </p>

              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`mailto:${siteSettings.support_email}`} className="hover:text-white transition">
                  {siteSettings.support_email}
                </a>
              </p>
            </div>

            {/* Social Links: Facebook & WhatsApp */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href={fbUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-semibold transition"
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
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-semibold transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-200">
              {lang === 'bn' ? 'কুইক লিংক' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate({ view: 'shop' })}
                  className="hover:text-indigo-400 transition"
                >
                  {t('shop')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ view: 'order_track' })}
                  className="hover:text-indigo-400 transition text-amber-400"
                >
                  {t('track_order')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ view: 'about' })}
                  className="hover:text-indigo-400 transition"
                >
                  {t('about_us')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ view: 'contact' })}
                  className="hover:text-indigo-400 transition"
                >
                  {t('contact_us')}
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-200">
              {t('policies')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate({ view: 'policy', policyType: 'shipping' })}
                  className="hover:text-indigo-400 transition"
                >
                  {t('shipping_policy')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ view: 'policy', policyType: 'refund' })}
                  className="hover:text-indigo-400 transition"
                >
                  {t('refund_policy')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ view: 'policy', policyType: 'privacy' })}
                  className="hover:text-indigo-400 transition"
                >
                  {t('privacy_policy')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ view: 'policy', policyType: 'terms' })}
                  className="hover:text-indigo-400 transition"
                >
                  {t('terms_conditions')}
                </button>
              </li>
            </ul>
          </div>

          {/* Courier & COD Trust */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-200">
              {lang === 'bn' ? 'ডেলিভারি পার্টনার' : 'Delivery & Courier'}
            </h4>
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-bold text-xs text-zinc-200">Steadfast Courier</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Official API integrated doorstep delivery & instant live tracking support.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate({ view: 'admin', section: 'dashboard' })}
                className="inline-flex items-center space-x-1.5 text-xs text-zinc-500 hover:text-indigo-400 transition"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{t('admin_portal')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-zinc-900 py-6 px-4 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} {siteSettings.site_name}. {t('all_rights_reserved')}</p>
          <p className="flex items-center justify-center space-x-1 text-[11px]">
            <span>Crafted for high conversion Cash on Delivery commerce</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
