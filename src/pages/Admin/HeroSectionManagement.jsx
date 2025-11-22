import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  loadHeroSettings,
  saveHeroSettings,
  resetHeroSettings,
} from '../../utils/heroHelper';

const HeroSectionManagement = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { title: savedTitle, description: savedDescription } = loadHeroSettings();
    setTitle(savedTitle);
    setDescription(savedDescription);
  }, []);

  const handleSave = () => {
    setSaving(true);
    setSuccess(null);
    setError(null);

    try {
      const saved = saveHeroSettings({ title, description });

      if (saved) {
        setSuccess('Hero section updated successfully!');
      } else {
        setError('Unable to save hero section. Please try again.');
      }
    } catch (err) {
      setError('Error saving hero section: ' + err.message);
    } finally {
      setSaving(false);
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
    }
  };

  const handleResetToStored = () => {
    const { title: savedTitle, description: savedDescription } = loadHeroSettings();
    setTitle(savedTitle);
    setDescription(savedDescription);
    setSuccess('Reset to last saved hero content.');
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleResetToDefault = () => {
    resetHeroSettings();
    const { title: defaultTitle, description: defaultDescription } = loadHeroSettings();
    setTitle(defaultTitle);
    setDescription(defaultDescription);
    setSuccess('Hero section restored to defaults.');
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hero Section Management</h2>
        <p className="text-gray-600">
          Customize the main hero section title and description. Changes update the live site
          instantly.
        </p>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
        >
          {success}
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
        >
          {error}
        </motion.div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"
            maxLength={120}
            placeholder="Enter hero section title"
          />
          <p className="mt-1 text-sm text-gray-500">{title.length} / 120 characters</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"
            rows={4}
            maxLength={400}
            placeholder="Enter hero section description"
          />
          <p className="mt-1 text-sm text-gray-500">{description.length} / 400 characters</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
        <button
          onClick={handleResetToStored}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Reset to Last Saved
        </button>
        <button
          onClick={handleResetToDefault}
          className="px-4 py-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
        >
          Restore Defaults
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? 'Saving...' : 'Save Hero Content'}
        </button>
      </div>
    </motion.div>
  );
};

export default HeroSectionManagement;

