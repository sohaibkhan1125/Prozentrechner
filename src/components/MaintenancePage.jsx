import React from 'react';

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Maintenance Icon */}
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">🚧</span>
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            We'll be back soon!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Our website is currently under maintenance. We're working hard to improve your experience.
          </p>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">
              Thank you for your patience. Please check back later.
            </p>
          </div>

          {/* Contact Info */}
          <div className="text-sm text-gray-400">
            <p>For urgent matters, please contact our support team.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
