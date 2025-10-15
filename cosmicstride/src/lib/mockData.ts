// Mock GPS route data (running in Sofia)
export interface RoutePoint {
  lat: number;
  lng: number;
  alt: number;
}

export const mockRoute: RoutePoint[] = [
  { lat: 42.6977, lng: 23.3219, alt: 550 },  // Start - Sofia center
  { lat: 43.7000, lng: 23.3400, alt: 555 },
  { lat: 44.7100, lng: 23.3600, alt: 560 },
  { lat: 45.7200, lng: 23.3800, alt: 565 },
  { lat: 46.7300, lng: 23.4000, alt: 570 },
  { lat: 47.7400, lng: 23.4200, alt: 575 },
  { lat: 48.7500, lng: 23.4400, alt: 580 },
  { lat: 49.7600, lng: 23.4600, alt: 585 },
  { lat: 50.7700, lng: 23.4800, alt: 590 },
  { lat: 51.7800, lng: 23.5000, alt: 595 },
  { lat: 52.7900, lng: 23.5200, alt: 600 },
  { lat: 53.8000, lng: 23.5400, alt: 605 },  // End - much longer route
];

// Space milestones
export interface Milestone {
  distance: number;
  name: string;
  altitude: string;
  emoji: string;
  description?: string;
}

export const spaceMilestones: Milestone[] = [
  { 
    distance: 5, 
    name: "Stratosphere", 
    altitude: "50 km", 
    emoji: "🌡️",
    description: "Where weather balloons fly"
  },
  { 
    distance: 10, 
    name: "Commercial Flight Zone", 
    altitude: "~10 km", 
    emoji: "✈️",
    description: "Cruising altitude of airplanes"
  },
  { 
    distance: 100, 
    name: "Kármán Line", 
    altitude: "100 km", 
    emoji: "🚀",
    description: "The edge of space!"
  },
  { 
    distance: 400, 
    name: "ISS Orbit", 
    altitude: "408 km", 
    emoji: "🛰️",
    description: "Home of astronauts"
  },
  { 
    distance: 1000, 
    name: "Low Earth Orbit", 
    altitude: "1,000 km", 
    emoji: "🌍",
    description: "Where most satellites orbit"
  },
  { 
    distance: 35786, 
    name: "Geostationary Orbit", 
    altitude: "35,786 km", 
    emoji: "📡",
    description: "Communication satellites"
  },
  { 
    distance: 384400, 
    name: "The Moon", 
    altitude: "384,400 km", 
    emoji: "🌕",
    description: "Earth's natural satellite"
  },
  { 
    distance: 54600000, 
    name: "Mars (closest)", 
    altitude: "54.6 million km", 
    emoji: "🔴",
    description: "The Red Planet"
  },
  { 
    distance: 628730000, 
    name: "Jupiter", 
    altitude: "628.73 million km", 
    emoji: "🪐",
    description: "The giant planet"
  },
];

// Calculate total distance of route in km
export function calculateRouteDistance(route: RoutePoint[]): number {
  let total = 0;
  for (let i = 1; i < route.length; i++) {
    const prev = route[i - 1];
    const curr = route[i];
    
    // Haversine formula for distance between two GPS points
    const R = 6371; // Earth's radius in km
    const dLat = toRad(curr.lat - prev.lat);
    const dLng = toRad(curr.lng - prev.lng);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(prev.lat)) * Math.cos(toRad(curr.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    total += distance;
  }
  return total;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Find next milestone based on distance
export function getNextMilestone(distanceKm: number): Milestone | null {
  const next = spaceMilestones.find(m => m.distance > distanceKm);
  return next || null;
}

// Find current achieved milestone
export function getCurrentMilestone(distanceKm: number): Milestone | null {
  for (let i = spaceMilestones.length - 1; i >= 0; i--) {
    if (distanceKm >= spaceMilestones[i].distance) {
      return spaceMilestones[i];
    }
  }
  return null;
}

// Calculate progress to next milestone (0-100%)
export function getMilestoneProgress(distanceKm: number): number {
  const current = getCurrentMilestone(distanceKm);
  const next = getNextMilestone(distanceKm);
  
  if (!next) return 100; // Reached the last milestone
  
  const start = current ? current.distance : 0;
  const end = next.distance;
  const progress = ((distanceKm - start) / (end - start)) * 100;
  
  return Math.min(Math.max(progress, 0), 100);
}

// Mock cosmic conditions
export interface CosmicConditions {
  uvIndex: number;
  solarWind: number; // km/s
  kpIndex: number; // geomagnetic activity 0-9
  temperature: number;
}

export const mockCosmicConditions: CosmicConditions = {
  uvIndex: 6,
  solarWind: 450,
  kpIndex: 3,
  temperature: 18,
};