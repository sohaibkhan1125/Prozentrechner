import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { saveContent, loadContent, deleteContent } from '../../utils/contentHelper';
import './ContentManagement.css';
import QuillEditor from '../../components/QuillEditor';

const ContentManagement = () => {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadExistingContent();
  }, []);

  const loadExistingContent = async () => {
    try {
      const savedContent = await loadContent();
      setContent(savedContent);
    } catch (error) {
      console.warn('Error loading content:', error);
    }
  };

  const handleSaveContent = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const success = await saveContent(content);

      if (success) {
        setSuccess('Content saved successfully!');

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      } else {
        setError('Error saving content. Please try again.');
      }
    } catch (error) {
      setError('Error saving content: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteContent = async () => {
    if (window.confirm('Are you sure you want to delete all content? This action cannot be undone.')) {
      try {
        const success = await deleteContent();

        if (success) {
          setContent('');
          setSuccess('Content deleted successfully!');

          // Clear success message after 3 seconds
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
        } else {
          setError('Error deleting content. Please try again.');
        }
      } catch (error) {
        setError('Error deleting content: ' + error.message);
      }
    }
  };

  const handleClearContent = () => {
    setContent('');
    setError(null);
    setSuccess(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Management</h2>
        <p className="text-gray-600">Create and manage content that will be displayed above the FAQ section on your website.</p>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
        >
          {success}
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      {/* Rich Text Editor (Quill) */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content Editor
        </label>
        {/* Removed wrapper div that had border as QuillEditor has its own styling */}
        <QuillEditor
          value={content}
          onChange={setContent}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
        {/* Reset clears local changes to what is in DB, but actually just reloads here */}
        <button
          onClick={loadExistingContent}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Reset to Saved
        </button>
        <button
          onClick={handleDeleteContent}
          className="px-4 py-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition-colors duration-200"
        >
          Delete Content
        </button>
        <button
          onClick={handleSaveContent}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {saving ? 'Saving...' : 'Save Content'}
        </button>
      </div>
    </motion.div>
  );
};

export default ContentManagement;
