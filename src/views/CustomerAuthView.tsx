import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BANGLADESH_DISTRICTS } from '../utils/i18n';
import {
  Lock,
  Phone,
  User as UserIcon,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  AtSign
} from 'lucide-react';

interface CustomerAuthViewProps {
  initialMode?: 'login' | 'signup' | 'forgot';
}

export const CustomerAuthView: React.FC<CustomerAuthViewProps> = ({ initialMode = 'login' }) => {
  const { loginUser, signupUser, navigate, lang, t, siteSettings } = useApp();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);

  // Form states
  const [identifier, setIdentifier] = useState(''); // phone, username, or email
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign up fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [district, setDistrict] = useState('Dhaka');
  const [address, setAddress] = useState('');

  // Forgot password
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Error & Status
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!identifier.trim()) {
      setError(lang === 'bn' ? 'ইউজারনেম বা মোবাইল নম্বর লিখুন' : 'Please enter your username or phone number');
      return;
    }

    if (!password) {
      setError(lang === 'bn' ? 'পাসওয়ার্ড লিখুন' : 'Please enter your password');
      return;
    }

    const res = loginUser(identifier.trim(), password);
    if (res.success) {
      navigate({ view: 'profile' });
    } else {
      setError(res.message);
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!name.trim()) {
      setError(t('name_error'));
      return;
    }

    const cleanPhone = phone.trim().replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 11) {
      setError(t('phone_error'));
      return;
    }

    if (!signupPassword || signupPassword.length < 6) {
      setError(lang === 'bn' ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে' : 'Password must be at least 6 characters long');
      return;
    }

    if (signupPassword !== confirmPassword) {
      setError(lang === 'bn' ? 'পাসওয়ার্ড দুটি মেলেনি' : 'Passwords do not match');
      return;
    }

    const res = signupUser({
      name: name.trim(),
      phone: cleanPhone,
      username: username.trim() || undefined,
      email: email.trim() || undefined,
      password: signupPassword,
      district,
      address: address.trim(),
      area_type: district === 'Dhaka' ? 'dhaka' : 'outside_dhaka'
    });

    if (res.success) {
      navigate({ view: 'profile' });
    } else {
      setError(res.message);
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!forgotInput.trim()) {
      setError(lang === 'bn' ? 'মোবাইল নম্বর বা ইউজারনেম লিখুন' : 'Please enter your phone or username');
      return;
    }
    setForgotSent(true);
  };

  const fillDemo = (demoUser: string, demoPass: string) => {
    setMode('login');
    setIdentifier(demoUser);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 sm:py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
          {mode === 'forgot' ? <KeyRound className="w-6 h-6" /> : <UserIcon className="w-6 h-6" />}
        </div>
        <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
          {mode === 'login' && (lang === 'bn' ? 'গ্রাহক অ্যাকাউন্টে লগইন' : 'Customer Account Login')}
          {mode === 'signup' && (lang === 'bn' ? 'নতুন গ্রাহক নিবন্ধন' : 'Create Customer Account')}
          {mode === 'forgot' && (lang === 'bn' ? 'পাসওয়ার্ড পুনরুদ্ধার' : 'Reset Password')}
        </h1>
        <p className="text-xs text-zinc-500">
          {lang === 'bn' ? 'ইউজারনেম/ফোন নম্বর ও পাসওয়ার্ড দিয়ে সুরক্ষিত অ্যাকাউন্ট সুবিধা' : 'Secure account with Username/Phone & Password'}
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        {/* Notice for Guest Shoppers */}
        <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between">
          <span className="font-medium">
            {lang === 'bn' ? '💡 অর্ডার করতে অ্যাকাউন্টের বাধ্যবাধকতা নেই' : '💡 Guest checkout available for COD orders'}
          </span>
          <button
            type="button"
            onClick={() => navigate({ view: 'shop' })}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0 ml-2 cursor-pointer"
          >
            {lang === 'bn' ? 'শপে যান →' : 'Shop Now →'}
          </button>
        </div>

        {/* Mode Toggle Buttons */}
        {mode !== 'forgot' && (
          <div className="grid grid-cols-2 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
              className={`py-2 rounded-lg transition cursor-pointer ${
                mode === 'login' ? 'bg-white dark:bg-zinc-900 text-indigo-600 shadow-xs' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {lang === 'bn' ? 'লগইন' : 'Log In'}
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); setSuccessMsg(''); }}
              className={`py-2 rounded-lg transition cursor-pointer ${
                mode === 'signup' ? 'bg-white dark:bg-zinc-900 text-indigo-600 shadow-xs' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {lang === 'bn' ? 'রেজিস্টার' : 'Sign Up'}
            </button>
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span>{lang === 'bn' ? 'মোবাইল নম্বর / ইউজারনেম / ইমেইল' : 'Phone Number / Username / Email'}</span>
                <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="017XXXXXXXX or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'} <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setError(''); }}
                  className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  {lang === 'bn' ? 'পাসওয়ার্ড ভুলে গেছেন?' : 'Forgot Password?'}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-600 dark:text-rose-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              <span>{lang === 'bn' ? 'লগইন করুন' : 'Log In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* SIGN UP FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {t('full_name')} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder={t('name_placeholder')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {t('phone_number')} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    placeholder="017XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                  <span>{lang === 'bn' ? 'ইউজারনেম (ঐচ্ছিক)' : 'Username (Optional)'}</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <AtSign className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. mahmud99"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {lang === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email Address (Optional)'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    placeholder="Min 6 chars"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                  >
                    {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {lang === 'bn' ? 'পাসওয়ার্ড নিশ্চিতকরণ' : 'Confirm Password'} <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showSignupPassword ? 'text' : 'password'}
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {t('district')}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
              >
                {BANGLADESH_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {t('full_address')}
              </label>
              <input
                type="text"
                placeholder={t('address_placeholder')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-600 dark:text-rose-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              <span>{lang === 'bn' ? 'অ্যাকাউন্ট তৈরি করুন' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <div className="space-y-4">
            {!forgotSent ? (
              <form onSubmit={handleForgot} className="space-y-4">
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {lang === 'bn'
                    ? 'আপনার নিবন্ধিত মোবাইল নম্বর বা ইউজারনেম দিন। আমাদের কাস্টমার সাপোর্ট আপনাকে ভেরিফিকেশন সহায়তা প্রদান করবে।'
                    : 'Enter your registered phone number or username to receive password reset assistance.'}
                </p>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {lang === 'bn' ? 'মোবাইল নম্বর বা ইউজারনেম' : 'Phone or Username'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="017XXXXXXXX or username"
                    value={forgotInput}
                    onChange={(e) => setForgotInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-600 dark:text-rose-400">
                    {error}
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setError(''); }}
                    className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
                  >
                    {lang === 'bn' ? 'ফিরে যান' : 'Back'}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    {lang === 'bn' ? 'সহায়তা পাঠান' : 'Request Assistance'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lang === 'bn' ? 'অনুরোধ গৃহীত হয়েছে' : 'Support Request Received'}</span>
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
                  {lang === 'bn'
                    ? `আপনার অ্যাকাউন্ট (${forgotInput}) ভেরিফিকেশনের জন্য সরাসরি আমাদের হেল্পলাইনে কল করুন অথবা হোয়াটসঅ্যাপে মেসেজ দিন:`
                    : `For quick reset of account (${forgotInput}), connect directly with our support team:`}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <a
                    href={`https://wa.me/88${siteSettings.whatsapp_number || '01577686999'}?text=Hello%20MehnajMart,%20I%20need%20password%20reset%20assistance%20for%20my%20account:%20${encodeURIComponent(forgotInput)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Support</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => { setMode('login'); setForgotSent(false); }}
                    className="px-3 py-2 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-semibold hover:bg-zinc-50 border border-zinc-200 dark:border-zinc-800 transition cursor-pointer"
                  >
                    {lang === 'bn' ? 'লগইনে ফিরে যান' : 'Back to Login'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Demo Customer Accounts Helper */}
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-2.5">
          <div className="flex items-center justify-between font-bold text-zinc-800 dark:text-zinc-200">
            <span className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>{lang === 'bn' ? 'টেস্ট গ্রাহক অ্যাকাউন্টসমূহ' : 'Test Customer Accounts:'}</span>
            </span>
            <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded font-mono">
              1-Click Auto Fill
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemo('01712345678', 'Customer#2026')}
              className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-left hover:border-indigo-500 transition cursor-pointer space-y-0.5"
            >
              <p className="font-bold text-zinc-900 dark:text-white">Mahmudul Hasan</p>
              <p className="font-mono text-[10px] text-zinc-500">Phone: 01712345678</p>
              <p className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">Pass: Customer#2026</p>
            </button>

            <button
              type="button"
              onClick={() => fillDemo('01819876543', 'Customer#2026')}
              className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-left hover:border-indigo-500 transition cursor-pointer space-y-0.5"
            >
              <p className="font-bold text-zinc-900 dark:text-white">Sadia Rahman</p>
              <p className="font-mono text-[10px] text-zinc-500">Phone: 01819876543</p>
              <p className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">Pass: Customer#2026</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
