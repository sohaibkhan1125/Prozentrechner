import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { saveContent, loadContent, deleteContent } from '../../utils/contentHelper';
import './ContentManagement.css';

// Froala editor imports
import FroalaEditorComponent from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'font-awesome/css/font-awesome.css';
import 'froala-editor/js/third_party/font_awesome.min.js';

const ContentManagement = () => {
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const froalaConfig = {
    key: 'nQE2uG3B1F1nmnspC5qpH3B3C11A6D5F5F5G4A-8A-7A2cefE3B2F3C2G2ilva1EAJLQCVLUVBf1NXNRSSATEXA-62WVLGKF2G2H2G1I4B3B2B8D7F6==',
    placeholderText: 'Type or paste your content here!',
    toolbarButtons: [
      ['undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikeThrough'],
      ['paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent'],
      ['insertLink', 'insertTable', 'quote', 'html']
    ],
    charCounterCount: true
  };

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

      {/* Rich Text Editor (Froala) */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content Editor
        </label>
        <div className="border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200">
          <FroalaEditorComponent
            tag='textarea'
            model={content}
            onModelChange={setContent}
            config={froalaConfig}
          />
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Character count: {content.replace(/<[^>]*>/g, '').length}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleClearContent}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Clear Content
        </button>
        <button
          onClick={loadExistingContent}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
        >
          Reset
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
