import { WEIGHTS } from '../../../shared/constants.js';

/**
 * Proportional Math Engine
 * Normalized distribution based on S and D scores.
 */
export const calculateZScore = (S, D) => {
  return (WEIGHTS.SIZE * S + WEIGHTS.DENSITY * D) / (WEIGHTS.SIZE + WEIGHTS.DENSITY);
};

export const allocateForce = (totalForce, zones) => {
  const globalReserve = Math.floor(totalForce * 0.15);
  const activeForce = totalForce - globalReserve;

  const zonesWithScores = zones.map(z => ({
    ...z,
    score: calculateZScore(z.S, z.D)
  }));

  const totalScoreSum = zonesWithScores.reduce((sum, z) => sum + z.score, 0);

  const distribution = zonesWithScores.map(z => ({
    zoneId: z.id,
    troopCount: Math.floor((z.score / totalScoreSum) * activeForce)
  }));

  return { distribution, globalReserve };
};