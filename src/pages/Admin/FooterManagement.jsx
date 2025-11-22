import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaGithub, FaTiktok, FaPinterest, FaSnapchat } from 'react-icons/fa';

const FooterManagement = () => {
  const [socialIcons, setSocialIcons] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState('facebook');
  const [socialUrl, setSocialUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const iconOptions = [
    { value: 'facebook', label: 'Facebook', icon: FaFacebook, color: 'text-blue-600' },
    { value: 'instagram', label: 'Instagram', icon: FaInstagram, color: 'text-pink-600' },
    { value: 'twitter', label: 'Twitter/X', icon: FaTwitter, color: 'text-gray-800' },
    { value: 'linkedin', label: 'LinkedIn', icon: FaLinkedin, color: 'text-blue-700' },
    { value: 'youtube', label: 'YouTube', icon: FaYoutube, color: 'text-red-600' },
    { value: 'github', label: 'GitHub', icon: FaGithub, color: 'text-gray-800' },
    { value: 'tiktok', label: 'TikTok', icon: FaTiktok, color: 'text-black' },
    { value: 'pinterest', label: 'Pinterest', icon: FaPinterest, color: 'text-red-600' },
    { value: 'snapchat', label: 'Snapchat', icon: FaSnapchat, color: 'text-yellow-500' }
  ];

  useEffect(() => {
    // Load saved social icons from localStorage
    const loadSocialIcons = () => {
      try {
        const saved = localStorage.getItem('footerSocials');
        if (saved) {
          setSocialIcons(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading social icons:', error);
        setSocialIcons([]);
      }
    };

    loadSocialIcons();
  }, []);

  const handleAddIcon = () => {
    if (!socialUrl.trim()) {
      setMessage('Please enter a valid URL');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Basic URL validation
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(socialUrl)) {
      setMessage('Please enter a valid URL (e.g., https://facebook.com/username)');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Check if icon already exists
    const iconExists = socialIcons.some(icon => icon.icon === selectedIcon);
    if (iconExists) {
      setMessage('This social media icon already exists. Please choose a different one.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const newIcon = {
      icon: selectedIcon,
      url: socialUrl.trim()
    };

    const updatedIcons = [...socialIcons, newIcon];
    setSocialIcons(updatedIcons);
    setSocialUrl('');
    setMessage('Icon added successfully! Click "Save Changes" to apply.');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteIcon = (index) => {
    const updatedIcons = socialIcons.filter((_, i) => i !== index);
    setSocialIcons(updatedIcons);
    setMessage('Icon removed successfully! Click "Save Changes" to apply.');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setMessage('');

    try {
      // Save to localStorage
      localStorage.setItem('footerSocials', JSON.stringify(socialIcons));

      // Trigger custom event to notify footer component
      window.dispatchEvent(new CustomEvent('footerSocialsUpdated', {
        detail: { socialIcons }
      }));

      setMessage('Footer changes saved successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setMessage('Error saving footer settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName) => {
    const iconOption = iconOptions.find(option => option.value === iconName);
    return iconOption ? iconOption.icon : FaFacebook;
  };

  const getIconColor = (iconName) => {
    const iconOption = iconOptions.find(option => option.value === iconName);
    return iconOption ? iconOption.color : 'text-blue-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Footer Management</h2>
        <p className="text-gray-600 mt-1">Manage social media icons and links in your website footer</p>
      </div>

      {/* Add Social Icon Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Social Media Icon</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Icon Selection */}
            <div>
              <label htmlFor="icon-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Social Media Platform
              </label>
              <select
                id="icon-select"
                value={selectedIcon}
                onChange={(e) => setSelectedIcon(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {iconOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* URL Input */}
            <div>
              <label htmlFor="social-url" className="block text-sm font-medium text-gray-700 mb-2">
                Social Media URL
              </label>
              <input
                id="social-url"
                type="url"
                value={socialUrl}
                onChange={(e) => setSocialUrl(e.target.value)}
                placeholder="https://facebook.com/yourpage"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Preview:</span>
            <div className="flex items-center space-x-2">
              {React.createElement(getIconComponent(selectedIcon), {
                className: `w-6 h-6 ${getIconColor(selectedIcon)}`
              })}
              <span className="text-sm text-gray-700">{iconOptions.find(opt => opt.value === selectedIcon)?.label}</span>
            </div>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddIcon}
            disabled={!socialUrl.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium"
          >
            Add Icon
          </button>
        </div>
      </div>

      {/* Current Social Icons */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Social Icons</h3>
        
        {socialIcons.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📱</div>
            <p>No social media icons added yet.</p>
            <p className="text-sm">Add your first social media icon above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {socialIcons.map((social, index) => {
              const IconComponent = getIconComponent(social.icon);
              const iconColor = getIconColor(social.icon);
              const iconLabel = iconOptions.find(opt => opt.value === social.icon)?.label;

              return (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-6 h-6 ${iconColor}`} />
                    <div>
                      <p className="font-medium text-gray-900">{iconLabel}</p>
                      <p className="text-sm text-gray-600 break-all">{social.url}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteIcon(index)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Apply Changes</h3>
            <p className="text-sm text-gray-600 mt-1">
              Save your footer changes to update the website footer
            </p>
          </div>
          
          <button
            onClick={handleSaveChanges}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('successfully') 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <p className={`text-sm ${
            message.includes('successfully') 
              ? 'text-green-800' 
              : 'text-red-800'
          }`}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default FooterManagement;
