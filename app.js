/**
 * SmartCity Pulse Hub - Core Application Engine
 * Contains global state, SPA router, Leaflet mapping, ChartJS analytics,
 * dynamic dashboard telemetry, and interactive Admin controls.
 */

// --- GLOBAL STATE ENGINE ---
const SmartCityApp = {
    // Current application parameters
    userRole: 'citizen', // 'citizen' or 'admin'
    currentTheme: 'dark',
    activePage: 'home',
    
    // Core Database State initialized with Nagpur, India physical mock examples
    issues: [
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
            timeline: [
                { status: 'pending', date: '2026-06-01 10:14 AM', note: 'Report submitted by citizen Sankalp Gaidhane.' },
                { status: 'review', date: '2026-06-01 11:30 AM', note: 'Triaged by Public Works Dispatcher. Dispatched to Sector 1 Road Crew.' },
                { status: 'progress', date: '2026-06-01 02:45 PM', note: 'Sector 1 Road Crew marked crew active. Excavation scheduled.' }
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
            timeline: [
                { status: 'pending', date: '2026-05-28 09:30 PM', note: 'Report submitted by citizen Sankalp Gaidhane.' },
                { status: 'review', date: '2026-05-29 08:00 AM', note: 'Case inspected. Work order #E-893 assigned.' },
                { status: 'progress', date: '2026-05-29 10:15 AM', note: 'Electrical maintenance team on-site replacing LED ballast.' },
                { status: 'resolved', date: '2026-05-29 01:20 PM', note: 'LED light active. System health checked.' }
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
            timeline: [
                { status: 'pending', date: '2026-06-01 07:12 AM', note: 'Report submitted by citizen Sankalp Gaidhane.' },
                { status: 'review', date: '2026-06-01 08:30 AM', note: 'Triage team assigned priority. Transit control tower notified.' },
                { status: 'progress', date: '2026-06-01 10:20 AM', note: 'Emergency Signal Crew on-site adjusting mounting bracket and wiring.' }
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
            timeline: [
                { status: 'pending', date: '2026-06-02 12:15 PM', note: 'Report submitted by citizen Sankalp Gaidhane.' }
            ]
        }
    ],

    // Global Notifications feed
    notifications: [
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
            message: 'Broken streetlight near City Park (REP-1023) has been marked as RESOLVED by public works team.',
            time: 'Yesterday',
            read: true
        },
        {
            id: 'notif-3',
            type: 'announcement',
            title: 'Clean City Program',
            message: 'Mayor announces new trash collection routes starting next week to improve sanitation efficiency in Market Area.',
            time: '3 days ago',
            read: true
        }
    ],

    // Simulated Telemetry Sensors
    telemetry: {
        aqi: 42,
        waterPressure: 3.2,
        powerLoad: 64,
        transitEfficiency: 98
    },

    // Maps Storage
    maps: {
        dashboard: null,
        picker: null
    },
    
    // Markers arrays to clear on updates
    markers: {
        dashboard: [],
        pickerMarker: null
    },

    // Selected GPS coords for new report form focusing on Nagpur, India
    selectedReportCoords: [21.1458, 79.0882]
};

// --- INITIALIZATION HOOKS ---
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // 1. Setup Navigation & Router
    initRouter();
    
    // 2. Setup Role Switchers
    initRoleSwitchers();
    
    // 3. Setup Theme Switcher
    initThemeSwitcher();
    
    // 4. Setup Live Clock
    initClock();
    
    // 5. Setup Form Listeners
    initForms();

    // 6. Setup Interactive Category Selection
    initCategoryPicker();

    // 7. Setup Live Telemetry Simulation
    startTelemetrySimulation();

    // 8. Setup Notification Feed
    renderNotifications();

    // 9. Initial UI Draw
    updateGlobalUIStats();
    renderCitizenActivityFeed();
    
    // 10. Direct to Home view on startup
    handleNavigation(window.location.hash || '#home');

    // 11. Setup FAQ Accordion Toggles
    initFaqs();
}

