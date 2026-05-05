import React from 'react';
import { Language } from '../../types';
import { t } from '../../lib/translations';
import { Users, Droplets } from 'lucide-react';
import { motion } from 'motion/react';

export default function Teams({ currentLang }: { currentLang: Language }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between ml-1 text-gray-800">
        <div className="flex items-center space-x-2">
          <Users className="text-green-600" size={24} />
          <h2 className="font-semibold text-lg">{t(currentLang, 'members')}</h2>
        </div>
        <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full font-bold">12 Active</span>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-3xl p-5 relative overflow-hidden">
        <p className="text-xs font-medium text-green-800 mb-2">Our Collective Strength</p>
        <div className="flex items-end space-x-1">
          <span className="text-3xl font-bold text-green-900">420</span>
          <span className="text-sm font-medium text-green-700 pb-1">Kg this month</span>
        </div>
        <Droplets className="absolute -right-4 -bottom-4 text-green-200/50" size={80} />
      </div>

      <div className="space-y-3">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold">
              R
            </div>
            <div>
              <p className="font-medium text-sm text-gray-800">{t(currentLang, 'teamMember1')}</p>
              <p className="text-xs text-gray-500">Coorg Forest Edge</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 flex items-center justify-between border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
              S
            </div>
            <div>
              <p className="font-medium text-sm text-gray-800">{t(currentLang, 'teamMember2')}</p>
              <p className="text-xs text-gray-500">Western Ghats Deep</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
