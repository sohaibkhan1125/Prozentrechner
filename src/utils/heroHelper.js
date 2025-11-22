/**
 * Hero Section Helper Functions
 * Handles localStorage operations and real-time updates for hero content
 */

const HERO_STORAGE_KEY = 'heroSectionSettings';

const defaultHeroSettings = {
  title: 'Prozentrechner Online',
  description:
    'Berechne Prozente einfach, schnell und kostenlos. Egal ob Prozentsatz, Grundwert oder Prozentwert – unser Online-Rechner hilft dir sofort weiter!',
};

const isBrowser = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined';

const dispatchUpdate = (settings) => {
  if (!isBrowser()) return;

  window.dispatchEvent(
    new CustomEvent('heroSectionUpdated', {
      detail: settings,
    })
  );
};

/**
 * Load hero section settings from localStorage
 * @returns {{title: string, description: string}}
 */
export const loadHeroSettings = () => {
  if (!isBrowser()) {
    return defaultHeroSettings;
  }

  try {
    const stored = localStorage.getItem(HERO_STORAGE_KEY);
    if (!stored) {
      return defaultHeroSettings;
    }

    const parsed = JSON.parse(stored);
    return {
      title: parsed.title || defaultHeroSettings.title,
      description: parsed.description || defaultHeroSettings.description,
    };
  } catch (error) {
    console.warn('Error loading hero settings:', error);
    return defaultHeroSettings;
  }
};

/**
 * Save hero section settings to localStorage
 * @param {{title: string, description: string}} settings
 */
export const saveHeroSettings = (settings) => {
  if (!isBrowser()) return false;

  const mergedSettings = {
    title: settings.title?.trim() || defaultHeroSettings.title,
    description: settings.description?.trim() || defaultHeroSettings.description,
  };

  try {
    localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(mergedSettings));
    dispatchUpdate(mergedSettings);
    return true;
  } catch (error) {
    console.error('Error saving hero settings:', error);
    return false;
  }
};

/**
 * Reset hero section settings to defaults
 */
export const resetHeroSettings = () => {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(HERO_STORAGE_KEY);
  } catch (error) {
    console.warn('Error resetting hero settings:', error);
  } finally {
    dispatchUpdate(defaultHeroSettings);
  }
};

export const getHeroTitle = () => loadHeroSettings().title;

export const getHeroDescription = () => loadHeroSettings().description;

