/**
 * SmartCity Pulse Hub - Core Application Engine
 * Intelligent Urban Management & Citizen Engagement Platform
 * 
 * Contains global state engine, LocalStorage persistence, SPA routing,
 * Leaflet interactive mapping with category filters & GPS geolocation,
 * Chart.js analytics, dynamic telemetry simulation, audio synthesized chimes,
 * incident audit modals, admin triage desk with search/filter/CSV export,
 * and live citizen reporting with photo upload & upvoting.
 */

// --- DEFAULT SYSTEM DATABASE (NAGPUR, INDIA DEMO ENVIRONMENT) ---
const INITIAL_DEMO_ISSUES = [
    {
        id: 'REP-1024',
        title: 'Pothole detected on Central Avenue',
        description: 'A deep 2-foot wide pothole causing vehicles to swerve dangerously in the middle lane of Central Avenue, near Telephone Exchange Sq, Nagpur.',
        category: 'roads',
        priority: 'high',
        status: 'progress',
        locationText: 'Central Avenue, near Telephone Exchange Sq, Nagpur',
        coords: [21.1491, 79.0862],
        reporter: 'Sankalp Gaidhane',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=128&auto=format&fit=crop',
        loggedDate: '2026-06-01 10:14 AM',
        image: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=400&auto=format&fit=crop',
        upvotes: 24,
        timeline: [
            { status: 'pending', date: '2026-06-01 10:14 AM', note: 'Report submitted by citizen Sankalp Gaidhane.' },
            { status: 'review', date: '2026-06-01 11:30 AM', note: 'Triaged by Public Works Dispatcher. Dispatched to Sector 1 Road Crew.' },
            { status: 'progress', date: '2026-06-01 02:45 PM', note: 'Sector 1 Road Crew marked crew active. Excavation and resurfacing in progress.' }
        ]
    },
    {
        id: 'REP-1023',
        title: 'Broken streetlight in Civil Lines',
        description: 'Light pole #42 on Civil Lines road is completely dead, leaving the Kasturchand Park side entrance pitch black and unsafe at night.',
        category: 'utilities',
        priority: 'medium',
        status: 'resolved',
        locationText: 'Civil Lines, near Kasturchand Park, Nagpur',
        coords: [21.1448, 79.0916],
        reporter: 'Sankalp Gaidhane',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=128&auto=format&fit=crop',
        loggedDate: '2026-05-28 09:30 PM',
        image: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?q=80&w=400&auto=format&fit=crop',
        upvotes: 19,
        timeline: [
            { status: 'pending', date: '2026-05-28 09:30 PM', note: 'Report submitted by citizen Sankalp Gaidhane.' },
            { status: 'review', date: '2026-05-29 08:00 AM', note: 'Case inspected. Work order #E-893 assigned.' },
            { status: 'progress', date: '2026-05-29 10:15 AM', note: 'Electrical maintenance team on-site replacing LED ballast.' },
            { status: 'resolved', date: '2026-05-29 01:20 PM', note: 'LED luminaire restored. Lumens verified nominal.' }
        ]
    },
    {
        id: 'REP-1022',
        title: 'Water leakage in Dharampeth',
        description: 'Clean drinking water pouring out of a cracked pavement grid section at a rapid rate near Coffee House Sq, flooding the main pedestrian path.',
        category: 'water',
        priority: 'high',
        status: 'review',
        locationText: 'Dharampeth, VIP Road near Coffee House Sq, Nagpur',
        coords: [21.1515, 79.0959],
        reporter: 'Nehal Gaharwar',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=128&auto=format&fit=crop',
        loggedDate: '2026-06-02 08:45 AM',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=400&auto=format&fit=crop',
        upvotes: 32,
        timeline: [
            { status: 'pending', date: '2026-06-02 08:45 AM', note: 'Report submitted by citizen Nehal Gaharwar.' },
            { status: 'review', date: '2026-06-02 09:12 AM', note: 'Water Authority Dispatch alerted. Crew scheduled for emergency valve shutoff.' }
        ]
    },
    {
        id: 'REP-1021',
        title: 'Overflowing garbage bin near Sitabuldi',
        description: 'Main public waste container is overloaded near Sitabuldi Metro Station. Loose garbage scattered on sidewalk, attracting local pests.',
        category: 'sanitation',
        priority: 'low',
        status: 'pending',
        locationText: 'Sitabuldi Main Road, adjacent to Metro Station, Nagpur',
        coords: [21.1464, 79.0802],
        reporter: 'David K.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=128&auto=format&fit=crop',
        loggedDate: '2026-06-02 11:30 AM',
        image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=400&auto=format&fit=crop',
        upvotes: 11,
        timeline: [
            { status: 'pending', date: '2026-06-02 11:30 AM', note: 'Report submitted by citizen David K.' }
        ]
    },
    {
        id: 'REP-1020',
        title: 'Damaged traffic signal in Sadar',
        description: 'The traffic light housing has fallen sideways and is flickering yellow at Sadar intersection. Causing significant junction gridlock.',
        category: 'signals',
        priority: 'high',
        status: 'progress',
        locationText: 'Sadar, Residency Road Intersection, Nagpur',
        coords: [21.1425, 79.0876],
        reporter: 'Sankalp Gaidhane',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=128&auto=format&fit=crop',
        loggedDate: '2026-06-01 07:12 AM',
        image: 'https://images.unsplash.com/photo-1510936111840-a29623ca3d42?q=80&w=400&auto=format&fit=crop',
        upvotes: 27,
        timeline: [
            { status: 'pending', date: '2026-06-01 07:12 AM', note: 'Report submitted by citizen Sankalp Gaidhane.' },
            { status: 'review', date: '2026-06-01 08:30 AM', note: 'Triage team assigned priority. Transit control tower notified.' },
            { status: 'progress', date: '2026-06-01 10:20 AM', note: 'Emergency Signal Crew on-site adjusting mounting bracket and optical wiring.' }
        ]
    },
    {
        id: 'REP-1019',
        title: 'Public bus delay reported at Wardha Road',
        description: 'Transit Route 12 express bus delayed by over 45 minutes near Rahate Colony Square without scheduling adjustments or updates on display boards.',
        category: 'transit',
        priority: 'medium',
        status: 'resolved',
        locationText: 'Wardha Road, near Rahate Colony Square, Nagpur',
        coords: [21.1395, 79.0973],
        reporter: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128&auto=format&fit=crop',
        loggedDate: '2026-05-30 04:30 PM',
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400&auto=format&fit=crop',
        upvotes: 15,
        timeline: [
            { status: 'pending', date: '2026-05-30 04:30 PM', note: 'Report submitted by citizen Elena Rostova.' },
            { status: 'review', date: '2026-05-30 04:50 PM', note: 'Transit authority reviewed GPS schedules.' },
            { status: 'progress', date: '2026-05-30 05:15 PM', note: 'Backup shuttle bus deployed to Bay 4 to alleviate crowds.' },
            { status: 'resolved', date: '2026-05-30 06:00 PM', note: 'Shuttle departed. Regular schedule resumed. Communications logged.' }
        ]
    },
    {
        id: 'REP-1018',
        title: 'Road maintenance request in Ramdaspeth',
        description: 'Requesting re-striping of pedestrian crosswalk markings near Ramdaspeth Canal Road. The paint has faded completely, making it unsafe for school kids crossing.',
        category: 'roads',
        priority: 'low',
        status: 'pending',
        locationText: 'Ramdaspeth, Canal Road Crossing, Nagpur',
        coords: [21.1541, 79.0942],
        reporter: 'Sankalp Gaidhane',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=128&auto=format&fit=crop',
        loggedDate: '2026-06-02 12:15 PM',
        image: 'https://images.unsplash.com/photo-1594913785162-e6785b49eed9?q=80&w=400&auto=format&fit=crop',
        upvotes: 8,
        timeline: [
            { status: 'pending', date: '2026-06-02 12:15 PM', note: 'Report submitted by citizen Sankalp Gaidhane.' }
        ]
    }
];

const INITIAL_DEMO_NOTIFICATIONS = [
    {
        id: 'notif-1',
        type: 'alert',
        title: 'Power Grid Alert',
        message: 'Scheduled grid upgrades in Sector 4 scheduled for 1:00 AM to 4:00 AM tonight. Intermittent utility outages may occur.',
        time: '2 hours ago',
        read: false
    },
    {
        id: 'notif-2',
        type: 'update',
        title: 'Issue Resolved - Streetlight',
        message: 'Broken streetlight near Kasturchand Park (REP-1023) has been marked as RESOLVED by public works team.',
        time: 'Yesterday',
        read: true
    },
    {
        id: 'notif-3',
        type: 'announcement',
        title: 'Clean City Program',
        message: 'Municipal Commissioner announces new trash collection routes starting next week to improve sanitation efficiency in Market Area.',
        time: '3 days ago',
        read: true
    }
];

// --- LOCAL STORAGE PERSISTENCE KEYS ---
const STORAGE_KEYS = {
    ISSUES: 'smartcity_pulse_issues_v2',
    NOTIFS: 'smartcity_pulse_notifs_v2',
    THEME: 'smartcity_pulse_theme_v2',
    ROLE: 'smartcity_pulse_role_v2',
    PREFS: 'smartcity_pulse_prefs_v2',
    UPVOTES: 'smartcity_pulse_upvotes_v2'
};

