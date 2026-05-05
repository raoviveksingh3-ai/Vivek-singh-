import React from 'react';
import { Language } from '../../types';
import { t } from '../../lib/translations';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact({ currentLang }: { currentLang: Language }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
          <Phone size={32} />
        </div>
        <h2 className="font-bold text-xl text-gray-800 mb-1">{t(currentLang, 'callSupport')}</h2>
        <p className="text-sm text-gray-500">We are here to help our honey collective.</p>
      </div>

      <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 space-y-2">
        <a href="tel:+918000000000" className="flex items-center p-4 rounded-2xl hover:bg-gray-50 transition-colors">
          <div className="bg-teal-50 p-3 rounded-xl mr-4 text-teal-600">
            <Phone size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Toll Free Support</p>
            <p className="font-semibold text-gray-900">+91 1800-425-0000</p>
          </div>
        </a>
        
        <div className="flex items-center p-4 rounded-2xl border-t border-gray-50">
          <div className="bg-amber-50 p-3 rounded-xl mr-4 text-amber-600">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Head Office</p>
            <p className="font-medium text-sm text-gray-800">Jenu-Gumpu Collective HQ, Madikeri, Karnataka.</p>
          </div>
        </div>
      </div>
      
    </motion.div>
  );
}
