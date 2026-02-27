// Simple In-Memory Lock Registry
const locks = new Set();

/**
 * Stage 4: Concurrency Handling
 * Prevents race conditions during mid-shift chaos resolution.
 */
export const acquireLock = (resourceId) => {
  return new Promise((resolve) => {
    const tryLock = () => {
      if (!locks.has(resourceId)) {
        locks.add(resourceId);
        resolve(true);
      } else {
        setTimeout(tryLock, 50); // Retry every 50ms
      }
    };
    tryLock();
  });
};

export const releaseLock = (resourceId) => {
  locks.delete(resourceId);
};

// Mock Database State
export const mockDB = {
  zones: [],
  personnel: [],
  globalStandby: 0
};