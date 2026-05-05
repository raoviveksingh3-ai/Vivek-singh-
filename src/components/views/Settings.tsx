import React, { useState } from 'react';
import { Language } from '../../types';
import { t } from '../../lib/translations';
import { APP_LANGUAGES } from '../../constants';
import { Settings as SettingsIcon, Bell, Globe, MonitorSmartphone, Shield, ChevronRight, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings({ currentLang, onLanguageChange }: { currentLang: Language, onLanguageChange: (lang: Language) => void }) {
  const [settings, setSettings] = useState({
    notifications: 'Push + SMS',
    units: 'Metric (kg)',
    theme: 'System Default'
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between ml-1">
        <div className="flex items-center space-x-2 text-gray-800">
          <SettingsIcon className="text-gray-600" size={24} />
          <h2 className="font-semibold text-lg">{t(currentLang, 'settings') || 'Settings'}</h2>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col space-y-6">
        
        {/* App Preferences */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">App Preferences</p>
          <div className="space-y-3">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center"><Globe size={16} className="mr-2 text-amber-600" /> Language</label>
              <select 
                value={currentLang} 
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {APP_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center"><Bell size={16} className="mr-2 text-amber-600" /> Notifications</label>
              <select 
                value={settings.notifications} 
                onChange={(e) => setSettings({...settings, notifications: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Push Only">Push Only</option>
                <option value="Push + SMS">Push + SMS</option>
                <option value="Email Only">Email Only</option>
                <option value="None">None</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center"><MonitorSmartphone size={16} className="mr-2 text-amber-600" /> Units</label>
              <select 
                value={settings.units} 
                onChange={(e) => setSettings({...settings, units: e.target.value})}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Metric (kg)">Metric (kg)</option>
                <option value="Imperial (lbs)">Imperial (lbs)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security / Account Details */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Account & Security</p>
          <div className="space-y-2">
            <button className="w-full bg-gray-50 p-3 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-colors">
              <div className="flex items-center text-sm font-medium text-gray-700"><Shield size={16} className="mr-2 text-green-500" /> Account Status</div>
              <div className="flex items-center"><span className="text-xs font-semibold text-green-600 mr-2">Verified</span><ChevronRight size={16} className="text-gray-400" /></div>
            </button>
            <button className="w-full bg-gray-50 p-3 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-colors">
              <div className="flex items-center text-sm font-medium text-gray-700">Change Password</div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
            <button className="w-full bg-gray-50 p-3 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-colors">
              <div className="flex items-center text-sm font-medium text-gray-700">Privacy Policy</div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* About App */}
        <div className="pt-4 border-t border-gray-100 flex flex-col items-center justify-center text-gray-400 space-y-1">
          <Info size={20} className="mb-1" />
          <h3 className="font-semibold text-gray-800 text-sm">Jenu-Gumpu</h3>
          <p className="text-xs">Version: v1.0.2</p>
        </div>

      </div>
    </motion.div>
  );
}
