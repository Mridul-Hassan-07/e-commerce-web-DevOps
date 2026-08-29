import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BANGLADESH_DISTRICTS } from '../utils/i18n';
import {
  User as UserIcon,
  Phone,
  MapPin,
  Package,
  LogOut,
  Save,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  AtSign,
  Mail,
  AlertCircle
} from 'lucide-react';

export const CustomerProfileView: React.FC = () => {
  const { currentUser, updateUserProfile, changeUserPassword, logoutUser, navigate, orders, lang, t } = useApp();

  if (!currentUser) {
    navigate({ view: 'auth', mode: 'login' });
    return null;
  }

  // Profile fields
  const [name, setName] = useState(currentUser.name);
  const [username, setUsername] = useState(currentUser.username || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [district, setDistrict] = useState(currentUser.district || 'Dhaka');
  const [upazila, setUpazila] = useState(currentUser.upazila || '');
  const [address, setAddress] = useState(currentUser.address || '');
  const [saved, setSaved] = useState(false);

  // Change Password fields
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  const myOrders = orders.filter(
    o => o.phone.replace(/[^0-9]/g, '') === currentUser.phone.replace(/[^0-9]/g, '')
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim(),
      username: username.trim() || undefined,
      email: email.trim() || undefined,
      district,
      upazila: upazila.trim(),
      address: address.trim(),
      area_type: district === 'Dhaka' ? 'dhaka' : 'outside_dhaka'
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');

    if (newPass.length < 6) {
      setPassError(lang === 'bn' ? 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে' : 'New password must be at least 6 characters long');
      return;
    }

    if (newPass !== confirmPass) {
      setPassError(lang === 'bn' ? 'নতুন পাসওয়ার্ড দুটি মেলেনি' : 'New passwords do not match');
      return;
    }

    const res = changeUserPassword(currentPass, newPass);
    if (res.success) {
      setPassSuccess(lang === 'bn' ? 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!' : 'Password updated successfully!');
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      setTimeout(() => setPassSuccess(''), 3000);
    } else {
      setPassError(res.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Profile Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center space-x-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center font-black text-2xl uppercase">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black">{currentUser.name}</h1>
            <div className="flex flex-wrap items-center gap-2 text-xs text-indigo-100 mt-1">
              <span className="font-mono bg-white/10 px-2 py-0.5 rounded-md">📞 {currentUser.phone}</span>
              {currentUser.username && (
                <span className="font-mono bg-white/10 px-2 py-0.5 rounded-md">@{currentUser.username}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate({ view: 'my_orders' })}
            className="px-4 py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow cursor-pointer"
          >
            <Package className="w-4 h-4" />
            <span>{t('my_orders')} ({myOrders.length})</span>
          </button>

          <button
            onClick={logoutUser}
            className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur transition flex items-center space-x-1 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('logout')}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column: Delivery Address & Personal Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-xs">
            <h2 className="font-extrabold text-base text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center justify-between">
              <span>{lang === 'bn' ? 'অ্যাকাউন্ট ও ডেলিভারি তথ্য' : 'Account & Delivery Details'}</span>
              <span className="text-xs font-normal text-zinc-500">
                {lang === 'bn' ? 'চেকআউটের সময় স্বয়ংক্রিয়ভাবে পূরণ হবে' : 'Autofilled during checkout'}
              </span>
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {t('full_name')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {lang === 'bn' ? 'ইউজারনেম' : 'Username'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                      <AtSign className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. sumon99"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {t('phone_number')} (Fixed ID)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={currentUser.phone}
                      disabled
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-sm bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 font-mono border border-zinc-200 dark:border-zinc-700 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {lang === 'bn' ? 'ইমেইল' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="youremail@example.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {t('district')}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                  >
                    {BANGLADESH_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {t('upazila')}
                  </label>
                  <input
                    type="text"
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    placeholder="e.g. Mirpur / Sadar"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {t('full_address')}
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House, Road, Area..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 transition shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'পরিবর্তন সংরক্ষণ করুন' : 'Save Changes'}</span>
                </button>

                {saved && (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Saved successfully!</span>
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Change Password Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-xs">
            <h2 className="font-extrabold text-base text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center space-x-2">
              <Lock className="w-4 h-4 text-indigo-600" />
              <span>{lang === 'bn' ? 'পাসওয়ার্ড পরিবর্তন' : 'Change Password'}</span>
            </h2>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {lang === 'bn' ? 'বর্তমান পাসওয়ার্ড' : 'Current Password'}
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {lang === 'bn' ? 'নতুন পাসওয়ার্ড' : 'New Password'}
                  </label>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Min 6 chars"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {lang === 'bn' ? 'নতুন পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm New Password'}
                  </label>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {passError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-600 dark:text-rose-400 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passError}</span>
                </div>
              )}

              {passSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-600 dark:text-emerald-400 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{passSuccess}</span>
                </div>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 bg-zinc-900 hover:bg-black dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
              >
                {lang === 'bn' ? 'পাসওয়ার্ড আপডেট করুন' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar Column: Order Quick Stats & Account Security info */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center space-x-2">
              <Package className="w-4 h-4 text-indigo-600" />
              <span>{lang === 'bn' ? 'অর্ডার পরিসংখ্যান' : 'Order Statistics'}</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Total Orders:</span>
                <span className="font-bold text-zinc-900 dark:text-white font-mono">{myOrders.length}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500">Delivered:</span>
                <span className="font-bold text-emerald-600 font-mono">
                  {myOrders.filter(o => o.order_status === 'delivered').length}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-500">Active Parcels:</span>
                <span className="font-bold text-amber-500 font-mono">
                  {myOrders.filter(o => o.order_status !== 'delivered' && o.order_status !== 'cancelled').length}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-3 text-xs text-indigo-900 dark:text-indigo-200">
            <div className="flex items-center space-x-2 font-bold text-indigo-950 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>{lang === 'bn' ? 'নিরাপত্তা বার্তা' : 'Account Security'}</span>
            </div>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400 text-[11px]">
              {lang === 'bn'
                ? 'আপনার অ্যাকাউন্ট পাসওয়ার্ড সুরক্ষিত রাখুন। প্রয়োজনে সরাসরি আমাদের হেল্পলাইনে যোগাযোগ করুন।'
                : 'Keep your login credentials secure. You can log in using either your mobile number or chosen username.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
