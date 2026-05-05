import React, { useRef, useState } from 'react';
import { Language } from '../../types';
import { t } from '../../lib/translations';
import { ShieldCheck, Droplet, Sun, Camera, UploadCloud, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GradingToolProps {
  currentLang: Language;
}

export default function GradingTool({ currentLang }: GradingToolProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setAnalyzing(true);
      setAnalyzed(false);
      
      // Simulate AI analysis delay
      setTimeout(() => {
        setAnalyzing(false);
        setAnalyzed(true);
      }, 2500);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const resetAnalysis = () => {
    setAnalyzed(false);
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-gray-800 ml-1">
        <ShieldCheck className="text-amber-600" size={24} />
        <h2 className="font-semibold text-lg">{t(currentLang, 'visualCheck') || 'AI Honey Grading'}</h2>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-5 relative overflow-hidden shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-amber-900 flex items-center">
            <Camera size={18} className="mr-2" />
            {t(currentLang, 'aiGradingUpload') || 'AI Photo Analysis'}
          </h3>
          {analyzed && (
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide flex items-center">
              <CheckCircle2 size={12} className="mr-1" /> Complete
            </span>
          )}
        </div>
        
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />

        <AnimatePresence mode="wait">
          {!uploadedImage ? (
            <motion.button 
              key="upload-btn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={triggerFileInput}
              className="w-full bg-white border-2 border-dashed border-amber-300 rounded-2xl py-10 flex flex-col items-center justify-center text-amber-600 hover:bg-amber-50 hover:border-amber-400 transition-all duration-300"
            >
              <div className="bg-amber-100 p-4 rounded-full mb-3 shadow-inner">
                <UploadCloud size={32} className="text-amber-600" />
              </div>
              <span className="text-sm font-semibold mb-1">Take a Photo or Upload</span>
              <span className="text-xs text-amber-500/80">Support for JPG, PNG</span>
            </motion.button>
          ) : (
            <motion.div 
               key="analysis-view"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white rounded-2xl overflow-hidden border border-amber-200 shadow-sm"
            >
              <div className="relative h-48 w-full bg-gray-100">
                <img src={uploadedImage} alt="Uploaded honey" className="w-full h-full object-cover" />
                
                {analyzing && (
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center backdrop-blur-sm transition-all">
                    <div className="relative w-16 h-16 flex items-center justify-center mb-3">
                      <div className="absolute inset-0 border-4 border-amber-500/30 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
                      <Sun size={24} className="text-amber-400 animate-pulse" />
                    </div>
                    <span className="text-white font-medium tracking-wide text-sm drop-shadow-md">
                      {t(currentLang, 'aiGradingAnalyze') || 'Analyzing parameters'}...
                    </span>
                  </div>
                )}
              </div>
              
              {analyzed && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Predicted Result</p>
                      <h4 className="font-bold text-xl text-gray-900 leading-tight">Grade A <span className="text-amber-600">Premium</span></h4>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-2 text-center border border-amber-100">
                      <p className="text-[10px] text-amber-700 font-bold uppercase mb-0.5">Est. Value</p>
                      <p className="text-sm font-bold text-amber-900">₹320/kg</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 flex items-center"><ImageIcon size={14} className="mr-2 text-gray-400" /> Color Profile</span>
                      <span className="font-medium">Light Amber</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 flex items-center"><Droplet size={14} className="mr-2 text-blue-400" /> Est. Moisture</span>
                      <span className="font-medium text-green-600">&lt; 18%</span>
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-gray-100 flex gap-3">
                    <button onClick={resetAnalysis} className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded-xl text-sm transition-colors">
                      Scan Another
                    </button>
                    <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-xl text-sm shadow-md shadow-amber-200 transition-colors">
                      Log Batch
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-gray-900 ml-1 mb-2">Visual Grade Indicators</h3>
        <p className="text-sm text-gray-600 ml-1 mb-4 leading-relaxed">
          Compare your harvested honey with these visual indicators to determine its grade and market value.
        </p>

        <div className="space-y-4">
          {/* Grade A */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex shadow-yellow-100/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-yellow-400"></div>
            
            <div className="w-20 h-24 rounded-2xl bg-gradient-to-b from-yellow-200 to-yellow-400 flex items-center justify-center shadow-inner flex-shrink-0">
              <Sun className="text-yellow-600/50" size={32} />
            </div>
            
            <div className="ml-4 flex flex-col justify-center">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-gray-900">{t(currentLang, 'gradeA') || 'Grade A'}</h3>
                <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-bold">PREMIUM</span>
              </div>
              <p className="text-xs text-gray-500 mt-1 mb-2 leading-relaxed">{t(currentLang, 'gradeADesc') || 'Lightest color, lowest moisture content.'}</p>
              <div className="flex items-center space-x-3 text-[10px] font-medium text-gray-400">
                <span className="flex items-center"><Droplet size={10} className="mr-0.5 text-blue-400" /> &lt; 18%</span>
                <span className="bg-gray-100 px-1.5 rounded">Light</span>
              </div>
            </div>
          </motion.div>

          {/* Grade B */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-amber-500"></div>

            <div className="w-20 h-24 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-600 flex items-center justify-center shadow-inner flex-shrink-0">
            </div>
            
            <div className="ml-4 flex flex-col justify-center">
              <h3 className="font-bold text-gray-900">{t(currentLang, 'gradeB') || 'Grade B'}</h3>
              <p className="text-xs text-gray-500 mt-1 mb-2 leading-relaxed">{t(currentLang, 'gradeBDesc') || 'Medium amber color, standard moisture.'}</p>
              <div className="flex items-center space-x-3 text-[10px] font-medium text-gray-400">
                <span className="flex items-center"><Droplet size={10} className="mr-0.5 text-blue-500" /> 18-20%</span>
                <span className="bg-gray-100 px-1.5 rounded">Amber</span>
              </div>
            </div>
          </motion.div>

          {/* Grade C */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-2 h-full bg-stone-800"></div>

            <div className="w-20 h-24 rounded-2xl bg-gradient-to-b from-stone-600 to-stone-900 flex items-center justify-center shadow-inner flex-shrink-0">
            </div>
            
            <div className="ml-4 flex flex-col justify-center">
              <h3 className="font-bold text-gray-900">{t(currentLang, 'gradeC') || 'Grade C'}</h3>
              <p className="text-xs text-gray-500 mt-1 mb-2 leading-relaxed">{t(currentLang, 'gradeCDesc') || 'Dark color, higher moisture levels.'}</p>
              <div className="flex items-center space-x-3 text-[10px] font-medium text-gray-400">
                <span className="flex items-center"><Droplet size={10} className="mr-0.5 text-blue-600" /> &gt; 20%</span>
                <span className="bg-gray-100 px-1.5 rounded">Dark</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-2xl border border-blue-100">
        <h4 className="text-xs font-bold text-blue-900 mb-1 flex items-center">
          <Droplet size={12} className="mr-1" /> Field Moisture Test
        </h4>
        <p className="text-xs text-blue-800 leading-relaxed">
          Thick, slow-moving honey generally has lower moisture content (Grade A). Watery, fast-moving honey has high moisture and needs processing.
        </p>
      </div>

    </div>
  );
}
