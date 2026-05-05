import React, { useState } from 'react';
import { Language, FloralSource, Grade, Harvest } from '../../types';
import { t } from '../../lib/translations';
import { PlusCircle, Calendar, MapPin, Scale, ListFilter } from 'lucide-react';
import { motion } from 'motion/react';

interface HarvestLogProps {
  onAddHarvest: (harvest: Omit<Harvest, 'id' | 'batchId'>) => void;
  currentLang: Language;
}

export default function HarvestLog({ onAddHarvest, currentLang }: HarvestLogProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');
  const [floralSource, setFloralSource] = useState<FloralSource>('Wildflower');
  const [quantity, setQuantity] = useState('');
  const [grade, setGrade] = useState<Grade>('Grade B');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !quantity) return;
    
    onAddHarvest({
      date,
      location,
      floralSource,
      quantityKg: parseFloat(quantity),
      grade
    });
    
    // Reset form
    setLocation('');
    setQuantity('');
  };

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow";
  const labelClass = "block text-xs font-medium text-gray-700 mb-1.5 flex items-center";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6 border-b border-gray-50 pb-4">
          <div className="bg-amber-100 p-2 rounded-full text-amber-600">
            <PlusCircle size={20} />
          </div>
          <h2 className="font-semibold text-gray-800 text-lg">{t(currentLang, 'logHarvest')}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className={labelClass}>
              <Calendar size={14} className="mr-1.5 text-gray-400" />
              {t(currentLang, 'date')}
            </label>
            <input 
              type="date" 
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              <MapPin size={14} className="mr-1.5 text-gray-400" />
              {t(currentLang, 'location')}
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g. Somwarpet Forest"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>
              <ListFilter size={14} className="mr-1.5 text-gray-400" />
              {t(currentLang, 'floralSource')}
            </label>
            <select 
              value={floralSource}
              onChange={(e) => setFloralSource(e.target.value as FloralSource)}
              className={inputClass}
            >
              <option value="Wildflower">{t(currentLang, 'wildflower')}</option>
              <option value="Coffee Blossom">{t(currentLang, 'coffee')}</option>
              <option value="Sunflower">{t(currentLang, 'sunflower')}</option>
              <option value="Multiflora">{t(currentLang, 'multiflora')}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                <Scale size={14} className="mr-1.5 text-gray-400" />
                {t(currentLang, 'quantity')}
              </label>
              <input 
                type="number" 
                required
                min="0.1"
                step="0.1"
                placeholder="0.0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className={labelClass}>
                <span>{t(currentLang, 'grade')}</span>
              </label>
              <select 
                value={grade}
                onChange={(e) => setGrade(e.target.value as Grade)}
                className={inputClass}
              >
                <option value="Grade A">Grade A</option>
                <option value="Grade B">Grade B</option>
                <option value="Grade C">Grade C</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm py-3.5 rounded-xl shadow-md transition-colors mt-4 flex justify-center items-center"
          >
            {t(currentLang, 'save')}
          </button>
        </form>
      </div>
      
      <div className="bg-amber-50 rounded-2xl p-4 text-xs font-medium text-amber-800 border border-amber-100 flex items-start">
        <div className="bg-amber-200/50 p-1 rounded mt-0.5 mr-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </div>
        <p>A unique Batch ID will be automatically generated for traceability when you save this harvest.</p>
      </div>
    </motion.div>
  );
}
