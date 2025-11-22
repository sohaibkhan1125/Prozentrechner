import React, { useState, useEffect } from 'react';

const GeneralSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load maintenance mode state from localStorage on component mount
    const savedState = localStorage.getItem('maintenanceMode');
    setMaintenanceMode(savedState === 'true');
  }, []);

  const handleToggleMaintenance = () => {
    setMaintenanceMode(!maintenanceMode);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setMessage('');

    try {
      // Save to localStorage
      localStorage.setItem('maintenanceMode', maintenanceMode.toString());
      
      // Show success message
      setMessage(maintenanceMode ? 'Maintenance mode enabled successfully!' : 'Maintenance mode disabled successfully!');
      
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
        <h2 className="text-2xl font-bold text-gray-900">General Settings</h2>
        <p className="text-gray-600 mt-1">Manage your website's general configuration</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-6">
          {/* Maintenance Mode Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Maintenance</h3>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">Enable Maintenance Mode</h4>
                <p className="text-sm text-gray-600 mt-1">
                  When enabled, visitors will see a maintenance page instead of your website content.
                </p>
              </div>
              
              <div className="ml-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={handleToggleMaintenance}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="mt-3">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                maintenanceMode 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  maintenanceMode ? 'bg-red-500' : 'bg-green-500'
                }`}></div>
                Maintenance Mode: {maintenanceMode ? 'Active' : 'Inactive'}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleSaveChanges}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
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
      </div>

      {/* Additional Settings Placeholder */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Settings</h3>
        <p className="text-gray-600 text-sm">
          More configuration options will be added here in future updates.
        </p>
      </div>
    </div>
  );
};

export default GeneralSettings;
