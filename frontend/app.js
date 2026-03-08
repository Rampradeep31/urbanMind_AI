import { zonesData } from './zones.js';

// DOM Elements
const zoneSelect = document.getElementById('zone-select');
const alertList = document.getElementById('alert-list');
const btnAnalyze = document.getElementById('btn-analyze');
const btnReport = document.getElementById('btn-report');
const activeZoneName = document.getElementById('active-zone-name');
const activeZoneType = document.getElementById('active-zone-type');

// APIs
const API_URL = "http://localhost:8000";

// State
let selectedZone = null;

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    populateZones();
    setupAlerts();
    setupMapControls();
    
    // Listeners
    zoneSelect.addEventListener('change', handleZoneSelection);
    btnAnalyze.addEventListener('click', runAIAnalysis);
    btnReport.addEventListener('click', generateReport);
    
    document.querySelectorAll('.btn-impact').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(!selectedZone) {
                showToast("Please select a zone first", "error");
                return;
            }
            const intervention = e.currentTarget.dataset.intervention;
            estimateImpact(intervention);
        });
    });
});

function populateZones() {
    zonesData.forEach(zone => {
        const opt = document.createElement('option');
        opt.value = zone.id;
        opt.textContent = zone.name;
        zoneSelect.appendChild(opt);
    });
}

function setupAlerts() {
    // Determine priority based on traffic stress and amenity score
    const sortedZones = [...zonesData].map(zone => {
        let urgency = "stable";
        if (zone.metrics.traffic_stress > 85) urgency = "critical";
        else if (zone.metrics.amenity_score < 50) urgency = "high";
        else if (zone.metrics.traffic_stress > 65) urgency = "medium";
        
        return { ...zone, urgency };
    }).sort((a,b) => {
        const order = { "critical": 0, "high": 1, "medium": 2, "stable": 3 };
        return order[a.urgency] - order[b.urgency];
    });

    sortedZones.forEach(zone => {
        const li = document.createElement('li');
        li.className = 'alert-item';
        li.innerHTML = `
            <span>
                <span class="dot ${zone.urgency}"></span>
                ${zone.name}
            </span>
            <span style="color: var(--text-muted); font-size: 11px; text-transform: uppercase;">${zone.urgency}</span>
        `;
        alertList.appendChild(li);
    });
}

function handleZoneSelection(e) {
    const id = parseInt(e.target.value);
    selectedZone = zonesData.find(z => z.id === id);
    
    if (selectedZone) {
        btnAnalyze.disabled = false;
        btnReport.disabled = false;
        
        activeZoneName.textContent = selectedZone.name;
        activeZoneType.textContent = selectedZone.type;
        activeZoneType.classList.add('active');
        
        updateMetricsDashboard(selectedZone.metrics);
        
        // Reset AI panel
        document.getElementById('ai-results').innerHTML = '<div class="placeholder-text">Run AI Analysis to generate insights.</div>';
        document.getElementById('impact-results').classList.add('hidden');
    }
}

function updateMetricsDashboard(metrics) {
    document.getElementById('m-amenity').textContent = metrics.amenity_score;
    document.getElementById('p-amenity').style.width = `${metrics.amenity_score}%`;
    
    document.getElementById('m-traffic').textContent = metrics.traffic_stress;
    document.getElementById('p-traffic').style.width = `${metrics.traffic_stress}%`;
    
    document.getElementById('m-green').textContent = metrics.green_cover;
    document.getElementById('p-green').style.width = `${metrics.green_cover}%`;
    
    document.getElementById('m-econ').textContent = metrics.economic_activity;
    document.getElementById('p-econ').style.width = `${metrics.economic_activity}%`;
    
    document.getElementById('m-pop').textContent = metrics.population_density.toLocaleString();
}

function setupMapControls() {
    const buttons = document.querySelectorAll('.map-controls .btn-sm');
    const layers = document.querySelectorAll('.heatmap-overlay');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            buttons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            layers.forEach(l => l.style.opacity = '0');
            
            const layerName = e.target.dataset.layer;
            if (layerName !== 'none') {
                const layer = document.getElementById(`layer-${layerName}`);
                if (layer) {
                    layer.style.opacity = '0.7';
                }
            }
        });
    });
}

