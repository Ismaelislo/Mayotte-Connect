import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'shimaoré';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.traffic': 'Trafic',
    'nav.rideshare': 'Covoiturage',
    'nav.ads': 'Annonces',
    'nav.dictionary': 'Dictionnaire',
    'nav.tourism': 'Tourisme',
    'nav.events': 'Événements',
    'nav.jobs': 'Emplois',
    'nav.alerts': 'Alertes',
    'nav.help': 'Entraide',
    'nav.environment': 'Environnement',
    'nav.profile': 'Profil',
    
    // Home
    'home.welcome': 'Bienvenue sur Mayotte Connect',
    'home.subtitle': 'Votre super-app pour la vie quotidienne à Mayotte',
    'home.services': 'Nos Services',
    
    // Auth
    'auth.login': 'Connexion',
    'auth.register': 'Inscription',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.name': 'Nom',
    'auth.logout': 'Déconnexion',
    
    // Common
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.location': 'Localisation',
    'common.date': 'Date',
    'common.time': 'Heure',
    'common.price': 'Prix',
    'common.description': 'Description',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.submit': 'Valider',
    'common.loading': 'Chargement...',
  },
  shimaoré: {
    // Navigation
    'nav.home': 'Nyumba',
    'nav.traffic': 'Barabara',
    'nav.rideshare': 'Safiri pamoja',
    'nav.ads': 'Matangazo',
    'nav.dictionary': 'Kamusi',
    'nav.tourism': 'Utalii',
    'nav.events': 'Matukio',
    'nav.jobs': 'Kazi',
    'nav.alerts': 'Tahadhari',
    'nav.help': 'Msaada',
    'nav.environment': 'Mazingira',
    'nav.profile': 'Wasifu',
    
    // Home
    'home.welcome': 'Karibu Mayotte Connect',
    'home.subtitle': 'Programu yako kuu ya maisha ya kila siku Mayotte',
    'home.services': 'Huduma zetu',
    
    // Auth
    'auth.login': 'Ingia',
    'auth.register': 'Jisajili',
    'auth.email': 'Barua pepe',
    'auth.password': 'Nywila',
    'auth.name': 'Jina',
    'auth.logout': 'Toka',
    
    // Common
    'common.search': 'Tafuta',
    'common.filter': 'Chuja',
    'common.location': 'Mahali',
    'common.date': 'Tarehe',
    'common.time': 'Wakati',
    'common.price': 'Bei',
    'common.description': 'Maelezo',
    'common.save': 'Hifadhi',
    'common.cancel': 'Ghairi',
    'common.submit': 'Wasilisha',
    'common.loading': 'Inapakia...',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('mayotte_language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'shimaoré')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('mayotte_language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};