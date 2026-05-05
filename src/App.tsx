import React, { useState, useEffect } from 'react';
import { Home, Droplets, ListPlus, Menu as MenuIcon, MessageCircle, WifiOff, User, Globe, X, Search, Bell } from 'lucide-react';
import { AppState, Harvest, Language, ActiveTab } from './types';
import { APP_LANGUAGES } from './constants';
import { t } from './lib/translations';

// Components
import Dashboard from './components/views/Dashboard';
import HarvestLog from './components/views/HarvestLog';
import GradingTool from './components/views/GradingTool';
import Guidelines from './components/views/Guidelines';
import AIChat from './components/views/AIChat';
import Login from './components/views/Login';
import Menu from './components/views/Menu';
import DeliveryPayment from './components/views/DeliveryPayment';
import Rewards from './components/views/Rewards';
import Teams from './components/views/Teams';
import Contact from './components/views/Contact';
import BuyerChat from './components/views/BuyerChat';
import Profile from './components/views/Profile';
import BatchTracker from './components/views/BatchTracker';
import PriceMonitoring from './components/views/PriceMonitoring';
import Settings from './components/views/Settings';

const INITIAL_HARVESTS: Harvest[] = [
  {
    id: '1',
    batchId: 'BATCH-2023-01',
    date: '2023-10-15',
    location: 'Coorg Forest Edge',
    floralSource: 'Coffee Blossom',
    quantityKg: 15,
    grade: 'Grade A',
  },
  {
    id: '2',
    batchId: 'BATCH-2023-02',
    date: '2023-10-18',
    location: 'Western Ghats Deep',
    floralSource: 'Wildflower',
    quantityKg: 8,
    grade: 'Grade B',
  }
];