// --- CLOCK MODULE ---
function initClock() {
    const clockEl = document.getElementById('headerClock');
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
            if (sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    });

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
        // Fallback to home if page doesn't exist
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
        // Init Map
        setTimeout(() => {
            initDashboardMap();
        }, 100);
    } else if (page === 'report-issue') {
        // Init Coordinate Selector Map
        setTimeout(() => {
            initPickerMap();
        }, 100);
    } else if (page === 'issue-tracking') {
        // Redraw lists
        renderTrackerList();
        initTrackerFilterTabs();
    } else if (page === 'smart-analytics') {
        // Render Charts
        setTimeout(() => {
            initAnalyticsCharts();
        }, 100);
    } else if (page === 'admin-dashboard') {
        // Populate control center table
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

    const toggleToRole = (role) => {
        SmartCityApp.userRole = role;
        
        if (role === 'citizen') {
            btnCit.classList.add('active');
            btnAdm.classList.remove('active');
            
            sidebarAvatar.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=128&auto=format&fit=crop';
            sidebarUsername.textContent = 'Sankalp Gaidhane';
            sidebarRole.textContent = 'Verified Citizen';
            
            showToast('Role Switched', 'Viewing platform as Sankalp Gaidhane (Verified Citizen).', 'info');
        } else {
            btnCit.classList.remove('active');
            btnAdm.classList.add('active');
            
            sidebarAvatar.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=128&auto=format&fit=crop';
            sidebarUsername.textContent = 'Chief Dispatcher';
            sidebarRole.textContent = 'Municipal Operations';
            
            showToast('Role Switched', 'Viewing platform as Chief Operations Admin.', 'info');
        }

        // Auto redirect to appropriate dashboard to make it feel logical
        if (role === 'citizen' && SmartCityApp.activePage === 'admin-dashboard') {
            window.location.hash = '#citizen-dashboard';
        } else if (role === 'admin' && SmartCityApp.activePage === 'citizen-dashboard') {
            window.location.hash = '#admin-dashboard';
        }
        
        updateGlobalUIStats();
    };

    btnCit.addEventListener('click', () => toggleToRole('citizen'));
    btnAdm.addEventListener('click', () => toggleToRole('admin'));
}

// --- THEME SWITCHER (DARK/LIGHT MODE) ---
function initThemeSwitcher() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeToggleIcon');
    
    themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        SmartCityApp.currentTheme = newTheme;
        
        if (newTheme === 'dark') {
            themeIcon.className = 'fa-solid fa-moon';
            themeBtn.title = 'Switch to Light Mode';
        } else {
            themeIcon.className = 'fa-solid fa-sun';
            themeBtn.title = 'Switch to Dark Mode';
        }
        
        // Force refresh leaflet tiles themes if map is active
        if (SmartCityApp.maps.dashboard) {
            SmartCityApp.maps.dashboard.invalidateSize();
        }
        if (SmartCityApp.maps.picker) {
            SmartCityApp.maps.picker.invalidateSize();
        }
        
        showToast('Theme Changed', `Switched application to ${newTheme} mode.`, 'info');
    });
}

