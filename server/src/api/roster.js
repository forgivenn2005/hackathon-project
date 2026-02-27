import { generateRoster } from '../core/scheduler.js';
import { allocateForce } from '../core/distributor.js';
import { mockDB } from '../models/db.js';

export const createRoster = (req, res) => {
    const { totalForce, zones } = req.body;

    // 1. Calculate how many people per zone
    const distributionData = allocateForce(totalForce, zones);
    
    // 2. Map target counts back to zones for the scheduler
    const zonesWithTargets = zones.map(z => ({
        ...z,
        targetTroops: distributionData.distribution.find(d => d.zoneId === z.id).troopCount
    }));

    // 3. Generate the 30-day schedule
    const schedule = generateRoster(mockDB.personnel, zonesWithTargets);

    res.status(200).json({
        summary: distributionData,
        schedule: schedule
    });
};