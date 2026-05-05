import React, { useState } from 'react';
import { AppState, Language } from '../../types';
import { t } from '../../lib/translations';
import { Calculator, TrendingUp, IndianRupee, Droplets, Leaf, Link } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  state: AppState;
  currentLang: Language;
}

export default function Dashboard({ state, currentLang }: DashboardProps) {
  const [calcQty, setCalcQty] = useState<string>('50');
  
  // Hardcoded current market prices for the prototype
  const RETAIL_PRICE = 600;
  const WHOLESALE_PRICE = 200;
  const FILTERING_COST = 50;
  
  const totalKg = state.harvests.reduce((sum, h) => sum + h.quantityKg, 0);

  const calculateProfit = () => {
    const qty = parseFloat(calcQty) || 0;
    const directSellRevenue = qty * WHOLESALE_PRICE;
    const collectiveSellRevenue = qty * RETAIL_PRICE;
    const processingCosts = qty * FILTERING_COST;
    
    // Profit = (Retail - Processing) - Wholesale
    const actualProfit = collectiveSellRevenue - processingCosts;
    const valueAdded = actualProfit - directSellRevenue;
    
    return { actualProfit, valueAdded };
  };

  const { actualProfit, valueAdded } = calculateProfit();

  return (
    <div className="space-y-6">
      {/* Total Collective Stock Card */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden"
      >
        <div className="absolute -right-4 -top-4 opacity-20">
          <Droplets size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-amber-100 text-sm font-medium mb-1">{t(currentLang, 'totalStock')}</p>
              <div className="flex items-end space-x-2">
                <h2 className="text-5xl font-bold">{totalKg}</h2>
                <span className="text-xl mb-1 opacity-80">Kg</span>
              </div>
            </div>
            <div className="bg-white/20 p-2 rounded-xl flex flex-col items-center">
              <Leaf size={20} className="text-green-300 mb-1" />
              <span className="text-xs font-bold text-white">98/100</span>
              <span className="text-[8px] uppercase tracking-wider text-green-100">{t(currentLang, 'sustainabilityScore')}</span>
            </div>
          </div>
          <p className="text-xs text-amber-200 mt-2">
            Combined strength of our collective
          </p>
        </div>
      </motion.div>

      {/* Profit Calculator */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
      >
        <div className="flex items-center space-x-2 mb-4 text-gray-800 border-b border-gray-100 pb-3">
          <Calculator className="text-amber-600" size={20} />
          <h3 className="font-semibold text-sm">{t(currentLang, 'profitCalc')}</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t(currentLang, 'enterKg')}</label>
            <input 
              type="number" 
              value={calcQty}
              onChange={(e) => setCalcQty(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
            <div>
              <p className="text-gray-500">{t(currentLang, 'wholesalePrice')}</p>
              <p className="font-semibold text-gray-800">₹{WHOLESALE_PRICE}</p>
            </div>
            <div>
              <p className="text-gray-500">{t(currentLang, 'retailPrice')}</p>
              <p className="font-semibold text-green-600">₹{RETAIL_PRICE}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500">{t(currentLang, 'filteringCost')}</p>
              <p className="font-semibold text-red-500">-₹{FILTERING_COST}</p>
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 mt-2">
            <p className="text-xs text-amber-800 mb-1 flex items-center">
              {t(currentLang, 'potentialEarnings')}
            </p>
            <div className="flex items-baseline space-x-1 text-amber-900">
              <IndianRupee size={18} />
              <span className="text-2xl font-bold">{actualProfit.toLocaleString()}</span>
            </div>
            
            <div className="mt-2 text-xs font-medium text-green-700 bg-green-100/50 inline-flex items-center px-2 py-1 rounded-lg">
              <TrendingUp size={12} className="mr-1" />
              +₹{valueAdded.toLocaleString()} {t(currentLang, 'addedValue')}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Harvests Summary */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-semibold text-gray-800 mb-3 ml-1 text-sm">{t(currentLang, 'recentHarvests')}</h3>
        <div className="space-y-3">
          {state.harvests.slice(0, 3).map((harvest) => (
            <div key={harvest.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 text-sm flex items-center">
                  {t(currentLang, harvest.floralSource.toLowerCase().replace(' ', '') as any) || harvest.floralSource}
                  <Link size={12} className="text-blue-500 ml-1.5" />
                </p>
                <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] uppercase font-mono">{harvest.batchId.split('-')[1]}</span>
                  <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 rounded">{t(currentLang, 'blockchainVerified')}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-amber-700">{harvest.quantityKg} Kg</p>
                <p className="text-[10px] text-gray-400 mt-1">{harvest.grade}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
