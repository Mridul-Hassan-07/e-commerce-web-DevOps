import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Truck, RotateCcw, FileText, Lock, CheckCircle2 } from 'lucide-react';

interface PolicyPageViewProps {
  policyType: 'shipping' | 'refund' | 'privacy' | 'terms';
}

export const PolicyPageView: React.FC<PolicyPageViewProps> = ({ policyType }) => {
  const { lang, t, siteSettings, shippingSettings } = useApp();

  const getPolicyContent = () => {
    switch (policyType) {
      case 'shipping':
        return {
          icon: <Truck className="w-8 h-8 text-indigo-600" />,
          title: t('shipping_policy'),
          sections: [
            {
              heading: lang === 'bn' ? 'ডেলিভারি এলাকা ও সময়সীমা' : 'Delivery Coverage & Timeline',
              content: lang === 'bn'
                ? 'আমরা Steadfast কুরিয়ার সার্ভিসের মাধ্যমে সমগ্র বাংলাদেশে (৬৪টি জেলা ও প্রত্যন্ত থানা অঞ্চল) হোম ডেলিভারি সেবা প্রদান করি। ঢাকা শহরের ভেতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ৪৮ থেকে ৭২ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়।'
                : 'We provide nationwide doorstep delivery across all 64 districts and upazilas of Bangladesh via Steadfast Courier Express. Inside Dhaka delivery timeframe is 24 to 48 hours, and outside Dhaka is 48 to 72 hours.'
            },
            {
              heading: lang === 'bn' ? 'ডেলিভারি চার্জের নিয়ম' : 'Shipping Charges (COD)',
              content: lang === 'bn'
                ? `ঢাকা মেট্রো সিটিতে ডেলিভারি চার্জ ৳${shippingSettings.dhaka_fee} এবং ঢাকার বাইরে সমগ্র বাংলাদেশে ৳${shippingSettings.outside_dhaka_fee}। সকল পণ্য ক্যাশ অন ডেলিভারি এবং স্টেডফাস্ট কুরিয়ারের মাধ্যমে সুরক্ষিতভাবে গ্রাহকের ঠিকানায় পৌঁছে দেওয়া হয়।`
                : `Flat shipping charge is ৳${shippingSettings.dhaka_fee} for Inside Dhaka and ৳${shippingSettings.outside_dhaka_fee} for Outside Dhaka. All parcels are dispatched securely with verified doorstep Cash on Delivery via Steadfast Courier.`
            },
            {
              heading: lang === 'bn' ? 'ক্যাশ অন ডেলিভারি (COD) যাচাই' : 'Cash on Delivery Verification',
              content: lang === 'bn'
                ? 'কোনো প্রকার অগ্রিম পেমেন্ট ছাড়াই অর্ডার নিশ্চিত করা হয়। ডেলিভারি রাইডার আপনার ঠিকানায় পৌঁছানোর পর পণ্য ও প্যাকেজিং চেক করে নগদ টাকা বুঝিয়ে দিন।'
                : 'Zero advance payment required. You pay 100% Cash on Delivery directly to the Steadfast courier agent after verifying the sealed product box.'
            }
          ]
        };

      case 'refund':
        return {
          icon: <RotateCcw className="w-8 h-8 text-emerald-600" />,
          title: t('refund_policy'),
          sections: [
            {
              heading: lang === 'bn' ? '৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি' : '7 Days Replacement Guarantee',
              content: lang === 'bn'
                ? 'পণ্য গ্রহণের ৭ দিনের মধ্যে কোনো টেকনিক্যাল ত্রুটি বা প্যাকেজিং সমস্যা পরিলক্ষিত হলে বিনামূল্যে সম্পূর্ণ নতুন পণ্য রিপ্লেসমেন্ট প্রদান করা হবে।'
                : 'If you receive any physically damaged, defective, or incorrect variant, you are eligible for an immediate 1-to-1 replacement within 7 calendar days from delivery.'
            },
            {
              heading: lang === 'bn' ? 'রিটার্ন করার শর্তাবলী' : 'Conditions for Return',
              content: lang === 'bn'
                ? 'পণ্যটি মূল বক্স, ইউজার ম্যানুয়াল, ক্যাবল ও আনুষঙ্গিক এক্সেসরিজ সহ অক্ষত অবস্থায় থাকতে হবে।'
                : 'The product must be returned with all original retail packaging, barcode tags, charging cables, and warranty cards in unbroken condition.'
            },
            {
              heading: lang === 'bn' ? 'রিফান্ড প্রসেসিং' : 'Refund Processing',
              content: lang === 'bn'
                ? 'পণ্য আমাদের ওয়্যারহাউসে ফেরত আসার ৪৮ ঘণ্টার মধ্যে বিকাশ/নগদ বা ব্যাংক ট্রান্সফারের মাধ্যমে রিফান্ড সম্পন্ন করা হয়।'
                : 'Once the returned item passes our quality inspection at the warehouse, your refund will be disbursed via bKash, Nagad, or direct bank transfer within 48 business hours.'
            }
          ]
        };

      case 'privacy':
        return {
          icon: <Lock className="w-8 h-8 text-violet-600" />,
          title: t('privacy_policy'),
          sections: [
            {
              heading: lang === 'bn' ? 'ব্যক্তিগত তথ্যের সুরক্ষা' : 'Data Privacy & Security',
              content: lang === 'bn'
                ? 'আপনার নাম, ফোন নম্বর ও ডেলিভারি ঠিকানা শুধুমাত্র পার্সেল পাঠানো ও অর্ডার কনফার্মেশনের জন্য সংরক্ষিত রাখা হয়। আমরা কোনো তৃতীয় পক্ষের সাথে গ্রাহকের তথ্য শেয়ার করি না।'
                : 'Your personal phone number, shipping address, and order logs are strictly used to fulfill courier deliveries and customer support. We never sell or lease customer information to third-party ad networks.'
            },
            {
              heading: lang === 'bn' ? 'কুকি ও অ্যানালিটিক্স' : 'Analytics & DataLayer',
              content: lang === 'bn'
                ? 'আমরা ব্রাউজিং অভিজ্ঞতা উন্নত করার জন্য গুগল ট্যাগ ম্যানেজার ও স্ট্যান্ডার্ড কুকি ব্যবহার করি।'
                : 'We utilize standard Google Tag Manager and client cookies solely to optimize checkout performance, page load times, and personalized product recommendations.'
            }
          ]
        };

      case 'terms':
      default:
        return {
          icon: <FileText className="w-8 h-8 text-amber-600" />,
          title: t('terms_conditions'),
          sections: [
            {
              heading: lang === 'bn' ? 'অর্ডার গ্রহণ ও বাতিলকরণ' : 'Order Placement & Cancellation',
              content: lang === 'bn'
                ? 'অর্ডার সাবমিট করার পর আমাদের সাপোর্ট টিম থেকে কনফার্মেশন কল দেওয়া হতে পারে। পার্সেল কুরিয়ারে হস্তান্তরের পূর্ব পর্যন্ত আপনি যেকোনো সময় অর্ডার বাতিল করতে পারবেন।'
                : 'ApexMart BD reserves the right to confirm orders via phone verification prior to dispatch. Customers may cancel any order before consignment dispatch to Steadfast.'
            },
            {
              heading: lang === 'bn' ? 'মূল্য ও স্টক পলিসি' : 'Pricing & Stock Availability',
              content: lang === 'bn'
                ? 'সব পণ্যের মূল্য বাংলাদেশি টাকায় (BDT) নির্ধারিত। যেকোনো সময় নোটিশ ছাড়া মূল্য বা অফার পরিবর্তনের অধিকার সংরক্ষিত।'
                : 'All product prices are quoted in Bangladeshi Taka (BDT). Prices, promotional discounts, and inventory counts are subject to change based on market fluctuations.'
            }
          ]
        };
    }
  };

  const data = getPolicyContent();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <div className="flex items-center space-x-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 shrink-0">
          {data.icon}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            {data.title}
          </h1>
          <p className="text-xs text-zinc-500">
            {siteSettings.site_name} Official Commerce Policies
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {data.sections.map((sec, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-xs"
          >
            <h3 className="font-bold text-base text-zinc-900 dark:text-white flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>{sec.heading}</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6">
              {sec.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
