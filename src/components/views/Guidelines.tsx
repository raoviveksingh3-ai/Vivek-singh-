import React from 'react';
import { Language } from '../../types';
import { t } from '../../lib/translations';
import { BookOpen, TreePine, Leaf, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface GuidelinesProps {
  currentLang: Language;
}

export default function Guidelines({ currentLang }: GuidelinesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-green-800 ml-1">
        <TreePine className="text-green-600" size={24} />
        <h2 className="font-semibold text-lg">{t(currentLang, 'sustainableTitle')}</h2>
      </div>

      <p className="text-sm text-gray-600 ml-1 leading-relaxed">
        Protecting the forest ecosystem ensures continued honey harvests for generations. Follow these tribal traditions mixed with modern conservation.
      </p>

      <div className="space-y-4 pt-2">
        
        <RuleCard 
          icon={<Leaf size={20} className="text-green-600" />}
          text={t(currentLang, 'rule1')} 
          delay={0}
        />
        
        <RuleCard 
          icon={<ShieldAlert size={20} className="text-orange-500" />}
          text={t(currentLang, 'rule2')} 
          delay={0.1}
        />
        
        <RuleCard 
          icon={<BookOpen size={20} className="text-blue-500" />}
          text={t(currentLang, 'rule3')} 
          delay={0.2}
        />
        
        <RuleCard 
          icon={<TreePine size={20} className="text-emerald-600" />}
          text={t(currentLang, 'rule4')} 
          delay={0.3}
        />

      </div>
      
      <div className="mt-8 rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative group">
        <div className="h-40 bg-gray-200 relative">
          {/* A conceptual placeholder for a video or image */}
          <div className="absolute inset-0 bg-green-900/60 mix-blend-multiply"></div>
          <img 
            src="https://images.unsplash.com/photo-1587049352847-4d4b12fe3480?q=80&w=600&auto=format&fit=crop" 
            alt="Forest" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full border border-white/30 text-white">
              <BookOpen size={24} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4">
          <h4 className="font-bold text-gray-800 text-sm">Forest-to-Table Community Video</h4>
          <p className="text-xs text-gray-500 mt-1">Watch how tribal hunters respectfully harvest.</p>
        </div>
      </div>

    </div>
  );
}

function RuleCard({ icon, text, delay }: { icon: React.ReactNode, text: string, delay: number }) {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start space-x-4"
    >
      <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex-shrink-0">
        {icon}
      </div>
      <p className="text-sm text-gray-700 font-medium leading-relaxed pt-1">
        {text}
      </p>
    </motion.div>
  );
}
