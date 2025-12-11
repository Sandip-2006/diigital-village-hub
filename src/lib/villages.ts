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
    id: 'village-001',
    name: 'Chandanpur',
    nameHi: 'चंदनपुर',
    nameGu: 'ચંદનપુર',
    taluka: 'Sanand',
    district: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '382170',
    population: 5420,
    area: '12.5',
    coordinates: {
      lat: 22.9912,
      lng: 72.3826,
    },
    sarpanch: {
      name: 'Rameshbhai Patel',
      phone: '+91 98765 43210',
    },
  },
  {
    id: 'village-002',
    name: 'Sundarpur',
    nameHi: 'सुंदरपुर',
    nameGu: 'સુંદરપુર',
    taluka: 'Dholka',
    district: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '382225',
    population: 3850,
    area: '8.2',
    coordinates: {
      lat: 22.7231,
      lng: 72.4381,
    },
    sarpanch: {
      name: 'Jasuben Shah',
      phone: '+91 98765 43211',
    },
  },
  {
    id: 'village-003',
    name: 'Keshavpur',
    nameHi: 'केशवपुर',
    nameGu: 'કેશવપુર',
    taluka: 'Bavla',
    district: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '382220',
    population: 7200,
    area: '15.8',
    coordinates: {
      lat: 22.8312,
      lng: 72.3621,
    },
    sarpanch: {
      name: 'Kantibhai Desai',
      phone: '+91 98765 43212',
    },
  },
  {
    id: 'village-004',
    name: 'Laxmipur',
    nameHi: 'लक्ष्मीपुर',
    nameGu: 'લક્ષ્મીપુર',
    taluka: 'Viramgam',
    district: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '382150',
    population: 4100,
    area: '10.3',
    coordinates: {
      lat: 23.1125,
      lng: 72.0371,
    },
    sarpanch: {
      name: 'Narendrabhai Solanki',
      phone: '+91 98765 43213',
    },
  },
  {
    id: 'village-005',
    name: 'Gandhipur',
    nameHi: 'गांधीपुर',
    nameGu: 'ગાંધીપુર',
    taluka: 'Mandal',
    district: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '382145',
    population: 6350,
    area: '14.1',
    coordinates: {
      lat: 23.2845,
      lng: 71.9234,
    },
    sarpanch: {
      name: 'Bhavnaben Parmar',
      phone: '+91 98765 43214',
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
