def calculate_impact(intervention, zone_data):
    traffic_imp = 0
    econ_imp = 0
    pop_imp = 0
    
    if intervention == "Add Metro Station":
        traffic_imp = -25
        econ_imp = 40
        pop_imp = 35
    elif intervention == "Add Hospital":
        traffic_imp = 10
        econ_imp = 15
        pop_imp = 60
    elif intervention == "Add Park":
        traffic_imp = -5
        econ_imp = 10
        pop_imp = 20
    elif intervention == "Add Tech Hub":
        traffic_imp = 30
        econ_imp = 65
        pop_imp = 25
        
    original = zone_data["metrics"]
    
    return {
        "intervention": intervention,
        "new_metrics": {
            "traffic_stress": max(0, min(100, original["traffic_stress"] + traffic_imp)),
            "economic_activity": max(0, min(100, original["economic_activity"] + econ_imp)),
            "population_benefit": pop_imp
        },
        "improvements": {
            "traffic": -traffic_imp,  # negative means reduction in stress, which is good
            "economic_activity": econ_imp,
            "population_benefit": pop_imp
        }
    }
