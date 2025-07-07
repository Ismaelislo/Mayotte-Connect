import React, { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Clock, Plus, Filter, Shield, Flame, Zap, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { CommunityAlert } from '../types';
import InteractiveMap from '../components/Map/InteractiveMap';

const Alerts: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<CommunityAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const alertTypes = [
    { value: 'all', label: 'Toutes les alertes', icon: AlertTriangle },
    { value: 'security', label: 'Sécurité', icon: Shield },
    { value: 'fire', label: 'Incendie', icon: Flame },
    { value: 'animal', label: 'Animal dangereux', icon: Zap },
    { value: 'other', label: 'Autre', icon: AlertTriangle },
  ];

  useEffect(() => {
    // Mock data
    const mockAlerts: CommunityAlert[] = [
      {
        id: '1',
        userId: 'user1',
        type: 'security',
        title: 'Vol de scooter signalé',
        description: 'Scooter rouge volé cette nuit devant la pharmacie. Plaque 976-ABC-123',
        location: {
          lat: -12.7806,
          lng: 45.2278,
          address: 'Centre-ville, Mamoudzou'
        },
        image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
        isVerified: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        userId: 'user2',
        type: 'fire',
        title: 'Feu de brousse maîtrisé',
        description: 'Incendie de végétation rapidement maîtrisé par les pompiers. Zone sécurisée.',
        location: {
          lat: -12.8275,
          lng: 45.1662,
          address: 'Colline de Tsingoni'
        },
        isVerified: true,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        userId: 'user3',
        type: 'animal',
        title: 'Chien errant agressif',
        description: 'Chien sans maître, comportement agressif près de l\'école. Éviter la zone.',
        location: {
          lat: -12.7500,
          lng: 45.2000,
          address: 'École primaire, Koungou'
        },
        isVerified: false,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '4',
        userId: 'user4',
        type: 'other',
        title: 'Coupure d\'eau programmée',
        description: 'Travaux sur le réseau d\'eau potable. Coupure prévue de 8h à 16h demain.',
        location: {
          lat: -12.7200,
          lng: 45.2400,
          address: 'Quartier Kawéni, Mamoudzou'
        },
        isVerified: true,
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
      }
    ];

    setTimeout(() => {
      setAlerts(mockAlerts);
      setLoading(false);
    }, 500);
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    return selectedType === 'all' || alert.type === selectedType;
  });

  const CreateAlertForm = () => {
    const [formData, setFormData] = useState({
      type: 'security',
      title: '',
      description: '',
      address: '',
      image: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newAlert: CommunityAlert = {
        id: Date.now().toString(),
        userId: user?.id || '',
        type: formData.type as any,
        title: formData.title,
        description: formData.description,
        location: {
          lat: -12.7806 + (Math.random() - 0.5) * 0.1,
          lng: 45.2278 + (Math.random() - 0.5) * 0.1,
          address: formData.address
        },
        image: formData.image || undefined,
        isVerified: false,
        createdAt: new Date().toISOString()
      };
      setAlerts([newAlert, ...alerts]);
      setShowCreateForm(false);
      setFormData({
        type: 'security',
        title: '',
        description: '',
        address: '',
        image: ''
      });
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Signaler une alerte
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type d'alerte
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="input"
              required
            >
              {alertTypes.slice(1).map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
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
              Description détaillée
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="input"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Localisation
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="input"
              placeholder="Adresse ou lieu précis"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Photo (optionnel)
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="input"
              placeholder="URL de l'image"
            />
          </div>

          <div className="flex space-x-3">
            <button type="submit" className="btn-primary">
              Publier l'alerte
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'security': return 'bg-red-100 text-red-800 border-red-200';
      case 'fire': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'animal': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'other': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    const typeConfig = alertTypes.find(t => t.value === type);
    const IconComponent = typeConfig?.icon || AlertTriangle;
    return <IconComponent size={20} />;
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
          {t('nav.alerts')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Alertes communautaires et signalements en temps réel
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-primary flex items-center justify-center"
        >
          <Plus size={20} className="mr-2" />
          Signaler une alerte
        </button>
        
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input"
          >
            {alertTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showCreateForm && <CreateAlertForm />}

      {/* Alerts Map */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Carte des alertes
        </h2>
        <InteractiveMap
          center={[-12.7806, 45.2278]}
          zoom={11}
          height="300px"
          markers={filteredAlerts.map(alert => ({
            id: alert.id,
            position: [alert.location.lat, alert.location.lng],
            title: alert.title,
            description: alert.description,
            type: 'alert'
          }))}
          onMarkerClick={(markerId) => {
            const alert = filteredAlerts.find(a => a.id === markerId);
            if (alert) {
              console.log('Alert clicked:', alert);
            }
          }}
        />
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 ${getTypeColor(alert.type)} ${
              alert.isVerified ? 'ring-2 ring-green-300' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getTypeIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold">{alert.title}</h3>
                  {alert.isVerified && (
                    <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                      Vérifié
                    </span>
                  )}
                </div>
                
                <p className="text-sm mb-3">{alert.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <MapPin size={12} className="mr-1" />
                      <span>{alert.location.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      <span>
                        {new Date(alert.createdAt).toLocaleString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-xs">
                      Voir sur carte
                    </button>
                    <button className="text-green-600 hover:text-green-800 text-xs">
                      Confirmer
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {alert.image && (
              <div className="mt-3 ml-8">
                <img
                  src={alert.image}
                  alt="Photo de l'alerte"
                  className="w-32 h-24 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center">
          <AlertTriangle className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-500 dark:text-gray-400">
            Aucune alerte trouvée
          </p>
        </div>
      )}

      {/* Emergency Numbers */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center">
          <Shield className="mr-2" size={24} />
          Numéros d'urgence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">15</div>
            <div className="text-sm text-red-700 dark:text-red-400">SAMU</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">18</div>
            <div className="text-sm text-red-700 dark:text-red-400">Pompiers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">17</div>
            <div className="text-sm text-red-700 dark:text-red-400">Police</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;