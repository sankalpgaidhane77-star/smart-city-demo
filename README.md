# 🏙️ SmartCity Pulse

### *Intelligent Urban Management & Citizen Engagement Platform*

---

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Built With](https://img.shields.io/badge/built%20with-HTML%20%7C%20CSS%20%7C%20JS-orange.svg)
![Status](https://img.shields.io/badge/status-stable-brightgreen.svg)
![Code Reusability](https://img.shields.io/badge/code-reusable-success.svg)

---

## 📋 Overview

**SmartCity Pulse** is a pure front-end urban management platform built with **HTML, CSS, and Vanilla JavaScript**. This comprehensive Single Page Application (SPA) follows the **DRY (Don't Repeat Yourself)** principle with a centralized component system, ensuring maximum code reusability and maintainability.

> *"Transforming urban landscapes through data-driven citizen engagement and intelligent operations management."*

---

## 🎯 DRY Code Architecture

### ✅ What Makes This Code DRY?

#### 1. **Centralized Component System**
All UI components are defined once and reused everywhere:

```javascript
// 📁 js/components.js
const Components = {
    // Metric cards - used in Dashboard, Analytics, Admin
    createMetricCard(icon, label, value, status) {
        return `
            <div class="metric-card ${status}">
                <i class="fas ${icon}"></i>
                <h3>${value}</h3>
                <p>${label}</p>
            </div>
        `;
    },
    
    // Status badges - used in Tracking, Admin, Notifications
    createStatusBadge(status) {
        const statusMap = {
            'pending': 'warning',
            'in-progress': 'info',
            'resolved': 'success',
            'critical': 'danger'
        };
        return `<span class="badge badge-${statusMap[status]}">${status}</span>`;
    },
    
    // Toast notifications - used everywhere
    createToast(message, type = 'info') {
        return `
            <div class="toast toast-${type}">
                <i class="fas ${this.getToastIcon(type)}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.remove()">×</button>
            </div>
        `;
    }
};
```

#### 2. **Reusable Page Templates**
Pages load from separate HTML files but share common components:

```html
<!-- pages/dashboard.html -->
<div id="page-dashboard">
    <!-- Using shared components -->
    ${Components.createMetricCard('fa-users', 'Active Citizens', '12,847', 'active')}
    ${Components.createMetricCard('fa-exclamation-triangle', 'Active Incidents', '47', 'warning')}
    ${Components.createMetricCard('fa-check-circle', 'Resolved Issues', '1,283', 'success')}
    ${Components.createStatusBadge('in-progress')}
</div>
```

#### 3. **Shared JavaScript Modules**

```javascript
// 📁 js/utils.js - Shared utilities
const Utils = {
    formatDate(date) { /* ... */ },
    generateId() { /* ... */ },
    debounce(fn, delay) { /* ... */ }
};

// 📁 js/telemetry.js - Shared telemetry simulation
class TelemetrySimulator {
    constructor() { /* ... */ }
    updateAll() { /* ... */ }
}

// 📁 js/theme.js - Single theme management
const ThemeManager = {
    toggle() { /* ... */ },
    apply(theme) { /* ... */ }
};
```

#### 4. **CSS Utility Classes**
No repeated CSS - use utility classes:

```css
/* style.css - Utility Classes */
.glass { background: var(--glass-bg); backdrop-filter: blur(10px); }
.text-center { text-align: center; }
.mt-1 { margin-top: 1rem; }
.mb-1 { margin-bottom: 1rem; }
.p-1 { padding: 1rem; }
.flex { display: flex; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); }
```

---

## 📁 Project Structure (DRY Architecture)

```
smartcity-pulse/
│
├── index.html              # Single entry point
├── style.css               # Global styles + utilities
├── script.js               # Main app orchestrator
│
├── pages/                  # Page templates (load dynamically)
│   ├── home.html
│   ├── dashboard.html
│   ├── report.html
│   ├── tracking.html
│   ├── analytics.html
│   ├── notifications.html
│   ├── admin.html
│   └── contact.html
│
├── js/                     # Modular JavaScript
│   ├── app.js              # App initialization
│   ├── router.js           # Hash-based routing (SINGLE instance)
│   ├── components.js       # ⭐ REUSABLE COMPONENTS
│   ├── utils.js            # ⭐ SHARED UTILITIES
│   ├── theme.js            # ⭐ THEME MANAGER (SINGLE)
│   ├── telemetry.js        # ⭐ TELEMETRY SIMULATOR (SINGLE)
│   ├── notifications.js    # ⭐ NOTIFICATION SYSTEM (SINGLE)
│   ├── toasts.js           # ⭐ TOAST SYSTEM (SINGLE)
│   ├── map.js              # Leaflet integration
│   ├── charts.js           # Chart.js integration
│   └── data.js             # ⭐ CENTRALIZED DATA STORE
│
└── README.md
```

---

## 🔄 Reusable Code Examples

### 1. **Card Component (Used in 5+ Pages)**
```javascript
// Defined ONCE in js/components.js
function createCard({ icon, title, value, subtitle, color, link }) {
    return `
        <div class="card glass" style="--card-color: ${color}">
            <div class="card-header">
                <i class="fas ${icon}"></i>
                <span class="card-title">${title}</span>
            </div>
            <div class="card-body">
                <h2>${value}</h2>
                <p>${subtitle}</p>
            </div>
            ${link ? `<a href="${link}" class="card-link">View Details →</a>` : ''}
        </div>
    `;
}

// Used in: Dashboard, Analytics, Admin, Home, Notifications
```

### 2. **Form Builder (6-Step Form)**
```javascript
// 📁 js/form-builder.js
const FormBuilder = {
    steps: [
        { id: 'category', title: 'Select Category', icon: 'fa-tags' },
        { id: 'headline', title: 'Report Headline', icon: 'fa-heading' },
        { id: 'location', title: 'Location', icon: 'fa-location-dot' },
        { id: 'priority', title: 'Set Priority', icon: 'fa-flag' },
        { id: 'images', title: 'Upload Images', icon: 'fa-image' },
        { id: 'description', title: 'Detailed Description', icon: 'fa-align-left' }
    ],
    
    renderStep(stepIndex) {
        // Single render function for all steps
        const step = this.steps[stepIndex];
        return `
            <div class="form-step" data-step="${step.id}">
                <h3><i class="fas ${step.icon}"></i> ${step.title}</h3>
                ${this.getStepContent(step.id)}
            </div>
        `;
    },
    
    getStepContent(stepId) {
        // Centralized content generation
        const contentMap = {
            category: this.renderCategoryPicker(),
            headline: this.renderTextInput('headline', 'Enter a brief headline'),
            // ... all steps defined once
        };
        return contentMap[stepId];
    }
};
```

### 3. **Data Management (Single Source of Truth)**
```javascript
// 📁 js/data.js - CENTRALIZED DATA
const AppData = {
    incidents: [
        { id: 'INC-001', category: 'roads', priority: 'high', status: 'pending' },
        // ... all incident data
    ],
    
    telemetry: {
        aqi: 45,
        waterPressure: 72,
        powerLoad: 68,
        transit: 89
    },
    
    notifications: [
        { id: 1, type: 'alert', message: '...', timestamp: '...' }
    ],
    
    // Single update function
    updateIncident(id, updates) {
        const index = this.incidents.findIndex(i => i.id === id);
        if (index !== -1) {
            this.incidents[index] = { ...this.incidents[index], ...updates };
            this.notifyListeners('incident-updated', this.incidents[index]);
        }
    },
    
    // Observer pattern - all views update automatically
    listeners: [],
    notifyListeners(event, data) {
        this.listeners.forEach(fn => fn(event, data));
    }
};
```

### 4. **Toast System (Reusable Everywhere)**
```javascript
// 📁 js/toasts.js - SINGLE TOAST SYSTEM
const ToastManager = {
    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas ${this.getIcon(type)}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        document.getElementById('toast-container').appendChild(toast);
        setTimeout(() => toast.remove(), duration);
    },
    
    success(msg) { this.show(msg, 'success'); },
    error(msg) { this.show(msg, 'error'); },
    warning(msg) { this.show(msg, 'warning'); },
    info(msg) { this.show(msg, 'info'); }
};

// Usage ANYWHERE in the app:
ToastManager.success('Report submitted successfully!');
ToastManager.error('Failed to load data');
```

### 5. **Theme Manager (Single Instance)**
```javascript
// 📁 js/theme.js - SINGLE THEME MANAGER
const ThemeManager = {
    current: 'light',
    
    init() {
        this.current = localStorage.getItem('theme') || 'light';
        this.apply(this.current);
    },
    
    toggle() {
        this.current = this.current === 'light' ? 'dark' : 'light';
        this.apply(this.current);
        localStorage.setItem('theme', this.current);
    },
    
    apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateIcons(theme);
    },
    
    updateIcons(theme) {
        document.querySelectorAll('.theme-icon').forEach(el => {
            el.className = `fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`;
        });
    }
};
```

---

## 🚀 How to Use Reusable Components

### Step 1: Include the Component Library
```html
<!-- In index.html -->
<script src="js/components.js"></script>
<script src="js/utils.js"></script>
<script src="js/toasts.js"></script>
<script src="js/data.js"></script>
```

### Step 2: Use Components Anywhere
```javascript
// In any page initialization function
function initDashboard() {
    // Using reusable components
    const container = document.getElementById('metrics-container');
    container.innerHTML = `
        ${Components.createMetricCard('fa-users', 'Citizens', '12,847')}
        ${Components.createMetricCard('fa-exclamation', 'Incidents', '47', 'warning')}
        ${Components.createMetricCard('fa-check', 'Resolved', '1,283', 'success')}
    `;
    
    // Show toast on load
    ToastManager.info('Dashboard loaded successfully');
}
```

### Step 3: Style with Utility Classes
```html
<!-- No repeated CSS -->
<div class="flex grid-3 gap-1 p-1 glass">
    ${Components.createMetricCard('fa-users', 'Active Users', '1,234')}
    ${Components.createMetricCard('fa-clock', 'Avg Response', '2.4h')}
    ${Components.createMetricCard('fa-star', 'Satisfaction', '94%', 'success')}
</div>
```

---

## 📊 Code Reusability Metrics

| Component | Used In | Reusability |
|-----------|---------|-------------|
| **Metric Cards** | Dashboard, Analytics, Admin | ⭐⭐⭐⭐⭐ |
| **Status Badges** | Tracking, Admin, Notifications | ⭐⭐⭐⭐⭐ |
| **Toast System** | All Pages | ⭐⭐⭐⭐⭐ |
| **Theme Manager** | All Pages | ⭐⭐⭐⭐⭐ |
| **Form Builder** | Report, Contact | ⭐⭐⭐⭐ |
| **Table Generator** | Tracking, Admin | ⭐⭐⭐⭐ |
| **Chart Renderer** | Analytics Only | ⭐⭐⭐ |
| **Telemetry Simulator** | Dashboard, Admin | ⭐⭐⭐⭐ |

---

## 🎯 DRY Principle Checklist

- [x] **No repeated HTML** - Components are JavaScript functions
- [x] **No repeated CSS** - Utility classes and variables
- [x] **No repeated JS** - Functions extracted to modules
- [x] **Single data source** - Centralized data store
- [x] **Observer pattern** - Automatic view updates
- [x] **Single theme system** - One toggle for all pages
- [x] **Single toast system** - One notification system
- [x] **Single router** - One navigation handler
- [x] **Single telemetry** - One simulation engine

---

## 🛠️ Best Practices Followed

### 1. **Separation of Concerns**
```javascript
// Data layer (data.js)
const Store = { incidents: [], users: [] };

// Business logic (services.js)
const IncidentService = {
    create(data) { Store.incidents.push(data); },
    update(id, data) { /* ... */ }
};

// UI layer (components.js)
const UI = {
    renderIncidentList() { /* uses Store data */ }
};
```

### 2. **Single Responsibility**
```javascript
// Each file has ONE job
// router.js → handles navigation ONLY
// theme.js → handles theming ONLY
// toasts.js → handles notifications ONLY
// telemetry.js → handles simulations ONLY
```

### 3. **Dependency Injection**
```javascript
// Functions receive what they need
function renderDashboard(dataStore, themeManager) {
    // Uses injected dependencies
}
```

---

## 💡 Extending the DRY System

### Adding a New Component
```javascript
// 1. Define in components.js
const Components = {
    // ... existing components
    
    createProgressBar(value, max = 100, label = '') {
        const percentage = (value / max) * 100;
        return `
            <div class="progress-container">
                ${label ? `<span>${label}</span>` : ''}
                <div class="progress-bar" style="width: ${percentage}%">
                    <span>${percentage}%</span>
                </div>
            </div>
        `;
    }
};

// 2. Use anywhere
document.getElementById('stats').innerHTML = `
    ${Components.createProgressBar(75, 100, 'Completion')}
`;
```

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/smartcity-pulse.git

# Navigate to project
cd smartcity-pulse

# Open index.html in your browser
# Or use Live Server in VS Code

# No build tools, no dependencies, just pure HTML/CSS/JS!
```

---

## 🤝 Contributing

We welcome contributions! Since this follows the DRY principle:

1. **Never duplicate code** - Extract to shared modules
2. **Use utility classes** - Avoid inline CSS
3. **Follow modular structure** - Each file has a purpose
4. **Update documentation** - Keep README in sync
5. **Test thoroughly** - Ensure changes don't break existing functionality

---

## 📄 License

MIT License - Free to use, modify, and distribute.

---

## 🙏 Final Note

This project demonstrates that **you don't need complex frameworks** to build professional, maintainable applications. With proper organization and adherence to the DRY principle, vanilla HTML/CSS/JS can power sophisticated SPAs efficiently.

---

<div align="center">

**Built with ❤️ using HTML, CSS, and JavaScript**

*Clean code. Reusable components. No repetition.*

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/yourusername/smartcity-pulse)

</div>
