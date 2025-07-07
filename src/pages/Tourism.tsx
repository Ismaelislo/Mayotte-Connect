import React, { useState, useEffect } from 'react';
import { MapPin, Star, Camera, Filter, Navigation } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { TouristSpot } from '../types';
import InteractiveMap from '../components/Map/InteractiveMap';

const Tourism: React.FC = () => {
  const { t } = useLanguage();
  const [spots, setSpots] = useState<TouristSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'Tous les sites' },
    { value: 'beach', label: 'Plages' },
    { value: 'hiking', label: 'Randonnées' },
    { value: 'historical', label: 'Sites historiques' },
    { value: 'food', label: 'Gastronomie' },
  ];

  useEffect(() => {
    // Mock data
    const mockSpots: TouristSpot[] = [
      {
        id: '1',
        name: 'Plage de N\'Gouja',
        description: 'Magnifique plage de sable blanc avec des tortues marines. Idéale pour la plongée et l\'observation de la faune marine.',
        category: 'beach',
        location: {
          lat: -12.9667,
          lng: 45.1167,
          address: 'Kani-Kéli, Mayotte'
        },
        images: ['https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg'],
        rating: 4.8,
        reviews: [
          {
            id: '1',
            userId: 'user1',
            userName: 'Marie L.',
            rating: 5,
            comment: 'Plage paradisiaque ! J\'ai pu nager avec les tortues.',
            createdAt: new Date().toISOString()
          }
        ]
      },
      {
        id: '2',
        name: 'Mont Choungui',
        description: 'Point culminant de Mayotte offrant une vue panoramique exceptionnelle sur le lagon et les îlots.',
        category: 'hiking',
        location: {
          lat: -12.8833,
          lng: 45.1333,
          address: 'Bandrélé, Mayotte'
        },
        images: ['https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg'],
        rating: 4.5,
        reviews: []
      },
      {
        id: '3',
        name: 'Îlot de Sable Blanc',
        description: 'Banc de sable immaculé au milieu du lagon, accessible uniquement en bateau. Parfait pour le snorkeling.',
        category: 'beach',
        location: {
          lat: -12.8000,
          lng: 45.2500,
          address: 'Lagon de Mayotte'
        },
        images: ['https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg'],
        rating: 4.9,
        reviews: []
      },
      {
        id: '4',
        name: 'Marché de Mamoudzou',
        description: 'Marché traditionnel coloré où découvrir les saveurs locales : fruits tropicaux, épices, poissons frais.',
        category: 'food',
        location: {
          lat: -12.7806,
          lng: 45.2278,
          address: 'Mamoudzou, Mayotte'
        },
        images: ['https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg'],
        rating: 4.3,
        reviews: []
      }
    ];

    setTimeout(() => {
      setSpots(mockSpots);
      setLoading(false);
    }, 500);
  }, []);

  const filteredSpots = spots.filter(spot => {
    return selectedCategory === 'all' || spot.category === selectedCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'beach': return '🏖️';
      case 'hiking': return '🥾';
      case 'historical': return '🏛️';
      case 'food': return '🍽️';
      default: return '📍';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mayotte-turquoise mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t('nav.tourism')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Découvrez les merveilles de Mayotte
        </p>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Carte touristique
        </h2>
        <InteractiveMap
          center={[-12.8275, 45.1662]}
          zoom={10}
          height="400px"
          markers={spots.map(spot => ({
            id: spot.id,
            position: [spot.location.lat, spot.location.lng],
            title: spot.name,
            description: spot.description,
            type: 'tourist'
          }))}
          onMarkerClick={(markerId) => {
            const spot = spots.find(s => s.id === markerId);
            if (spot) {
              console.log('Tourist spot clicked:', spot);
            }
          }}
        />
      </div>

      {/* Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <Filter className="text-gray-400" size={20} />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tourist Spots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpots.map((spot) => (
          <div
            key={spot.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48">
              <img
                src={spot.images[0]}
                alt={spot.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                  {getCategoryIcon(spot.category)} {categories.find(cat => cat.value === spot.category)?.label}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <div className="flex items-center bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  <Star size={12} className="mr-1 text-yellow-400" />
                  <span>{spot.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {spot.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                {spot.description}
              </p>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <MapPin size={14} className="mr-1" />
                <span>{spot.location.address}</span>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 btn-primary text-sm flex items-center justify-center">
                  <Navigation size={14} className="mr-1" />
                  Itinéraire
                </button>
                <button className="flex-1 btn-secondary text-sm flex items-center justify-center">
                  <Camera size={14} className="mr-1" />
                  Photos
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Incontournables de Mayotte
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4 p-4 bg-mayotte-turquoise/10 rounded-lg">
            <div className="text-4xl">🐢</div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Observation des tortues</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Mayotte est un sanctuaire pour les tortues marines
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 bg-mayotte-green/10 rounded-lg">
            <div className="text-4xl">🐋</div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Baleines à bosse</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Observation des baleines de juillet à novembre
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tourism;