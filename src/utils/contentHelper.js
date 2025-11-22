/**
 * Content Management Helper Functions
 * Handles localStorage operations for custom content section
 */

const CONTENT_STORAGE_KEY = 'customSectionContent';

/**
 * Save content to localStorage
 * @param {string} content - HTML content to save
 */
export const saveContent = (content) => {
  try {
    localStorage.setItem(CONTENT_STORAGE_KEY, content);
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('contentUpdated', { 
      detail: { content: content } 
    }));
    
    return true;
  } catch (error) {
    console.error('Error saving content:', error);
    return false;
  }
};

/**
 * Load content from localStorage
 * @returns {string} - HTML content or empty string
 */
export const loadContent = () => {
  try {
    return localStorage.getItem(CONTENT_STORAGE_KEY) || '';
  } catch (error) {
    console.error('Error loading content:', error);
    return '';
  }
};

/**
 * Delete content from localStorage
 */
export const deleteContent = () => {
  try {
    localStorage.removeItem(CONTENT_STORAGE_KEY);
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('contentUpdated', { 
      detail: { content: '' } 
    }));
    
    return true;
  } catch (error) {
    console.error('Error deleting content:', error);
    return false;
  }
};

/**
 * Check if content exists
 * @returns {boolean} - True if content exists
 */
export const hasContent = () => {
  try {
    const content = localStorage.getItem(CONTENT_STORAGE_KEY);
    return content && content.trim().length > 0;
  } catch (error) {
    console.error('Error checking content:', error);
    return false;
  }
};

/**
 * Get content length
 * @returns {number} - Content length in characters
 */
export const getContentLength = () => {
  try {
    const content = localStorage.getItem(CONTENT_STORAGE_KEY);
    return content ? content.length : 0;
  } catch (error) {
    console.error('Error getting content length:', error);
    return 0;
  }
};
