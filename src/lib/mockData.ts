// Mock Data for Digital Village Portal

import { Village } from './villages';

// User Roles
export type UserRole = 'villager' | 'business_owner' | 'operator' | 'govt_officer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  villageId?: string;
  avatar?: string;
  linkedAccounts: {
    google?: boolean;
    phone?: boolean;
  };
}

// Banner Types
export interface Banner {
  id: string;
  title: string;
  titleHi: string;
  titleGu: string;
  subtitle?: string;
  image: string;
  link?: string;
  startDate: string;
  endDate: string;
  villageId?: string; // null = all villages
  type: 'hero' | 'advertisement' | 'festival' | 'government';
  isActive: boolean;
  category?: 'diwali' | 'holi' | 'navratri' | 'independence' | 'scheme' | 'election' | 'notice';
}

// Member Directory
export interface Member {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  designation: string;
  designationHi: string;
  designationGu: string;
  phone: string;
  email?: string;
  photo?: string;
  villageId: string;
  committeeType: 'village' | 'school' | 'dairy' | 'panchayat';
  isActive: boolean;
}

// Sarpanch Profile
export interface Sarpanch {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  photo: string;
  phone: string;
  email: string;
  villageId: string;
  termStart: string;
  termEnd: string;
  bio: string;
  bioHi: string;
  bioGu: string;
  achievements: string[];
}

// Gram Sabha
export interface GramSabha {
  id: string;
  title: string;
  titleHi: string;
  titleGu: string;
  date: string;
  time: string;
  venue: string;
  villageId: string;
  agenda: string[];
  status: 'upcoming' | 'ongoing' | 'completed';
  livestreamUrl?: string;
  minutes?: string;
  attendees?: number;
}

// Development Work
export interface DevelopmentWork {
  id: string;
  title: string;
  titleHi: string;
  titleGu: string;
  description: string;
  villageId: string;
  status: 'planned' | 'ongoing' | 'completed';
  progress: number;
  budget: number;
  startDate: string;
  expectedEndDate: string;
  contractor?: string;
  category: 'roads' | 'water' | 'sanitation' | 'education' | 'health' | 'electricity' | 'other';
}

// Events
export interface Event {
  id: string;
  title: string;
  titleHi: string;
  titleGu: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  villageId: string;
  category: 'cultural' | 'religious' | 'sports' | 'government' | 'educational';
  image?: string;
  organizer: string;
}

// Gallery
export interface GalleryItem {
  id: string;
  title: string;
  titleHi: string;
  titleGu: string;
  image: string;
  category: 'events' | 'development' | 'culture' | 'nature' | 'celebrities';
  villageId: string;
  date: string;
  photographer?: string;
}

// Local Amenities
export interface Amenity {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  type: 'bank' | 'hospital' | 'school' | 'shop' | 'petrol_pump' | 'atm' | 'post_office' | 'police';
  address: string;
  phone?: string;
  timing?: string;
  villageId: string;
  coordinates?: { lat: number; lng: number };
}

// Local Attractions
export interface Attraction {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  description: string;
  image: string;
  category: 'temple' | 'historical' | 'natural' | 'cultural';
  villageId: string;
  distance?: string;
  coordinates?: { lat: number; lng: number };
}

// Farmer Market
export interface MarketPrice {
  id: string;
  commodity: string;
  commodityHi: string;
  commodityGu: string;
  unit: string;
  minPrice: number;
  maxPrice: number;
  marketName: string;
  date: string;
  trend: 'up' | 'down' | 'stable';
}

// Asset Directory (NAD)
export interface Asset {
  id: string;
  name: string;
  nameHi: string;
  nameGu: string;
  type: 'building' | 'vehicle' | 'equipment' | 'land' | 'furniture';
  condition: 'good' | 'fair' | 'poor' | 'critical';
  value: number;
  villageId: string;
  location: string;
  purchaseDate: string;
  lastMaintenanceDate?: string;
}

// WhatsApp Subscriber
export interface WhatsAppSubscriber {
  id: string;
  phone: string;
  name: string;
  villageId: string;
  subscribedAt: string;
  isActive: boolean;
  categories: string[];
}

