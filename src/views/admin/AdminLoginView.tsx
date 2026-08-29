import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Lock,
  User,
  ArrowLeft,
  KeyRound,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export const AdminLoginView: React.FC = () => {
  const { loginAdmin, navigate, lang } = useApp();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError(lang === 'bn' ? 'ইউজারনেম বা ইমেইল লিখুন' : 'Please enter your username or email');
      return;
    }
    if (!password.trim()) {
      setError(lang === 'bn' ? 'পাসওয়ার্ড লিখুন' : 'Please enter your password');
      return;
    }

    setIsSubmitting(true);

    try {
      const success = loginAdmin(identifier.trim(), password.trim());
      if (!success) {
        setError(
          lang === 'bn'
            ? 'ভুল ইউজারনেম/ইমেইল অথবা পাসওয়ার্ড। অনুগ্রহ করে সঠিক তথ্য প্রদান করুন।'
            : 'Invalid credentials. Please verify your admin username and password.'
        );
      }
    } catch (err) {
      setError('An error occurred during authentication.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
            {lang === 'bn' ? 'মেহনাজমার্ট অ্যাডমিন প্যানেল' : 'MehnajMart Admin Portal'}
          </h1>
          <p className="text-xs text-zinc-500">
            {lang === 'bn' ? 'অপারেশন ও কন্ট্রোল প্যানেলে প্রবেশ করতে সঠিক তথ্য দিন' : 'Restricted area. Please sign in with authorized admin credentials.'}
          </p>
        </div>

        {/* Login Form Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800 text-xs">
            <span className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center space-x-1.5">
              <Lock className="w-4 h-4 text-indigo-600" />
              <span>Admin Authentication Required</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-[10px] font-bold">
              Protected
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username / Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span>{lang === 'bn' ? 'ইউজারনেম বা ইমেইল' : 'Username or Email'}</span>
              </label>
              <div className="relative">
                <input
                  id="admin-login-identifier"
                  type="text"
                  placeholder={lang === 'bn' ? 'ইউজারনেম বা ইমেইল' : 'Enter username or email'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                />
                <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {lang === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <div className="relative">
                <input
                  id="admin-login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none font-mono"
                />
                <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 flex items-start space-x-2 text-xs text-rose-700 dark:text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="admin-login-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/30 flex items-center justify-center space-x-2 transition cursor-pointer disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'Authenticating...' : (lang === 'bn' ? 'লগইন করুন' : 'Sign In to Admin Portal')}</span>
            </button>
          </form>
        </div>

        {/* Back to Storefront */}
        <div className="text-center">
          <button
            onClick={() => navigate({ view: 'home' })}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-zinc-500 hover:text-indigo-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'স্টোরফ্রন্টে ফিরে যান' : 'Back to Storefront'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
