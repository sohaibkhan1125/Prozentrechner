# Maintenance Mode Feature Documentation

## Overview
The admin panel now includes a **General Settings** section with maintenance mode functionality that allows administrators to temporarily disable public access to the website while keeping admin access available.

## Features Implemented

### 🔧 **General Settings Panel**
- **Sidebar Navigation**: Left sidebar with General Settings as the default active section
- **Clean Layout**: Professional UI with toggle switches and status indicators
- **Real-time Updates**: Changes apply instantly without page refresh
- **Status Display**: Visual indicators showing "Active" or "Inactive" status

### 🚧 **Maintenance Mode Functionality**
- **Toggle Control**: Easy-to-use switch to enable/disable maintenance mode
- **Local Storage**: State persisted in browser's localStorage (`maintenanceMode` key)
- **Instant Application**: Changes take effect immediately across all browser tabs
- **Admin Access**: Admin panel remains accessible even when maintenance mode is active

### 🎨 **User Interface**
- **Modern Design**: Clean, professional layout using Tailwind CSS
- **No Animations**: As requested, no animations are used
- **Responsive**: Works on all screen sizes
- **Status Indicators**: Color-coded status badges (red for active, green for inactive)

## File Structure

```
src/
├── pages/Admin/
│   ├── GeneralSettings.jsx     # Settings panel component
│   └── Dashboard.jsx           # Updated with sidebar layout
├── components/
│   └── MaintenancePage.jsx     # Maintenance mode page
├── utils/
│   └── maintenanceHelper.js    # localStorage utility functions
└── App.js                      # Updated with maintenance wrapper
```

## How It Works

### 1. **Admin Panel Access**
- Navigate to `/admin/dashboard`
- Click "General Settings" in the left sidebar
- Toggle "Enable Maintenance Mode" switch
- Click "Save Changes" button

### 2. **Maintenance Mode Activation**
When maintenance mode is **enabled**:
- `localStorage.setItem('maintenanceMode', 'true')` is executed
- All public routes (except admin) show the maintenance page
- Admin routes (`/admin/*`) remain fully accessible
- Status indicator shows "Maintenance Mode: Active"

### 3. **Maintenance Mode Deactivation**
When maintenance mode is **disabled**:
- `localStorage.setItem('maintenanceMode', 'false')` is executed
- Website returns to normal operation
- All content becomes accessible again
- Status indicator shows "Maintenance Mode: Inactive"

### 4. **Real-time Updates**
- **Storage Events**: Listens for localStorage changes across browser tabs
- **Periodic Checks**: Checks maintenance mode every second for same-tab updates
- **Instant Response**: Changes apply immediately without page refresh

## Technical Implementation

### **MaintenanceWrapper Component**
```javascript
// Wraps public routes to check maintenance mode
const MaintenanceWrapper = ({ children }) => {
  // Checks localStorage on mount
  // Listens for storage changes
  // Shows MaintenancePage if enabled
  // Shows normal content if disabled
}
```

### **GeneralSettings Component**
```javascript
// Admin settings panel
- Toggle switch for maintenance mode
- Save button with loading state
- Status indicator with color coding
- Success/error message display
```

### **MaintenancePage Component**
```javascript
// Professional maintenance page
- Centered layout with maintenance icon
- "We'll be back soon!" message
- Contact information
- Clean, minimal design
```

### **maintenanceHelper Utility**
```javascript
// Utility functions for localStorage operations
- isMaintenanceModeEnabled()
- enableMaintenanceMode()
- disableMaintenanceMode()
- toggleMaintenanceMode()
- getMaintenanceModeStatus()
```

## Usage Instructions

### **For Administrators**
1. **Access Settings**: Go to `/admin/dashboard` → Click "General Settings"
2. **Enable Maintenance**: Toggle the switch ON → Click "Save Changes"
3. **Verify**: Check that the main website shows maintenance page
4. **Disable Maintenance**: Toggle the switch OFF → Click "Save Changes"
5. **Verify**: Check that the website returns to normal

### **For Users**
- **Normal Operation**: Website functions normally when maintenance mode is off
- **Maintenance Mode**: Users see a professional maintenance page when enabled
- **Admin Access**: Administrators can still access `/admin/*` routes during maintenance

## Key Benefits

✅ **Instant Control**: Enable/disable maintenance mode with one click  
✅ **Admin Access**: Administrators can still manage the site during maintenance  
✅ **Professional Display**: Clean maintenance page for visitors  
✅ **Persistent State**: Settings survive browser refreshes and tab closures  
✅ **Real-time Updates**: Changes apply immediately across all tabs  
✅ **No Firebase Dependency**: Uses only localStorage for state management  

## Browser Compatibility
- **Modern Browsers**: Full support for localStorage and storage events
- **Mobile Responsive**: Works on all device sizes
- **Cross-tab Sync**: Changes sync across multiple browser tabs

## Security Notes
- **Admin Routes Protected**: Admin panel remains accessible during maintenance
- **Local Storage Only**: No server-side dependencies for maintenance mode
- **Client-side Control**: Maintenance mode can only be controlled from admin panel

This implementation provides a complete maintenance mode solution that's easy to use, professional in appearance, and maintains admin access during maintenance periods.
