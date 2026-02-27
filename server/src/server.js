import express from 'express';
import cors from 'cors';
import zoneRoutes from './api/zones.js';
import incidentRoutes from './api/incident.js';
import rosterRoutes from './api/roster.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/zones', zoneRoutes);       // Stage 1
app.use('/api/roster', rosterRoutes);     // Stage 2
app.use('/api/incident', incidentRoutes); // Stage 3 & 4

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  🛡️  OPERATION SENTINEL ENGINE STARTING...
  ---------------------------------------
  Status: Operational
  Port: ${PORT}
  Logic: Scale-Agnostic
  ---------------------------------------
  `);
});