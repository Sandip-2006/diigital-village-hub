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
    population: 140122,
    area: '22.5',
    coordinates: {
      lat: 24.1725,
      lng: 72.4381,
    },
    sarpanch: {
      name: 'Rameshbhai Patel',
      phone: '+91 98765 43210',
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
    area: '15.8',
    coordinates: {
      lat: 24.0839,
      lng: 72.6047,
    },
    sarpanch: {
      name: 'Jasuben Shah',
      phone: '+91 98765 43211',
    },
  },
  {
    id: 'danta',
    name: 'Danta',
    nameHi: 'डांटा',
    nameGu: 'ડાંટા',
    taluka: 'Danta',
    district: 'Banaskantha',
    state: 'Gujarat',
    pincode: '385120',
    population: 18500,
    area: '12.3',
    coordinates: {
      lat: 24.1894,
      lng: 72.7653,
    },
    sarpanch: {
      name: 'Kantibhai Desai',
      phone: '+91 98765 43212',
    },
  },
  {
    id: 'dhanera',
    name: 'Dhanera',
    nameHi: 'धनेरा',
    nameGu: 'ધાનેરા',
    taluka: 'Dhanera',
    district: 'Banaskantha',
    state: 'Gujarat',
    pincode: '385310',
    population: 45000,
    area: '18.7',
    coordinates: {
      lat: 24.5136,
      lng: 72.0254,
    },
    sarpanch: {
      name: 'Narendrabhai Solanki',
      phone: '+91 98765 43213',
    },
  },
];

export const getVillageById = (id: string): Village | undefined => {
  return villages.find(v => v.id === id);
};

export const getVillageByCoordinates = (lat: number, lng: number): Village | undefined => {
  // Find nearest village within ~5km radius
  const RADIUS_KM = 5;
  
  for (const village of villages) {
    const distance = calculateDistance(lat, lng, village.coordinates.lat, village.coordinates.lng);
    if (distance <= RADIUS_KM) {
      return village;
    }
  }
  
  return undefined;
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
