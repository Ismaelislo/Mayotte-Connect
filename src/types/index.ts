export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  preferredLanguage: 'fr' | 'shimaoré';
  createdAt: string;
}

export interface TrafficAlert {
  id: string;
  type: 'traffic' | 'ferry' | 'incident';
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  severity: 'low' | 'medium' | 'high';
  createdAt: string;
  isActive: boolean;
}

export interface RideShare {
  id: string;
  driverId: string;
  departure: string;
  destination: string;
  date: string;
  time: string;
  price?: number;
  availableSeats: number;
  description?: string;
  createdAt: string;
}

export interface LocalAd {
  id: string;
  userId: string;
  category: 'job' | 'housing' | 'items' | 'services';
  title: string;
  description: string;
  price?: number;
  images: string[];
  location: string;
  isPremium: boolean;
  createdAt: string;
}

export interface CulturalEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'festival' | 'concert' | 'market' | 'sport';
  image?: string;
  createdAt: string;
}

export interface TouristSpot {
  id: string;
  name: string;
  description: string;
  category: 'beach' | 'hiking' | 'historical' | 'food';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  images: string[];
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface DictionaryEntry {
  id: string;
  french: string;
  shimaore: string;
  category: 'daily' | 'health' | 'admin' | 'tourism';
  audioUrl?: string;
  examples?: string[];
}

export interface CommunityAlert {
  id: string;
  userId: string;
  type: 'security' | 'fire' | 'animal' | 'other';
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  image?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface HelpRequest {
  id: string;
  userId: string;
  type: 'childcare' | 'shopping' | 'food' | 'work';
  title: string;
  description: string;
  location: string;
  isOffer: boolean; // true for offer, false for request
  createdAt: string;
}

export interface WasteReport {
  id: string;
  userId: string;
  type: 'illegal_dump' | 'wild_dump';
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  image: string;
  status: 'pending' | 'in_progress' | 'resolved';
  createdAt: string;
}