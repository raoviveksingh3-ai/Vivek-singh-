import React, { useState, useRef } from 'react';
import { AppState, Harvest, Language, ActiveTab } from '../../types';
import { APP_LANGUAGES } from '../../constants';
import { t } from '../../lib/translations';
import { User, MapPin, Award, Edit2, CheckCircle2, Camera, ShieldCheck, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile({ currentLang }: { currentLang: Language }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profileData, setProfileData] = useState({
    name: 'Ramu',
    username: 'ramu_coorg',
    location: 'Coorg, Karnataka',
    experience: '5 Years',
    about: 'Passionate about sustainable beekeeping and forest honey.',
    gender: 'Male',
    userType: 'Beekeeper',
    status: 'Verified Badge Active',
    units: 'Metric (kg)',
    notifications: 'Push + SMS',
    photoUrl: null as string | null
  });

  const handleSave = () => {
    setIsEditing(false);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProfileData({ ...profileData, photoUrl: url });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between ml-1">
        <div className="flex items-center space-x-2 text-gray-800">
          <User className="text-amber-600" size={24} />
          <h2 className="font-semibold text-lg">{t(currentLang, 'account') || t(currentLang, 'profile')}</h2>
        </div>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="text-amber-600 hover:text-amber-700 bg-amber-50 p-2 rounded-full">
            <Edit2 size={16} />
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col relative">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md overflow-hidden">
              {profileData.photoUrl ? (
                <img src={profileData.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                profileData.name.charAt(0)
              )}
            </div>
            {isEditing && (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow border border-gray-100 text-gray-600 hover:text-amber-600"
              >
                <Camera size={14} />
              </button>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handlePhotoUpload} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          {!isEditing && (
            <div className="mt-3 text-center">
              <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center">
                {profileData.name}
              </h3>
              <p className="text-sm text-gray-500">@{profileData.username}</p>
            </div>
          )}
        </div>
        
        {isEditing ? (
          <div className="w-full space-y-4">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 bg-amber-50 self-start px-2 py-1 rounded inline-block">{t(currentLang, 'personalInfo')}</p>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">{t(currentLang, 'fullName')}</label>
              <input type="text" value={profileData.name} onChange={e => setProfileData({...profileData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">{t(currentLang, 'username') || 'Username'}</label>
              <input type="text" value={profileData.username} onChange={e => setProfileData({...profileData, username: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">{t(currentLang, 'about') || 'About'}</label>
              <textarea value={profileData.about} onChange={e => setProfileData({...profileData, about: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[80px]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">{t(currentLang, 'gender') || 'Gender'}</label>
                <select value={profileData.gender} onChange={e => setProfileData({...profileData, gender: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">{t(currentLang, 'experience')}</label>
                <input type="text" value={profileData.experience} onChange={e => setProfileData({...profileData, experience: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1 ml-1">{t(currentLang, 'location') || 'Location'}</label>
              <input type="text" value={profileData.location} onChange={e => setProfileData({...profileData, location: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>

            <button onClick={handleSave} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-xl shadow-md transition-colors mt-4">
              {t(currentLang, 'saveChanges')}
            </button>
          </div>
        ) : (
          <div className="w-full space-y-5">
            {profileData.about && (
              <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-2xl italic leading-relaxed">
                "{profileData.about}"
              </p>
            )}
            
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium mb-0.5">{t(currentLang, 'gender') || 'Gender'}</p>
                  <p className="text-sm font-medium text-gray-800">{profileData.gender}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                  <MapPin className="text-gray-400 mr-3 shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">{t(currentLang, 'location') || 'Location'}</p>
                    <p className="text-sm font-medium text-gray-800">{profileData.location}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                  <Award className="text-gray-400 mr-3 shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">{t(currentLang, 'experience')}</p>
                    <p className="text-sm font-medium text-gray-800">{profileData.experience}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showSaved && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-xs font-medium flex items-center shadow-lg z-50">
          <CheckCircle2 size={14} className="mr-2 text-green-400" /> Saved Successfully
        </motion.div>
      )}
    </motion.div>
  );
}