// Mock Data Instances
export const mockBanners: Banner[] = [
  // Festival Banners
  {
    id: 'fest-1',
    title: 'Diwali Celebration 2024',
    titleHi: 'दीवाली उत्सव 2024',
    titleGu: 'દિવાળી ઉત્સવ 2024',
    subtitle: 'Festival of Lights - Village celebrations',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=500&fit=crop',
    link: '/events',
    startDate: '2024-10-20',
    endDate: '2024-11-15',
    type: 'festival',
    category: 'diwali',
    isActive: true,
  },
  {
    id: 'fest-2',
    title: 'Holi Festival 2025',
    titleHi: 'होली महोत्सव 2025',
    titleGu: 'હોળી મહોત્સવ 2025',
    subtitle: 'Celebrate colors of joy',
    image: 'https://images.unsplash.com/photo-1576398289164-c48dc021b4e1?w=1200&h=500&fit=crop',
    link: '/events',
    startDate: '2025-03-01',
    endDate: '2025-03-20',
    type: 'festival',
    category: 'holi',
    isActive: true,
  },
  {
    id: 'fest-3',
    title: 'Navratri Utsav 2024',
    titleHi: 'नवरात्रि उत्सव 2024',
    titleGu: 'નવરાત્રી ઉત્સવ 2024',
    subtitle: 'Nine nights of devotion',
    image: 'https://images.unsplash.com/photo-1604604994333-f1b0e9471186?w=1200&h=500&fit=crop',
    link: '/events',
    startDate: '2024-10-03',
    endDate: '2024-10-12',
    type: 'festival',
    category: 'navratri',
    isActive: true,
  },
  // Government Notice Banners
  {
    id: 'govt-1',
    title: 'Digital Village Initiative 2024',
    titleHi: 'डिजिटल ग्राम पहल 2024',
    titleGu: 'ડિજિટલ ગામ પહેલ 2024',
    subtitle: 'Transforming villages with technology',
    image: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=1200&h=500&fit=crop',
    link: '/schemes',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    type: 'government',
    category: 'scheme',
    isActive: true,
  },
  {
    id: 'govt-2',
    title: 'Gram Panchayat Elections 2024',
    titleHi: 'ग्राम पंचायत चुनाव 2024',
    titleGu: 'ગ્રામ પંચાયત ચૂંટણી 2024',
    subtitle: 'Exercise your right to vote',
    image: 'https://images.unsplash.com/photo-1494172892981-ce47ca685ecd?w=1200&h=500&fit=crop',
    link: '/gram-sabha',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    type: 'government',
    category: 'election',
    isActive: true,
  },
  {
    id: 'govt-3',
    title: 'PM Kisan Samman Nidhi',
    titleHi: 'पीएम किसान सम्मान निधि',
    titleGu: 'પીએમ કિસાન સન્માન નિધિ',
    subtitle: 'Register now for farmer benefits',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=500&fit=crop',
    link: '/schemes',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    type: 'government',
    category: 'scheme',
    isActive: true,
  },
  {
    id: 'govt-4',
    title: 'Water Supply Notice',
    titleHi: 'जल आपूर्ति सूचना',
    titleGu: 'પાણી પુરવઠા સૂચના',
    subtitle: 'Scheduled maintenance on Dec 20',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&h=500&fit=crop',
    link: '/announcements',
    startDate: '2024-12-15',
    endDate: '2024-12-25',
    type: 'government',
    category: 'notice',
    isActive: true,
  },
  // Hero Banners (general)
  {
    id: 'hero-1',
    title: 'Welcome to Our Village',
    titleHi: 'हमारे गाँव में आपका स्वागत है',
    titleGu: 'અમારા ગામમાં આપનું સ્વાગત છે',
    subtitle: 'Discover the beauty of rural India',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&h=500&fit=crop',
    link: '/attractions',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    type: 'hero',
    isActive: true,
  },
  // Advertisement Banners
  {
    id: 'ad-1',
    title: 'Shree Ram Medical Store',
    titleHi: 'श्री राम मेडिकल स्टोर',
    titleGu: 'શ્રી રામ મેડિકલ સ્ટોર',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=800&h=300&fit=crop',
    link: 'tel:+919876543210',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    villageId: 'palanpur',
    type: 'advertisement',
    isActive: true,
  },
  {
    id: 'ad-2',
    title: 'Kisan Tractor Service',
    titleHi: 'किसान ट्रैक्टर सर्विस',
    titleGu: 'કિસાન ટ્રેક્ટર સર્વિસ',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=300&fit=crop',
    link: 'tel:+919876543211',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    type: 'advertisement',
    isActive: true,
  },
  {
    id: 'ad-3',
    title: 'Vadgam Dairy Products',
    titleHi: 'वडगाम डेयरी उत्पाद',
    titleGu: 'વડગામ ડેરી ઉત્પાદનો',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=300&fit=crop',
    link: 'tel:+919876543212',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    villageId: 'vadgam',
    type: 'advertisement',
    isActive: true,
  },
  {
    id: 'ad-4',
    title: 'Dhanera Electronics',
    titleHi: 'धनेरा इलेक्ट्रॉनिक्स',
    titleGu: 'ધાનેરા ઇલેક્ટ્રોનિક્સ',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&h=300&fit=crop',
    link: 'tel:+919876543213',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    villageId: 'dhanera',
    type: 'advertisement',
    isActive: true,
  },
];

