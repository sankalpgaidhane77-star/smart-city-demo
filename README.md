# 🏙️ SmartCity Pulse

### *Intelligent Urban Infrastructure & Citizen Engagement Platform*

---

![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Built With](https://img.shields.io/badge/built%20with-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-orange.svg)
![Status](https://img.shields.io/badge/status-production%20ready-brightgreen.svg)
![Location](https://img.shields.io/badge/demo%20location-Nagpur%2C%20India-blueviolet.svg)

---

## 📋 Overview

**SmartCity Pulse** is an interactive, full-featured municipal operations and citizen engagement Single Page Application (SPA) designed to modernize public service delivery, accelerate emergency response times, and provide live infrastructure monitoring.

Built with **pure semantic HTML5, modern CSS3 (Glassmorphism design system), and Vanilla JavaScript**, the platform requires zero build tools or external backend servers while delivering enterprise-grade functionality: live GIS mapping with Leaflet.js, real-time Chart.js operational analytics, IoT sensor telemetry simulation, citizen upvoting, an incident audit timeline modal system, synthesized Web Audio chimes, and an administrative triage control center with CSV export capabilities.

> *"Connecting citizens and municipal authorities in real-time to build safer, more resilient, and sustainable urban environments."*

---

## 🌟 Key Features

### 1. 🗺️ Live GIS Infrastructure Map (Leaflet.js)
* **Real-time Map Plotting**: Interactive vector map centered on Nagpur, Maharashtra, India (`[21.1458, 79.0882]`).
* **Category Filtering**: Instant pill-strip filters for Roads, Utilities, Water Systems, Sanitation, Traffic Signals, and Transit routes.
* **Smart Priority Pin Markers**: Color-coded glowing SVG markers (High: Red, Medium: Amber, Low: Cyan) with floating micro-animations.
* **Instant GPS "Locate Me"**: Uses the HTML5 Geolocation API to lock the user's coordinates on the map with a pulsing blue beacon.
* **Marker Popups & Quick Actions**: Direct links from marker popups to inspect full timeline audits or track work order resolutions.

### 2. 📝 Citizen Incident Reporting Form
* **Interactive Category Picker**: 6 core municipal categories with customized icons and color palettes.
* **Interactive Map Coordinates Selector**: Click anywhere on the map to pinpoint precise GPS latitude and longitude.
* **Smart Location Auto-Suggest**: Automatically suggests relevant Nagpur neighborhoods (e.g. Civil Lines, Dharampeth, Sadar, Central Avenue, Sitabuldi) based on coordinate quad.
* **⚡ One-Click Sample Autofill**: Instantly populates realistic emergency incident scenarios for fast demonstration and testing.
* **Drag-and-Drop Photo Upload**: Full image preview support with base64 client-side processing and category fallbacks.
* **Real-Time Validation**: Field verification, priority tagging, and automatic assignment to municipal triage queues.

### 3. 🔎 Incident Tracker & Community Endorsement
* **Multi-Parameter Search**: Instant live filtering by incident ID, title, keyword description, or street address.
* **Lifecycle Status Tabs**: Filter by `All`, `Pending`, `Under Review`, `In Progress`, and `Resolved`.
* **Citizen Upvoting (+1 Endorsements)**: Citizens can confirm and upvote community issues, accelerating municipal dispatch priority.
* **Interactive Timeline Stepper**: Step-by-step visual tracker illustrating triage progression from submission to resolution.
* **"View on Map" Integration**: Flies the main dashboard map directly to the incident's physical coordinates with automatic popup trigger.

### 4. 📋 Incident Audit & Timeline Modal
* **Comprehensive Case Dossier**: High-resolution image preview, incident metadata, and GPS coordinates.
* **Action & Dispatch Audit Trail**: Full chronological audit log with dispatcher timestamps, crew assignments, and status updates.
* **Interactive Field Note Appender**: Citizens and dispatchers can append operational notes and verification updates in real time.

### 5. 🛡️ Municipal Operations Desk (Admin Panel)
* **Rapid Response Center**: Comprehensive data table listing all logged municipal cases with reporter profiles and priority badges.
* **Live Status Triage Switcher**: Change incident statuses (`Awaiting Triage` ➔ `Under Review` ➔ `In Progress` ➔ `Resolved Case`) with automated timeline note logging and citizen notification broadcasting.
* **Search & Multi-Filters**: Filter admin table by status, priority, or search query.
* **Record Management**: One-click deletion of obsolete or duplicate records with safety confirmations.
* **Emergency Broadcast Desk**: Publish immediate citywide emergency alerts and council bulletins that flash on the sticky announcement banner.
* **Data Export (CSV)**: Export the complete incident database to clean, RFC 4180-compliant CSV files (`smartcity_nagpur_incidents.csv`) for departmental audits and municipal reporting.
* **Demo State Reset**: Instantly restore initial Nagpur demo records with one click.

### 6. 📊 Smart Infrastructure Analytics (Chart.js)
* **Category Distribution Doughnut Chart**: Live percentage breakdown across road repairs, streetlights, water mains, waste, traffic lights, and buses.
* **Weekly Incident Trend Line Graph**: Volume tracking with curved bezier tension curves and glowing gradient fills.
* **Sector Performance Horizontal Bar Chart**: Departmental SLA compliance rates across municipal sectors.
* **Core Infrastructure Indicators Scorecard**: Real-time percentage tracking of Power Grid, Water Systems, Transit On-Time Rates, Utilities, and Signal health.

### 7. 📡 Real-Time IoT Telemetry Simulator
* **Simulated Sensor Grid**: Background simulation updating Air Quality Index (AQI), Grid Water Pressure (bar), Power Grid Load (%), and Transit Efficiency (%).
* **Dynamic Progress Bars & Sparklines**: Smooth CSS transitions indicating surge status, flow rate, and nominal grid health.

### 8. 🔔 Broadcast Notification System & Audio Synthesizer
* **Tiered Bulletins**: Critical Emergency Alerts, Operational Updates, and Municipal Council Announcements.
* **Granular Feed Filtering**: Filter notifications by severity preference with immediate feed update.
* **Zero-Dependency Web Audio Synthesizer**: Custom synthesized audio tones (chimes for success, emergency alarm pulses for critical alerts) generated using browser `AudioContext`.

### 9. 🎨 Theme & Role Customization
* **Dark & Light Mode**: Seamless glassmorphic design system with HSL-tailored accents and CSS custom properties.
* **Role Switcher**: Toggle effortlessly between **Sankalp Gaidhane** (Verified Citizen) and **Chief Dispatcher** (Municipal Operations Admin).
* **LocalStorage Persistence**: Themes, active roles, user upvotes, incident records, and notifications persist across browser refreshes.

---

## 📁 Repository Structure

```
smart-city-demo/
│
├── index.html          # Semantic Single-Page Application container (9 views & modals)
├── styles.css          # Design system, CSS variables, glassmorphism, responsive queries
├── app.js              # State engine, LocalStorage, Leaflet maps, Chart.js, Web Audio synthesizer
│
└── README.md           # Platform documentation and architecture guide
```

---

## 🚀 Quick Start & Installation

### Option 1: Direct File Open
Simply double-click `index.html` or drag it into any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Recommended for Geolocation & Modules)

Using **Python**:
```bash
# Navigate to project directory
cd smart-city-demo

# Launch local server
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

Using **Node.js**:
```bash
npx serve .
```

---

## 🗺️ Physical Demo Location

The platform comes pre-configured with geographical mock telemetry for **Nagpur, Maharashtra, India** (the geographic center of India):

| Incident ID | Location / Landmark | Category | Priority | Status |
|:---|:---|:---|:---|:---|
| **REP-1024** | Central Avenue, near Telephone Exchange Sq | Roads | High | In Progress |
| **REP-1023** | Civil Lines, near Kasturchand Park | Utilities | Medium | Resolved |
| **REP-1022** | Dharampeth, VIP Road near Coffee House Sq | Water | High | Under Review |
| **REP-1021** | Sitabuldi Main Road, adjacent to Metro Station | Sanitation | Low | Pending |
| **REP-1020** | Sadar, Residency Road Intersection | Signals | High | In Progress |
| **REP-1019** | Wardha Road, near Rahate Colony Square | Transit | Medium | Resolved |
| **REP-1018** | Ramdaspeth, Canal Road Crossing | Roads | Low | Pending |

---

## 💻 Tech Stack & Libraries

* **Markup**: HTML5 (Semantic elements, ARIA accessibility, Modal dialogs)
* **Styling**: CSS3 Custom Properties (Variables, Glassmorphism, Flexbox, CSS Grid, Transitions)
* **Logic**: Vanilla JavaScript (ES6+, Observer patterns, LocalStorage API, Web Audio API, Geolocation API)
* **Mapping**: [Leaflet.js v1.9.4](https://leafletjs.com/) with CartoDB Voyager tiles
* **Data Visualizations**: [Chart.js v4.4](https://www.chartjs.org/)
* **Typography**: Google Fonts (*Outfit* and *Plus Jakarta Sans*)
* **Icons**: [FontAwesome 6](https://fontawesome.com/)

---

## 🤝 Contributing

Contributions and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

**Developed by [Sankalp Gaidhane](https://github.com/sankalpgaidhane77-star)**

[![GitHub Repo](https://img.shields.io/badge/GitHub-smart--city--demo-181717?logo=github)](https://github.com/sankalpgaidhane77-star/smart-city-demo)

*Building resilient, intelligent, and human-centric cities through technology.*

</div>