// --- INTERACTIVE LEAFLET SMART MAPS ---
function initDashboardMap() {
    const mapContainer = document.getElementById('dashboardMap');
    if (!mapContainer) return;
    
    // Check if map is already initialized
    if (SmartCityApp.maps.dashboard) {
        SmartCityApp.maps.dashboard.invalidateSize();
        updateMapMarkers();
        return;
    }

    // Centering map around Nagpur, India
    const map = L.map('dashboardMap', {
        zoomControl: false,
        attributionControl: false
    }).setView([21.1458, 79.0882], 14);

    // Zoom controls at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Dark styled maps (Leaflet variables styled beautifully in style.css to match themes)
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
    
    // Icon colors based on categories / priorities
    const getMarkerColor = (priority) => {
        if (priority === 'high') return '#ff3366'; // Pink-Red
        if (priority === 'medium') return '#ff9f1c'; // Amber
        return '#00f5d4'; // Cyan
    };

    // Draw markers
    SmartCityApp.issues.forEach(issue => {
        const color = getMarkerColor(issue.priority);
        
        // SVG circle marker
        const svgIcon = L.divIcon({
            html: `<div style="background: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 10px ${color}; animation: floatAnimation 3s ease-in-out infinite;"></div>`,
            className: 'custom-map-marker',
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });

        const popupContent = `
            <div style="font-family: var(--font-body); padding: 5px;">
                <h4 style="margin: 0 0 5px 0; font-size: 0.9rem; font-weight: 600; color: #fff;">${issue.title}</h4>
                <p style="margin: 0 0 8px 0; font-size: 0.72rem; color: #8e9bb2;"><i class="fa-solid fa-location-dot"></i> ${issue.locationText}</p>
                <div style="display: flex; gap: 6px; align-items: center; margin-bottom: 8px;">
                    <span class="badge badge-low" style="background: rgba(255,255,255,0.05); color: #fff; padding: 2px 6px; font-size: 0.6rem;">${issue.category}</span>
                    <span class="badge" style="background: rgba(255,255,255,0.05); color: ${issue.priority === 'high' ? '#ff3366' : issue.priority === 'medium' ? '#ff9f1c' : '#00f5d4'}; padding: 2px 6px; font-size: 0.6rem;">${issue.priority}</span>
                </div>
                <a href="#issue-tracking" onclick="setTrackerSelectedSearch('${issue.id}')" style="font-size: 0.7rem; font-weight: 700; color: #00f5d4; text-decoration: none; display: flex; align-items: center; gap: 4px;">Track Progress <i class="fa-solid fa-arrow-right"></i></a>
            </div>
        `;

        const marker = L.marker(issue.coords, { icon: svgIcon }).bindPopup(popupContent).addTo(map);
        SmartCityApp.markers.dashboard.push(marker);
    });
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
}

// Helper to open issue tracking direct from map click
window.setTrackerSelectedSearch = (id) => {
    setTimeout(() => {
        const searchInput = document.getElementById('trackSearch');
        if (searchInput) {
            searchInput.value = id;
            // Trigger search event
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

    // Fetch theme color configurations
    const isDark = SmartCityApp.currentTheme === 'dark';
    const textPrimary = isDark ? '#f3f6fc' : '#121824';
    const borderVal = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

    // Gather Category distribution counts directly from the array state (Real-Time updates!)
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
            labels: ['Roads', 'Utilities', 'Water Leak', 'Sanitation', 'Signals', 'Transit'],
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
            labels: ['May W1', 'May W2', 'May W3', 'May W4', 'June W1'],
            datasets: [{
                label: 'Reports Filed',
                data: [12, 19, 15, 22, SmartCityApp.issues.length],
                borderColor: '#00f5d4',
                backgroundColor: 'rgba(0, 245, 212, 0.05)',
                borderWidth: 3,
                fill: true,
                tension: 0.35,
                pointBackgroundColor: '#00f5d4',
                pointBorderWidth: 2,
                pointBorderColor: '#fff'
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
            labels: ['Sector 1', 'Sector 2', 'Sector 3', 'Sector 4', 'Sector 5', 'Sector 6'],
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
            indexAxis: 'y', // Makes it horizontal
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
                    ticks: { color: textPrimary, font: { family: 'Plus Jakarta Sans', size: 11, weight: 'bold' } }
                }
            }
        }
    });
}

// --- CITIZEN REPORTING FORM ENGINE ---
let uploadedFileSimBase64 = null; // Storing image mock string

function initCategoryPicker() {
    const options = document.querySelectorAll('#reportCategoryPicker .category-option');
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
        });
    });
}

