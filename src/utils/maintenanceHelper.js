// Maintenance Mode Helper Functions
// Handles localStorage operations for maintenance mode state

const MAINTENANCE_MODE_KEY = 'maintenanceMode';

/**
 * Check if maintenance mode is currently enabled
 * @returns {boolean} true if maintenance mode is enabled, false otherwise
 */
export const isMaintenanceModeEnabled = () => {
  try {
    const value = localStorage.getItem(MAINTENANCE_MODE_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error reading maintenance mode from localStorage:', error);
    return false;
  }
};

/**
 * Enable maintenance mode
 * @returns {boolean} true if successful, false otherwise
 */
export const enableMaintenanceMode = () => {
  try {
    localStorage.setItem(MAINTENANCE_MODE_KEY, 'true');
    return true;
  } catch (error) {
    console.error('Error enabling maintenance mode:', error);
    return false;
  }
};

/**
 * Disable maintenance mode
 * @returns {boolean} true if successful, false otherwise
 */
export const disableMaintenanceMode = () => {
  try {
    localStorage.setItem(MAINTENANCE_MODE_KEY, 'false');
    return true;
  } catch (error) {
    console.error('Error disabling maintenance mode:', error);
    return false;
  }
};

/**
 * Toggle maintenance mode
 * @returns {boolean} new state of maintenance mode
 */
export const toggleMaintenanceMode = () => {
  const currentState = isMaintenanceModeEnabled();
  if (currentState) {
    disableMaintenanceMode();
    return false;
  } else {
    enableMaintenanceMode();
    return true;
  }
};

/**
 * Get maintenance mode status as a string
 * @returns {string} 'Active' or 'Inactive'
 */
export const getMaintenanceModeStatus = () => {
  return isMaintenanceModeEnabled() ? 'Active' : 'Inactive';
};

/**
 * Clear maintenance mode setting (remove from localStorage)
 * @returns {boolean} true if successful, false otherwise
 */
export const clearMaintenanceMode = () => {
  try {
    localStorage.removeItem(MAINTENANCE_MODE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing maintenance mode:', error);
    return false;
  }
};
