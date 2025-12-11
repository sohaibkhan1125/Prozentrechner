import React, { useState, useEffect } from 'react';
import { loadContent, hasContent } from '../utils/contentHelper';
import './CustomSection.css';

const CustomSection = () => {
  const [content, setContent] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load content on component mount
    loadContentFromStorage();

    // Listen for content updates from admin panel
    const handleContentUpdate = (event) => {
      const newContent = event.detail.content;
      setContent(newContent);
      setIsVisible(newContent && newContent.trim().length > 0);
    };

    window.addEventListener('contentUpdated', handleContentUpdate);

    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate);
    };
  }, []);

  const loadContentFromStorage = async () => {
    try {
      setLoading(true);
      const savedContent = await loadContent();
      const contentExists = await hasContent();
      setContent(savedContent);
      setIsVisible(contentExists);
    } catch (error) {
      console.warn('Error loading custom content:', error);
      setIsVisible(false);
    } finally {
      setLoading(false);
    }
  };

  // Don't render if loading or no content
  if (loading || !isVisible || !content || content.trim().length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div
            className="prose prose-lg max-w-none custom-content"
            dangerouslySetInnerHTML={{ __html: content }}
            style={{
              color: '#374151',
              lineHeight: '1.7'
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default CustomSection;
