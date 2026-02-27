import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const sentinelAPI = {
    // Stage 1: Create Zones
    setupZones: (zones) => axios.post(`${API_URL}/zones`, { zones }),

    // Stage 2: Generate Roster
    generateRoster: (totalForce, zones) => 
        axios.post(`${API_URL}/roster/generate`, { totalForce, zones }),

    // Stage 3: Mid-Shift Incident Spike
    simulateIncident: (zoneId, newD, currentZones, reserve) => 
        axios.post(`${API_URL}/incident/spike`, { zoneId, newD, currentZones, reserve }),

    // Fetch Personnel data for the Roster View
    getPersonnel: () => axios.get(`${API_URL}/personnel`)
};