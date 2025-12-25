// Village data for Digital Village Portal

export interface Village {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  taluka: string;
  district: string;
  state: string;
  pincode: string;
  population: number;
  area: string; // in sq km
  coordinates: {
    lat: number;
    lng: number;
  };
  sarpanch: {
    name: string;
    phone: string;
    photo?: string;
  };
}

export const villages: Village[] = [
  {
    id: 'palanpur',
    name: 'Palanpur',
    nameHi: 'पालनपुर',
    nameGu: 'પાલનપુર',
    taluka: 'Palanpur',
    district: 'Banaskantha',
    state: 'Gujarat',
    pincode: '385001',
    population: 140000,
    area: '25.5',
    coordinates: {
      lat: 24.1725,
      lng: 72.4323,
    },
    sarpanch: {
      name: 'Rameshbhai Patel',
      phone: '+91 98765 43210',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    },
  },
  {
    id: 'vadgam',
    name: 'Vadgam',
    nameHi: 'वडगाम',
    nameGu: 'વડગામ',
    taluka: 'Vadgam',
    district: 'Banaskantha',
    state: 'Gujarat',
    pincode: '385410',
    population: 25000,
    area: '18.2',
    coordinates: {
      lat: 24.0548,
      lng: 72.5831,
    },
    sarpanch: {
      name: 'Jasuben Shah',
      phone: '+91 98765 43211',
      photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face',
    },
  },
  {
    id: 'danta',
    name: 'Danta',
    nameHi: 'दांता',
    nameGu: 'દાંતા',
    taluka: 'Danta',
    district: 'Banaskantha',
    state: 'Gujarat',
    pincode: '385120',
    population: 15000,
    area: '22.8',
    coordinates: {
      lat: 24.1892,
      lng: 72.7621,
    },
    sarpanch: {
      name: 'Kantibhai Desai',
      phone: '+91 98765 43212',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    },
  },
  {
    id: 'dhanera',
    name: 'Dhanera',
    nameHi: 'धानेरा',
    nameGu: 'ધાનેરા',
    taluka: 'Dhanera',
    district: 'Banaskantha',
    state: 'Gujarat',
    pincode: '385310',
    population: 45000,
    area: '28.3',
    coordinates: {
      lat: 24.5125,
      lng: 72.0271,
    },
    sarpanch: {
      name: 'Narendrabhai Solanki',
      phone: '+91 98765 43213',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    },
  },
];

export const getVillageById = (id: string): Village | undefined => {
  return villages.find(v => v.id === id);
};

export const getVillageByCoordinates = (lat: number, lng: number): Village | undefined => {
  // Find nearest village within ~20km radius
  const RADIUS_KM = 20;
  let nearestVillage: Village | undefined;
  let minDistance = Infinity;
  
  for (const village of villages) {
    const distance = calculateDistance(lat, lng, village.coordinates.lat, village.coordinates.lng);
    if (distance <= RADIUS_KM && distance < minDistance) {
      minDistance = distance;
      nearestVillage = village;
    }
  }
  
  return nearestVillage;
};

// Haversine formula to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}
