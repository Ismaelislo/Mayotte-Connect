import React, { useState, useEffect } from 'react';
import { Leaf, Camera, MapPin, Plus, Filter, AlertTriangle, CheckCircle, Clock, Trash2, Sprout } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { WasteReport } from '../types';
import InteractiveMap from '../components/Map/InteractiveMap';

const Environment: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [reports, setReports] = useState<WasteReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showReportForm, setShowReportForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'reports' | 'garden'>('reports');

  const reportTypes = [
    { value: 'all', label: 'Tous les types' },
    { value: 'illegal_dump', label: 'Décharge sauvage' },
    { value: 'wild_dump', label: 'Dépôt illégal' },
  ];

  const statusTypes = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'pending', label: 'En attente' },
    { value: 'in_progress', label: 'En cours' },
    { value: 'resolved', label: 'Résolu' },
  ];

  useEffect(() => {
    // Mock data
    const mockReports: WasteReport[] = [
      {
        id: '1',
        userId: 'user1',
        type: 'illegal_dump',
        description: 'Décharge sauvage importante avec déchets ménagers et encombrants. Odeurs nauséabondes.',
        location: {
          lat: -12.7806,
          lng: 45.2278,
          address: 'Route de Koungou, près du pont'
        },
        image: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg',
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        userId: 'user2',
        type: 'wild_dump',
        description: 'Dépôt de pneus usagés dans la mangrove. Impact environnemental important.',
        location: {
          lat: -12.8275,
          lng: 45.1662,
          address: 'Mangrove de Tsingoni'
        },
        image: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg',
        status: 'in_progress',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        userId: 'user3',
        type: 'illegal_dump',
        description: 'Déchets plastiques abandonnés sur la plage. Nettoyage urgent nécessaire.',
        location: {
          lat: -12.7500,
          lng: 45.2000,
          address: 'Plage de Moya'
        },
        image: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg',
        status: 'resolved',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 500);
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    const matchesType = selectedType === 'all' || report.type === selectedType;
    return matchesStatus && matchesType;
  });

  const ReportForm = () => {
    const [formData, setFormData] = useState({
      type: 'illegal_dump',
      description: '',
      address: '',
      image: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newReport: WasteReport = {
        id: Date.now().toString(),
        userId: user?.id || '',
        type: formData.type as any,
        description: formData.description,
        location: {
          lat: -12.7806 + (Math.random() - 0.5) * 0.1,
          lng: 45.2278 + (Math.random() - 0.5) * 0.1,
          address: formData.address
        },
        image: formData.image,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      setReports([newReport, ...reports]);
      setShowReportForm(false);
      setFormData({
        type: 'illegal_dump',
        description: '',
        address: '',
        image: ''
      });
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Signaler un dépôt de déchets
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type de signalement
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="input"
              required
            >
              {reportTypes.slice(1).map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
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
              placeholder="Décrivez le type de déchets, la quantité, l'impact..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Localisation précise
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="input"
              placeholder="Adresse ou point de repère"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Photo (obligatoire)
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="input"
              placeholder="URL de la photo"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              La photo est essentielle pour valider le signalement
            </p>
          </div>

          <div className="flex space-x-3">
            <button type="submit" className="btn-primary">
              Envoyer le signalement
            </button>
            <button
              type="button"
              onClick={() => setShowReportForm(false)}
              className="btn-secondary"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    );
  };

  const GardenSection = () => {
    const gardenTips = [
      {
        title: 'Plantation de fruits tropicaux',
        description: 'Mangues, papayes et fruits de la passion s\'adaptent parfaitement au climat mahorais.',
        season: 'Toute l\'année',
        difficulty: 'Facile'
      },
      {
        title: 'Potager créole',
        description: 'Brèdes, piments, gingembre et curcuma pour une cuisine locale authentique.',
        season: 'Saison sèche',
        difficulty: 'Moyen'
      },
      {
        title: 'Compostage tropical',
        description: 'Valorisez vos déchets organiques en compost riche pour vos plantations.',
        season: 'Toute l\'année',
        difficulty: 'Facile'
      }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Sprout className="mr-2" size={24} />
            Conseils jardinage tropical
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gardenTips.map((tip, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{tip.description}</p>
                <div className="flex justify-between text-xs">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    {tip.season}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {tip.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-mayotte-green rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Calendrier agricole Mayotte</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Saison sèche (Mai - Octobre)</h4>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Plantation des légumes-feuilles</li>
                <li>• Récolte des fruits tropicaux</li>
                <li>• Préparation du sol</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Saison humide (Novembre - Avril)</h4>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Plantation des tubercules</li>
                <li>• Entretien et arrosage réduit</li>
                <li>• Protection contre les cyclones</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'in_progress': return <AlertTriangle size={16} />;
      case 'resolved': return <CheckCircle size={16} />;
      default: return <Clock size={16} />;
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
          {t('nav.environment')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Protection de l'environnement et jardinage tropical
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'reports'
                ? 'text-mayotte-turquoise border-b-2 border-mayotte-turquoise'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <Trash2 className="inline mr-2" size={20} />
            Stop Déchets
          </button>
          <button
            onClick={() => setActiveTab('garden')}
            className={`flex-1 py-4 px-6 text-center font-medium ${
              activeTab === 'garden'
                ? 'text-mayotte-turquoise border-b-2 border-mayotte-turquoise'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <Sprout className="inline mr-2" size={20} />
            Jardin Mayotte
          </button>
        </div>
      </div>

      {activeTab === 'reports' ? (
        <>
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowReportForm(!showReportForm)}
              className="btn-primary flex items-center justify-center"
            >
              <Plus size={20} className="mr-2" />
              Signaler un dépôt
            </button>
            
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input"
              >
                {reportTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="input"
              >
                {statusTypes.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {showReportForm && <ReportForm />}

          {/* Waste Reports Map */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Carte des signalements
            </h2>
            <InteractiveMap
              center={[-12.7806, 45.2278]}
              zoom={11}
              height="350px"
              markers={filteredReports.map(report => ({
                id: report.id,
                position: [report.location.lat, report.location.lng],
                title: reportTypes.find(type => type.value === report.type)?.label || 'Signalement',
                description: report.description,
                type: 'waste'
              }))}
              onMarkerClick={(markerId) => {
                const report = filteredReports.find(r => r.id === markerId);
                if (report) {
                  console.log('Waste report clicked:', report);
                }
              }}
            />
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={report.image}
                    alt="Signalement"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        {reportTypes.find(type => type.value === report.type)?.label}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full flex items-center ${getStatusColor(report.status)}`}>
                        {getStatusIcon(report.status)}
                        <span className="ml-1">
                          {statusTypes.find(status => status.value === report.status)?.label}
                        </span>
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {report.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        <span>{report.location.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>
                          {new Date(report.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center">
              <Leaf className="mx-auto mb-4 text-gray-400" size={48} />
              <p className="text-gray-500 dark:text-gray-400">
                Aucun signalement trouvé
              </p>
            </div>
          )}

          {/* Environmental Stats */}
          <div className="bg-gradient-to-r from-mayotte-green to-green-600 rounded-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-4">Impact environnemental</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold">47</div>
                <div className="text-sm opacity-90">Signalements traités</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">12</div>
                <div className="text-sm opacity-90">Tonnes de déchets collectées</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">8</div>
                <div className="text-sm opacity-90">Sites nettoyés</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <GardenSection />
      )}
    </div>
  );
};

export default Environment;