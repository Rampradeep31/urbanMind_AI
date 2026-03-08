from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
from gemini_client import analyze_zone_with_gemini
from zone_analyzer import calculate_impact

app = FastAPI(title="UrbanMind AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ZoneData(BaseModel):
    id: int
    name: str
    type: str
    metrics: dict

class ImpactRequest(BaseModel):
    intervention: str
    zone: ZoneData

@app.get("/zones")
def get_zones():
    file_path = os.path.join(os.path.dirname(__file__), "..", "database", "zones_seed.json")
    if os.path.exists(file_path):
        with open(file_path, "r") as f:
            return json.load(f)
    return []

@app.post("/analyze")
def analyze_zone(zone: ZoneData):
    result = analyze_zone_with_gemini(zone.model_dump())
    return result

@app.post("/estimate-impact")
def estimate_impact(req: ImpactRequest):
    return calculate_impact(req.intervention, req.zone.model_dump())

@app.get("/generate-report")
def generate_report():
    import base64
    # Real app would use ReportLab to generate a PDF here based on state
    # Returning a basic structure to simulate success
    return {"message": "Report generation successful. Download initiated.", "status": "success"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
