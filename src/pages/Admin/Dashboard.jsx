import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import GeneralSettings from './GeneralSettings';
import LogoTitleManagement from './LogoTitleManagement';
import FooterManagement from './FooterManagement';
import ContentManagement from './ContentManagement';
import HeroSectionManagement from './HeroSectionManagement';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('general-settings');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/admin/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'general-settings':
        return <GeneralSettings />;
      case 'logo-title-management':
        return <LogoTitleManagement />;
      case 'footer-management':
        return <FooterManagement />;
      case 'content-management':
        return <ContentManagement />;
      case 'hero-section-management':
        return <HeroSectionManagement />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection('general-settings')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
                    activeSection === 'general-settings'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">⚙️</span>
                  General Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('logo-title-management')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
                    activeSection === 'logo-title-management'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">🎨</span>
                  Logo & Title Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('footer-management')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
                    activeSection === 'footer-management'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">📱</span>
                  Footer Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('content-management')}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
                    activeSection === 'content-management'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">📝</span>
                  Content Management
                </button>
              </li>
            <li>
              <button
                onClick={() => setActiveSection('hero-section-management')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium ${
                  activeSection === 'hero-section-management'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">🌟</span>
                Hero Section Management
              </button>
            </li>
              {/* Future menu items can be added here */}
            </ul>
          </nav>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
