import React, { useState, useEffect } from 'react';
import { Heart, Users, ShoppingCart, Utensils, Wrench, Plus, Filter, Clock, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { HelpRequest } from '../types';

const Help: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const helpTypes = [
    { value: 'all', label: 'Tous les types', icon: Heart },
    { value: 'childcare', label: 'Garde d\'enfants', icon: Users },
    { value: 'shopping', label: 'Courses', icon: ShoppingCart },
    { value: 'food', label: 'Nourriture', icon: Utensils },
    { value: 'work', label: 'Petits travaux', icon: Wrench },
  ];

  const modes = [
    { value: 'all', label: 'Tout' },
    { value: 'request', label: 'Demandes' },
    { value: 'offer', label: 'Offres' },
  ];

  useEffect(() => {
    // Mock data
    const mockRequests: HelpRequest[] = [
      {
        id: '1',
        userId: 'user1',
        type: 'childcare',
        title: 'Garde d\'enfant occasionnelle',
        description: 'Recherche une personne de confiance pour garder ma fille de 6 ans les mercredis après-midi.',
        location: 'Mamoudzou centre',
        isOffer: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        userId: 'user2',
        type: 'shopping',
        title: 'Courses pour personne âgée',
        description: 'Je propose de faire les courses pour les personnes qui ne peuvent pas se déplacer.',
        location: 'Koungou',
        isOffer: true,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        userId: 'user3',
        type: 'food',
        title: 'Partage de repas',
        description: 'J\'ai préparé trop de carry poulet, je partage avec plaisir !',
        location: 'Dzaoudzi',
        isOffer: true,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '4',
        userId: 'user4',
        type: 'work',
        title: 'Aide pour déménagement',
        description: 'Recherche 2-3 personnes pour m\'aider à déménager ce weekend. Rémunération possible.',
        location: 'Tsingoni',
        isOffer: false,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '5',
        userId: 'user5',
        type: 'childcare',
        title: 'Baby-sitting disponible',
        description: 'Étudiante disponible pour garde d\'enfants en soirée et weekends. Expérience avec enfants 3-12 ans.',
        location: 'Mamoudzou',
        isOffer: true,
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '6',
        userId: 'user6',
        type: 'work',
        title: 'Réparation électrique',
        description: 'Électricien propose ses services pour petites réparations à domicile.',
        location: 'Bandrélé',
        isOffer: true,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
      }
    ];

    setTimeout(() => {
      setRequests(mockRequests);
      setLoading(false);
    }, 500);
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesType = selectedType === 'all' || request.type === selectedType;
    const matchesMode = selectedMode === 'all' || 
                       (selectedMode === 'request' && !request.isOffer) ||
                       (selectedMode === 'offer' && request.isOffer);
    return matchesType && matchesMode;
  });

  const CreateRequestForm = () => {
    const [formData, setFormData] = useState({
      type: 'childcare',
      title: '',
      description: '',
      location: '',
      isOffer: false
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newRequest: HelpRequest = {
        id: Date.now().toString(),
        userId: user?.id || '',
        type: formData.type as any,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        isOffer: formData.isOffer,
        createdAt: new Date().toISOString()
      };
      setRequests([newRequest, ...requests]);
      setShowCreateForm(false);
      setFormData({
        type: 'childcare',
        title: '',
        description: '',
        location: '',
        isOffer: false
      });
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {formData.isOffer ? 'Proposer de l\'aide' : 'Demander de l\'aide'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type d'aide
            </label>
            <div className="flex space-x-4 mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="mode"
                  checked={!formData.isOffer}
                  onChange={() => setFormData({...formData, isOffer: false})}
                  className="mr-2"
                />
                <span>Demander de l'aide</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="mode"
                  checked={formData.isOffer}
                  onChange={() => setFormData({...formData, isOffer: true})}
                  className="mr-2"
                />
                <span>Proposer de l'aide</span>
              </label>
            </div>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="input"
              required
            >
              {helpTypes.slice(1).map(type => (
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

          <div className="flex space-x-3">
            <button type="submit" className="btn-primary">
              Publier
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

  const getTypeIcon = (type: string) => {
    const typeConfig = helpTypes.find(t => t.value === type);
    const IconComponent = typeConfig?.icon || Heart;
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
          {t('nav.help')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Entraide et solidarité locale entre voisins
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-primary flex items-center justify-center"
        >
          <Plus size={20} className="mr-2" />
          Publier une demande
        </button>
        
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="input"
          >
            {helpTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="input"
          >
            {modes.map(mode => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showCreateForm && <CreateRequestForm />}

      {/* Help Requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow ${
              request.isOffer ? 'border-l-4 border-green-500' : 'border-l-4 border-blue-500'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getTypeIcon(request.type)}
                <span className={`px-2 py-1 text-xs rounded-full ${
                  request.isOffer 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {request.isOffer ? 'Offre' : 'Demande'}
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full">
                  {helpTypes.find(type => type.value === request.type)?.label}
                </span>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {request.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {request.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                <span>{request.location}</span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>
                  {new Date(request.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>
            
            <button className="w-full btn-primary text-sm">
              {request.isOffer ? 'Contacter' : 'Proposer son aide'}
            </button>
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg text-center">
          <Heart className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-500 dark:text-gray-400">
            Aucune demande d'aide trouvée
          </p>
        </div>
      )}

      {/* Community Stats */}
      <div className="bg-gradient-to-r from-mayotte-green to-mayotte-turquoise rounded-lg p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Solidarité Mayotte</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold">127</div>
            <div className="text-sm opacity-90">Demandes d'aide</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">89</div>
            <div className="text-sm opacity-90">Offres d'aide</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">156</div>
            <div className="text-sm opacity-90">Personnes aidées</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;