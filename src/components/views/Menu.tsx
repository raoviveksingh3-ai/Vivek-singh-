import React from 'react';
import { ActiveTab, Language } from '../../types';
import { t } from '../../lib/translations';
import { Truck, Gift, Users, Phone, LogOut, BookOpen, ChevronRight, MessageSquare, User, Package, TrendingUp, Settings as SettingsIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface MenuProps {
  currentLang: Language;
  onNavigate: (tab: ActiveTab) => void;
  onLogout: () => void;
}

export default function Menu({ currentLang, onNavigate, onLogout }: MenuProps) {
  const menuItems = [
    { id: 'profile', icon: <User size={20} className="text-amber-600" />, label: t(currentLang, 'account') },
    { id: 'buyerChat', icon: <MessageSquare size={20} className="text-pink-500" />, label: t(currentLang, 'buyerChat') },
    { id: 'batchTracker', icon: <Package size={20} className="text-teal-500" />, label: t(currentLang, 'batchTracker') },
    { id: 'priceMonitoring', icon: <TrendingUp size={20} className="text-indigo-500" />, label: t(currentLang, 'priceMonitoring') },
    { id: 'delivery', icon: <Truck size={20} className="text-blue-500" />, label: t(currentLang, 'deliveryPayment') },
    { id: 'rewards', icon: <Gift size={20} className="text-purple-500" />, label: t(currentLang, 'rewards') },
    { id: 'teams', icon: <Users size={20} className="text-green-500" />, label: t(currentLang, 'teams') },
    { id: 'learn', icon: <BookOpen size={20} className="text-amber-600" />, label: t(currentLang, 'library') },
    { id: 'contact', icon: <Phone size={20} className="text-teal-500" />, label: t(currentLang, 'contact') },
    { id: 'settings', icon: <SettingsIcon size={20} className="text-gray-500" />, label: t(currentLang, 'settings') || 'Settings' },
  ] as const;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 ml-2 mb-4">{t(currentLang, 'menuTab')}</h2>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
        {menuItems.map((item, idx) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onNavigate(item.id as ActiveTab)}
            className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors active:bg-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                {item.icon}
              </div>
              <span className="font-medium text-gray-700 text-sm">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={onLogout}
        className="w-full mt-6 flex items-center justify-center space-x-2 p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-100 transition-colors border border-red-100"
      >
        <LogOut size={18} />
        <span className="font-medium text-sm">{t(currentLang, 'logout')}</span>
      </motion.button>
    </div>
  );
}
