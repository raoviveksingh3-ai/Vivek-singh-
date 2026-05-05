import React from 'react';
import { Language, Harvest } from '../../types';
import { t } from '../../lib/translations';
import { Package, Clock, CheckCircle2, ChevronRight, Activity, MapPin, Truck } from 'lucide-react';
import { motion } from 'motion/react';

interface BatchTrackerProps {
  currentLang: Language;
  harvests: Harvest[];
}

export default function BatchTracker({ currentLang, harvests }: BatchTrackerProps) {
  // Use first harvest for demonstration of current tracking
  const latestBatch = harvests[0];

  const stages = [
    { id: 'harvest', title: 'Harvested', desc: latestBatch.date, done: true },
    { id: 'grading', title: 'Grading Passed', desc: latestBatch.grade, done: true },
    { id: 'storage', title: 'In Jenu-Gumpu Storage', desc: 'Awaiting blending', done: true },
    { id: 'processing', title: 'Filtering & Packing', desc: 'Processing facility', done: false },
    { id: 'shipped', title: 'Distributed', desc: 'To retail partners', done: false },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center space-x-2 text-gray-800 ml-1">
        <Package className="text-teal-600" size={24} />
        <h2 className="font-semibold text-lg">{t(currentLang, 'batchTracker') || 'Batch Tracker'}</h2>
      </div>

      {latestBatch ? (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Current Batch</p>
              <h3 className="text-lg font-bold text-gray-800">{latestBatch.batchId}</h3>
            </div>
            <div className="bg-teal-50 text-teal-700 p-2 rounded-xl">
              <Activity size={20} />
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6 pt-4 border-t border-gray-100">
            <div className="flex-1">
              <div className="text-xs text-gray-500 flex items-center mb-1">
                <MapPin size={12} className="mr-1" /> Source
              </div>
              <div className="text-sm font-medium">{latestBatch.location}</div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div className="flex-1">
              <div className="text-xs text-gray-500 flex items-center mb-1">
                <Package size={12} className="mr-1" /> Volume
              </div>
              <div className="text-sm font-medium">{latestBatch.quantityKg} Kg</div>
            </div>
          </div>

          <div className="space-y-4">
            {stages.map((stage, idx) => (
              <div key={stage.id} className="flex relative">
                {idx !== stages.length - 1 && (
                  <div className={`absolute top-6 left-3 w-0.5 h-full -ml-[1px] ${stage.done ? 'bg-teal-500' : 'bg-gray-200'}`}></div>
                )}
                <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${stage.done ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {stage.done ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                </div>
                <div className="ml-4 pb-6">
                  <h4 className={`text-sm font-bold ${stage.done ? 'text-gray-800' : 'text-gray-500'}`}>{stage.title}</h4>
                  <p className="text-xs text-gray-500">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 text-center text-gray-500 shadow-sm border border-gray-100">
          <Truck className="mx-auto mb-3 text-gray-300" size={40} />
          <p className="text-sm">No active batches to track.</p>
        </div>
      )}

      {harvests.length > 1 && (
        <div className="space-y-3">
          <h3 className="font-bold text-gray-800 ml-1 text-sm">Past Batches</h3>
          {harvests.slice(1).map((h) => (
            <div key={h.id} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-100 hover:border-teal-300 cursor-pointer transition-colors">
              <div>
                <p className="font-semibold text-gray-800 text-sm">{h.batchId}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                  <span>{h.date}</span>
                  <span>•</span>
                  <span>{h.quantityKg} Kg</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
