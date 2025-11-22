// Footer Helper Functions
// Handles localStorage operations for footer social media icons

const FOOTER_SOCIALS_KEY = 'footerSocials';

// Default social icons (can be customized)
const DEFAULT_SOCIAL_ICONS = [
  { icon: 'facebook', url: 'https://facebook.com' },
  { icon: 'twitter', url: 'https://twitter.com' },
  { icon: 'instagram', url: 'https://instagram.com' }
];

/**
 * Get the current social icons from localStorage
 * @returns {Array} Array of social icon objects
 */
export const getFooterSocials = () => {
  try {
    const socials = localStorage.getItem(FOOTER_SOCIALS_KEY);
    if (socials) {
      return JSON.parse(socials);
    }
    return DEFAULT_SOCIAL_ICONS;
  } catch (error) {
    console.error('Error reading footer socials from localStorage:', error);
    return DEFAULT_SOCIAL_ICONS;
  }
};

/**
 * Set the social icons in localStorage
 * @param {Array} socialIcons - Array of social icon objects
 * @returns {boolean} true if successful, false otherwise
 */
export const setFooterSocials = (socialIcons) => {
  try {
    if (!Array.isArray(socialIcons)) {
      console.error('Social icons must be an array');
      return false;
    }
    localStorage.setItem(FOOTER_SOCIALS_KEY, JSON.stringify(socialIcons));
    return true;
  } catch (error) {
    console.error('Error setting footer socials:', error);
    return false;
  }
};

/**
 * Add a new social icon
 * @param {string} icon - Icon type (facebook, twitter, etc.)
 * @param {string} url - Social media URL
 * @returns {boolean} true if successful, false otherwise
 */
export const addFooterSocial = (icon, url) => {
  try {
    const currentSocials = getFooterSocials();
    
    // Check if icon already exists
    const iconExists = currentSocials.some(social => social.icon === icon);
    if (iconExists) {
      console.warn('Social icon already exists:', icon);
      return false;
    }

    const newSocial = { icon, url };
    const updatedSocials = [...currentSocials, newSocial];
    return setFooterSocials(updatedSocials);
  } catch (error) {
    console.error('Error adding footer social:', error);
    return false;
  }
};

/**
 * Remove a social icon by index
 * @param {number} index - Index of the social icon to remove
 * @returns {boolean} true if successful, false otherwise
 */
export const removeFooterSocial = (index) => {
  try {
    const currentSocials = getFooterSocials();
    
    if (index < 0 || index >= currentSocials.length) {
      console.error('Invalid index for removing social icon');
      return false;
    }

    const updatedSocials = currentSocials.filter((_, i) => i !== index);
    return setFooterSocials(updatedSocials);
  } catch (error) {
    console.error('Error removing footer social:', error);
    return false;
  }
};

/**
 * Update a social icon by index
 * @param {number} index - Index of the social icon to update
 * @param {string} icon - New icon type
 * @param {string} url - New URL
 * @returns {boolean} true if successful, false otherwise
 */
export const updateFooterSocial = (index, icon, url) => {
  try {
    const currentSocials = getFooterSocials();
    
    if (index < 0 || index >= currentSocials.length) {
      console.error('Invalid index for updating social icon');
      return false;
    }

    const updatedSocials = [...currentSocials];
    updatedSocials[index] = { icon, url };
    return setFooterSocials(updatedSocials);
  } catch (error) {
    console.error('Error updating footer social:', error);
    return false;
  }
};

/**
 * Clear all social icons from localStorage
 * @returns {boolean} true if successful, false otherwise
 */
export const clearFooterSocials = () => {
  try {
    localStorage.removeItem(FOOTER_SOCIALS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing footer socials:', error);
    return false;
  }
};

/**
 * Check if footer socials exist in localStorage
 * @returns {boolean} true if socials exist
 */
export const hasFooterSocials = () => {
  try {
    return localStorage.getItem(FOOTER_SOCIALS_KEY) !== null;
  } catch (error) {
    console.error('Error checking footer socials:', error);
    return false;
  }
};

/**
 * Get social icon count
 * @returns {number} Number of social icons
 */
export const getFooterSocialsCount = () => {
  try {
    const socials = getFooterSocials();
    return socials.length;
  } catch (error) {
    console.error('Error getting footer socials count:', error);
    return 0;
  }
};

/**
 * Validate social icon data
 * @param {Array} socialIcons - Array of social icon objects
 * @returns {boolean} true if valid, false otherwise
 */
export const validateFooterSocials = (socialIcons) => {
  try {
    if (!Array.isArray(socialIcons)) {
      return false;
    }

    return socialIcons.every(social => {
      return social && 
             typeof social.icon === 'string' && 
             typeof social.url === 'string' &&
             social.icon.trim() !== '' &&
             social.url.trim() !== '';
    });
  } catch (error) {
    console.error('Error validating footer socials:', error);
    return false;
  }
};

/**
 * Get default social icons
 * @returns {Array} Default social icons array
 */
export const getDefaultFooterSocials = () => {
  return [...DEFAULT_SOCIAL_ICONS];
};
