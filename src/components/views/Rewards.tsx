import React from 'react';
import { AppState, Language } from '../../types';
import { t } from '../../lib/translations';
import { Gift, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Rewards({ state, currentLang }: { state: AppState, currentLang: Language }) {
  const totalKg = state.harvests.reduce((sum, h) => sum + h.quantityKg, 0);
  const points = totalKg * 10;
  const nextTier = 500;
  const progress = Math.min((points / nextTier) * 100, 100);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-20">
          <Gift size={100} />
        </div>
        <div className="relative z-10">
          <p className="text-purple-100 text-sm font-medium mb-1">{t(currentLang, 'myPoints')}</p>
          <div className="flex items-end space-x-2">
            <h2 className="text-5xl font-bold">{points}</h2>
            <span className="text-xl mb-1 opacity-80">pts</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <Star className="text-yellow-500" size={20} />
          <h3 className="font-semibold text-gray-800 text-sm">Silver Harvester</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>{points} pts</span>
            <span>{nextTier} pts (Gold)</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full"
            />
          </div>
          <p className="text-[10px] text-gray-400">Earn 10 points per Kg of honey submitted.</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 text-sm ml-1">{t(currentLang, 'redeem')}</h3>
        
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-50 p-2 rounded-xl text-purple-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-medium text-sm text-gray-800">Protective Suit</p>
              <p className="text-xs text-gray-500">1,000 pts</p>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-gray-100 text-gray-400 rounded-lg text-xs font-semibold cursor-not-allowed">
            Lock
          </button>
        </div>
      </div>
    </motion.div>
  );
}
