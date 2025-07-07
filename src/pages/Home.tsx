import React, { useState } from 'react';
import { 
  Car, 
  Users, 
  MessageSquare, 
  Book, 
  MapPin, 
  Calendar,
  Briefcase,
  AlertTriangle,
  Heart,
  Leaf,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/Auth/AuthModal';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const services = [
    {
      icon: Car,
      title: t('nav.traffic'),
      description: 'Info trafic en temps réel, état des bacs',
      path: '/traffic',
      color: 'from-mayotte-turquoise to-mayotte-turquoise-dark',
    },
    {
      icon: Users,
      title: t('nav.rideshare'),
      description: 'Covoiturage et transport partagé',
      path: '/rideshare',
      color: 'from-mayotte-green to-mayotte-green-dark',
    },
    {
      icon: MessageSquare,
      title: t('nav.ads'),
      description: 'Annonces locales, emploi, logement',
      path: '/ads',
      color: 'from-mayotte-coral to-mayotte-coral-dark',
    },
    {
      icon: Book,
      title: t('nav.dictionary'),
      description: 'Dictionnaire Français-Shimaoré',
      path: '/dictionary',
      color: 'from-mayotte-sand to-mayotte-sand-dark',
    },
    {
      icon: MapPin,
      title: t('nav.tourism'),
      description: 'Découvrir les merveilles de Mayotte',
      path: '/tourism',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Calendar,
      title: t('nav.events'),
      description: 'Agenda culturel et événements',
      path: '/events',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Briefcase,
      title: t('nav.jobs'),
      description: 'Offres d\'emploi locales',
      path: '/jobs',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: AlertTriangle,
      title: t('nav.alerts'),
      description: 'Alertes communautaires',
      path: '/alerts',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Heart,
      title: t('nav.help'),
      description: 'Entraide et solidarité locale',
      path: '/help',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: Leaf,
      title: t('nav.environment'),
      description: 'Protection de l\'environnement',
      path: '/environment',
      color: 'from-green-500 to-green-600',
    },
  ];

  const handleServiceClick = (path: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Navigation will be handled by Link component
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-br from-mayotte-turquoise via-mayotte-green to-mayotte-coral rounded-2xl text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {t('home.welcome')}
        </h1>
        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
          {t('home.subtitle')}
        </p>
        {!user && (
          <button
            onClick={() => setShowAuthModal(true)}
            className="mt-8 bg-white text-mayotte-turquoise px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Commencer maintenant
          </button>
        )}
      </div>

      {/* Services Grid */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          {t('home.services')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.path} className="group">
              {user ? (
                <Link to={service.path}>
                  <ServiceCard service={service} />
                </Link>
              ) : (
                <button
                  onClick={() => handleServiceClick(service.path)}
                  className="w-full text-left"
                >
                  <ServiceCard service={service} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Pourquoi choisir Mayotte Connect ?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-mayotte-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-white" size={32} />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Local</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Conçu spécialement pour les besoins de Mayotte
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-mayotte-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-white" size={32} />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Communautaire</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Connecte les habitants et favorise l'entraide
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-mayotte-coral rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-white" size={32} />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Solidaire</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Facilite l'entraide et le partage entre voisins
            </p>
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

const ServiceCard: React.FC<{ service: any }> = ({ service }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
      <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center mb-4`}>
        <service.icon className="text-white" size={24} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {service.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {service.description}
      </p>
      <div className="flex items-center text-mayotte-turquoise group-hover:text-mayotte-turquoise-dark">
        <span className="text-sm font-medium">Découvrir</span>
        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};

export default Home;