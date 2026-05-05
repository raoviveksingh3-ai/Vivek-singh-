import React, { useState } from 'react';
import { Language } from '../../types';
import { t } from '../../lib/translations';
import { Truck, CreditCard, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function DeliveryPayment({ currentLang }: { currentLang: Language }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [payMethod, setPayMethod] = useState<'upi' | 'bank'>('upi');

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 mt-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-green-100 p-4 rounded-full text-green-600 mb-4">
          <CheckCircle2 size={48} />
        </motion.div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Order Confirmed</h3>
        <p className="text-sm text-gray-500">Your honey pickup has been scheduled and your payment method is saved.</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center space-x-2 text-gray-800 ml-1">
        <Truck className="text-blue-500" size={24} />
        <h2 className="font-semibold text-lg">{t(currentLang, 'schedulePickup')}</h2>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5 ml-1">Date for Pickup</label>
          <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5 ml-1">Quantity (Kg)</label>
          <input type="number" placeholder="0" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="flex items-center space-x-2 text-gray-800 ml-1 pt-2">
        <CreditCard className="text-indigo-500" size={24} />
        <h2 className="font-semibold text-lg">{t(currentLang, 'paymentMethod')}</h2>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
        <div className="flex space-x-2 bg-gray-50 p-1 rounded-xl">
          <button 
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${payMethod === 'upi' ? 'bg-white shadow border border-gray-200 text-gray-800' : 'text-gray-500'}`}
            onClick={() => setPayMethod('upi')}
          >
            UPI
          </button>
          <button 
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-colors ${payMethod === 'bank' ? 'bg-white shadow border border-gray-200 text-gray-800' : 'text-gray-500'}`}
            onClick={() => setPayMethod('bank')}
          >
            Bank Transfer
          </button>
        </div>

        {payMethod === 'upi' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label className="block text-xs font-medium text-gray-700 mb-1.5 ml-1">{t(currentLang, 'upiDetails')}</label>
            <input type="text" placeholder="example@upi" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label className="block text-xs font-medium text-gray-700 mb-1.5 ml-1">{t(currentLang, 'bankDetails')}</label>
            <input type="text" placeholder="Account Number" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3" />
            <input type="text" placeholder="IFSC Code" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </motion.div>
        )}
      </div>

      <button 
        onClick={() => setIsSubmitted(true)}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm py-3.5 rounded-xl shadow-md transition-colors mt-4"
      >
        {t(currentLang, 'confirmOrder')}
      </button>

    </motion.div>
  );
}
