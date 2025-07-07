import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, MapPin, Clock, Euro, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { LocalAd } from '../types';

const Ads: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [ads, setAds] = useState<LocalAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const categories = [
    { value: 'all', label: 'Toutes catégories' },
    { value: 'job', label: 'Emploi' },
    { value: 'housing', label: 'Logement' },
    { value: 'items', label: 'Objets' },
    { value: 'services', label: 'Services' },
  ];

  useEffect(() => {
    // Mock data
    const mockAds: LocalAd[] = [
      {
        id: '1',
        userId: 'user1',
        category: 'job',
        title: 'Recherche serveur/serveuse',
        description: 'Restaurant à Mamoudzou recherche serveur/serveuse expérimenté(e). Horaires flexibles, bon contact client requis.',
        price: 1200,
        images: ['https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg'],
        location: 'Mamoudzou',
        isPremium: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        userId: 'user2',
        category: 'housing',
        title: 'Appartement F2 à louer',
        description: 'Bel appartement F2 meublé, vue mer, proche commodités. Cuisine équipée, climatisation.',
        price: 650,
        images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'],
        location: 'Dzaoudzi',
        isPremium: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        userId: 'user3',
        category: 'items',
        title: 'Scooter Yamaha 125cc',
        description: 'Scooter en excellent état, révision récente, pneus neufs. Idéal pour se déplacer sur l\'île.',
        price: 2500,
        images: ['https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg'],
        location: 'Koungou',
        isPremium: false,
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        userId: 'user4',
        category: 'services',
        title: 'Cours de guitare',
        description: 'Professeur expérimenté donne cours de guitare tous niveaux. Déplacement possible.',
        price: 25,
        images: ['https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg'],
        location: 'Mamoudzou',
        isPremium: false,
        createdAt: new Date().toISOString()
      }
    ];

    setTimeout(() => {
      setAds(mockAds);
      setLoading(false);
    }, 500);
  }, []);

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ad.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const CreateAdForm = () => {
    const [formData, setFormData] = useState({
      category: 'items',
      title: '',
      description: '',
      price: '',
      location: '',
      images: [] as string[]
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newAd: LocalAd = {
        id: Date.now().toString(),
        userId: user?.id || '',
        category: formData.category as any,
        title: formData.title,
        description: formData.description,
        price: formData.price ? parseFloat(formData.price) : undefined,
        images: formData.images,
        location: formData.location,
        isPremium: false,
        createdAt: new Date().toISOString()
      };
      setAds([newAd, ...ads]);
      setShowCreateForm(false);
      setFormData({
        category: 'items',
        title: '',
        description: '',
        price: '',
        location: '',
        images: []
      });
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Publier une annonce
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="input"
              required
            >
              {categories.slice(1).map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Titre
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="input"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Prix (€)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="input"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Localisation
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="input"
                required
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button type="submit" className="btn-primary">
              Publier l'annonce
            </button>
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="btn-secondary"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    );
  };

  const getCategoryLabel = (category: string) => {
    return categories.find(cat => cat.value === category)?.label || category;
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
          {t('nav.ads')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Annonces locales : emploi, logement, objets, services
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={t('common.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mayotte-turquoise dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mayotte-turquoise dark:bg-gray-700 dark:text-white"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="btn-primary flex items-center justify-center"
          >
            <Plus size={20} className="mr-2" />
            Publier
          </button>
        </div>
      </div>

      {showCreateForm && <CreateAdForm />}

      {/* Ads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAds.map((ad) => (
          <div
            key={ad.id}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
              ad.isPremium ? 'ring-2 ring-mayotte-coral' : ''
            }`}
          >
            {ad.isPremium && (
              <div className="bg-mayotte-coral text-white text-xs px-2 py-1 text-center">
                ANNONCE PREMIUM
              </div>
            )}
            
            <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
              {ad.images.length > 0 ? (
                <img
                  src={ad.images[0]}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="text-gray-400" size={48} />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 bg-mayotte-turquoise/10 text-mayotte-turquoise text-xs rounded-full">
                  {getCategoryLabel(ad.category)}
                </span>
                {ad.price && (
                  <div className="flex items-center text-mayotte-green font-semibold">
                    <Euro size={14} className="mr-1" />
                    <span>{ad.price}</span>
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {ad.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                {ad.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1" />
                  <span>{ad.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>
                    {new Date(ad.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
              
              <button className="w-full mt-4 btn-primary text-sm">
                Contacter
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAds.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center">
          <Search className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-500 dark:text-gray-400">
            Aucune annonce trouvée
          </p>
        </div>
      )}
    </div>
  );
};

export default Ads;