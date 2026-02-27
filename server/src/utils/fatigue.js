/**
 * Fatigue Logic
 * Weights night shifts and emergency deployments heavier.
 */
export const calculateFatigueUpdate = (baseScore, shiftType, isEmergency) => {
  let increment = 10; // Default for Day/Evening

  if (shiftType === 'Night') {
    increment = 20; 
  }

  if (isEmergency) {
    increment += 15; // Bonus fatigue for crisis response
  }

  return baseScore + increment;
};

// Fatigue recovery logic for rest days
export const dailyRecovery = (score) => Math.max(0, score - 30);