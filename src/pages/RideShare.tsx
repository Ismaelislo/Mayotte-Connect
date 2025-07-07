import React, { useState, useEffect } from 'react';
import { Car, MapPin, Clock, Users, Plus, Filter, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { RideShare } from '../types';

const RideSharePage: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [rides, setRides] = useState<RideShare[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'driver' | 'passenger'>('all');

  useEffect(() => {
    // Mock data
    const mockRides: RideShare[] = [
      {
        id: '1',
        driverId: 'user1',
        departure: 'Mamoudzou',
        destination: 'Dzaoudzi',
        date: '2025-01-15',
        time: '08:00',
        price: 5,
        availableSeats: 3,
        description: 'Trajet quotidien vers l\'aéroport',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        driverId: 'user2',
        departure: 'Koungou',
        destination: 'Mamoudzou',
        date: '2025-01-15',
        time: '07:30',
        price: 3,
        availableSeats: 2,
        description: 'Départ tôt pour éviter les embouteillages',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        driverId: 'user3',
        departure: 'Tsingoni',
        destination: 'Mamoudzou',
        date: '2025-01-15',
        time: '17:00',
        price: 4,
        availableSeats: 1,
        description: 'Retour après le travail',
        createdAt: new Date().toISOString()
      }
    ];

    setTimeout(() => {
      setRides(mockRides);
      setLoading(false);
    }, 500);
  }, []);

  const CreateRideForm = () => {
    const [formData, setFormData] = useState({
      departure: '',
      destination: '',
      date: '',
      time: '',
      price: '',
      availableSeats: '1',
      description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newRide: RideShare = {
        id: Date.now().toString(),
        driverId: user?.id || '',
        departure: formData.departure,
        destination: formData.destination,
        date: formData.date,
        time: formData.time,
        price: formData.price ? parseFloat(formData.price) : undefined,
        availableSeats: parseInt(formData.availableSeats),
        description: formData.description,
        createdAt: new Date().toISOString()
      };
      setRides([newRide, ...rides]);
      setShowCreateForm(false);
      setFormData({
        departure: '',
        destination: '',
        date: '',
        time: '',
        price: '',
        availableSeats: '1',
        description: ''
      });
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Proposer un trajet
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Départ
              </label>
              <input
                type="text"
                value={formData.departure}
                onChange={(e) => setFormData({...formData, departure: e.target.value})}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Destination
              </label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                className="input"
                required
              />
            </div>
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
                Prix (€)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="input"
                min="0"
                step="0.5"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Places disponibles
            </label>
            <select
              value={formData.availableSeats}
              onChange={(e) => setFormData({...formData, availableSeats: e.target.value})}
              className="input"
            >
              {[1,2,3,4,5,6,7].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
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
            />
          </div>

          <div className="flex space-x-3">
            <button type="submit" className="btn-primary">
              Publier le trajet
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
          {t('nav.rideshare')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Partagez vos trajets et économisez ensemble
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-primary flex items-center justify-center"
        >
          <Plus size={20} className="mr-2" />
          Proposer un trajet
        </button>
        
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="input"
          >
            <option value="all">Tous les trajets</option>
            <option value="driver">Mes trajets proposés</option>
            <option value="passenger">Mes réservations</option>
          </select>
        </div>
      </div>

      {showCreateForm && <CreateRideForm />}

      {/* Rides List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Trajets disponibles
        </h2>
        
        {rides.length === 0 ? (
          <div className="text-center py-8">
            <Car className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-500 dark:text-gray-400">
              Aucun trajet disponible
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {rides.map((ride) => (
              <div
                key={ride.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="flex items-center text-mayotte-turquoise">
                        <MapPin size={16} className="mr-1" />
                        <span className="font-semibold">{ride.departure}</span>
                      </div>
                      <span className="text-gray-400">→</span>
                      <div className="flex items-center text-mayotte-coral">
                        <MapPin size={16} className="mr-1" />
                        <span className="font-semibold">{ride.destination}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-2">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{new Date(ride.date).toLocaleDateString('fr-FR')} à {ride.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Users size={14} className="mr-1" />
                        <span>{ride.availableSeats} place(s)</span>
                      </div>
                      {ride.price && (
                        <div className="flex items-center font-semibold text-mayotte-green">
                          <span>{ride.price}€</span>
                        </div>
                      )}
                    </div>

                    {ride.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {ride.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-mayotte-turquoise rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-semibold">
                            {ride.driverId.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-400 mr-1" />
                          <span className="text-sm">4.8</span>
                        </div>
                      </div>
                      
                      <button className="btn-primary text-sm px-4 py-2">
                        Réserver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RideSharePage;