async function runAIAnalysis() {
    if (!selectedZone) return;
    
    const aiResults = document.getElementById('ai-results');
    const aiLoading = document.getElementById('ai-loading');
    
    aiResults.classList.add('hidden');
    aiLoading.classList.remove('hidden');
    btnAnalyze.disabled = true;

    try {
        const res = await fetch(`${API_URL}/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedZone)
        });
        
        if (!res.ok) throw new Error("API Request Failed");
        const data = await res.json();
        
        renderAIResults(data);
    } catch (error) {
        console.error("AI Analysis error:", error);
        showToast("AI Analysis failed. Make sure backend is running.", "error");
        aiResults.innerHTML = '<div class="placeholder-text">Error fetching AI insights.</div>';
    } finally {
        aiLoading.classList.add('hidden');
        aiResults.classList.remove('hidden');
        btnAnalyze.disabled = false;
    }
}

function renderAIResults(data) {
    const aiResults = document.getElementById('ai-results');
    
    const uClass = `val-${data.urgency_level.toLowerCase()}`;
    
    let html = `
        <div class="ai-header-grid">
            <div class="ai-stat-box">
                <div class="ai-stat-label">Zone Type Re-evaluation</div>
                <div class="ai-stat-val" style="color: var(--primary);">${data.recommended_zone_type}</div>
            </div>
            <div class="ai-stat-box">
                <div class="ai-stat-label">AI Confidence</div>
                <div class="ai-stat-val">${data.confidence_score}%</div>
            </div>
            <div class="ai-stat-box">
                <div class="ai-stat-label">Urgency Trigger</div>
                <div class="ai-stat-val ${uClass}">${data.urgency_level}</div>
            </div>
        </div>

        <div class="ai-recommendation-box">
            <h3>${data.headline_recommendation}</h3>
            <p class="ai-reasoning">${data.reasoning}</p>
            
            <div class="interventions-list">
                <h4>Recommended Structural Interventions</h4>
                <ul>
                    ${data.interventions.map(i => `<li>${i}</li>`).join('')}
                </ul>
            </div>
            
            <div class="impact-metrics-summary">
                <div class="ims-item">
                    <span class="ims-val">+${data.impact_metrics.estimated_pop_benefit_pct}%</span>
                    <span class="ims-label">Pop. Benefit</span>
                </div>
                <div class="ims-item">
                    <span class="ims-val">₹${(data.impact_metrics.estimated_econ_gain_inr / 10000000).toFixed(1)}Cr</span>
                    <span class="ims-label">Econ Gain</span>
                </div>
                <div class="ims-item">
                    <span class="ims-val">${data.impact_metrics.implementation_timeline_years} yrs</span>
                    <span class="ims-label">Timeline</span>
                </div>
            </div>
        </div>
    `;
    
    aiResults.innerHTML = html;
    aiResults.classList.remove('empty');
}

async function estimateImpact(interventionName) {
    const impactResults = document.getElementById('impact-results');
    
    try {
        const res = await fetch(`${API_URL}/estimate-impact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                intervention: interventionName,
                zone: selectedZone
            })
        });
        
        if (!res.ok) throw new Error("Impact estimation failed");
        
        const data = await res.json();
        
        const tDiff = data.improvements.traffic; // pos/neg
        const eDiff = data.improvements.economic_activity;
        const pDiff = data.improvements.population_benefit;
        
        const formatDiff = (val, invert=false) => {
            if (val === 0) return '';
            const sign = val > 0 ? '+' : '';
            // For traffic, negative val is good (stable), pos is bad (critical)
            let colorClass = val > 0 ? 'diff-pos' : 'diff-neg';
            if(invert) {
                colorClass = val < 0 ? 'diff-pos' : 'diff-neg';
            }
            return `<span class="ir-diff ${colorClass}"> (${sign}${val})</span>`;
        };

        impactResults.innerHTML = `
            <div class="ir-header">Simulated Impact: ${interventionName}</div>
            <div class="ir-grid">
                <div class="ir-item">
                    <div class="ir-label">Post-Intervention Traffic Metric</div>
                    <div class="ir-val">${data.new_metrics.traffic_stress} ${formatDiff(-tDiff, true)}</div>
                </div>
                <div class="ir-item">
                    <div class="ir-label">Post-Intervention Econ Activity</div>
                    <div class="ir-val">${data.new_metrics.economic_activity} ${formatDiff(eDiff)}</div>
                </div>
                <div class="ir-item">
                    <div class="ir-label">General Population Benefit</div>
                    <div class="ir-val">${data.new_metrics.population_benefit}% ${formatDiff(pDiff)}</div>
                </div>
            </div>
        `;
        impactResults.classList.remove('hidden');
        
    } catch (error) {
        console.error(error);
        showToast("Failed to calculate impact. Ensure backend is running.", "error");
    }
}

async function generateReport() {
    try {
        const res = await fetch(`${API_URL}/generate-report`);
        const data = await res.json();
        showToast(data.message, "success");
    } catch (err) {
        showToast("Report generation simulated locally. API unreachable.", "info");
    }
}

function showToast(message, type="info") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = "fa-info-circle";
    if (type === "success") icon = "fa-check-circle";
    if (type === "error") icon = "fa-exclamation-circle";
    
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
