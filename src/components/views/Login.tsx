import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { t } from '../../lib/translations';
import { Hexagon, Droplets, Mail, Phone, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login({ currentLang, onLogin }: { currentLang: Language, onLogin: () => void }) {
  const [step, setStep] = useState(1);
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleResend = () => {
    setResendTimer(30);
    // In a real app, this would trigger the OTP send API
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && (phone.length > 5 || email.length > 5)) {
      setStep(2);
    } else if (step === 2 && otp.length >= 4) {
      onLogin();
    }
  };

  return (
    <div className="flex flex-col h-full bg-amber-50 justify-center items-center p-6 sm:rounded-[2.5rem]">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl shadow-amber-200/50 border border-amber-100"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-amber-100 p-4 rounded-full relative">
            <Hexagon size={48} className="text-amber-500" strokeWidth={1.5} />
            <Droplets size={24} className="text-amber-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {t(currentLang, 'appTitle')}
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          {t(currentLang, 'loginAuth')}
        </p>

        <form onSubmit={handleNext} className="space-y-4">
          {step === 1 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex bg-gray-50 rounded-xl p-1 mb-4 border border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setLoginMethod('phone')} 
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-sm font-medium transition-colors ${loginMethod === 'phone' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
                >
                  <Phone size={16} /> <span>{t(currentLang, 'loginWithPhone')}</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => setLoginMethod('email')} 
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-sm font-medium transition-colors ${loginMethod === 'email' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
                >
                  <Mail size={16} /> <span>{t(currentLang, 'loginWithEmail')}</span>
                </button>
              </div>

              {loginMethod === 'phone' ? (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5 ml-1">
                    {t(currentLang, 'phoneNumber')}
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+91"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    autoFocus
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5 ml-1">
                    {t(currentLang, 'emailAddress')}
                  </label>
                  <input 
                    type="email" 
                    placeholder="example@jenu.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    autoFocus
                  />
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3.5 rounded-xl shadow-md transition-colors mt-6"
              >
                {t(currentLang, 'getOTP')}
              </button>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-400">Or</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col space-y-3">
                  <button type="button" onClick={onLogin} className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    <span className="text-sm font-medium text-gray-700">{t(currentLang, 'continueWithGoogle')}</span>
                  </button>
                  <button type="button" onClick={onLogin} className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="w-5 h-5" />
                    <span className="text-sm font-medium text-gray-700">{t(currentLang, 'continueWithFacebook')}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <label className="block text-xs font-medium text-gray-700 mb-1.5 ml-1">
                {t(currentLang, 'enterOTP')}
              </label>
              <input 
                type="number" 
                placeholder="• • • •"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-2xl tracking-[1em] text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
              <button 
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3.5 rounded-xl shadow-md transition-colors mt-6"
              >
                {t(currentLang, 'verifyOTP')}
              </button>

              <div className="mt-4 text-center">
                {resendTimer > 0 ? (
                  <p className="text-xs text-gray-500">
                    {t(currentLang, 'resendOTPIn')} <span className="font-medium text-gray-800">{resendTimer}s</span>
                  </p>
                ) : (
                  <button 
                    type="button" 
                    onClick={handleResend}
                    className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center justify-center space-x-1 mx-auto"
                  >
                    <RefreshCw size={12} />
                    <span>{t(currentLang, 'resendOTP')}</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
