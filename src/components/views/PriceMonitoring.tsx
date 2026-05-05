import React from 'react';
import { Language } from '../../types';
import { t } from '../../lib/translations';
import { TrendingUp, ArrowUpRight, ArrowDownRight, IndianRupee, BarChart3, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function PriceMonitoring({ currentLang }: { currentLang: Language }) {
  const currentPrices = [
    { grade: 'Grade A', price: 450, trend: '+5%', up: true, diff: 20 },
    { grade: 'Grade B', price: 320, trend: '+2%', up: true, diff: 5 },
    { grade: 'Grade C', price: 180, trend: '-1%', up: false, diff: -2 },
  ];

  const chartHeights = [40, 60, 45, 70, 85, 75, 100]; // Mock chart data proportional heights
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between ml-1">
        <div className="flex items-center space-x-2 text-gray-800">
          <TrendingUp className="text-indigo-600" size={24} />
          <h2 className="font-semibold text-lg">{t(currentLang, 'priceMonitoring') || 'Price Monitoring'}</h2>
        </div>
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2 py-1 rounded tracking-wide uppercase">Live Update</span>
      </div>

      {/* Main Prices */}
      <div className="grid grid-cols-1 gap-3">
        {currentPrices.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                item.grade === 'Grade A' ? 'bg-amber-100 text-amber-700' :
                item.grade === 'Grade B' ? 'bg-orange-100 text-orange-700' :
                'bg-stone-100 text-stone-700'
              }`}>
                <IndianRupee size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-0.5">{item.grade}</p>
                <div className="flex items-baseline space-x-2">
                  <h3 className="text-xl font-bold text-gray-800">₹{item.price}</h3>
                  <span className="text-xs text-gray-500">/ kg</span>
                </div>
              </div>
            </div>
            
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${item.up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {item.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              <span className="text-xs font-bold">{item.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Trend Chart (Mock) */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-800 flex items-center">
            <BarChart3 className="text-gray-400 mr-2" size={18} />
            6-Month Trend (Grade A)
          </h3>
          <select className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-2 py-1 outline-none">
            <option>Grade A</option>
            <option>Grade B</option>
            <option>Grade C</option>
          </select>
        </div>

        <div className="h-40 flex items-end justify-between items-stretch space-x-2 pb-6 border-b border-gray-100 relative">
          {/* Y-axis guiding lines */}
          <div className="absolute inset-0 flex flex-col justify-between pb-6 pointer-events-none">
            <div className="w-full h-px bg-gray-50 border-t border-dashed border-gray-200"></div>
            <div className="w-full h-px bg-gray-50 border-t border-dashed border-gray-200"></div>
            <div className="w-full h-px bg-gray-50 border-t border-dashed border-gray-200"></div>
          </div>

          <div className="flex items-end justify-between w-full relative z-10 px-1">
            {chartHeights.map((height, idx) => (
              <div key={idx} className="flex flex-col items-center group w-8">
                <div 
                  className="w-full bg-indigo-100 group-hover:bg-indigo-400 rounded-t-md transition-all relative"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                    ₹{350 + height}
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 mt-2 absolute -bottom-6">{months[idx]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-2xl flex items-start space-x-3">
        <AlertCircle className="text-indigo-600 shrink-0 mt-0.5" size={18} />
        <div>
          <h4 className="text-sm font-bold text-indigo-900 mb-1">Market Insight</h4>
          <p className="text-xs text-indigo-700 leading-relaxed">
            Grade A premium multiflora prices are expected to rise by 2-3% next month due to lower yields in the Western Ghats region. Hold standard batches if storage permits.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