export default function App() {
  const [state, setState] = useState<AppState>({
    language: 'en',
    harvests: INITIAL_HARVESTS,
    isAuthenticated: false,
  });
  
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLogin = () => {
    setState(prev => ({ ...prev, isAuthenticated: true }));
  };

  const handleLogout = () => {
    setState(prev => ({ ...prev, isAuthenticated: false }));
    setActiveTab('home');
  };

  const addHarvest = (harvest: Omit<Harvest, 'id' | 'batchId'>) => {
    const newHarvest: Harvest = {
      ...harvest,
      id: Math.random().toString(36).substr(2, 9),
      batchId: `BAT-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`,
    };
    setState(prev => ({
      ...prev,
      harvests: [newHarvest, ...prev.harvests]
    }));
    setActiveTab('home');
  };

  const currentLang = state.language;

  if (!state.isAuthenticated) {
    return <Login currentLang={currentLang} onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard state={state} currentLang={currentLang} />;
      case 'harvest':
        return <HarvestLog onAddHarvest={addHarvest} currentLang={currentLang} />;
      case 'grading':
        return <GradingTool currentLang={currentLang} />;
      case 'learn':
        return <Guidelines currentLang={currentLang} />;
      case 'chat':
        return <AIChat currentLang={currentLang} />;
      case 'menu':
        return <Menu currentLang={currentLang} onNavigate={setActiveTab} onLogout={handleLogout} />;
      case 'delivery':
        return <DeliveryPayment currentLang={currentLang} />;
      case 'rewards':
        return <Rewards state={state} currentLang={currentLang} />;
      case 'teams':
        return <Teams currentLang={currentLang} />;
      case 'contact':
        return <Contact currentLang={currentLang} />;
      case 'buyerChat':
        return <BuyerChat currentLang={currentLang} />;
      case 'profile':
        return <Profile currentLang={currentLang} />;
      case 'batchTracker':
        return <BatchTracker currentLang={currentLang} harvests={state.harvests} />;
      case 'priceMonitoring':
        return <PriceMonitoring currentLang={currentLang} />;
      case 'settings':
        return <Settings currentLang={currentLang} onLanguageChange={(l) => setState(p => ({...p, language: l}))} />;
      default:
        return <Dashboard state={state} currentLang={currentLang} />;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-0 sm:p-4">
      {/* Mobile App Container */}
      <div className="w-full h-[100dvh] sm:h-[850px] sm:max-w-[400px] bg-gray-50 flex flex-col sm:rounded-[2.5rem] sm:shadow-2xl sm:border-[8px] sm:border-gray-900 overflow-hidden relative">
        
        {/* Top Header */}
        <header className="bg-amber-600 text-white p-4 shadow-md flex justify-between items-center z-10 shrink-0">
          <div className="flex items-center space-x-2">
            <button onClick={() => setActiveTab('profile')} className="bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-full">
              <User size={20} className="text-amber-100" />
            </button>
            <div>
              <h1 className="font-bold text-lg leading-tight">{t(currentLang, 'appName') || 'Jenu-Gumpu'}</h1>
              <p className="text-xs text-amber-100">{t(currentLang, 'tagline')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-full">
              <Search size={18} />
            </button>
            <button className="bg-white/20 hover:bg-white/30 transition-colors p-2 rounded-full relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full border border-amber-600"></span>
            </button>
          </div>
        </header>

        {isOffline && (
          <div className="bg-red-500 text-white px-4 py-2 text-xs font-medium flex items-center justify-center space-x-2 shrink-0">
            <WifiOff size={14} />
            <span>{t(currentLang, 'offlineMessage')}</span>
          </div>
        )}

        {/* Floating Language Button */}
        <button 
          onClick={() => setShowLangMenu(true)}
          className="absolute bottom-24 right-4 z-40 bg-white text-gray-800 shadow-lg border border-gray-100 p-3 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Globe size={20} className="text-amber-600" />
        </button>

        {/* Language Selection Bottom Sheet */}
        {showLangMenu && (
          <div className="absolute inset-0 bg-black/50 z-[60] sm:rounded-[2.5rem] flex flex-col justify-end">
            <div className="bg-white rounded-t-3xl p-6 pb-12 shadow-xl border-t border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-800">Language / ಭಾಷೆ</h3>
                <button onClick={() => setShowLangMenu(false)} className="p-1 text-gray-500 hover:text-gray-800 bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-col space-y-2 max-h-[60vh] overflow-y-auto pr-2 pb-4">
                {APP_LANGUAGES.map(l => (
                  <LangOption key={l.code} lang={l.code} label={l.label} current={currentLang} onClick={(c) => { setState(p => ({...p, language: c})); setShowLangMenu(false); }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto w-full pb-20 relative">
          <div className="p-4">
            {renderContent()}
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-white border-t border-gray-200 absolute bottom-0 w-full h-[72px] flex justify-around items-center px-1 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-20 shrink-0">
          <NavItem 
            icon={<Home size={22} />} 
            label={t(currentLang, 'home')} 
            isActive={activeTab === 'home'} 
            onClick={() => setActiveTab('home')} 
          />
          <NavItem 
            icon={<ListPlus size={22} />} 
            label={t(currentLang, 'harvest')} 
            isActive={activeTab === 'harvest'} 
            onClick={() => setActiveTab('harvest')} 
          />
          <NavItem 
            icon={<MessageCircle size={22} />} 
            label={t(currentLang, 'chat')} 
            isActive={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')} 
          />
          <NavItem 
            icon={<Droplets size={22} />} 
            label={t(currentLang, 'grading')} 
            isActive={activeTab === 'grading'} 
            onClick={() => setActiveTab('grading')} 
          />
          <NavItem 
            icon={<MenuIcon size={22} />} 
            label={t(currentLang, 'menuTab')} 
            isActive={['menu', 'delivery', 'rewards', 'teams', 'contact', 'learn', 'buyerChat', 'profile', 'batchTracker', 'priceMonitoring', 'settings'].includes(activeTab)} 
            onClick={() => setActiveTab('menu')} 
          />
        </nav>
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-amber-600' : 'text-gray-400 hover:text-gray-600'}`}
    >
      <div className={`${isActive ? 'bg-amber-100 p-1.5 rounded-xl' : 'p-1.5'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium truncate w-full px-1">{label}</span>
    </button>
  );
}

function LangOption({ lang, label, current, onClick }: { lang: Language, label: string, current: Language, onClick: (l: Language) => void }) {
  const isSelected = current === lang;
  return (
    <button 
      onClick={() => onClick(lang)}
      className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${isSelected ? 'bg-amber-50 border-amber-500 text-amber-800' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}
    >
      <span className="font-medium text-sm">{label}</span>
      {isSelected && <div className="w-3 h-3 rounded-full bg-amber-500" />}
    </button>
  );
}
