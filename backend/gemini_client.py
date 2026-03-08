import os
import google.generativeai as genai
import json

# Setup API Key
# For hackathon, if API_KEY is missing, we return dummy mock output.
api_key = os.environ.get("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

def analyze_zone_with_gemini(zone_data):
    if not api_key:
        return get_mock_response(zone_data)
        
    prompt = f"""
You are UrbanMind AI, an AI planning copilot for city governments. Analyze urban zones using five metrics: amenity score, traffic stress, green cover, economic activity, and population density. Recommend optimal zoning changes and urban interventions. Return only JSON.

Zone Data:
{json.dumps(zone_data, indent=2)}

JSON Format required:
{{
  "recommended_zone_type": "string",
  "confidence_score": "number (0-100)",
  "urgency_level": "Low | Medium | High | Critical",
  "headline_recommendation": "string",
  "reasoning": "string",
  "interventions": ["string", "string", "string"],
  "impact_metrics": {{
    "estimated_pop_benefit_pct": "number",
    "estimated_econ_gain_inr": "number",
    "implementation_timeline_years": "number"
  }}
}}
"""
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        text = response.text
        # Clean markdown codeblocks
        if text.startswith("```json"):
            text = text[7:-3]
        elif text.startswith("```"):
            text = text[3:-3]
        return json.loads(text.strip())
    except Exception as e:
        print("Error with Gemini API:", e)
        return get_mock_response(zone_data)

def get_mock_response(zone_data):
    urgency = "Medium"
    if zone_data["metrics"]["traffic_stress"] > 85:
        urgency = "Critical"
    elif zone_data["metrics"]["amenity_score"] < 50:
        urgency = "High"
    elif zone_data["metrics"]["green_cover"] > 20:
        urgency = "Stable"
    elif zone_data["metrics"]["traffic_stress"] < 60:
        urgency = "Low"
        
    return {
        "recommended_zone_type": "Optimized " + zone_data["type"],
        "confidence_score": 92,
        "urgency_level": urgency,
        "headline_recommendation": f"Revitalize {zone_data['name']} by focusing on traffic efficiency and green spaces.",
        "reasoning": "The area's metrics indicate a disparity between population density and available amenities. Strategic interventions can provide immediate relief.",
        "interventions": [
            "Implement smart traffic signaling",
            "Plant urban micro-forests",
            "Develop pedestrian-friendly pathways"
        ],
        "impact_metrics": {
            "estimated_pop_benefit_pct": 18.5,
            "estimated_econ_gain_inr": 85000000,
            "implementation_timeline_years": 2.0
        }
    }
