import React, { useState, useEffect } from 'react';

const LogoTitleManagement = () => {
  const [siteTitle, setSiteTitle] = useState('');
  const [siteLogo, setSiteLogo] = useState('');
  const [logoPreview, setLogoPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load saved settings from localStorage on component mount
    const savedTitle = localStorage.getItem('siteTitle');
    const savedLogo = localStorage.getItem('siteLogo');
    
    if (savedTitle) {
      setSiteTitle(savedTitle);
    } else {
      setSiteTitle('Prozentrechner.de'); // Default title
    }
    
    if (savedLogo) {
      setSiteLogo(savedLogo);
      setLogoPreview(savedLogo);
    }
  }, []);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage('Please select a valid image file.');
        setTimeout(() => setMessage(''), 3000);
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setMessage('Image size should be less than 2MB.');
        setTimeout(() => setMessage(''), 3000);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        setSiteLogo(base64);
        setLogoPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteLogo = () => {
    setSiteLogo('');
    setLogoPreview('');
    localStorage.removeItem('siteLogo');
    setMessage('Logo deleted successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setMessage('');

    try {
      // Save to localStorage
      localStorage.setItem('siteTitle', siteTitle);
      if (siteLogo) {
        localStorage.setItem('siteLogo', siteLogo);
      }

      // Update document title
      document.title = siteTitle;

      // Trigger custom event to notify other components
      window.dispatchEvent(new CustomEvent('siteSettingsUpdated', {
        detail: { siteTitle, siteLogo }
      }));

      setMessage('Changes saved successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setMessage('Error saving settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Logo & Title Management</h2>
        <p className="text-gray-600 mt-1">Manage your website's logo and title</p>
      </div>

      {/* Logo Management Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo Management</h3>
        
        <div className="space-y-4">
          {/* Logo Preview */}
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 border-2 border-gray-200 rounded-lg flex items-center justify-center bg-gray-50">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Site Logo Preview"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p className="text-sm">No Logo</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 space-y-3">
              <div>
                <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Logo
                </label>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: JPG, PNG, GIF. Max size: 2MB
                </p>
              </div>
              
              {logoPreview && (
                <button
                  onClick={handleDeleteLogo}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Delete Logo
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Title Management Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Title</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="site-title" className="block text-sm font-medium text-gray-700 mb-2">
              Website Title
            </label>
            <input
              id="site-title"
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              placeholder="Enter your website title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              This will update the browser tab title and site header
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Apply Changes</h3>
            <p className="text-sm text-gray-600 mt-1">
              Save your logo and title changes to update the website
            </p>
          </div>
          
          <button
            onClick={handleSaveChanges}
            disabled={loading || !siteTitle.trim()}
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

export default LogoTitleManagement;
