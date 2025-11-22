// Site Settings Helper Functions
// Handles localStorage operations for site logo and title

const SITE_TITLE_KEY = 'siteTitle';
const SITE_LOGO_KEY = 'siteLogo';

// Default values
const DEFAULT_SITE_TITLE = 'Prozentrechner.de';
const DEFAULT_SITE_LOGO = ''; // No default logo

/**
 * Get the current site title from localStorage
 * @returns {string} The site title or default title
 */
export const getSiteTitle = () => {
  try {
    const title = localStorage.getItem(SITE_TITLE_KEY);
    return title || DEFAULT_SITE_TITLE;
  } catch (error) {
    console.error('Error reading site title from localStorage:', error);
    return DEFAULT_SITE_TITLE;
  }
};

/**
 * Get the current site logo from localStorage
 * @returns {string} The site logo (base64) or empty string
 */
export const getSiteLogo = () => {
  try {
    const logo = localStorage.getItem(SITE_LOGO_KEY);
    return logo || DEFAULT_SITE_LOGO;
  } catch (error) {
    console.error('Error reading site logo from localStorage:', error);
    return DEFAULT_SITE_LOGO;
  }
};

/**
 * Set the site title in localStorage
 * @param {string} title - The new site title
 * @returns {boolean} true if successful, false otherwise
 */
export const setSiteTitle = (title) => {
  try {
    if (!title || !title.trim()) {
      localStorage.removeItem(SITE_TITLE_KEY);
      return true;
    }
    localStorage.setItem(SITE_TITLE_KEY, title.trim());
    return true;
  } catch (error) {
    console.error('Error setting site title:', error);
    return false;
  }
};

/**
 * Set the site logo in localStorage
 * @param {string} logo - The new site logo (base64)
 * @returns {boolean} true if successful, false otherwise
 */
export const setSiteLogo = (logo) => {
  try {
    if (!logo || !logo.trim()) {
      localStorage.removeItem(SITE_LOGO_KEY);
      return true;
    }
    localStorage.setItem(SITE_LOGO_KEY, logo);
    return true;
  } catch (error) {
    console.error('Error setting site logo:', error);
    return false;
  }
};

/**
 * Remove the site logo from localStorage
 * @returns {boolean} true if successful, false otherwise
 */
export const removeSiteLogo = () => {
  try {
    localStorage.removeItem(SITE_LOGO_KEY);
    return true;
  } catch (error) {
    console.error('Error removing site logo:', error);
    return false;
  }
};

/**
 * Get both site title and logo
 * @returns {object} Object containing title and logo
 */
export const getSiteSettings = () => {
  return {
    title: getSiteTitle(),
    logo: getSiteLogo()
  };
};

/**
 * Set both site title and logo
 * @param {string} title - The site title
 * @param {string} logo - The site logo (base64)
 * @returns {boolean} true if successful, false otherwise
 */
export const setSiteSettings = (title, logo) => {
  const titleSuccess = setSiteTitle(title);
  const logoSuccess = setSiteLogo(logo);
  return titleSuccess && logoSuccess;
};

/**
 * Clear all site settings from localStorage
 * @returns {boolean} true if successful, false otherwise
 */
export const clearSiteSettings = () => {
  try {
    localStorage.removeItem(SITE_TITLE_KEY);
    localStorage.removeItem(SITE_LOGO_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing site settings:', error);
    return false;
  }
};

/**
 * Check if site settings exist in localStorage
 * @returns {boolean} true if any settings exist
 */
export const hasSiteSettings = () => {
  try {
    return localStorage.getItem(SITE_TITLE_KEY) !== null || 
           localStorage.getItem(SITE_LOGO_KEY) !== null;
  } catch (error) {
    console.error('Error checking site settings:', error);
    return false;
  }
};

/**
 * Update document title with current site title
 */
export const updateDocumentTitle = () => {
  try {
    const title = getSiteTitle();
    document.title = title;
  } catch (error) {
    console.error('Error updating document title:', error);
  }
};
