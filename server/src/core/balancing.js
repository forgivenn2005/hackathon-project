/**
 * Auto-Resolution Engine
 * Cascading Search: Neighbors -> Global Reserve -> Critical Alert
 */
export const resolveDeficit = (targetId, deficit, allZones, reserveCount) => {
  let remaining = deficit;
  const transfers = [];

  // Step A: Neighbor Siphoning
  const target = allZones.find(z => z.id === targetId);
  const neighbors = allZones.filter(z => target.adjacencies.includes(z.id));

  for (const n of neighbors) {
    if (n.D < 5) { // Only pull from safe zones
      const surplus = Math.floor(n.currentPersonnel * 0.1); // 10% safety threshold
      const taken = Math.min(remaining, surplus);
      
      if (taken > 0) {
        remaining -= taken;
        transfers.push({ from: n.id, to: targetId, qty: taken, type: 'NEIGHBOR' });
      }
    }
    if (remaining <= 0) break;
  }

  // Step B: Global Reserve
  if (remaining > 0) {
    const fromReserve = Math.min(remaining, reserveCount);
    remaining -= fromReserve;
    transfers.push({ from: 'RESERVE', to: targetId, qty: fromReserve, type: 'RESERVE' });
  }

  return {
    status: remaining <= 0 ? 'RESOLVED' : 'CRITICAL_ALERT',
    transfers,
    deficitLeft: remaining
  };
};