export const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Ramesh Patel',
    nameHi: 'रमेश पटेल',
    nameGu: 'રમેશ પટેલ',
    designation: 'Deputy Sarpanch',
    designationHi: 'उप सरपंच',
    designationGu: 'ઉપ સરપંચ',
    phone: '+91 98765 43210',
    email: 'ramesh@village.gov.in',
    villageId: 'dungarpur',
    committeeType: 'village',
    isActive: true,
  },
  {
    id: '2',
    name: 'Sunita Devi',
    nameHi: 'सुनीता देवी',
    nameGu: 'સુનીતા દેવી',
    designation: 'Ward Member',
    designationHi: 'वार्ड सदस्य',
    designationGu: 'વોર્ડ સભ્ય',
    phone: '+91 98765 43211',
    villageId: 'dungarpur',
    committeeType: 'village',
    isActive: true,
  },
  {
    id: '3',
    name: 'Mohan Singh',
    nameHi: 'मोहन सिंह',
    nameGu: 'મોહન સિંહ',
    designation: 'School Committee President',
    designationHi: 'विद्यालय समिति अध्यक्ष',
    designationGu: 'શાળા સમિતિ પ્રમુખ',
    phone: '+91 98765 43212',
    villageId: 'dungarpur',
    committeeType: 'school',
    isActive: true,
  },
  {
    id: '4',
    name: 'Geeta Ben',
    nameHi: 'गीता बेन',
    nameGu: 'ગીતા બેન',
    designation: 'Dairy Committee Head',
    designationHi: 'डेयरी समिति प्रमुख',
    designationGu: 'ડેરી સમિતિ વડા',
    phone: '+91 98765 43213',
    villageId: 'dungarpur',
    committeeType: 'dairy',
    isActive: true,
  },
];

export const mockSarpanch: Sarpanch = {
  id: '1',
  name: 'Bharat Kumar Sharma',
  nameHi: 'भारत कुमार शर्मा',
  nameGu: 'ભારત કુમાર શર્મા',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  phone: '+91 98765 00001',
  email: 'sarpanch@village.gov.in',
  villageId: 'dungarpur',
  termStart: '2022-01-01',
  termEnd: '2027-01-01',
  bio: 'Serving the village with dedication for over 15 years. Focused on digital transformation and rural development.',
  bioHi: '15 वर्षों से समर्पण के साथ गाँव की सेवा कर रहे हैं। डिजिटल परिवर्तन और ग्रामीण विकास पर केंद्रित।',
  bioGu: '15 વર્ષથી વધુ સમયથી સમર્પણ સાથે ગામની સેવા કરી રહ્યા છે. ડિજિટલ પરિવર્તન અને ગ્રામીણ વિકાસ પર કેન્દ્રિત.',
  achievements: ['100% village electrification', 'Digital literacy program', 'Clean village award 2023'],
};