// --- GLOBAL APPLICATION STATE ENGINE ---
const SmartCityApp = {
    userRole: 'citizen', // 'citizen' or 'admin'
    currentTheme: 'dark',
    activePage: 'home',
    
    // Persistent lists
    issues: [],
    notifications: [],
    userUpvotes: {}, // { 'REP-1024': true }
    
    // Notification & Sound Preferences
    preferences: {
        highAlerts: true,
        statusUpdates: true,
        generalBulletins: false,
        soundEnabled: true
    },

    // Current map filter for citizen dashboard
    activeMapCategory: 'all',

    // Simulated Telemetry Sensors
    telemetry: {
        aqi: 42,
        waterPressure: 3.2,
        powerLoad: 64,
        transitEfficiency: 98
    },

    // Leaflet Maps Storage
    maps: {
        dashboard: null,
        picker: null
    },
    
    // Marker tracking
    markers: {
        dashboard: [],
        pickerMarker: null,
        userLocationMarker: null
    },

    // Selected GPS coords for new report form (Nagpur, India)
    selectedReportCoords: [21.14580, 79.08820],
    
    // Modal active issue
    modalCurrentIssueId: null
};

// --- WEB AUDIO API SYNTHESIZER ---
class CitySoundEngine {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    play(type = 'success') {
        if (!SmartCityApp.preferences.soundEnabled) return;
        try {
            this.init();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            if (type === 'success') {
                // Happy chord progression (C5 -> E5 -> G5)
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, now); // C5
                osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
                osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.start(now);
                osc.stop(now + 0.36);
            } else if (type === 'alert') {
                // Emergency alert pulse (880Hz -> 587Hz)
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(880.00, now); // A5
                osc.frequency.setValueAtTime(587.33, now + 0.12); // D5
                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
                osc.start(now);
                osc.stop(now + 0.46);
            } else if (type === 'info') {
                // Subtle soft pip
                osc.type = 'sine';
                osc.frequency.setValueAtTime(587.33, now);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.21);
            }
        } catch (e) {
            // Audio context not allowed until interaction or unsupported
        }
    }
}
const soundEngine = new CitySoundEngine();

// --- STATE MANAGEMENT & LOCAL STORAGE ---
function loadPersistedState() {
    // 1. Issues
    try {
        const savedIssues = localStorage.getItem(STORAGE_KEYS.ISSUES);
        SmartCityApp.issues = savedIssues ? JSON.parse(savedIssues) : JSON.parse(JSON.stringify(INITIAL_DEMO_ISSUES));
    } catch (e) {
        SmartCityApp.issues = JSON.parse(JSON.stringify(INITIAL_DEMO_ISSUES));
    }

    // 2. Notifications
    try {
        const savedNotifs = localStorage.getItem(STORAGE_KEYS.NOTIFS);
        SmartCityApp.notifications = savedNotifs ? JSON.parse(savedNotifs) : JSON.parse(JSON.stringify(INITIAL_DEMO_NOTIFICATIONS));
    } catch (e) {
        SmartCityApp.notifications = JSON.parse(JSON.stringify(INITIAL_DEMO_NOTIFICATIONS));
    }

    // 3. User Upvotes
    try {
        const savedUpvotes = localStorage.getItem(STORAGE_KEYS.UPVOTES);
        SmartCityApp.userUpvotes = savedUpvotes ? JSON.parse(savedUpvotes) : {};
    } catch (e) {
        SmartCityApp.userUpvotes = {};
    }

    // 4. Preferences
    try {
        const savedPrefs = localStorage.getItem(STORAGE_KEYS.PREFS);
        if (savedPrefs) {
            SmartCityApp.preferences = { ...SmartCityApp.preferences, ...JSON.parse(savedPrefs) };
        }
    } catch (e) {}

    // 5. Theme
    try {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
        if (savedTheme) SmartCityApp.currentTheme = savedTheme;
    } catch (e) {}

    // 6. Role
    try {
        const savedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
        if (savedRole) SmartCityApp.userRole = savedRole;
    } catch (e) {}
}

function persistState() {
    try {
        localStorage.setItem(STORAGE_KEYS.ISSUES, JSON.stringify(SmartCityApp.issues));
        localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(SmartCityApp.notifications));
        localStorage.setItem(STORAGE_KEYS.UPVOTES, JSON.stringify(SmartCityApp.userUpvotes));
        localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(SmartCityApp.preferences));
        localStorage.setItem(STORAGE_KEYS.THEME, SmartCityApp.currentTheme);
        localStorage.setItem(STORAGE_KEYS.ROLE, SmartCityApp.userRole);
    } catch (e) {
        console.warn('Storage quota exceeded or disabled:', e);
    }
}

// Reset Demo Data
function resetDemoData() {
    if (!confirm('Are you sure you want to reset all incidents and telemetry back to default demo state?')) return;
    SmartCityApp.issues = JSON.parse(JSON.stringify(INITIAL_DEMO_ISSUES));
    SmartCityApp.notifications = JSON.parse(JSON.stringify(INITIAL_DEMO_NOTIFICATIONS));
    SmartCityApp.userUpvotes = {};
    persistState();
    
    updateGlobalUIStats();
    updateMapMarkers();
    renderTrackerList();
    renderAdminTriageTable();
    renderNotifications();
    initAnalyticsCharts();
    
    soundEngine.play('info');
    showToast('Demo Data Restored', 'Platform state has been reset to default Nagpur municipal demo parameters.', 'info');
}

// --- INITIALIZATION HOOKS ---
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initApp();
    });
} else {
    initApp();
}

// Expose SmartCityApp and core methods globally on window
window.SmartCityApp = SmartCityApp;
SmartCityApp.init = initApp;
SmartCityApp.loadPersistedState = loadPersistedState;
SmartCityApp.persistState = persistState;
SmartCityApp.resetDemoData = resetDemoData;

function initApp() {
    // 0. Load persistent state
    loadPersistedState();

    // 1. Setup Navigation & Router
    initRouter();
    
    // 2. Setup Role Switchers
    initRoleSwitchers();
    
    // 3. Setup Theme Switcher
    initThemeSwitcher();
    
    // 4. Setup Live Clock
    initClock();
    
    // 5. Setup Form Listeners & Drag/Drop
    initForms();

    // 6. Setup Category Selection in Report Form
    initCategoryPicker();

    // 7. Setup Live Telemetry Simulation
    startTelemetrySimulation();

    // 8. Setup Notification Feed & Preferences
    initNotificationPreferences();
    renderNotifications();

    // 9. Setup Map Category Filters & Controls
    initMapControls();

    // 10. Setup Modal System
    initModals();

    // 11. Setup Admin Toolbar & Exports
    initAdminToolbar();

    // 12. Setup FAQ Accordion Toggles
    initFaqs();

    // 13. Initial UI Draw & Global Stats
    updateGlobalUIStats();
    renderCitizenActivityFeed();
    
    // 14. Direct to initial view (hash or home)
    handleNavigation(window.location.hash || '#home');
}

// --- CLOCK MODULE ---
function initClock() {
    const clockEl = document.getElementById('headerClock');
    if (!clockEl) return;
    const updateTime = () => {
        const now = new Date();
        clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };
    setInterval(updateTime, 1000);
    updateTime();
}

// --- INTERACTIVE SPA ROUTER ---
function initRouter() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
        handleNavigation(window.location.hash);
    });

    // Setup sidebar nav links click handlers
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            window.location.hash = `#${target}`;
            
            // Close mobile sidebar if open
            const sidebar = document.getElementById('appSidebar');
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Header Notification Button click -> route to notifications
    const headerNotifBtn = document.getElementById('headerNotifBtn');
    if (headerNotifBtn) {
        headerNotifBtn.addEventListener('click', () => {
            window.location.hash = '#notifications';
        });
    }

    // Mobile Hamburger Menu toggle
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('appSidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('open');
        });
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== toggleBtn) {
                sidebar.classList.remove('open');
            }
        });
    }
}

function handleNavigation(hash) {
    const page = hash.replace('#', '') || 'home';
    const pageView = document.getElementById(`view-${page}`);
    
    if (!pageView) {
        window.location.hash = '#home';
        return;
    }
    
    // Update active class on views
    document.querySelectorAll('.page-view').forEach(view => {
        view.classList.remove('active');
    });
    pageView.classList.add('active');
    
    // Update active class on sidebar navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === page) {
            link.classList.add('active');
        }
    });

    SmartCityApp.activePage = page;

    // Trigger page-specific modules on load to prevent rendering artifacts (Leaflet, Charts)
    triggerPageModuleInit(page);
    
    // Scroll window back to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function triggerPageModuleInit(page) {
    if (page === 'citizen-dashboard') {
        setTimeout(() => {
            initDashboardMap();
        }, 80);
    } else if (page === 'report-issue') {
        setTimeout(() => {
            initPickerMap();
        }, 80);
    } else if (page === 'issue-tracking') {
        renderTrackerList();
        initTrackerFilterTabs();
    } else if (page === 'smart-analytics') {
        setTimeout(() => {
            initAnalyticsCharts();
        }, 80);
    } else if (page === 'admin-dashboard') {
        renderAdminTriageTable();
    }
}

// --- USER ROLE SWITCHER ---
function initRoleSwitchers() {
    const btnCit = document.getElementById('roleBtnCitizen');
    const btnAdm = document.getElementById('roleBtnAdmin');
    
    const sidebarAvatar = document.getElementById('sidebarAvatar');
    const sidebarUsername = document.getElementById('sidebarUsername');
    const sidebarRole = document.getElementById('sidebarRole');

    const applyRoleUI = (role) => {
        SmartCityApp.userRole = role;
        persistState();
        
        if (role === 'citizen') {
            if (btnCit) btnCit.classList.add('active');
            if (btnAdm) btnAdm.classList.remove('active');
            
            if (sidebarAvatar) sidebarAvatar.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=128&auto=format&fit=crop';
            if (sidebarUsername) sidebarUsername.textContent = 'Sankalp Gaidhane';
            if (sidebarRole) sidebarRole.textContent = 'Verified Citizen';
        } else {
            if (btnCit) btnCit.classList.remove('active');
            if (btnAdm) btnAdm.classList.add('active');
            
            if (sidebarAvatar) sidebarAvatar.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=128&auto=format&fit=crop';
            if (sidebarUsername) sidebarUsername.textContent = 'Chief Dispatcher';
            if (sidebarRole) sidebarRole.textContent = 'Municipal Operations';
        }
        updateGlobalUIStats();
    };

    const toggleToRole = (role) => {
        applyRoleUI(role);
        soundEngine.play('info');

        if (role === 'citizen') {
            showToast('Role Switched', 'Viewing platform as Sankalp Gaidhane (Verified Citizen).', 'info');
            if (SmartCityApp.activePage === 'admin-dashboard') {
                window.location.hash = '#citizen-dashboard';
            }
        } else {
            showToast('Role Switched', 'Viewing platform as Chief Operations Admin.', 'info');
            if (SmartCityApp.activePage === 'citizen-dashboard') {
                window.location.hash = '#admin-dashboard';
            }
        }
    };

    if (btnCit) btnCit.addEventListener('click', () => toggleToRole('citizen'));
    if (btnAdm) btnAdm.addEventListener('click', () => toggleToRole('admin'));

    // Apply stored role
    applyRoleUI(SmartCityApp.userRole);
}

