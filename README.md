# 🏙️ UrbanMind AI

### 🤖 AI Copilot for Data-Driven Urban Planning

**UrbanMind AI** is an intelligent city planning assistant that helps urban planners analyze zoning mismatches and generate AI-powered development recommendations. 🚀

The platform evaluates city zones using five critical urban metrics — **amenities 🏥, traffic stress 🚗, green cover 🌳, economic activity 💰, and population density 👥** — and provides actionable recommendations to improve urban livability, infrastructure planning, and economic growth.

UrbanMind AI acts as a **planning copilot ✈️**, assisting planners in making data-driven zoning decisions rather than relying solely on manual analysis or outdated surveys.

---

## 🚨 Problem Statement

City planners often make zoning decisions using fragmented datasets, outdated surveys, and manual analysis. 📉

This leads to:
* 🚗 **Traffic congestion**
* 🏗️ **Poor land-use planning**
* 🏥 **Infrastructure deficits**
* 🌫️ **Environmental degradation**
* 〽️ **Inefficient urban development**

**UrbanMind AI** solves this by providing an **AI-driven decision support system 🧠** that evaluates city zones and suggests optimal planning interventions.

---

## ✨ Key Features

### 📊 Zone Analytics Dashboard
UrbanMind AI evaluates zones using five planning indicators:

| 📏 Metric | 📝 Description |
| :--- | :--- |
| **Amenity Score 🏥** | Availability of hospitals, schools, parks, police stations |
| **Traffic Stress Index 🚗** | Road congestion and vehicle density |
| **Green Cover Percentage 🌳** | Tree canopy, parks, water bodies |
| **Economic Activity Index 💰** | Business density and commercial transactions |
| **Population Density 👥** | Residents per km² |

These metrics help planners identify **urban stress and development gaps**. 🔍

---

### 🧠 AI Zoning Recommendation
UrbanMind AI detects mismatches between **current zoning labels and actual urban conditions**. ⚠️

Example outputs include:
* 🏢 Mixed-Use Development Zone
* 🚄 Transit-Oriented Development
* 💻 Tech Innovation Corridor
* 🏗️ Urban Renewal District
* 🍃 Eco-Conservation Zone

The AI provides:
* 🎯 Recommended zoning type
* 💯 Confidence score
* ⏳ Urgency level
* 📖 Planning explanation
* 🛠️ Suggested interventions

---

### 🛡️ Urban Risk Score
UrbanMind AI calculates a composite risk index to identify zones requiring urgent intervention. ⚡

**Formula 🧮:**
> **Urban Risk Score =**
> 0.30 × Traffic Stress 🚗
> + 0.25 × Population Density Score 👥
> + 0.25 × Amenity Deficit 🏥
> + 0.20 × Green Cover Deficit 🌳

**Risk Levels 🌡️:**

| 🔢 Score | 🏷️ Category |
| :--- | :--- |
| **0–30** | 🟢 Stable |
| **31–55** | 🟡 Medium Risk |
| **56–75** | 🟠 High Risk |
| **76–100** | 🔴 Critical |

---

### 🚨 Priority Alert System
Automatically highlights zones with critical planning issues. 🔔

Example alerts:
* **Gandhipuram Transport Hub** – Severe traffic congestion 🛑
* **Ukkadam Dense Housing** – Amenity deficit 🏥
* **Singanallur Lake Belt** – Environmental conservation priority 🍃

---

### 📈 Impact Estimator
Urban planners can simulate infrastructure improvements such as:
* 🚇 Adding a Metro Station
* 🏥 Building a Hospital
* 🌳 Creating a Public Park
* 💻 Developing a Tech Hub

UrbanMind AI estimates potential improvements in:
* 📉 Traffic congestion
* 📈 Economic activity
* 🌟 Population benefit

---

### 🗺️ Heatmap Visualization
The dashboard includes visual overlays for:
* 🔴 Traffic density
* 🟣 Population density
* 🟢 Green cover

These overlays help planners visually identify urban stress zones. 👁️

---

### 📄 Planning Report Generator
UrbanMind AI can generate an automated planning report containing:
* 📋 Zone analysis
* 🤖 AI recommendations
* 🛠️ Intervention strategies
* 💰 Estimated economic impact
* 🗓️ Implementation timeline

---

## 📍 Demo City

This prototype demonstrates the system using **Coimbatore, Tamil Nadu 🇮🇳**.

Zones included:
1. 🏙️ RS Puram Core
2. 🚌 Gandhipuram Transport Hub
3. 💻 Peelamedu IT Corridor
4. 🌊 Singanallur Lake Belt
5. 🏘️ Ukkadam Dense Housing
6. 🏡 Saibaba Colony