export const mockGramSabhas: GramSabha[] = [
  {
    id: '1',
    title: 'Monthly Gram Sabha Meeting',
    titleHi: 'मासिक ग्राम सभा बैठक',
    titleGu: 'માસિક ગ્રામ સભા બેઠક',
    date: '2024-12-25',
    time: '10:00 AM',
    venue: 'Village Community Hall',
    villageId: 'dungarpur',
    agenda: ['Budget review', 'Development works update', 'Citizen grievances'],
    status: 'upcoming',
    livestreamUrl: 'https://youtube.com/live/example',
  },
  {
    id: '2',
    title: 'Special Gram Sabha - Budget Approval',
    titleHi: 'विशेष ग्राम सभा - बजट अनुमोदन',
    titleGu: 'વિશેષ ગ્રામ સભા - બજેટ મંજૂરી',
    date: '2024-12-01',
    time: '11:00 AM',
    venue: 'Panchayat Bhawan',
    villageId: 'dungarpur',
    agenda: ['Annual budget presentation', 'Fund allocation', 'Priority setting'],
    status: 'completed',
    attendees: 156,
    minutes: 'Minutes of the meeting are available for download.',
  },
];

export const mockDevelopmentWorks: DevelopmentWork[] = [
  {
    id: '1',
    title: 'Main Road Reconstruction',
    titleHi: 'मुख्य सड़क पुनर्निर्माण',
    titleGu: 'મુખ્ય રસ્તો પુનઃનિર્માણ',
    description: 'Complete reconstruction of 2km main village road with drainage system',
    villageId: 'dungarpur',
    status: 'ongoing',
    progress: 65,
    budget: 2500000,
    startDate: '2024-06-01',
    expectedEndDate: '2025-02-28',
    contractor: 'ABC Construction Ltd.',
    category: 'roads',
  },
  {
    id: '2',
    title: 'Water Pipeline Extension',
    titleHi: 'पानी पाइपलाइन विस्तार',
    titleGu: 'પાણી પાઇપલાઇન વિસ્તરણ',
    description: 'Extending water supply network to 50 new households',
    villageId: 'dungarpur',
    status: 'planned',
    progress: 0,
    budget: 1500000,
    startDate: '2025-01-15',
    expectedEndDate: '2025-06-30',
    category: 'water',
  },
  {
    id: '3',
    title: 'Solar Street Lights',
    titleHi: 'सोलर स्ट्रीट लाइट्स',
    titleGu: 'સોલાર સ્ટ્રીટ લાઇટ્સ',
    description: 'Installation of 100 solar powered street lights',
    villageId: 'dungarpur',
    status: 'completed',
    progress: 100,
    budget: 800000,
    startDate: '2024-01-01',
    expectedEndDate: '2024-06-30',
    category: 'electricity',
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Village Festival',
    titleHi: 'वार्षिक ग्राम उत्सव',
    titleGu: 'વાર્ષિક ગામ ઉત્સવ',
    description: 'Celebrating village traditions with cultural programs and fair',
    date: '2024-12-28',
    time: '6:00 PM',
    venue: 'Village Ground',
    villageId: 'dungarpur',
    category: 'cultural',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop',
    organizer: 'Village Panchayat',
  },
  {
    id: '2',
    title: 'Farmers Training Program',
    titleHi: 'किसान प्रशिक्षण कार्यक्रम',
    titleGu: 'ખેડૂત તાલીમ કાર્યક્રમ',
    description: 'Modern farming techniques and government schemes awareness',
    date: '2024-12-22',
    time: '10:00 AM',
    venue: 'Community Center',
    villageId: 'dungarpur',
    category: 'educational',
    organizer: 'Agriculture Department',
  },
];