// --- THEME SWITCHER (DARK/LIGHT MODE) ---
function initThemeSwitcher() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeToggleIcon');
    
    // Apply saved theme on start
    document.documentElement.setAttribute('data-theme', SmartCityApp.currentTheme);
    if (themeIcon) {
        themeIcon.className = SmartCityApp.currentTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            SmartCityApp.currentTheme = newTheme;
            persistState();
            
            if (themeIcon) {
                themeIcon.className = newTheme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
            }
            themeBtn.title = newTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
            
            // Invalidate Leaflet map tile sizes
            if (SmartCityApp.maps.dashboard) SmartCityApp.maps.dashboard.invalidateSize();
            if (SmartCityApp.maps.picker) SmartCityApp.maps.picker.invalidateSize();
            
            // Redraw charts with adapted colors
            if (SmartCityApp.activePage === 'smart-analytics') {
                initAnalyticsCharts();
            }

            soundEngine.play('info');
            showToast('Theme Updated', `Switched application to ${newTheme} mode.`, 'info');
        });
    }
}

// --- INTERACTIVE LEAFLET SMART MAPS ---
function initDashboardMap() {
    const mapContainer = document.getElementById('dashboardMap');
    if (!mapContainer) return;
    
    if (SmartCityApp.maps.dashboard) {
        SmartCityApp.maps.dashboard.invalidateSize();
        updateMapMarkers();
        return;
    }

    // Centered around Nagpur, India
    const map = L.map('dashboardMap', {
        zoomControl: false,
        attributionControl: false
    }).setView([21.1458, 79.0882], 13);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // CartoDB Voyager tiles (crisp & high-definition)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 20
    }).addTo(map);

    SmartCityApp.maps.dashboard = map;
    updateMapMarkers();
}

function updateMapMarkers() {
    const map = SmartCityApp.maps.dashboard;
    if (!map) return;
    
    // Clear old markers
    SmartCityApp.markers.dashboard.forEach(marker => map.removeLayer(marker));
    SmartCityApp.markers.dashboard = [];
    
    const getMarkerColor = (priority) => {
        if (priority === 'high') return '#ff3366'; // Red-Pink
        if (priority === 'medium') return '#ff9f1c'; // Amber
        return '#00f5d4'; // Cyan
    };

    // Filter by active category if not 'all'
    const visibleIssues = SmartCityApp.issues.filter(issue => {
        if (SmartCityApp.activeMapCategory === 'all') return true;
        return issue.category === SmartCityApp.activeMapCategory;
    });

    visibleIssues.forEach(issue => {
        const color = getMarkerColor(issue.priority);
        
        const svgIcon = L.divIcon({
            html: `<div style="background: ${color}; width: 15px; height: 15px; border-radius: 50%; border: 2.5px solid #fff; box-shadow: 0 0 12px ${color}; cursor: pointer;"></div>`,
            className: 'custom-map-marker',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        const popupContent = `
            <div style="font-family: var(--font-body); padding: 4px; min-width: 210px;">
                <h4 style="margin: 0 0 6px 0; font-size: 0.88rem; font-weight: 700; color: #fff;">${issue.title}</h4>
                <p style="margin: 0 0 8px 0; font-size: 0.72rem; color: #8e9bb2;"><i class="fa-solid fa-location-dot" style="color: var(--accent-cyan);"></i> ${issue.locationText}</p>
                <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 10px;">
                    <span class="badge" style="background: rgba(255,255,255,0.08); color: #fff; padding: 2px 7px; font-size: 0.65rem; border-radius: 4px;">${issue.category.toUpperCase()}</span>
                    <span class="badge" style="background: rgba(255,255,255,0.08); color: ${color}; padding: 2px 7px; font-size: 0.65rem; border-radius: 4px;">${issue.priority.toUpperCase()}</span>
                    <span class="badge" style="background: rgba(0,245,212,0.1); color: #00f5d4; padding: 2px 7px; font-size: 0.65rem; border-radius: 4px;">${issue.status.toUpperCase()}</span>
                </div>
                <div style="display: flex; gap: 8px; justify-content: space-between; align-items: center;">
                    <button onclick="openIncidentDetailModal('${issue.id}')" style="background: var(--gradient-cyan); border: none; color: #080c14; padding: 5px 10px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; cursor: pointer;">
                        View Audit
                    </button>
                    <a href="#issue-tracking" onclick="setTrackerSelectedSearch('${issue.id}')" style="font-size: 0.7rem; font-weight: 600; color: #00f5d4; text-decoration: none;">
                        Track Issue →
                    </a>
                </div>
            </div>
        `;

        const marker = L.marker(issue.coords, { icon: svgIcon }).bindPopup(popupContent).addTo(map);
        marker.issueId = issue.id;
        SmartCityApp.markers.dashboard.push(marker);
    });
}

// Map Controls: Category Filter Buttons & Locate Me
function initMapControls() {
    const filterButtons = document.querySelectorAll('#mapCategoryFilters .map-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            SmartCityApp.activeMapCategory = btn.getAttribute('data-cat') || 'all';
            updateMapMarkers();
            soundEngine.play('info');
        });
    });

    // Locate Me on Dashboard Map
    const btnLocateDash = document.getElementById('btnLocateDashboardMap');
    if (btnLocateDash) {
        btnLocateDash.addEventListener('click', () => {
            locateUserOnDashboardMap();
        });
    }

    // Locate Me on Picker Map
    const btnLocatePicker = document.getElementById('btnLocatePickerMap');
    if (btnLocatePicker) {
        btnLocatePicker.addEventListener('click', () => {
            locateUserOnPickerMap();
        });
    }
}

function locateUserOnDashboardMap() {
    const map = SmartCityApp.maps.dashboard;
    if (!map) return;

    if ('geolocation' in navigator) {
        showToast('Acquiring GPS', 'Retrieving satellite coordinates...', 'info');
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                map.flyTo([lat, lng], 15, { duration: 1.5 });

                if (SmartCityApp.markers.userLocationMarker) {
                    map.removeLayer(SmartCityApp.markers.userLocationMarker);
                }

                const userIcon = L.divIcon({
                    html: `<div style="background: #00bbf9; width: 18px; height: 18px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 16px #00bbf9; animation: floatAnimation 2s infinite;"></div>`,
                    className: 'user-gps-marker',
                    iconSize: [18, 18],
                    iconAnchor: [9, 9]
                });

                SmartCityApp.markers.userLocationMarker = L.marker([lat, lng], { icon: userIcon })
                    .bindPopup('<b style="color:#fff;">You are here</b><br><span style="font-size:0.7rem; color:#8e9bb2;">Live Citizen GPS Fix</span>')
                    .addTo(map)
                    .openPopup();

                soundEngine.play('success');
                showToast('Location Locked', `Position: ${lat.toFixed(5)}, ${lng.toFixed(5)}`, 'success');
            },
            (err) => {
                // Fallback gracefully to Nagpur center
                map.flyTo([21.1458, 79.0882], 14, { duration: 1.2 });
                soundEngine.play('info');
                showToast('Nagpur Center', 'Displaying central Nagpur municipal grid coordinates.', 'info');
            },
            { timeout: 7000 }
        );
    } else {
        map.flyTo([21.1458, 79.0882], 14);
    }
}

function locateUserOnPickerMap() {
    const map = SmartCityApp.maps.picker;
    if (!map) return;

    if ('geolocation' in navigator) {
        showToast('Detecting GPS', 'Triangulating current position for report...', 'info');
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                drawPickerMarker([lat, lng]);
                updateFormCoordinates(lat, lng);
                map.flyTo([lat, lng], 15);
                soundEngine.play('success');
                showToast('Coordinates Selected', `GPS locked at ${lat.toFixed(5)}, ${lng.toFixed(5)}`, 'success');
            },
            (err) => {
                const defaultCenter = [21.14580, 79.08820];
                drawPickerMarker(defaultCenter);
                updateFormCoordinates(defaultCenter[0], defaultCenter[1]);
                showToast('Nagpur Standard Coords', 'Defaulted to Nagpur city center coordinates.', 'info');
            },
            { timeout: 7000 }
        );
    }
}

// Map coordinates picker inside reporting view
function initPickerMap() {
    const pickerContainer = document.getElementById('pickerMap');
    if (!pickerContainer) return;

    if (SmartCityApp.maps.picker) {
        SmartCityApp.maps.picker.invalidateSize();
        return;
    }

    const map = L.map('pickerMap', {
        zoomControl: false,
        attributionControl: false
    }).setView([21.1458, 79.0882], 13);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 20
    }).addTo(map);

    SmartCityApp.maps.picker = map;

    // Draw initial center marker
    drawPickerMarker(map.getCenter());

    // Click event to retrieve exact coordinates
    map.on('click', (e) => {
        drawPickerMarker(e.latlng);
        updateFormCoordinates(e.latlng.lat, e.latlng.lng);
        soundEngine.play('info');
    });
}

