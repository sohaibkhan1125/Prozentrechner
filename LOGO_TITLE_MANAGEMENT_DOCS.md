# Logo & Title Management Feature Documentation

## Overview
The admin panel now includes a **Logo & Title Management** section that allows administrators to upload custom logos and change the website title, with real-time updates across the entire website.

## Features Implemented

### 🎨 **Logo & Title Management Panel**
- **Sidebar Integration**: New menu item "Logo & Title Management" in admin sidebar
- **Logo Upload**: File upload with image preview and validation
- **Logo Management**: Delete existing logo functionality
- **Title Editing**: Input field for website title changes
- **Real-time Updates**: Changes apply instantly across the website

### 📁 **File Management**
- **Image Upload**: Support for JPG, PNG, GIF formats (max 2MB)
- **Base64 Storage**: Images converted to base64 and stored in localStorage
- **Preview System**: Immediate preview of uploaded images
- **Validation**: File type and size validation with user feedback

### 🔄 **Real-time Updates**
- **Instant Application**: Changes apply immediately without page refresh
- **Cross-component Sync**: Navbar, Footer, and browser tab title update simultaneously
- **Event System**: Custom events notify all components of changes
- **Persistent Storage**: Settings survive browser refreshes and tab closures

## File Structure

```
src/
├── pages/Admin/
│   ├── LogoTitleManagement.jsx    # Main management panel
│   └── Dashboard.jsx             # Updated with new menu item
├── components/
│   ├── Navbar.jsx                # Dynamic navbar with logo/title
│   └── Footer.jsx               # Dynamic footer with logo/title
├── utils/
│   └── siteSettingsHelper.js     # localStorage utility functions
└── App.js                        # Updated to use new components
```

## How It Works

### 1. **Admin Panel Access**
- Navigate to `/admin/dashboard`
- Click "Logo & Title Management" in the left sidebar
- Upload logo or edit title as needed
- Click "Save Changes" to apply updates

### 2. **Logo Upload Process**
When admin uploads a logo:
- File validation (type and size checking)
- Conversion to base64 format
- Storage in localStorage (`siteLogo` key)
- Immediate preview display
- Real-time update across website

### 3. **Title Management Process**
When admin changes the title:
- Input validation and trimming
- Storage in localStorage (`siteTitle` key)
- Browser tab title update (`document.title`)
- Real-time update across navbar and footer

### 4. **Real-time Update System**
- **Custom Events**: `siteSettingsUpdated` event triggers updates
- **Event Listeners**: All components listen for settings changes
- **Fallback System**: Periodic localStorage checks for same-tab updates
- **Instant Response**: Changes apply immediately without page refresh

## Technical Implementation

### **LogoTitleManagement Component**
```javascript
// Main admin panel for logo and title management
- File upload with FileReader API
- Base64 conversion and localStorage storage
- Image preview and validation
- Real-time event dispatching
- Success/error message handling
```

### **Navbar Component**
```javascript
// Dynamic navbar component
- Reads logo and title from localStorage
- Listens for settings update events
- Displays logo or default placeholder
- Updates title in real-time
```

### **Footer Component**
```javascript
// Dynamic footer component
- Reads logo and title from localStorage
- Listens for settings update events
- Displays logo or default placeholder
- Updates copyright text with new title
```

### **siteSettingsHelper Utility**
```javascript
// Utility functions for localStorage operations
- getSiteTitle() / setSiteTitle()
- getSiteLogo() / setSiteLogo()
- getSiteSettings() / setSiteSettings()
- updateDocumentTitle()
- clearSiteSettings()
```

## Usage Instructions

### **For Administrators**
1. **Access Panel**: Go to `/admin/dashboard` → Click "Logo & Title Management"
2. **Upload Logo**: Click "Upload Logo" → Select image file → Preview appears
3. **Edit Title**: Type new title in the input field
4. **Save Changes**: Click "Save Changes" button
5. **Verify Updates**: Check that navbar, footer, and browser tab update immediately
6. **Delete Logo**: Click "Delete Logo" to remove current logo

### **For Users**
- **Normal Operation**: Website displays with current logo and title
- **Real-time Updates**: Changes appear immediately when admin saves
- **Persistent Display**: Logo and title remain consistent across page loads

## Key Benefits

✅ **Easy Management**: Upload and change logo/title with simple interface  
✅ **Real-time Updates**: Changes apply instantly across entire website  
✅ **Professional Display**: Clean logo preview and validation system  
✅ **Persistent Storage**: Settings survive browser refreshes and closures  
✅ **Cross-component Sync**: Navbar, footer, and browser tab update together  
✅ **No Backend Required**: Uses only localStorage for data persistence  
✅ **File Validation**: Proper image format and size checking  
✅ **User Feedback**: Clear success/error messages for all actions  

## Browser Compatibility
- **Modern Browsers**: Full support for FileReader API and localStorage
- **Image Formats**: JPG, PNG, GIF support
- **File Size**: Maximum 2MB file size limit
- **Mobile Responsive**: Works on all device sizes

## Storage Details

### **localStorage Keys**
- `siteTitle`: Stores the website title (string)
- `siteLogo`: Stores the logo as base64 string

### **Default Values**
- **Title**: "Prozentrechner.de" (if no custom title set)
- **Logo**: Default "P" icon (if no custom logo uploaded)

### **Data Persistence**
- Settings persist across browser sessions
- Data survives page refreshes and tab closures
- Settings sync across multiple browser tabs

## Security Notes
- **Client-side Only**: No server-side dependencies for logo/title management
- **File Validation**: Proper image format and size validation
- **Base64 Storage**: Images stored as base64 strings in localStorage
- **Admin Access Only**: Only authenticated admins can modify settings

This implementation provides a complete logo and title management solution that's easy to use, updates in real-time, and maintains consistency across the entire website.