function initForms() {
    const reportForm = document.getElementById('issueReportForm');
    const uploaderContainer = document.getElementById('uploadMockContainer');
    const uploaderInput = document.getElementById('imageInput');
    const uploaderPreview = document.getElementById('uploadPreviewImg');

    // Clicking container triggers simulated file select
    if (uploaderContainer && uploaderInput) {
        uploaderContainer.addEventListener('click', () => {
            uploaderInput.click();
        });

        uploaderInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (evt) => {
                    uploadedFileSimBase64 = evt.target.result;
                    uploaderPreview.src = evt.target.result;
                    uploaderPreview.style.display = 'block';
                    // Hide original icon
                    uploaderContainer.querySelector('i').style.display = 'none';
                    uploaderContainer.querySelector('span').style.display = 'none';
                    showToast('Photo Processed', 'Asset photo successfully processed for telemetry reporting.', 'success');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (reportForm) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Gather details
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

            // Category matching sample fallbacks if no image was selected
            const defaultMockImages = {
                roads: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=400',
                utilities: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?q=80&w=400',
                water: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=400',
                sanitation: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=400',
                signals: 'https://images.unsplash.com/photo-1510936111840-a29623ca3d42?q=80&w=400',
                transit: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400'
            };

            const imagePath = uploadedFileSimBase64 || defaultMockImages[category];

            // Generate report object
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
                timeline: [
                    { status: 'pending', date: formattedDate, note: 'Incident logged online. Assigned triage queue.' }
                ]
            };

            // Push into main database array
            SmartCityApp.issues.unshift(newIssue);

            // Log new system notification
            const newNotif = {
                id: 'notif-' + Math.floor(1000 + Math.random() * 9000),
                type: 'update',
                title: 'Report Logged',
                message: `New incident filed: ${title} (${issueId}) is now active.`,
                time: 'Just now',
                read: false
            };
            SmartCityApp.notifications.unshift(newNotif);

            // Add item to Activities Feed
            addActivityTickerItem(`New issue logged: "${title}" in ${locationText}`, priority, false);

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
            showToast('Incident Submitted Successfully', `Report ID ${issueId} has been successfully submitted to operations center.`, 'success');
            
            // Navigate citizen to track page
            window.location.hash = '#issue-tracking';
        });
    }

    // Contact Query Form listener
    const contactForm = document.getElementById('contactQueryForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            showToast('Query Transmitted', `Thank you ${name}, our municipal coordination desk has received your ticket and will follow up shortly.`, 'success');
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
    
    const searchVal = document.getElementById('trackSearch').value.toLowerCase().trim();
    const filterCategory = document.getElementById('trackCategoryFilter').value;

    container.innerHTML = '';

    // Filter active items
    const filteredIssues = SmartCityApp.issues.filter(issue => {
        // 1. Status Filter
        if (filterStatus !== 'all' && issue.status !== filterStatus) return false;
        
        // 2. Category Filter
        if (filterCategory !== 'all' && issue.category !== filterCategory) return false;
        
        // 3. Search Filter
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
        
        // Build the dynamic timeline inside the card
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

        card.innerHTML = `
            <img src="${issue.image}" alt="${issue.title}" class="issue-card-img">
            
            <div class="issue-card-body">
                <div class="issue-meta-row">
                    <span><i class="fa-regular fa-folder"></i> ${issue.category.toUpperCase()}</span>
                    <span><i class="fa-regular fa-clock"></i> ${issue.loggedDate}</span>
                    <span><i class="fa-solid fa-hashtag"></i> <strong>${issue.id}</strong></span>
                </div>
                <h3 class="issue-title">${issue.title}</h3>
                <p class="issue-desc">${issue.description}</p>
                <div class="issue-meta-row" style="margin-top: 6px;">
                    <span><i class="fa-solid fa-location-dot" style="color: var(--accent-cyan);"></i> ${issue.locationText}</span>
                    <span><i class="fa-regular fa-user"></i> Logged by ${issue.reporter}</span>
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

// --- ADMIN TRIAGE DESK ENGINE ---
function renderAdminTriageTable() {
    const tbody = document.getElementById('adminTriageTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    SmartCityApp.issues.forEach(issue => {
        const tr = document.createElement('tr');
        
        // Priority Badge helper
        const priorityBadge = `<span class="badge badge-${issue.priority}">${issue.priority}</span>`;
        
        // Option dropdown builder
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
                <div style="font-size: 0.72rem; color: var(--text-muted); display: flex; gap: 10px;">
                    <span>ID: ${issue.id}</span>
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
            <td>${issue.loggedDate}</td>
            <td>${selectHtml}</td>
        `;

        tbody.appendChild(tr);
    });
}