function drawPickerMarker(latlng) {
    const map = SmartCityApp.maps.picker;
    if (!map) return;

    if (SmartCityApp.markers.pickerMarker) {
        map.removeLayer(SmartCityApp.markers.pickerMarker);
    }

    const svgIcon = L.divIcon({
        html: `<div style="background: #9b5de5; width: 16px; height: 16px; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 15px #9b5de5; animation: floatAnimation 3s ease-in-out infinite;"></div>`,
        className: 'custom-picker-marker',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
    });

    SmartCityApp.markers.pickerMarker = L.marker(latlng, { icon: svgIcon }).addTo(map);
    map.panTo(latlng);
}

function updateFormCoordinates(lat, lng) {
    SmartCityApp.selectedReportCoords = [lat, lng];
    const coordValEl = document.getElementById('reportCoordinates');
    if (coordValEl) {
        coordValEl.textContent = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }

    // Auto-suggest Nagpur neighborhood if user hasn't typed an address yet
    const locInput = document.getElementById('reportLocationText');
    if (locInput && !locInput.value.trim()) {
        const sampleLocations = [
            'Civil Lines, near High Court Square, Nagpur',
            'Dharampeth, VIP Road near Coffee House Sq, Nagpur',
            'Sadar, Residency Road Intersection, Nagpur',
            'Central Avenue, near Telephone Exchange Sq, Nagpur',
            'Sitabuldi Main Road, adjacent to Metro Station, Nagpur',
            'Wardha Road, near Rahate Colony Square, Nagpur',
            'Ramdaspeth, Canal Road Crossing, Nagpur',
            'Medical Square, Medical College Road, Nagpur'
        ];
        const randomLoc = sampleLocations[Math.floor(Math.random() * sampleLocations.length)];
        locInput.value = randomLoc;
    }
}

// Locate an issue on the main map directly from list card or modal
window.locateIssueOnMap = (id) => {
    const issue = SmartCityApp.issues.find(iss => iss.id === id);
    if (!issue) return;

    // Navigate to citizen dashboard
    window.location.hash = '#citizen-dashboard';

    // Close any open modals
    closeAllModals();

    setTimeout(() => {
        initDashboardMap();
        const map = SmartCityApp.maps.dashboard;
        if (map) {
            map.flyTo(issue.coords, 16, { duration: 1.2 });
            setTimeout(() => {
                const targetMarker = SmartCityApp.markers.dashboard.find(m => m.issueId === issue.id);
                if (targetMarker) targetMarker.openPopup();
            }, 1250);
        }
    }, 150);
};

// Helper to open issue tracking direct from map click
window.setTrackerSelectedSearch = (id) => {
    setTimeout(() => {
        const searchInput = document.getElementById('trackSearch');
        if (searchInput) {
            searchInput.value = id;
            searchInput.dispatchEvent(new Event('input'));
        }
    }, 150);
};

// --- CHART.JS VISUALIZATION ANALYTICS ---
let chartCategoryDistInstance = null;
let chartActivityTrendInstance = null;
let chartSectorPerfInstance = null;

function initAnalyticsCharts() {
    const canvasDist = document.getElementById('chartCategoryDist');
    const canvasTrend = document.getElementById('chartActivityTrend');
    const canvasSector = document.getElementById('chartSectorPerf');
    
    if (!canvasDist || !canvasTrend || !canvasSector) return;

    const isDark = SmartCityApp.currentTheme === 'dark';
    const textPrimary = isDark ? '#f3f6fc' : '#121824';
    const borderVal = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

    // Gather Category distribution counts directly from the array state
    const categoryCounts = { roads: 0, utilities: 0, water: 0, sanitation: 0, signals: 0, transit: 0 };
    SmartCityApp.issues.forEach(iss => {
        if (categoryCounts[iss.category] !== undefined) {
            categoryCounts[iss.category]++;
        }
    });

    // 1. DOUGHNUT CHART - CATEGORY DISTRIBUTION
    if (chartCategoryDistInstance) chartCategoryDistInstance.destroy();
    chartCategoryDistInstance = new Chart(canvasDist, {
        type: 'doughnut',
        data: {
            labels: ['Roads & Pavements', 'Utilities & Lighting', 'Water Systems', 'Waste & Sanitation', 'Traffic Signals', 'Transit Route'],
            datasets: [{
                data: [
                    categoryCounts.roads,
                    categoryCounts.utilities,
                    categoryCounts.water,
                    categoryCounts.sanitation,
                    categoryCounts.signals,
                    categoryCounts.transit
                ],
                backgroundColor: ['#00bbf9', '#fee440', '#00f5d4', '#f15bb5', '#ff3366', '#9b5de5'],
                borderWidth: 2,
                borderColor: isDark ? '#121b2f' : '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: textPrimary, font: { family: 'Plus Jakarta Sans', size: 10 } }
                }
            },
            cutout: '65%'
        }
    });

    // 2. LINE CHART - WEEKLY TREND REPORTING
    if (chartActivityTrendInstance) chartActivityTrendInstance.destroy();
    chartActivityTrendInstance = new Chart(canvasTrend, {
        type: 'line',
        data: {
            labels: ['May W1', 'May W2', 'May W3', 'May W4', 'June W1', 'Current'],
            datasets: [{
                label: 'Reports Filed',
                data: [12, 19, 15, 22, 18, SmartCityApp.issues.length],
                borderColor: '#00f5d4',
                backgroundColor: 'rgba(0, 245, 212, 0.08)',
                borderWidth: 3,
                fill: true,
                tension: 0.35,
                pointBackgroundColor: '#00f5d4',
                pointBorderWidth: 2,
                pointBorderColor: '#fff',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { color: borderVal },
                    ticks: { color: textPrimary, font: { family: 'Plus Jakarta Sans', size: 10 } }
                },
                y: {
                    grid: { color: borderVal },
                    ticks: { color: textPrimary, font: { family: 'Plus Jakarta Sans', size: 10 }, stepSize: 5 }
                }
            }
        }
    });

    // 3. BAR CHART - REGION RESOLUTIONS
    if (chartSectorPerfInstance) chartSectorPerfInstance.destroy();
    chartSectorPerfInstance = new Chart(canvasSector, {
        type: 'bar',
        data: {
            labels: ['Sector 1 (Civil Lines)', 'Sector 2 (Dharampeth)', 'Sector 3 (Sitabuldi)', 'Sector 4 (Sadar)', 'Sector 5 (Ramdaspeth)', 'Sector 6 (Wardha Rd)'],
            datasets: [{
                label: 'SLA Response Rate (%)',
                data: [96.4, 94.2, 98.1, 91.5, 95.8, 93.4],
                backgroundColor: 'rgba(155, 93, 229, 0.45)',
                borderColor: '#9b5de5',
                borderWidth: 2,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { color: borderVal },
                    ticks: { color: textPrimary, font: { family: 'Plus Jakarta Sans', size: 10 } },
                    max: 100
                },
                y: {
                    grid: { display: false },
                    ticks: { color: textPrimary, font: { family: 'Plus Jakarta Sans', size: 10, weight: 'bold' } }
                }
            }
        }
    });
}

// --- CITIZEN REPORTING FORM ENGINE ---
let uploadedFileSimBase64 = null;

function initCategoryPicker() {
    const options = document.querySelectorAll('#reportCategoryPicker .category-option');
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            soundEngine.play('info');
        });
    });
}