Each zone contains simulated metrics representing realistic urban conditions. 📉

---

## 🏗️ System Architecture

UrbanMind AI follows a **three-layer architecture**. 🧱

```text
+-----------------------------+
|        Frontend UI 🖥️       |
|   HTML + CSS + JavaScript   |
| Dashboard & Visualization   |
+-------------+---------------+
              |
              | REST API 🌐
              |
+-------------v---------------+
|      Backend Server ⚙️       |
|          FastAPI            |
|       Zone Analyzer         |
|      Impact Estimator       |
|      Report Generator       |
+-------------+---------------+
              |
              |
+-------------v---------------+
|         AI Engine 🧠        |
|      Google Gemini API      |
|   Urban Planning Analysis   |
+-------------+---------------+
              |
              |
+-------------v---------------+
|         Database 🗄️        |
|   PostgreSQL + JSON Seeds   |
|   Zones, Metrics, Results   |
+-----------------------------+
```

---

## 🔄 AI Workflow Pipeline

```text
📊 Zone Metrics
     |
     v
📏 Urban Risk Evaluation
     |
     v
🧠 Gemini AI Analysis
     |
     v
🎯 Zoning Recommendation
     |
     v
🛠️ Intervention Suggestions
     |
     v
📈 Impact Estimation
     |
     v
👁️ Dashboard Visualization
```

---

## 💻 Example AI Output

```json
{
 "recommended_zone_type": "Transit-Oriented Development",
 "confidence_score": 92,
 "urgency_level": "Critical",
 "headline_recommendation": "Transform Gandhipuram into a transit-oriented development district.",
 "interventions": [
   "Expand public transit capacity",
   "Develop mixed-use housing near transit",
   "Introduce pedestrian corridors"
 ],
 "impact_metrics": {
   "traffic_reduction": "28%",
   "economic_growth": "₹600 Crore",
   "population_benefit": "38%"
 }
}
```

---

## 🛠️ Technology Stack

*   **Frontend 🎨:** HTML, CSS, Vanilla JavaScript
*   **Backend ⚙️:** Python – FastAPI
*   **AI Engine 🧠:** Google Gemini API
*   **Database 🗄️:** PostgreSQL (JSON seed files for zone metrics)
*   **Visualization 🗺️:** Custom heatmap overlays on static maps

---

## 📂 Project Structure

```text
urbanmind-ai/
├── frontend/ 🖥️
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   ├── zones.js
│   └── assets/
│       ├── maps/
│       └── heatmaps/
├── backend/ ⚙️
│   ├── server.py
│   ├── gemini_client.py
│   └── zone_analyzer.py
├── database/ 🗄️
│   ├── schema.sql
│   └── zones_seed.json
└── README.md 📄
```

---

## 🚀 Installation

Clone the repository 📥
```bash
git clone https://github.com/Rampradeep31/urbanMind_AI.git
```

Navigate to project directory 📂
```bash
cd urbanmind-ai
```

---

### ⚙️ Backend Setup

Install dependencies 📦
```bash
pip install fastapi uvicorn requests google-generativeai pydantic
```

Run the backend server 🚀
```bash
python server.py
# or
uvicorn server:app --reload
```

Server runs on 🌐
```
http://localhost:8000
```

---

### 🖥️ Frontend Setup

Navigate to frontend folder 📂
```bash
cd frontend
```

Run a simple server 🔥
```bash
python -m http.server 3000
```

Open in browser 🌐
```
http://localhost:3000
```

---

## 📡 API Endpoints

| 🔗 Endpoint | 📝 Description |
| :--- | :--- |
| `GET /zones` | Retrieve all zone data |
| `POST /analyze` | Analyze zone using AI |
| `POST /impact-estimate` | Predict infrastructure impact |
| `GET /generate-report` | Generate planning report |

---

## 🔮 Future Enhancements

Potential upgrades include:
* 📡 Real-time traffic data integration
* 🛰️ Satellite imagery analysis
* 🗺️ GIS spatial analytics
* 🤖 Machine learning forecasting
* 🏙️ Multi-city scalability
* 👯 Digital twin simulation for cities

---

## 🌍 Vision

UrbanMind AI aims to transform city planning from **manual decision-making into AI-assisted urban intelligence**. 🧠✨

Instead of static dashboards, the platform acts as a **planning copilot ✈️**, enabling governments to design smarter 🧠, greener 🌳, and more sustainable cities 🏢.

---

## 📜 License

This project is built for educational and hackathon purposes. Licensed under the MIT License. ⚖️

---

## 🙏 Acknowledgements

Inspired by smart city initiatives and the need for **data-driven urban development in rapidly growing cities**. 🏙️📈
