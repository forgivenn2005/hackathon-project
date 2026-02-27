import { resolveDeficit } from '../core/balancing.js';
import { acquireLock, releaseLock } from '../models/db.js';

export const handleIncident = async (req, res) => {
  const { zoneId, newD, currentZones, reserve } = req.body;

  // Stage 4: Concurrency Lock
  await acquireLock(zoneId);

  try {
    const target = currentZones.find(z => z.id === zoneId);
    
    // Calculate troop requirement change (Simplified Delta T)
    const requirementDiff = Math.ceil(target.currentPersonnel * (newD / target.D)) - target.currentPersonnel;

    const resolution = resolveDeficit(zoneId, requirementDiff, currentZones, reserve);

    res.json({
      impact: requirementDiff,
      resolution: resolution
    });
  } catch (err) {
    res.status(500).send("Rebalancing collision.");
  } finally {
    releaseLock(zoneId);
  }
};