export const mockGallery: GalleryItem[] = [
  {
    id: '1',
    title: 'Independence Day Celebration',
    titleHi: 'स्वतंत्रता दिवस समारोह',
    titleGu: 'સ્વતંત્રતા દિવસ ઉજવણી',
    image: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=600&h=400&fit=crop',
    category: 'events',
    villageId: 'dungarpur',
    date: '2024-08-15',
  },
  {
    id: '2',
    title: 'Village Temple',
    titleHi: 'गाँव का मंदिर',
    titleGu: 'ગામનું મંદિર',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
    category: 'culture',
    villageId: 'dungarpur',
    date: '2024-06-01',
  },
  {
    id: '3',
    title: 'Road Construction',
    titleHi: 'सड़क निर्माण',
    titleGu: 'રસ્તા બાંધકામ',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop',
    category: 'development',
    villageId: 'dungarpur',
    date: '2024-09-15',
  },
  {
    id: '4',
    title: 'Sunset at Village Lake',
    titleHi: 'गाँव की झील पर सूर्यास्त',
    titleGu: 'ગામના તળાવ પર સૂર્યાસ્ત',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    category: 'nature',
    villageId: 'dungarpur',
    date: '2024-10-20',
  },
  {
    id: '5',
    title: 'Minister Visit',
    titleHi: 'मंत्री जी का दौरा',
    titleGu: 'મંત્રીજીની મુલાકાત',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop',
    category: 'celebrities',
    villageId: 'dungarpur',
    date: '2024-07-10',
  },
  {
    id: '6',
    title: 'Holi Celebrations',
    titleHi: 'होली उत्सव',
    titleGu: 'હોળી ઉત્સવ',
    image: 'https://images.unsplash.com/photo-1576398289164-c48dc021b4e1?w=600&h=400&fit=crop',
    category: 'events',
    villageId: 'dungarpur',
    date: '2024-03-25',
  },
];

export const mockAmenities: Amenity[] = [
  {
    id: '1',
    name: 'State Bank of India',
    nameHi: 'भारतीय स्टेट बैंक',
    nameGu: 'સ્ટેટ બેંક ઓફ ઇન્ડિયા',
    type: 'bank',
    address: 'Main Road, Village Center',
    phone: '+91 7878 123456',
    timing: '10:00 AM - 4:00 PM',
    villageId: 'dungarpur',
  },
  {
    id: '2',
    name: 'Primary Health Center',
    nameHi: 'प्राथमिक स्वास्थ्य केंद्र',
    nameGu: 'પ્રાથમિક આરોગ્ય કેન્દ્ર',
    type: 'hospital',
    address: 'Near Bus Stand',
    phone: '+91 7878 123457',
    timing: '24/7',
    villageId: 'dungarpur',
  },
  {
    id: '3',
    name: 'Government Primary School',
    nameHi: 'सरकारी प्राथमिक विद्यालय',
    nameGu: 'સરકારી પ્રાથમિક શાળા',
    type: 'school',
    address: 'School Road',
    timing: '8:00 AM - 2:00 PM',
    villageId: 'dungarpur',
  },
  {
    id: '4',
    name: 'Post Office',
    nameHi: 'डाकघर',
    nameGu: 'પોસ્ટ ઓફિસ',
    type: 'post_office',
    address: 'Panchayat Bhawan Complex',
    timing: '9:00 AM - 5:00 PM',
    villageId: 'dungarpur',
  },
];

export const mockAttractions: Attraction[] = [
  {
    id: '1',
    name: 'Ancient Shiva Temple',
    nameHi: 'प्राचीन शिव मंदिर',
    nameGu: 'પ્રાચીન શિવ મંદિર',
    description: '500-year old temple with beautiful architecture and peaceful surroundings',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop',
    category: 'temple',
    villageId: 'dungarpur',
    distance: '0.5 km from village center',
  },
  {
    id: '2',
    name: 'Heritage Fort',
    nameHi: 'विरासत किला',
    nameGu: 'વારસો કિલ્લો',
    description: 'Historical fort with panoramic village views',
    image: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=600&h=400&fit=crop',
    category: 'historical',
    villageId: 'dungarpur',
    distance: '2 km from village center',
  },
  {
    id: '3',
    name: 'Village Lake',
    nameHi: 'गाँव की झील',
    nameGu: 'ગામનું તળાવ',
    description: 'Serene lake perfect for morning walks and bird watching',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    category: 'natural',
    villageId: 'dungarpur',
    distance: '1 km from village center',
  },
];