function initForms() {
    const reportForm = document.getElementById('issueReportForm');
    const uploaderContainer = document.getElementById('uploadMockContainer');
    const uploaderInput = document.getElementById('imageInput');
    const uploaderPreview = document.getElementById('uploadPreviewImg');
    const btnAutofill = document.getElementById('btnAutofillReport');

    // Quick Autofill sample button for instant testing
    if (btnAutofill) {
        btnAutofill.addEventListener('click', () => {
            const sampleReports = [
                {
                    category: 'water',
                    title: 'Severe pipeline rupture leaking on Medical Square roadway',
                    location: 'Medical Square, Medical College Road, Nagpur',
                    priority: 'high',
                    desc: 'A ruptured underground pressurized water pipe is gushing drinkable water onto the north intersection lanes, eroding tarmac and posing severe hazard to two-wheelers.'
                },
                {
                    category: 'roads',
                    title: 'Large asphalt subsidence near High Court Square',
                    location: 'Civil Lines, High Court Road, Nagpur',
                    priority: 'medium',
                    desc: 'The top asphalt layer has caved in by 8 inches over a 10-meter stretch following heavy rainfall. Traffic is bottlenecked during peak hours.'
                },
                {
                    category: 'signals',
                    title: 'Pedestrian countdown light destroyed at Lokmat Square',
                    location: 'Wardha Road, Lokmat Square Crossing, Nagpur',
                    priority: 'high',
                    desc: 'Pedestrian signal pole was struck by a vehicle; signal is dislodged and live wires are exposed at street level.'
                }
            ];
            const sample = sampleReports[Math.floor(Math.random() * sampleReports.length)];
            
            // Set category
            const options = document.querySelectorAll('#reportCategoryPicker .category-option');
            options.forEach(opt => {
                if (opt.getAttribute('data-value') === sample.category) {
                    opt.classList.add('selected');
                } else {
                    opt.classList.remove('selected');
                }
            });

            document.getElementById('reportTitle').value = sample.title;
            document.getElementById('reportLocationText').value = sample.location;
            document.getElementById('reportPriority').value = sample.priority;
            document.getElementById('reportDescription').value = sample.desc;

            soundEngine.play('info');
            showToast('Sample Data Filled', 'Ready to submit test incident report.', 'info');
        });
    }

    // Drag and drop & file selection handlers
    if (uploaderContainer && uploaderInput) {
        uploaderContainer.addEventListener('click', () => {
            uploaderInput.click();
        });

        const processFile = (file) => {
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    uploadedFileSimBase64 = evt.target.result;
                    uploaderPreview.src = evt.target.result;
                    uploaderPreview.style.display = 'block';
                    uploaderContainer.querySelector('i').style.display = 'none';
                    uploaderContainer.querySelector('span').style.display = 'none';
                    soundEngine.play('info');
                    showToast('Photo Processed', 'Asset photo successfully loaded for incident logging.', 'success');
                };
                reader.readAsDataURL(file);
            } else {
                showToast('Invalid File', 'Please select an image file (PNG, JPG, WebP).', 'error');
            }
        };

        uploaderInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                processFile(e.target.files[0]);
            }
        });

        // Drag and drop events
        uploaderContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploaderContainer.style.borderColor = 'var(--accent-cyan)';
            uploaderContainer.style.background = 'rgba(0, 245, 212, 0.08)';
        });
        uploaderContainer.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploaderContainer.style.borderColor = '';
            uploaderContainer.style.background = '';
        });
        uploaderContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            uploaderContainer.style.borderColor = '';
            uploaderContainer.style.background = '';
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                processFile(e.dataTransfer.files[0]);
            }
        });
    }

    // Report Form Submit
    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const activeCategoryEl = document.querySelector('#reportCategoryPicker .category-option.selected');
            const category = activeCategoryEl ? activeCategoryEl.getAttribute('data-value') : 'roads';
            const title = document.getElementById('reportTitle').value.trim();
            const locationText = document.getElementById('reportLocationText').value.trim();
            const priority = document.getElementById('reportPriority').value;
            const description = document.getElementById('reportDescription').value.trim();

            if (!title || !locationText || !description) {
                showToast('Validation Error', 'Please complete all required fields.', 'error');
                return;
            }

            const defaultMockImages = {
                roads: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=400',
                utilities: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?q=80&w=400',
                water: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=400',
                sanitation: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=400',
                signals: 'https://images.unsplash.com/photo-1510936111840-a29623ca3d42?q=80&w=400',
                transit: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400'
            };

            const imagePath = uploadedFileSimBase64 || defaultMockImages[category];

            const now = new Date();
            const formattedDate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const issueId = 'REP-' + Math.floor(1000 + Math.random() * 9000);

            const newIssue = {
                id: issueId,
                title: title,
                description: description,
                category: category,
                priority: priority,
                status: 'pending',
                locationText: locationText,
                coords: [SmartCityApp.selectedReportCoords[0], SmartCityApp.selectedReportCoords[1]],
                reporter: 'Sankalp Gaidhane',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=128&auto=format&fit=crop',
                loggedDate: formattedDate,
                image: imagePath,
                upvotes: 1,
                timeline: [
                    { status: 'pending', date: formattedDate, note: 'Incident logged online by citizen Sankalp Gaidhane. Assigned triage queue.' }
                ]
            };

            // Push into persistent issues array
            SmartCityApp.issues.unshift(newIssue);

            // Create notification
            const newNotif = {
                id: 'notif-' + Math.floor(1000 + Math.random() * 9000),
                type: 'update',
                title: 'New Incident Logged',
                message: `Report ${issueId} ("${title}") is now registered in the triage queue.`,
                time: 'Just now',
                read: false
            };
            SmartCityApp.notifications.unshift(newNotif);

            // Add activity ticker item
            addActivityTickerItem(`New issue logged: "${title}" in ${locationText}`, priority, false);

            // Persist
            persistState();

            // Reset form details
            reportForm.reset();
            if (uploaderPreview) {
                uploaderPreview.style.display = 'none';
                uploaderPreview.src = '';
                uploadedFileSimBase64 = null;
                uploaderContainer.querySelector('i').style.display = 'block';
                uploaderContainer.querySelector('span').style.display = 'block';
            }

            // Sync Stats, Map, and redirect
            updateGlobalUIStats();
            renderNotifications();
            if (SmartCityApp.maps.dashboard) updateMapMarkers();

            soundEngine.play('success');
            showToast('Incident Submitted Successfully', `Report ID ${issueId} has been submitted to the municipal triage desk.`, 'success');
            
            // Navigate to tracker
            window.location.hash = '#issue-tracking';
        });
    }

    // Contact Query Form listener
    const contactForm = document.getElementById('contactQueryForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const subject = document.getElementById('contactSubject').value;
            const ticketId = 'INQ-' + Math.floor(1000 + Math.random() * 9000);

            // Log notification
            SmartCityApp.notifications.unshift({
                id: 'notif-' + Math.floor(1000 + Math.random() * 9000),
                type: 'update',
                title: `Support Inquiry Received (${ticketId})`,
                message: `Ticket from ${name} regarding ${subject} registered with municipal coordination desk.`,
                time: 'Just now',
                read: false
            });
            persistState();
            renderNotifications();

            soundEngine.play('success');
            showToast('Inquiry Transmitted', `Thank you ${name}. Your ticket (${ticketId}) has been logged. Our dispatch desk will follow up.`, 'success');
            contactForm.reset();
        });
    }
}

// --- ISSUE TRACKING RENDER PIPELINES ---
function initTrackerFilterTabs() {
    const tabs = document.querySelectorAll('.tab-filter-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderTrackerList();
            soundEngine.play('info');
        });
    });

    const searchInput = document.getElementById('trackSearch');
    const selectFilter = document.getElementById('trackCategoryFilter');
    
    if (searchInput) searchInput.addEventListener('input', renderTrackerList);
    if (selectFilter) selectFilter.addEventListener('change', renderTrackerList);
}