// Interactive Status Triage Switcher!
window.triageIssueStatus = (id, newStatus) => {
    const issue = SmartCityApp.issues.find(iss => iss.id === id);
    if (!issue) return;

    const oldStatus = issue.status;
    if (oldStatus === newStatus) return;

    // Transition state
    issue.status = newStatus;

    // Log a new node on issue timeline history
    const now = new Date();
    const formattedDate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let stateActionNote = `Status adjusted to ${newStatus.toUpperCase()} by Operations Desk.`;
    if (newStatus === 'resolved') {
        stateActionNote = `Work-order completion confirmed. Case marked RESOLVED.`;
    } else if (newStatus === 'progress') {
        stateActionNote = `Field technicians deployed to location. Repair in PROGRESS.`;
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
        message: `Case "${issue.title}" has been updated to: ${newStatus.toUpperCase()}`,
        time: 'Just now',
        read: false
    };
    SmartCityApp.notifications.unshift(newNotif);

    // Push new entry to community Activity Ticker
    addActivityTickerItem(`Dispatcher updated incident "${issue.title}" status to [${newStatus.toUpperCase()}]`, issue.priority, newStatus === 'resolved');

    // Trigger visual updates
    updateGlobalUIStats();
    renderNotifications();
    
    // Play subtle audio sound alert if notifications is set (simulated in UI)
    showToast('Triage Logged', `Case ID ${id} transitioned successfully to ${newStatus.toUpperCase()}`, 'success');

    // Instantly re-render admin table to remain accurate
    renderAdminTriageTable();
};

