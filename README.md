# UrbanMind AI — City Planning Copilot 🚀

UrbanMind AI is a smart, AI-driven city planning prototype built for Hackathons. It simulates real-time urban analysis across multiple city zones (currently focused on Coimbatore, India) to provide actionable recommendations, optimize urban growth, and calculate the estimated impact of architectural interventions.



## 🌟 Key Features

*   **Dynamic AI Zoning Diagnostics**: Uses the Google Gemini API to calculate comprehensive "Urban Risk Scores" ranging from Stable to Critical.
*   **Zoning Mismatch Detector**: Detects clashes between a zone's current designation (e.g., Commercial) and its optimal usage (e.g., Mixed Use) based on population density and traffic stress.
*   **Intervention Budgeting & Timeline**: Simulates structural improvements (like transit corridors and green micro-forests), estimating budget requirements natively in Crore (INR) alongside structured multi-year implementation timelines.
*   **Predictive Smart Alerts**: Flags areas experiencing imminent climate issues or transit gridlock before they become critical.
*   **Impact Estimator**: A dedicated tool enabling planners to model specific infrastructure interventions (Metro Stations, Parks, Hospitals) and visualize real-time improvements in population benefit and economic growth.

## 🛠️ Technology Stack

Designed to be lightweight and extremely fast, perfect for a hackathon:

*   **Frontend**: Pure HTML, Vanilla CSS, Vanilla JS (No frameworks, blisteringly fast, 100% custom UI).
*   **Backend**: Python, FastAPI.
*   **AI Engine**: Google Gemini API (`gemini-2.5-flash`).

## 🚀 Getting Started

Follow these instructions to run the project locally.

### 1. Backend Setup

Open a terminal and navigate to the backend directory:
```bash
cd backend
```

Install the requirements:
```bash
pip install -r requirements.txt
```

Set your Gemini API Key. If you skip this, the app will gracefully fall back to a high-quality mock data generator so you can still demo it perfectly!
*   **Windows:** `set GEMINI_API_KEY=your_api_key_here`
*   **Mac/Linux:** `export GEMINI_API_KEY="your_api_key_here"`

Start the backend API:
```bash
python server.py
```
*The API will be available at `http://127.0.0.1:8000`.*

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

Start a local HTTP server:
```bash
python -m http.server 3000
```
*You can also use Node (`npx serve`) or your IDE's Live Server.*

Open your web browser and go to:
**`http://127.0.0.1:3000`**

## 📂 Project Structure

```text
urbanmind-ai/
├── database/
│   ├── schema.sql
│   └── zones_seed.json
├── backend/
│   ├── server.py
│   ├── gemini_client.py
│   ├── zone_analyzer.py
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── style.css
    ├── app.js
    ├── zones.js
    └── assets/
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