function renderTrackerList() {
    const container = document.getElementById('trackerList');
    if (!container) return;

    const activeTab = document.querySelector('.tab-filter-btn.active');
    const filterStatus = activeTab ? activeTab.getAttribute('data-status') : 'all';
    
    const searchVal = document.getElementById('trackSearch') ? document.getElementById('trackSearch').value.toLowerCase().trim() : '';
    const filterCategory = document.getElementById('trackCategoryFilter') ? document.getElementById('trackCategoryFilter').value : 'all';

    container.innerHTML = '';

    // Filter active items
    const filteredIssues = SmartCityApp.issues.filter(issue => {
        if (filterStatus !== 'all' && issue.status !== filterStatus) return false;
        if (filterCategory !== 'all' && issue.category !== filterCategory) return false;
        if (searchVal) {
            const matchesId = issue.id.toLowerCase().includes(searchVal);
            const matchesTitle = issue.title.toLowerCase().includes(searchVal);
            const matchesDesc = issue.description.toLowerCase().includes(searchVal);
            const matchesLoc = issue.locationText.toLowerCase().includes(searchVal);
            return matchesId || matchesTitle || matchesDesc || matchesLoc;
        }
        return true;
    });

    if (filteredIssues.length === 0) {
        container.innerHTML = `
            <div class="glass-card" style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
                <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 16px;"></i>
                <p>No reported infrastructure incidents found matching current filters.</p>
            </div>
        `;
        return;
    }

    filteredIssues.forEach(issue => {
        const card = document.createElement('div');
        card.className = 'glass-card issue-card';
        
        const statuses = ['pending', 'review', 'progress', 'resolved'];
        const currentIdx = statuses.indexOf(issue.status);
        
        let timelineHtml = '<div class="tracking-timeline">';
        statuses.forEach((s, idx) => {
            let stateClass = '';
            if (idx === currentIdx) {
                stateClass = 'active';
            } else if (idx < currentIdx) {
                stateClass = 'completed';
            }
            
            timelineHtml += `
                <div class="timeline-step ${stateClass}">
                    <div class="timeline-circle"></div>
                    <span class="timeline-label">${s === 'review' ? 'In Review' : s}</span>
                    <div class="timeline-line"></div>
                </div>
            `;
        });
        timelineHtml += '</div>';

        const isUpvoted = !!SmartCityApp.userUpvotes[issue.id];
        const upvoteCount = issue.upvotes || 0;

        card.innerHTML = `
            <img src="${issue.image}" alt="${issue.title}" class="issue-card-img" onclick="openIncidentDetailModal('${issue.id}')" style="cursor: pointer;" title="Click to inspect audit details">
            
            <div class="issue-card-body">
                <div class="issue-meta-row">
                    <span><i class="fa-regular fa-folder"></i> ${issue.category.toUpperCase()}</span>
                    <span><i class="fa-regular fa-clock"></i> ${issue.loggedDate}</span>
                    <span><i class="fa-solid fa-hashtag"></i> <strong>${issue.id}</strong></span>
                </div>
                <h3 class="issue-title" onclick="openIncidentDetailModal('${issue.id}')" style="cursor: pointer;" title="Click to inspect audit details">${issue.title}</h3>
                <p class="issue-desc">${issue.description}</p>
                <div class="issue-meta-row" style="margin-top: 6px;">
                    <span><i class="fa-solid fa-location-dot" style="color: var(--accent-cyan);"></i> ${issue.locationText}</span>
                    <span><i class="fa-regular fa-user"></i> Logged by ${issue.reporter}</span>
                </div>
                <div class="issue-actions-row">
                    <button class="upvote-btn ${isUpvoted ? 'upvoted' : ''}" onclick="upvoteIssue('${issue.id}')" title="Citizen endorsement">
                        <i class="fa-solid fa-thumbs-up"></i> <span>${upvoteCount} Confirm</span>
                    </button>
                    <button class="btn-detail-link" onclick="openIncidentDetailModal('${issue.id}')">
                        <i class="fa-solid fa-circle-info"></i> Timeline & Audit
                    </button>
                    <button class="btn-map-locate-issue" onclick="locateIssueOnMap('${issue.id}')">
                        <i class="fa-solid fa-map-location-dot"></i> View on Map
                    </button>
                </div>
            </div>
            
            <div class="issue-card-right">
                <div style="display: flex; gap: 8px;">
                    <span class="badge badge-${issue.status}">${issue.status === 'review' ? 'Under Review' : issue.status}</span>
                    <span class="badge badge-${issue.priority}">${issue.priority} Priority</span>
                </div>
                ${timelineHtml}
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Upvoting system
window.upvoteIssue = (id) => {
    const issue = SmartCityApp.issues.find(i => i.id === id);
    if (!issue) return;

    if (!issue.upvotes) issue.upvotes = 0;

    if (SmartCityApp.userUpvotes[id]) {
        // Toggle off
        delete SmartCityApp.userUpvotes[id];
        issue.upvotes = Math.max(0, issue.upvotes - 1);
        showToast('Upvote Removed', `You unconfirmed issue ${id}.`, 'info');
    } else {
        // Toggle on
        SmartCityApp.userUpvotes[id] = true;
        issue.upvotes += 1;
        soundEngine.play('success');
        showToast('Issue Confirmed (+1)', `You endorsed this report to accelerate municipal triage attention.`, 'success');
        addActivityTickerItem(`Citizen endorsed issue "${issue.title}" (${issue.upvotes} confirms)`, issue.priority, false);
    }

    persistState();
    renderTrackerList();
};

// --- INCIDENT DETAIL MODAL ---
function initModals() {
    const modal = document.getElementById('incidentDetailModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const footerCloseBtn = document.getElementById('modalFooterCloseBtn');
    const btnSubmitNote = document.getElementById('btnSubmitModalNote');
    const btnModalLocate = document.getElementById('btnModalLocateMap');

    // Incident Modal Closes
    if (closeBtn) closeBtn.onclick = () => closeAllModals();
    if (footerCloseBtn) footerCloseBtn.onclick = () => closeAllModals();
    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) closeAllModals();
        };
    }

    // Modal add note submit
    if (btnSubmitNote) {
        btnSubmitNote.onclick = () => {
            const noteInput = document.getElementById('modalNewNoteInput');
            if (!noteInput) return;
            const noteText = noteInput.value.trim();
            if (!noteText) {
                showToast('Note Empty', 'Please enter update text before posting.', 'error');
                return;
            }

            const issue = SmartCityApp.issues.find(i => i.id === SmartCityApp.modalCurrentIssueId);
            if (!issue) return;

            const now = new Date();
            const formattedDate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            const actorName = SmartCityApp.userRole === 'admin' ? 'Chief Operations Dispatcher' : 'Citizen Sankalp Gaidhane';
            issue.timeline.push({
                status: issue.status,
                date: formattedDate,
                note: `[${actorName}]: ${noteText}`
            });

            persistState();
            noteInput.value = '';
            soundEngine.play('success');
            showToast('Note Appended', 'Operational note logged to audit timeline.', 'success');
            
            // Re-render modal timeline and list
            renderModalTimeline(issue);
            renderTrackerList();
            renderAdminTriageTable();
        };
    }

    // Modal locate on map
    if (btnModalLocate) {
        btnModalLocate.onclick = () => {
            if (SmartCityApp.modalCurrentIssueId) {
                locateIssueOnMap(SmartCityApp.modalCurrentIssueId);
            }
        };
    }

    // Broadcast Bulletin Modal
    const bModal = document.getElementById('broadcastAlertModal');
    const bCloseBtn = document.getElementById('broadcastModalCloseBtn');
    const bForm = document.getElementById('broadcastAlertForm');

    if (bCloseBtn) bCloseBtn.onclick = () => closeAllModals();
    if (bModal) {
        bModal.onclick = (e) => {
            if (e.target === bModal) closeAllModals();
        };
    }

    if (bForm) {
        bForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const type = document.getElementById('broadcastType').value;
            const title = document.getElementById('broadcastTitle').value.trim();
            const message = document.getElementById('broadcastMessage').value.trim();

            if (!title || !message) return;

            const newNotif = {
                id: 'notif-' + Math.floor(1000 + Math.random() * 9000),
                type: type,
                title: title,
                message: message,
                time: 'Just now',
                read: false
            };

            SmartCityApp.notifications.unshift(newNotif);
            
            // Update header banner if emergency alert
            const bannerText = document.getElementById('headerAlertBannerText');
            if (bannerText) bannerText.textContent = title;

            persistState();
            renderNotifications();
            updateGlobalUIStats();

            soundEngine.play('alert');
            showToast('Bulletin Broadcasted', `Immediate broadcast published across municipal hub.`, 'success');
            bForm.reset();
            closeAllModals();
        });
    }
}

window.openIncidentDetailModal = (id) => {
    const issue = SmartCityApp.issues.find(iss => iss.id === id);
    if (!issue) return;

    SmartCityApp.modalCurrentIssueId = id;

    const modal = document.getElementById('incidentDetailModal');
    if (!modal) return;

    document.getElementById('modalIssueTitle').textContent = issue.title;
    document.getElementById('modalIssueImg').src = issue.image;
    document.getElementById('modalIssueId').textContent = issue.id;
    document.getElementById('modalIssueStatus').textContent = issue.status.toUpperCase();
    document.getElementById('modalIssueCatPrio').textContent = `${issue.category.toUpperCase()} | ${issue.priority.toUpperCase()} PRIORITY`;
    document.getElementById('modalIssueReporter').textContent = `${issue.reporter} (${issue.loggedDate})`;
    document.getElementById('modalIssueLocation').querySelector('span').textContent = issue.locationText;
    document.getElementById('modalIssueDesc').textContent = issue.description;

    renderModalTimeline(issue);

    modal.classList.add('open');
    soundEngine.play('info');
};

function renderModalTimeline(issue) {
    const list = document.getElementById('modalTimelineList');
    if (!list) return;

    list.innerHTML = '';
    (issue.timeline || []).forEach(node => {
        const item = document.createElement('div');
        item.className = 'modal-timeline-node';
        item.innerHTML = `
            <div class="node-date"><i class="fa-regular fa-clock"></i> ${node.date} &bull; <strong style="color:var(--accent-cyan);">${(node.status || '').toUpperCase()}</strong></div>
            <div class="node-note">${node.note}</div>
        `;
        list.appendChild(item);
    });
}

function closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
}

// --- ADMIN TRIAGE DESK ENGINE ---
function initAdminToolbar() {
    const searchInput = document.getElementById('adminSearchInput');
    const statusFilter = document.getElementById('adminStatusFilter');
    const priorityFilter = document.getElementById('adminPriorityFilter');
    const btnOpenBroadcast = document.getElementById('btnOpenBroadcastModal');
    const btnExportCsv = document.getElementById('btnExportAdminCsv');
    const btnExportAnalytics = document.getElementById('btnExportAnalytics');
    const btnResetDemo = document.getElementById('btnResetDemoData');

    if (searchInput) searchInput.addEventListener('input', renderAdminTriageTable);
    if (statusFilter) statusFilter.addEventListener('change', renderAdminTriageTable);
    if (priorityFilter) priorityFilter.addEventListener('change', renderAdminTriageTable);

    if (btnOpenBroadcast) {
        btnOpenBroadcast.addEventListener('click', () => {
            const modal = document.getElementById('broadcastAlertModal');
            if (modal) modal.classList.add('open');
            soundEngine.play('info');
        });
    }

    if (btnExportCsv) {
        btnExportCsv.addEventListener('click', () => exportIssuesToCSV());
    }

    if (btnExportAnalytics) {
        btnExportAnalytics.addEventListener('click', () => exportIssuesToCSV());
    }

    if (btnResetDemo) {
        btnResetDemo.addEventListener('click', () => resetDemoData());
    }
}

function renderAdminTriageTable() {
    const tbody = document.getElementById('adminTriageTableBody');
    if (!tbody) return;

    const searchVal = document.getElementById('adminSearchInput') ? document.getElementById('adminSearchInput').value.toLowerCase().trim() : '';
    const statusVal = document.getElementById('adminStatusFilter') ? document.getElementById('adminStatusFilter').value : 'all';
    const prioVal = document.getElementById('adminPriorityFilter') ? document.getElementById('adminPriorityFilter').value : 'all';

    tbody.innerHTML = '';

    const filtered = SmartCityApp.issues.filter(issue => {
        if (statusVal !== 'all' && issue.status !== statusVal) return false;
        if (prioVal !== 'all' && issue.priority !== prioVal) return false;
        if (searchVal) {
            const matches = issue.title.toLowerCase().includes(searchVal) ||
                            issue.id.toLowerCase().includes(searchVal) ||
                            issue.reporter.toLowerCase().includes(searchVal) ||
                            issue.locationText.toLowerCase().includes(searchVal);
            if (!matches) return false;
        }
        return true;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 24px; color: var(--text-muted);">
                    No incident records match the active criteria.
                </td>
            </tr>
        `;
        return;
    }

    filtered.forEach(issue => {
        const tr = document.createElement('tr');
        const priorityBadge = `<span class="badge badge-${issue.priority}">${issue.priority.toUpperCase()}</span>`;
        
        const statuses = [
            { val: 'pending', label: 'Awaiting Triage' },
            { val: 'review', label: 'Under Review' },
            { val: 'progress', label: 'In Progress' },
            { val: 'resolved', label: 'Resolved Case' }
        ];

        let selectHtml = `<select class="triage-select" onchange="triageIssueStatus('${issue.id}', this.value)">`;
        statuses.forEach(s => {
            selectHtml += `<option value="${s.val}" ${issue.status === s.val ? 'selected' : ''}>${s.label}</option>`;
        });
        selectHtml += '</select>';

        tr.innerHTML = `
            <td>
                <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 2px;">${issue.title}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted); display: flex; gap: 10px; flex-wrap: wrap;">
                    <span>ID: <strong>${issue.id}</strong></span>
                    <span><i class="fa-solid fa-location-dot"></i> ${issue.locationText}</span>
                </div>
            </td>
            <td>
                <div class="admin-table-user">
                    <img src="${issue.avatar}" alt="User" class="admin-table-avatar">
                    <span>${issue.reporter}</span>
                </div>
            </td>
            <td>${priorityBadge}</td>
            <td style="font-size: 0.75rem;">${issue.loggedDate}</td>
            <td>${selectHtml}</td>
            <td>
                <div style="display: flex; gap: 6px;">
                    <button class="admin-table-action-btn btn-table-view" onclick="openIncidentDetailModal('${issue.id}')" title="Audit Details">
                        <i class="fa-solid fa-eye"></i> Audit
                    </button>
                    <button class="admin-table-action-btn btn-table-del" onclick="deleteIssue('${issue.id}')" title="Delete record">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

window.triageIssueStatus = (id, newStatus) => {
    const issue = SmartCityApp.issues.find(iss => iss.id === id);
    if (!issue) return;

    const oldStatus = issue.status;
    if (oldStatus === newStatus) return;

    issue.status = newStatus;

    const now = new Date();
    const formattedDate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let stateActionNote = `Status adjusted to ${newStatus.toUpperCase()} by Operations Desk.`;
    if (newStatus === 'resolved') {
        stateActionNote = `Field repairs completed and quality-tested. Incident marked RESOLVED.`;
    } else if (newStatus === 'progress') {
        stateActionNote = `Emergency crew deployed on-site. Active repair work underway.`;
    }

    issue.timeline.push({
        status: newStatus,
        date: formattedDate,
        note: stateActionNote
    });

    // Generate notification logs for citizen updates
    const newNotif = {
        id: 'notif-' + Math.floor(1000 + Math.random() * 9000),
        type: newStatus === 'resolved' ? 'announcement' : 'update',
        title: `Incident Update: ${issue.id}`,
        message: `Case "${issue.title}" has transitioned to: ${newStatus.toUpperCase()}`,
        time: 'Just now',
        read: false
    };
    SmartCityApp.notifications.unshift(newNotif);

    // Push new entry to community Activity Ticker
    addActivityTickerItem(`Dispatcher updated incident "${issue.title}" status to [${newStatus.toUpperCase()}]`, issue.priority, newStatus === 'resolved');

    persistState();

    updateGlobalUIStats();
    renderNotifications();
    if (SmartCityApp.maps.dashboard) updateMapMarkers();
    
    soundEngine.play(newStatus === 'resolved' ? 'success' : 'info');
    showToast('Triage Logged', `Case ID ${id} transitioned successfully to ${newStatus.toUpperCase()}`, 'success');

    renderAdminTriageTable();
    renderTrackerList();
};

window.deleteIssue = (id) => {
    const idx = SmartCityApp.issues.findIndex(iss => iss.id === id);
    if (idx === -1) return;

    if (!confirm(`Are you sure you want to delete incident record ${id}?`)) return;

    const title = SmartCityApp.issues[idx].title;
    SmartCityApp.issues.splice(idx, 1);
    delete SmartCityApp.userUpvotes[id];

    persistState();

    updateGlobalUIStats();
    if (SmartCityApp.maps.dashboard) updateMapMarkers();
    renderAdminTriageTable();
    renderTrackerList();
    if (SmartCityApp.activePage === 'smart-analytics') initAnalyticsCharts();

    soundEngine.play('info');
    showToast('Record Deleted', `Incident ${id} ("${title}") removed from registry.`, 'info');
};

// Export to CSV Functionality
function exportIssuesToCSV() {
    if (!SmartCityApp.issues || SmartCityApp.issues.length === 0) {
        showToast('Export Failed', 'No issue records available to export.', 'error');
        return;
    }

    const headers = ['Incident ID', 'Title', 'Category', 'Priority', 'Status', 'Upvotes', 'Street Location', 'GPS Lat', 'GPS Lng', 'Reporter', 'Logged Date', 'Description'];
    
    const rows = SmartCityApp.issues.map(iss => [
        `"${iss.id}"`,
        `"${(iss.title || '').replace(/"/g, '""')}"`,
        `"${iss.category}"`,
        `"${iss.priority}"`,
        `"${iss.status}"`,
        iss.upvotes || 0,
        `"${(iss.locationText || '').replace(/"/g, '""')}"`,
        iss.coords ? iss.coords[0] : '',
        iss.coords ? iss.coords[1] : '',
        `"${(iss.reporter || '').replace(/"/g, '""')}"`,
        `"${iss.loggedDate}"`,
        `"${(iss.description || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `smartcity_nagpur_incidents_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    soundEngine.play('success');
    showToast('Export Completed', 'Generated CSV report downloaded successfully.', 'success');
}

// --- COMMUNITY ACTIVITY TICKER ---
function renderCitizenActivityFeed() {
    const ticker = document.getElementById('citizenActivityTicker');
    if (!ticker) return;

    ticker.innerHTML = '';

    const initialMilestones = [
        { text: 'Water main rupture reported near Coffee House Sq, Dharampeth. Emergency crew alerted.', priority: 'high', resolved: false, time: '12 mins ago' },
        { text: 'Broken streetlight in Civil Lines (REP-1023) restored by electrical maintenance.', priority: 'medium', resolved: true, time: '2 hours ago' },
        { text: 'Pothole excavated and paved on Central Avenue (REP-1024) in progress.', priority: 'high', resolved: false, time: '4 hours ago' },
        { text: 'Overflowing garbage bin near Sitabuldi Metro assigned to sanitary crew.', priority: 'low', resolved: false, time: '6 hours ago' }
    ];

    initialMilestones.forEach(m => {
        const item = document.createElement('div');
        item.className = 'ticker-item';
        
        let dotClass = '';
        if (m.resolved) dotClass = 'status-resolved';
        else if (m.priority === 'high') dotClass = 'prio-high';
        else if (m.priority === 'medium') dotClass = 'prio-medium';

        item.innerHTML = `
            <div class="ticker-dot ${dotClass}"></div>
            <div class="ticker-details">
                <h5>${m.text}</h5>
                <p><i class="fa-regular fa-clock"></i> ${m.time}</p>
            </div>
        `;
        ticker.appendChild(item);
    });
}

function addActivityTickerItem(text, priority, resolved) {
    const ticker = document.getElementById('citizenActivityTicker');
    if (!ticker) return;

    const item = document.createElement('div');
    item.className = 'ticker-item';
    
    let dotClass = '';
    if (resolved) dotClass = 'status-resolved';
    else if (priority === 'high') dotClass = 'prio-high';
    else if (priority === 'medium') dotClass = 'prio-medium';

    item.innerHTML = `
        <div class="ticker-dot ${dotClass}"></div>
        <div class="ticker-details">
            <h5>${text}</h5>
            <p><i class="fa-regular fa-clock"></i> Just now</p>
        </div>
    `;

    if (ticker.firstChild) {
        ticker.insertBefore(item, ticker.firstChild);
    } else {
        ticker.appendChild(item);
    }
}

// --- BROADCAST NOTIFICATION SYSTEMS ---
function initNotificationPreferences() {
    const chkHigh = document.getElementById('chkNotifHigh');
    const chkStatus = document.getElementById('chkNotifStatus');
    const chkGeneral = document.getElementById('chkNotifGeneral');
    const chkSound = document.getElementById('chkNotifSound');

    if (chkHigh) {
        chkHigh.checked = SmartCityApp.preferences.highAlerts;
        chkHigh.onchange = (e) => {
            SmartCityApp.preferences.highAlerts = e.target.checked;
            persistState();
            renderNotifications();
        };
    }
    if (chkStatus) {
        chkStatus.checked = SmartCityApp.preferences.statusUpdates;
        chkStatus.onchange = (e) => {
            SmartCityApp.preferences.statusUpdates = e.target.checked;
            persistState();
            renderNotifications();
        };
    }
    if (chkGeneral) {
        chkGeneral.checked = SmartCityApp.preferences.generalBulletins;
        chkGeneral.onchange = (e) => {
            SmartCityApp.preferences.generalBulletins = e.target.checked;
            persistState();
            renderNotifications();
        };
    }
    if (chkSound) {
        chkSound.checked = SmartCityApp.preferences.soundEnabled;
        chkSound.onchange = (e) => {
            SmartCityApp.preferences.soundEnabled = e.target.checked;
            persistState();
            if (e.target.checked) soundEngine.play('success');
        };
    }
}

function renderNotifications() {
    const feed = document.getElementById('notificationsFeedList');
    const headerNotifBadge = document.getElementById('headerNotifBadge');
    
    if (!feed) return;

    feed.innerHTML = '';

    const unreadCount = SmartCityApp.notifications.filter(n => !n.read).length;
    if (headerNotifBadge) {
        headerNotifBadge.style.display = unreadCount > 0 ? 'block' : 'none';
    }

    // Filter based on preferences
    const filteredNotifs = SmartCityApp.notifications.filter(n => {
        if (n.type === 'alert' && !SmartCityApp.preferences.highAlerts) return false;
        if (n.type === 'update' && !SmartCityApp.preferences.statusUpdates) return false;
        if (n.type === 'announcement' && !SmartCityApp.preferences.generalBulletins) return false;
        return true;
    });

    if (filteredNotifs.length === 0) {
        feed.innerHTML = `
            <div style="text-align: center; padding: 30px; color: var(--text-muted);">
                <i class="fa-solid fa-bell-slash" style="font-size: 2rem; margin-bottom: 12px;"></i>
                <p>No bulletins match active notification filters.</p>
            </div>
        `;
        return;
    }

    filteredNotifs.forEach(n => {
        const notif = document.createElement('div');
        notif.className = `notif-card ${!n.read ? 'unread' : ''}`;
        
        let iconClass = 'fa-solid fa-bullhorn';
        let typeClass = 'notif-type-announcement';
        
        if (n.type === 'alert') {
            iconClass = 'fa-solid fa-triangle-exclamation';
            typeClass = 'notif-type-alert';
        } else if (n.type === 'update') {
            iconClass = 'fa-solid fa-rotate';
            typeClass = 'notif-type-update';
        }

        notif.innerHTML = `
            <div class="notif-icon-box ${typeClass}">
                <i class="${iconClass}"></i>
            </div>
            <div class="notif-info">
                <div class="notif-info-header">
                    <h5 class="notif-title">${n.title}</h5>
                    <span class="notif-time">${n.time}</span>
                </div>
                <p class="notif-message">${n.message}</p>
            </div>
        `;

        notif.addEventListener('mouseenter', () => {
            if (!n.read) {
                n.read = true;
                notif.classList.remove('unread');
                persistState();
                const newUnread = SmartCityApp.notifications.filter(x => !x.read).length;
                if (headerNotifBadge) headerNotifBadge.style.display = newUnread > 0 ? 'block' : 'none';
            }
        });

        feed.appendChild(notif);
    });

    // Bind Clear All Button
    const clearBtn = document.getElementById('btnClearNotifs');
    if (clearBtn) {
        clearBtn.onclick = () => {
            SmartCityApp.notifications = [];
            persistState();
            renderNotifications();
            if (headerNotifBadge) headerNotifBadge.style.display = 'none';
            soundEngine.play('info');
            showToast('Feed Cleared', 'Notifications history cleared.', 'info');
        };
    }
}

// --- TELEMETRY SENSOR SIMULATORS ---
function startTelemetrySimulation() {
    setInterval(() => {
        SmartCityApp.telemetry.aqi = Math.floor(38 + Math.random() * 8);
        SmartCityApp.telemetry.waterPressure = parseFloat((3.0 + Math.random() * 0.4).toFixed(1));
        SmartCityApp.telemetry.powerLoad = Math.floor(60 + Math.random() * 8);
        SmartCityApp.telemetry.transitEfficiency = Math.floor(96 + Math.random() * 4);

        const aqiText = document.getElementById('telemetryAqi');
        const waterText = document.getElementById('telemetryWater');
        const powerText = document.getElementById('telemetryPower');
        
        const aqiFill = document.getElementById('fillAqi');
        const waterFill = document.getElementById('fillWater');
        const powerFill = document.getElementById('fillPower');

        if (aqiText) aqiText.textContent = `${SmartCityApp.telemetry.aqi} AQI (Optimal)`;
        if (waterText) waterText.textContent = `${SmartCityApp.telemetry.waterPressure} bar (Stable)`;
        if (powerText) powerText.textContent = `${SmartCityApp.telemetry.powerLoad}% (Nominal)`;

        if (aqiFill) aqiFill.style.width = `${(SmartCityApp.telemetry.aqi / 50) * 100}%`;
        if (waterFill) waterFill.style.width = `${(SmartCityApp.telemetry.waterPressure / 4.0) * 100}%`;
        if (powerFill) powerFill.style.width = `${SmartCityApp.telemetry.powerLoad}%`;

        // Update Admin Node Details
        const sAqi = document.getElementById('sensorAqiVal');
        const sWater = document.getElementById('sensorWaterVal');
        const sPower = document.getElementById('sensorPowerVal');
        const sTransit = document.getElementById('sensorTransitVal');

        if (sAqi) sAqi.textContent = SmartCityApp.telemetry.aqi;
        if (sWater) sWater.textContent = `${SmartCityApp.telemetry.waterPressure} bar`;
        if (sPower) sPower.textContent = `${SmartCityApp.telemetry.powerLoad}%`;
        if (sTransit) sTransit.textContent = `${SmartCityApp.telemetry.transitEfficiency}%`;

        // Update Transit KPI
        const dTransit = document.getElementById('dashTransitStatus');
        if (dTransit) dTransit.textContent = `${SmartCityApp.telemetry.transitEfficiency}%`;

        updateSparklines();

    }, 3500);
}

function updateSparklines() {
    const sparkAqi = document.getElementById('sparklineAqi');
    const sparkWater = document.getElementById('sparklineWater');
    const sparkPower = document.getElementById('sparklinePower');
    const sparkTransit = document.getElementById('sparklineTransit');

    const statuses = ['Optimized', 'Nominal', 'Steady', 'Stable'];
    const getRandomStatus = () => statuses[Math.floor(Math.random() * statuses.length)];

    if (sparkAqi) sparkAqi.textContent = getRandomStatus();
    if (sparkWater) sparkWater.textContent = SmartCityApp.telemetry.waterPressure > 3.2 ? 'Peak Pressure' : 'Flow Normal';
    if (sparkPower) sparkPower.textContent = SmartCityApp.telemetry.powerLoad > 64 ? 'Surge Protected' : 'Nominal Grid';
    if (sparkTransit) sparkTransit.textContent = SmartCityApp.telemetry.transitEfficiency > 97 ? 'On SLA Schedule' : 'Minor Delay';
}

// --- GLOBAL UI COUNTS UPDATE ---
function updateGlobalUIStats() {
    const total = SmartCityApp.issues.length;
    const resolved = SmartCityApp.issues.filter(i => i.status === 'resolved').length;
    const pending = total - resolved;
    const resolutionPct = total > 0 ? ((resolved / total) * 100).toFixed(1) + '%' : '100%';

    // 1. Home Page Statistics
    const hTotal = document.getElementById('statTotalIssues');
    const hRate = document.getElementById('statResolutionRate');
    if (hTotal) hTotal.textContent = total;
    if (hRate) hRate.textContent = resolutionPct;
    
    // 2. Citizen Dashboard Statistics
    const dTotal = document.getElementById('dashTotalIssues');
    const dResolved = document.getElementById('dashResolvedIssues');
    const dAlerts = document.getElementById('dashAlertsActive');
    const dTransit = document.getElementById('dashTransitStatus');

    if (dTotal) dTotal.textContent = pending;
    if (dResolved) dResolved.textContent = resolved;
    if (dAlerts) dAlerts.textContent = SmartCityApp.notifications.filter(n => n.type === 'alert' || !n.read).length;
    if (dTransit) dTransit.textContent = `${SmartCityApp.telemetry.transitEfficiency}%`;

    // 3. Analytics Dashboard statistics
    const aTotal = document.getElementById('analTotalIssues');
    const aPending = document.getElementById('analPendingCount');
    const aResolution = document.getElementById('analAvgResolution');
    if (aTotal) aTotal.textContent = total;
    if (aPending) aPending.textContent = pending;
    if (aResolution) aResolution.textContent = resolutionPct;

    // 4. Admin Dashboard statistics
    const adminTotal = document.getElementById('adminStatTotal');
    const adminPending = document.getElementById('adminStatPending');
    const adminProgress = document.getElementById('adminStatProgress');
    const adminResolved = document.getElementById('adminStatResolved');

    if (adminTotal) adminTotal.textContent = total;
    if (adminPending) adminPending.textContent = SmartCityApp.issues.filter(i => i.status === 'pending' || i.status === 'review').length;
    if (adminProgress) adminProgress.textContent = SmartCityApp.issues.filter(i => i.status === 'progress').length;
    if (adminResolved) adminResolved.textContent = resolved;

    // 5. Analytics Infrastructure Indicators Scorecard
    const perfPower = document.getElementById('perfPower');
    const perfWater = document.getElementById('perfWater');
    const perfTransit = document.getElementById('perfTransit');
    const perfLights = document.getElementById('perfLights');
    const perfGarbage = document.getElementById('perfGarbage');
    const perfSignals = document.getElementById('perfSignals');

    if (perfPower) perfPower.textContent = `${(98.8 + (SmartCityApp.telemetry.powerLoad % 5) * 0.2).toFixed(1)}%`;
    if (perfWater) perfWater.textContent = `${(97.6 + (SmartCityApp.telemetry.waterPressure * 0.3)).toFixed(1)}%`;
    if (perfTransit) perfTransit.textContent = `${SmartCityApp.telemetry.transitEfficiency}%`;
    if (perfLights) perfLights.textContent = `${(95.5 + (total % 4) * 0.5).toFixed(1)}%`;
    if (perfGarbage) perfGarbage.textContent = `${(92.0 + (resolved % 5) * 0.6).toFixed(1)}%`;
    if (perfSignals) perfSignals.textContent = '99.4%';

    // 6. Average Resolution Times
    const statTime = document.getElementById('statMinsResolution');
    const analTime = document.getElementById('analResponseTime');
    const avgHrs = total > 0 ? (12.5 - Math.min(4, resolved * 0.3)).toFixed(1) + 'h' : '12.5h';
    if (statTime) statTime.textContent = avgHrs;
    if (analTime) analTime.textContent = avgHrs + 'rs';

    // 7. Header notifications badge
    const headerNotifBadge = document.getElementById('headerNotifBadge');
    const unreadCount = SmartCityApp.notifications.filter(n => !n.read).length;
    if (headerNotifBadge) {
        headerNotifBadge.style.display = unreadCount > 0 ? 'block' : 'none';
    }
}

// --- TOASTER NOTIFICATIONS ---
function showToast(title, message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-type-error' : ''}`;
    
    let iconClass = 'fa-solid fa-circle-check';
    if (type === 'error') {
        iconClass = 'fa-solid fa-circle-xmark';
    } else if (type === 'info') {
        iconClass = 'fa-solid fa-circle-info';
    }

    toast.innerHTML = `
        <div class="toast-icon"><i class="${iconClass}"></i></div>
        <div class="toast-content">
            <h5>${title}</h5>
            <p>${message}</p>
        </div>
        <div class="toast-close"><i class="fa-solid fa-xmark"></i></div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
        closeBtn.onclick = () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        };
    }

    setTimeout(() => {
        if (toast.parentNode) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }
    }, 4500);
}

// --- FAQ ACCORDION HANDLERS ---
function initFaqs() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                    soundEngine.play('info');
                }
            });
        }
    });
}
