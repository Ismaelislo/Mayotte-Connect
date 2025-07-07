import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Plus, Filter, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { CulturalEvent } from '../types';

const Events: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [events, setEvents] = useState<CulturalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const categories = [
    { value: 'all', label: 'Tous les événements' },
    { value: 'festival', label: 'Festivals' },
    { value: 'concert', label: 'Concerts' },
    { value: 'market', label: 'Marchés' },
    { value: 'sport', label: 'Sport' },
  ];

  useEffect(() => {
    // Mock data
    const mockEvents: CulturalEvent[] = [
      {
        id: '1',
        title: 'Festival des Arts de Mayotte',
        description: 'Festival annuel célébrant la culture mahoraise avec musique, danse et artisanat local.',
        date: '2025-02-15',
        time: '18:00',
        location: 'Place de la République, Mamoudzou',
        category: 'festival',
        image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Concert de Musique Traditionnelle',
        description: 'Soirée dédiée à la musique traditionnelle comorienne et mahoraise.',
        date: '2025-01-20',
        time: '20:00',
        location: 'Centre Culturel, Dzaoudzi',
        category: 'concert',
        image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Marché Artisanal de Koungou',
        description: 'Marché hebdomadaire avec produits locaux, artisanat et spécialités culinaires.',
        date: '2025-01-18',
        time: '08:00',
        location: 'Centre-ville, Koungou',
        category: 'market',
        image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg',
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        title: 'Tournoi de Football Inter-Villages',
        description: 'Compétition sportive rassemblant les équipes de tous les villages de Mayotte.',
        date: '2025-01-25',
        time: '14:00',
        location: 'Stade de Cavani, Mamoudzou',
        category: 'sport',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
        createdAt: new Date().toISOString()
      }
    ];

    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 500);
  }, []);

  const filteredEvents = events.filter(event => {
    return selectedCategory === 'all' || event.category === selectedCategory;
  });

  const CreateEventForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'festival'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newEvent: CulturalEvent = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        category: formData.category as any,
        createdAt: new Date().toISOString()
      };
      setEvents([newEvent, ...events]);
      setShowCreateForm(false);
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: 'festival'
      });
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Créer un événement
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Heure
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Catégorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="input"
              >
                {categories.slice(1).map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Lieu
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="input"
              required
            />
          </div>

          <div className="flex space-x-3">
            <button type="submit" className="btn-primary">
              Créer l'événement
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'festival': return 'bg-purple-100 text-purple-800';
      case 'concert': return 'bg-blue-100 text-blue-800';
      case 'market': return 'bg-green-100 text-green-800';
      case 'sport': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
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
          {t('nav.events')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Agenda culturel et événements à Mayotte
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-primary flex items-center justify-center"
        >
          <Plus size={20} className="mr-2" />
          Créer un événement
        </button>
        
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
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

      {showCreateForm && <CreateEventForm />}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {event.image && (
              <div className="h-48 bg-gray-200 dark:bg-gray-700">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(event.category)}`}>
                  {categories.find(cat => cat.value === event.category)?.label}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {event.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                {event.description}
              </p>
              
              <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2" />
                  <span>{new Date(event.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={14} className="mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={14} className="mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <button className="w-full mt-4 btn-primary text-sm flex items-center justify-center">
                <Users size={14} className="mr-1" />
                Participer
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center">
          <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-500 dark:text-gray-400">
            Aucun événement trouvé
          </p>
        </div>
      )}
    </div>
  );
};

export default Events;