export const mockMarketPrices: MarketPrice[] = [
  { id: '1', commodity: 'Wheat', commodityHi: 'गेहूं', commodityGu: 'ઘઉં', unit: 'quintal', minPrice: 2200, maxPrice: 2400, marketName: 'Dungarpur Mandi', date: '2024-12-17', trend: 'up' },
  { id: '2', commodity: 'Rice', commodityHi: 'चावल', commodityGu: 'ચોખા', unit: 'quintal', minPrice: 3500, maxPrice: 3800, marketName: 'Dungarpur Mandi', date: '2024-12-17', trend: 'stable' },
  { id: '3', commodity: 'Onion', commodityHi: 'प्याज', commodityGu: 'ડુંગળી', unit: 'kg', minPrice: 25, maxPrice: 35, marketName: 'Dungarpur Mandi', date: '2024-12-17', trend: 'down' },
  { id: '4', commodity: 'Potato', commodityHi: 'आलू', commodityGu: 'બટાટા', unit: 'kg', minPrice: 20, maxPrice: 28, marketName: 'Dungarpur Mandi', date: '2024-12-17', trend: 'up' },
  { id: '5', commodity: 'Tomato', commodityHi: 'टमाटर', commodityGu: 'ટામેટા', unit: 'kg', minPrice: 40, maxPrice: 55, marketName: 'Dungarpur Mandi', date: '2024-12-17', trend: 'stable' },
  { id: '6', commodity: 'Groundnut', commodityHi: 'मूंगफली', commodityGu: 'મગફળી', unit: 'quintal', minPrice: 5500, maxPrice: 6200, marketName: 'Dungarpur Mandi', date: '2024-12-17', trend: 'up' },
];

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Panchayat Bhawan',
    nameHi: 'पंचायत भवन',
    nameGu: 'પંચાયત ભવન',
    type: 'building',
    condition: 'good',
    value: 5000000,
    villageId: 'dungarpur',
    location: 'Village Center',
    purchaseDate: '2015-06-15',
    lastMaintenanceDate: '2024-01-10',
  },
  {
    id: '2',
    name: 'Tractor',
    nameHi: 'ट्रैक्टर',
    nameGu: 'ટ્રેક્ટર',
    type: 'vehicle',
    condition: 'fair',
    value: 800000,
    villageId: 'dungarpur',
    location: 'Panchayat Garage',
    purchaseDate: '2019-03-20',
    lastMaintenanceDate: '2024-06-15',
  },
  {
    id: '3',
    name: 'Community Hall',
    nameHi: 'सामुदायिक हॉल',
    nameGu: 'સમુદાય હોલ',
    type: 'building',
    condition: 'good',
    value: 3500000,
    villageId: 'dungarpur',
    location: 'Near Temple Road',
    purchaseDate: '2018-11-01',
    lastMaintenanceDate: '2024-03-20',
  },
  {
    id: '4',
    name: 'Water Tanker',
    nameHi: 'पानी टैंकर',
    nameGu: 'પાણી ટેન્કર',
    type: 'vehicle',
    condition: 'poor',
    value: 400000,
    villageId: 'dungarpur',
    location: 'Panchayat Garage',
    purchaseDate: '2016-08-10',
    lastMaintenanceDate: '2023-12-01',
  },
];

export const mockWhatsAppSubscribers: WhatsAppSubscriber[] = [
  { id: '1', phone: '+91 98765 43210', name: 'Ramesh Kumar', villageId: 'dungarpur', subscribedAt: '2024-06-15', isActive: true, categories: ['announcements', 'events'] },
  { id: '2', phone: '+91 98765 43211', name: 'Sunita Devi', villageId: 'dungarpur', subscribedAt: '2024-07-20', isActive: true, categories: ['announcements', 'schemes'] },
  { id: '3', phone: '+91 98765 43212', name: 'Mohan Lal', villageId: 'dungarpur', subscribedAt: '2024-08-10', isActive: false, categories: ['announcements'] },
];

// Default current user (for demo)
export const mockCurrentUser: User = {
  id: '1',
  name: 'Demo User',
  email: 'demo@village.gov.in',
  phone: '+91 98765 00000',
  role: 'villager',
  villageId: 'dungarpur',
  linkedAccounts: {
    google: true,
    phone: false,
  },
};
