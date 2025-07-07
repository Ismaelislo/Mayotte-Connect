import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Clock, Navigation } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { TrafficAlert } from '../types';
import InteractiveMap from '../components/Map/InteractiveMap';

const Traffic: React.FC = () => {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState<TrafficAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, this would come from API
    const mockAlerts: TrafficAlert[] = [
      {
        id: '1',
        type: 'traffic',
        title: 'Embouteillage RN1',
        description: 'Trafic dense entre Mamoudzou et Koungou',
        location: {
          lat: -12.7806,
          lng: 45.2278,
          address: 'RN1, Mamoudzou'
        },
        severity: 'high',
        createdAt: new Date().toISOString(),
        isActive: true
      },
      {
        id: '2',
        type: 'ferry',
        title: 'Bac Mamoudzou-Petite-Terre',
        description: 'Retard de 30 minutes sur la liaison',
        location: {
          lat: -12.7806,
          lng: 45.2278,
          address: 'Port de Mamoudzou'
        },
        severity: 'medium',
        createdAt: new Date().toISOString(),
        isActive: true
      },
      {
        id: '3',
        type: 'incident',
        title: 'Accident RN2',
        description: 'Accident léger, circulation ralentie',
        location: {
          lat: -12.8275,
          lng: 45.1662,
          address: 'RN2, Tsingoni'
        },
        severity: 'low',
        createdAt: new Date().toISOString(),
        isActive: true
      }
    ];

    setTimeout(() => {
      setAlerts(mockAlerts);
      setLoading(false);
    }, 1000);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'traffic': return <Navigation className="text-red-500" size={20} />;
      case 'ferry': return <MapPin className="text-blue-500" size={20} />;
      case 'incident': return <AlertTriangle className="text-orange-500" size={20} />;
      default: return <AlertTriangle className="text-gray-500" size={20} />;
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
          {t('nav.traffic')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Informations trafic en temps réel pour Mayotte
        </p>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Carte du trafic
        </h2>
        <InteractiveMap
          center={[-12.7806, 45.2278]}
          zoom={11}
          height="400px"
          markers={alerts.map(alert => ({
            id: alert.id,
            position: [alert.location.lat, alert.location.lng],
            title: alert.title,
            description: alert.description,
            type: 'traffic'
          }))}
          onMarkerClick={(markerId) => {
            const alert = alerts.find(a => a.id === markerId);
            if (alert) {
              console.log('Alert clicked:', alert);
            }
          }}
        />
      </div>

      {/* Traffic Alerts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Alertes en cours
        </h2>
        
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-500 dark:text-gray-400">
              Aucune alerte trafic en cours
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getTypeIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{alert.title}</h3>
                    <p className="text-sm mb-2">{alert.description}</p>
                    <div className="flex items-center text-xs">
                      <MapPin size={12} className="mr-1" />
                      <span>{alert.location.address}</span>
                      <span className="mx-2">•</span>
                      <Clock size={12} className="mr-1" />
                      <span>
                        {new Date(alert.createdAt).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ferry Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          État des bacs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-green-200 rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-green-800 dark:text-green-300">
                Mamoudzou ↔ Petite-Terre
              </h3>
              <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">
                En service
              </span>
            </div>
            <p className="text-sm text-green-700 dark:text-green-400">
              Prochaine traversée: 14h30
            </p>
          </div>
          
          <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">
                Dzaoudzi ↔ Mamoudzou
              </h3>
              <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full">
                Retard
              </span>
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Retard estimé: 15 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traffic;