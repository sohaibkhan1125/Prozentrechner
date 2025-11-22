import React, { useState, useEffect } from 'react';
import { getSiteTitle, getSiteLogo } from '../utils/siteSettingsHelper';
import { getFooterSocials } from '../utils/footerHelper';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaGithub, FaTiktok, FaPinterest, FaSnapchat } from 'react-icons/fa';

const Footer = () => {
  const [siteTitle, setSiteTitle] = useState('Prozentrechner.de');
  const [siteLogo, setSiteLogo] = useState('');
  const [socialIcons, setSocialIcons] = useState([]);

  useEffect(() => {
    // Load initial settings
    const loadSettings = () => {
      setSiteTitle(getSiteTitle());
      setSiteLogo(getSiteLogo());
      setSocialIcons(getFooterSocials());
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

    // Listen for footer socials updates
    const handleFooterSocialsUpdate = (event) => {
      if (event.detail) {
        setSocialIcons(event.detail.socialIcons || getFooterSocials());
      } else {
        setSocialIcons(getFooterSocials());
      }
    };

    window.addEventListener('siteSettingsUpdated', handleSettingsUpdate);
    window.addEventListener('footerSocialsUpdated', handleFooterSocialsUpdate);

    return () => {
      window.removeEventListener('siteSettingsUpdated', handleSettingsUpdate);
      window.removeEventListener('footerSocialsUpdated', handleFooterSocialsUpdate);
    };
  }, []);

  // Helper function to get icon component
  const getIconComponent = (iconName) => {
    const iconMap = {
      facebook: FaFacebook,
      instagram: FaInstagram,
      twitter: FaTwitter,
      linkedin: FaLinkedin,
      youtube: FaYoutube,
      github: FaGithub,
      tiktok: FaTiktok,
      pinterest: FaPinterest,
      snapchat: FaSnapchat
    };
    return iconMap[iconName] || FaFacebook;
  };

  // Helper function to get icon color
  const getIconColor = (iconName) => {
    const colorMap = {
      facebook: 'hover:text-blue-400',
      instagram: 'hover:text-pink-400',
      twitter: 'hover:text-gray-300',
      linkedin: 'hover:text-blue-400',
      youtube: 'hover:text-red-400',
      github: 'hover:text-gray-300',
      tiktok: 'hover:text-gray-300',
      pinterest: 'hover:text-red-400',
      snapchat: 'hover:text-yellow-400'
    };
    return colorMap[iconName] || 'hover:text-blue-400';
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          {/* Logo and Title */}
          <div className="flex items-center mb-4 md:mb-0">
            {siteLogo ? (
              <img
                src={siteLogo}
                alt={siteTitle}
                className="h-6 w-auto mr-3"
              />
            ) : (
              <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xs">P</span>
              </div>
            )}
            <span className="text-sm font-medium">{siteTitle}</span>
          </div>

          {/* Social Media Icons */}
          {socialIcons.length > 0 && (
            <div className="flex items-center space-x-4">
              {socialIcons.map((social, index) => {
                const IconComponent = getIconComponent(social.icon);
                const hoverColor = getIconColor(social.icon);
                
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 transition-colors duration-200 ${hoverColor}`}
                    aria-label={`Visit our ${social.icon} page`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">
            © {currentYear} {siteTitle} – All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