// --- COMMUNITY ACTIVITY TICKER ---
function renderCitizenActivityFeed() {
    const ticker = document.getElementById('citizenActivityTicker');
    if (!ticker) return;

    ticker.innerHTML = '';

    // Initialize with standard sample telemetry milestones matching initial database
    const initialMilestones = [
        { text: 'Water main rupture reported in Sector 5. Dispatched emergency crews.', priority: 'high', resolved: false, time: '12 mins ago' },
        { text: 'Broken streetlight near City Park (REP-1023) repaired successfully.', priority: 'medium', resolved: true, time: '2 hours ago' },
        { text: 'Pothole excavated and paved on Main Street (REP-1024) in progress.', priority: 'high', resolved: false, time: '4 hours ago' },
        { text: 'Overflowing garbage bin near Market Square reported to sanitation crews.', priority: 'low', resolved: false, time: '6 hours ago' }
    ];

    initialMilestones.forEach(m => {
        const item = document.createElement('div');
        item.className = 'ticker-item';
        
        let dotClass = '';
        if (m.resolved) {
            dotClass = 'status-resolved';
        } else if (m.priority === 'high') {
            dotClass = 'prio-high';
        } else if (m.priority === 'medium') {
            dotClass = 'prio-medium';
        }

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
    if (resolved) {
        dotClass = 'status-resolved';
    } else if (priority === 'high') {
        dotClass = 'prio-high';
    } else if (priority === 'medium') {
        dotClass = 'prio-medium';
    }

    item.innerHTML = `
        <div class="ticker-dot ${dotClass}"></div>
        <div class="ticker-details">
            <h5>${text}</h5>
            <p><i class="fa-regular fa-clock"></i> Just now</p>
        </div>
    `;

    // Prepend to top of activity log
    if (ticker.firstChild) {
        ticker.insertBefore(item, ticker.firstChild);
    } else {
        ticker.appendChild(item);
    }
}

// --- BROADCAST NOTIFICATION SYSTEMS ---
function renderNotifications() {
    const feed = document.getElementById('notificationsFeedList');
    const headerNotifBadge = document.getElementById('headerNotifBadge');
    
    if (!feed) return;

    feed.innerHTML = '';

    const unreadCount = SmartCityApp.notifications.filter(n => !n.read).length;
    if (headerNotifBadge) {
        headerNotifBadge.style.display = unreadCount > 0 ? 'block' : 'none';
    }

    if (SmartCityApp.notifications.length === 0) {
        feed.innerHTML = `
            <div style="text-align: center; padding: 30px; color: var(--text-muted);">
                <i class="fa-solid fa-bell-slash" style="font-size: 2rem; margin-bottom: 12px;"></i>
                <p>No bulletins currently logged in notification archive.</p>
            </div>
        `;
        return;
    }

    SmartCityApp.notifications.forEach(n => {
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

        // Mark as read when hovering / viewing
        notif.addEventListener('mouseenter', () => {
            if (!n.read) {
                n.read = true;
                notif.classList.remove('unread');
                renderNotifications();
            }
        });

        feed.appendChild(notif);
    });

    // Bind Clear All Button
    const clearBtn = document.getElementById('btnClearNotifs');
    if (clearBtn) {
        clearBtn.onclick = () => {
            SmartCityApp.notifications = [];
            renderNotifications();
            showToast('Feed Cleared', 'Notifications history cleared.', 'info');
        };
    }
}

// --- TELEMETRY SENSOR SIMULATORS ---
function startTelemetrySimulation() {
    setInterval(() => {
        // Random slight fluctuations around normal values to represent live city updates
        SmartCityApp.telemetry.aqi = Math.floor(38 + Math.random() * 8);
        SmartCityApp.telemetry.waterPressure = parseFloat((3.0 + Math.random() * 0.4).toFixed(1));
        SmartCityApp.telemetry.powerLoad = Math.floor(60 + Math.random() * 8);
        SmartCityApp.telemetry.transitEfficiency = Math.floor(96 + Math.random() * 4);

        // Update Citizen Dashboard Elements
        const aqiText = document.getElementById('telemetryAqi');
        const waterText = document.getElementById('telemetryWater');
        const powerText = document.getElementById('telemetryPower');
        
        const aqiFill = document.getElementById('fillAqi');
        const waterFill = document.getElementById('fillWater');
        const powerFill = document.getElementById('fillPower');

        if (aqiText) aqiText.textContent = `${SmartCityApp.telemetry.aqi} AQI (Optimal)`;
        if (waterText) waterText.textContent = `${SmartCityApp.telemetry.waterPressure} bar (Stable)`;
        if (powerText) powerText.textContent = `${SmartCityApp.telemetry.powerLoad}% (Nominal)`;

        // Adjust widths dynamically
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

        // Flashing sparkles status
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

    // Home Page Statistics
    const hTotal = document.getElementById('statTotalIssues');
    if (hTotal) hTotal.textContent = total;
    
    // Citizen Dashboard Statistics
    const dTotal = document.getElementById('dashTotalIssues');
    const dResolved = document.getElementById('dashResolvedIssues');
    if (dTotal) dTotal.textContent = pending; // Show open cases pending on citizen view
    if (dResolved) dResolved.textContent = resolved;

    // Analytics Dashboard statistics
    const aTotal = document.getElementById('analTotalIssues');
    const aPending = document.getElementById('analPendingCount');
    if (aTotal) aTotal.textContent = total;
    if (aPending) aPending.textContent = pending;

    // Admin Dashboard statistics
    const adminTotal = document.getElementById('adminStatTotal');
    const adminPending = document.getElementById('adminStatPending');
    const adminProgress = document.getElementById('adminStatProgress');
    const adminResolved = document.getElementById('adminStatResolved');

    if (adminTotal) adminTotal.textContent = total;
    if (adminPending) adminPending.textContent = SmartCityApp.issues.filter(i => i.status === 'pending' || i.status === 'review').length;
    if (adminProgress) adminProgress.textContent = SmartCityApp.issues.filter(i => i.status === 'progress').length;
    if (adminResolved) adminResolved.textContent = resolved;
}

// --- TOASTER BANNER NOTIFIER ---
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

    // Trigger reveal transition
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Click close button handler
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.onclick = () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    };

    // Auto wipe alert after 4.5 seconds
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
                // Close other items for a clean accordion effect
                faqItems.forEach(i => i.classList.remove('active'));
                
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}
