import React, { useState, useEffect } from 'react';
import { getSiteTitle, getSiteLogo } from '../utils/siteSettingsHelper';

const Navbar = () => {
  const [siteTitle, setSiteTitle] = useState('Prozentrechner.de');
  const [siteLogo, setSiteLogo] = useState('');

  useEffect(() => {
    // Load initial settings
    const loadSettings = () => {
      setSiteTitle(getSiteTitle());
      setSiteLogo(getSiteLogo());
    };

    loadSettings();

    // Listen for settings updates
    const handleSettingsUpdate = (event) => {
      if (event.detail) {
        setSiteTitle(event.detail.siteTitle || getSiteTitle());
        setSiteLogo(event.detail.siteLogo || getSiteLogo());
      } else {
        // Fallback: reload settings from localStorage
        loadSettings();
      }
    };

    window.addEventListener('siteSettingsUpdated', handleSettingsUpdate);

    return () => {
      window.removeEventListener('siteSettingsUpdated', handleSettingsUpdate);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            {siteLogo ? (
              <img
                src={siteLogo}
                alt={siteTitle}
                className="h-8 w-auto mr-3"
              />
            ) : (
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">P</span>
              </div>
            )}
            <h1 className="text-3xl font-bold text-gray-800">{siteTitle}</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
