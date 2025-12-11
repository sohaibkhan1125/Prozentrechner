/**
 * Content Management Helper Functions
 * Handles Supabase database operations for custom content section
 */

import { supabase } from '../supabaseClient';

const TABLE_NAME = 'website_prozent';

/**
 * Save content to Supabase
 * @param {string} content - HTML content to save
 * @returns {Promise<boolean>} - True if successful
 */
export const saveContent = async (content) => {
  try {
    // First, try to get existing content
    const { data: existing, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('id')
      .limit(1)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking existing content:', fetchError);
      throw fetchError;
    }

    let result;
    if (existing) {
      // Update existing content
      result = await supabase
        .from(TABLE_NAME)
        .update({
          content: content,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);
    } else {
      // Insert new content
      result = await supabase
        .from(TABLE_NAME)
        .insert([{
          content: content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);
    }

    if (result.error) {
      console.error('Error saving content:', result.error);
      throw result.error;
    }

    // Dispatch custom event for real-time updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('contentUpdated', {
        detail: { content: content }
      }));
    }

    return true;
  } catch (error) {
    console.error('Error saving content:', error);
    return false;
  }
};

/**
 * Load content from Supabase
 * @returns {Promise<string>} - HTML content or empty string
 */
export const loadContent = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('content')
      .limit(1)
      .maybeSingle();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned, return empty string
        return '';
      }
      console.error('Error loading content:', error);
      return '';
    }

    return data?.content || '';
  } catch (error) {
    console.error('Error loading content:', error);
    return '';
  }
};

/**
 * Delete content from Supabase
 * @returns {Promise<boolean>} - True if successful
 */
export const deleteContent = async () => {
  try {
    // Get the first record
    const { data: existing, error: fetchError } = await supabase
      .from(TABLE_NAME)
      .select('id')
      .limit(1)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error finding content to delete:', fetchError);
      throw fetchError;
    }

    if (existing) {
      // Update content to empty string instead of deleting the row
      const { error: updateError } = await supabase
        .from(TABLE_NAME)
        .update({
          content: '',
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      if (updateError) {
        console.error('Error deleting content:', updateError);
        throw updateError;
      }
    }

    // Dispatch custom event for real-time updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('contentUpdated', {
        detail: { content: '' }
      }));
    }

    return true;
  } catch (error) {
    console.error('Error deleting content:', error);
    return false;
  }
};

/**
 * Check if content exists
 * @returns {Promise<boolean>} - True if content exists
 */
export const hasContent = async () => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('content')
      .limit(1)
      .maybeSingle();

    if (error) {
      if (error.code === 'PGRST116') {
        return false;
      }
      console.error('Error checking content:', error);
      return false;
    }

    return data?.content && data.content.trim().length > 0;
  } catch (error) {
    console.error('Error checking content:', error);
    return false;
  }
};

/**
 * Get content length
 * @returns {Promise<number>} - Content length in characters
 */
export const getContentLength = async () => {
  try {
    const content = await loadContent();
    return content ? content.length : 0;
  } catch (error) {
    console.error('Error getting content length:', error);
    return 0;
  }
};
